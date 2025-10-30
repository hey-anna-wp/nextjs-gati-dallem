// /src/apis/_client.ts
import { ZodType } from "zod";
import { ApiErrorSchema } from "./_shared.schema";
import { tokenStore } from "@/utils/auth/token.store";
import { getErrorMessage } from "./_errorMessage";
import { API_BASE_URL, TEAM_ID } from "@/configs/commonConfig";
import { authActions } from "@/store/authStore";
import { showGlobalLoading, hideGlobalLoading } from "@/utils/loadingDom";

interface ReqOptionsType<T> extends RequestInit {
  /** 응답 Zod 스키마 (성공 응답) */
  responseSchema?: ZodType<T>;
  /** 성공 응답이 비어있는 경우(true) → 파싱 생략 */
  emptyResponse?: boolean;
  /** 쿼리 스트링 파라미터 */
  query?: Record<string, unknown>;
  /** 전역 로딩 오버레이 사용 여부 (기본 true) */
  useLoading?: boolean;
}

/** 공통 에러 */
export class HttpApiError extends Error {
  status: number;
  code?: string;
  parameter?: string;
  constructor(status: number, message: string, code?: string, parameter?: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.parameter = parameter;
  }
}

/**
 * ApiClient
 * - 매 요청마다 tokenStore의 최신 토큰으로 Authorization 헤더를 설정합니다.
 * - Zod 기반 성공 응답 검증 및 공통 에러(HttpApiError) 처리.
 */

export class ApiClient {
  /** 환경변수 기반 (commonConfig) */
  private static readonly BASE_URL = (API_BASE_URL || "").replace(/\/+$/, ""); // 뒤 슬래시 제거
  private static readonly TEAM_ID = TEAM_ID;

  private authToken?: string; // 선택: 인스턴스 보관 토큰

  // 선택: 외부에서 토큰 주입하고 싶을 때 사용
  setAuthToken(token?: string) {
    this.authToken = token;
  }

  private buildHeaders(init?: HeadersInit, body?: unknown): Headers {
    const headers = new Headers(init);
    const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

    // FormData가 아닌 경우에만 JSON 기본 Content-Type 설정
    if (!isFormData && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    // 우선순위: 저장소 최신 토큰 → 인스턴스 토큰
    const stored = tokenStore.get(); // 최신
    const token = stored ?? this.authToken; // fallback
    if (token) headers.set("Authorization", `Bearer ${token}`); // fallback

    return headers;
  }

  /** 공통 쿼리 문자열 빌더 */
  private _buildQuery(params?: Record<string, unknown>): string {
    if (!params) return "";
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([keyNm, value]) => {
      if (value === undefined || value === null) return;
      searchParams.append(keyNm, String(value));
    });
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
  }

  /** 공통 요청 래퍼 (Zod로 결과 파싱) */
  private async _request<T>(path: string, options: ReqOptionsType<T> = {}): Promise<T> {
    const { responseSchema, emptyResponse, query, useLoading = true, ...init } = options;

    // URL + 쿼리 (이중 슬래시 방지)
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const url = `${ApiClient.BASE_URL}/${ApiClient.TEAM_ID}${normalizedPath}${this._buildQuery(query)}`;

    const canUseDom = typeof window !== "undefined";

    const method = (init.method || "GET").toUpperCase();

    // GET 요청(페이지 데이터 등)은 스켈레톤 처리 → 전역 스피너 OFF
    // POST / PUT / DELETE 요청(저장, 삭제, 로그인 등)은 전역 스피너 ON
    const shouldGlobalLoad = useLoading && method !== "GET";
    if (canUseDom && shouldGlobalLoad) showGlobalLoading();

    try {
      // 공통 헤더 (최신 토큰 우선)
      const headers = this.buildHeaders(init.headers, init.body);
      // fetch (캐시 방지)
      const resp = await fetch(url, { ...init, headers, cache: "no-store" });

      // 에러 응답 처리
      if (!resp.ok) {
        let raw: unknown;
        try {
          raw = await resp.json();
        } catch {
          const uiMsg = getErrorMessage(resp.status);
          throw new HttpApiError(resp.status, uiMsg);
        }
        const parsed = ApiErrorSchema.safeParse(raw);
        if (parsed.success) {
          const { code, message, parameter } = parsed.data as any;
          const uiMsg = getErrorMessage(resp.status, code, message);

          if (resp.status === 401 && !/\/auths\/(signin|signup)/.test(normalizedPath)) {
            try {
              await authActions.clear();
            } catch {}
            if (typeof window !== "undefined") {
              const redirect = encodeURIComponent(
                window.location.pathname + window.location.search + window.location.hash,
              );
              // [DEV ONLY] 개발 중 401 리다이렉트 테스트 로그
              // - 실제 배포 시 제거 가능
              if (process.env.NODE_ENV === "development") {
                console.info("[apiClient] 401 → redirect to /signin", { path, code, redirect });
              }
              window.location.replace(`/signin?redirect=${redirect}`);
            }
            // 브라우저/SSR 모두 흐름 종료
            return Promise.reject(new HttpApiError(401, uiMsg, code, parameter));
          }
          throw new HttpApiError(resp.status, uiMsg, code, parameter);
        }

        // 알 수 없는 포맷
        const uiMsg = getErrorMessage(resp.status);
        throw new HttpApiError(resp.status, uiMsg);
      }

      // No Content 등 처리
      // 주의: chunked 전송의 경우 Content-Length가 없을 수 있음.
      if (emptyResponse || resp.status === 204 || resp.headers.get("Content-Length") === "0")
        return undefined as T;

      // 성공 응답 파싱
      const data = await resp.json();
      if (!responseSchema) return data as T;

      // 스키마 미스매치 시 바로 에러
      const parsed = responseSchema.safeParse(data);
      if (!parsed.success) {
        // 필요 시 디버깅: parsed.error.issues
        parsed.error?.issues.forEach((i) => console.log(i));
        throw new HttpApiError(500, "Response schema validation failed");
      }
      return parsed.data as T;
    } finally {
      // 성공/실패 무관 전역 로딩 off
      if (canUseDom && shouldGlobalLoad) hideGlobalLoading();
    }
  }

  /** GET 헬퍼 */
  get<T>(path: string, query?: Record<string, unknown>, responseSchema?: ZodType<T>) {
    return this._request<T>(path, { method: "GET", query, responseSchema });
  }

  /** POST 헬퍼 (JSON / FormData 자동 처리) */
  post<T>(path: string, body?: Record<string, unknown> | FormData, responseSchema?: ZodType<T>) {
    const isForm = body instanceof FormData;
    const payload = isForm ? (body as FormData) : body ? JSON.stringify(body) : undefined;
    return this._request<T>(path, {
      method: "POST",
      body: payload,
      responseSchema,
      // formData면 content-type 자동 설정되도록 그대로 둠
      // headers: isForm ? {} : undefined,
    });
  }

  /** PUT 헬퍼 */
  put<T>(path: string, body?: Record<string, unknown> | FormData, responseSchema?: ZodType<T>) {
    const isForm = body instanceof FormData;
    const payload = isForm ? (body as FormData) : body ? JSON.stringify(body) : undefined;
    return this._request<T>(path, {
      method: "PUT",
      body: payload,
      responseSchema,
      // headers: isForm ? {} : undefined,
    });
  }

  /** DELETE 헬퍼 */
  delete<T>(path: string, responseSchema?: ZodType<T>) {
    return this._request<T>(path, { method: "DELETE", responseSchema });
  }
}

/** 싱글톤 클라이언트 (프로젝트 전역에서 재사용) */
export const apiClient = new ApiClient();

/** @deprecated Use HttpApiError */
export { HttpApiError as ApiError };
