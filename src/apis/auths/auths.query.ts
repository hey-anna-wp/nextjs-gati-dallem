"use client";

// /src/apis/auths/auths.query.ts
import { useAuthStore } from "@/store/authStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../_react_query/keys";
import { updateAuthUser } from "./auths.service";
import { signin, signout, getAuthUser } from "./auths.service";
import { authQueryKeys, meKey } from "@/utils/auth/authQueryKeys";
import { AuthUser } from "@/types";
import { tokenStore } from "@/utils/auth/token.store";
import { AuthUserQueryOptions } from "./auths.types";
import {
  SigninBody,
  SigninResponse,
  SignoutResponse,
  SignupBody,
  SignupResponse,
} from "./auths.schema";
import { signup } from "./auths.service";
import { invalidateAuth } from "../_react_query/utils";

// /** GET /auths/user */
export const useAuthUser = <T = AuthUser>(opts?: AuthUserQueryOptions<T>) => {
  // 토큰 감지(기본: tokenStore.get)
  const rawToken = (opts?.getToken ?? tokenStore.get)?.();
  const authed = !!rawToken;

  return useQuery<AuthUser | null, Error, T | null>({
    // 토큰 유무를 키에 포함해 상태 전환 시 캐시를 재초기화
    queryKey: meKey(authed),

    // 서버 요청: 401 응답 시 null 반환
    queryFn: async () => {
      try {
        return await getAuthUser(); // 서버가 401이면 서비스에서 null 반환
      } catch (e: any) {
        if (e?.response?.status === 401) return null;
        throw e;
      }
    },
    // 토큰 없을 경우 쿼리 비활성화(토큰 없을 땐 호출 X)
    enabled: opts?.enabled ?? authed,
    // 인증 쿼리는 재시도 비권장
    retry: opts?.retry ?? 0,
    // 초기 데이터 / select 매핑
    initialData: opts?.initialData ?? null,
    select: opts?.select,
    // 포커스 / 재연결 시 재검증(인증은 최신성이 중요)
    refetchOnWindowFocus: opts?.refetchOnWindowFocus ?? true,
    refetchOnReconnect: opts?.refetchOnReconnect ?? true,
    // 캐시 전략: 인증 정보는 자주 참조되므로 신선도 유지
    staleTime: opts?.staleTime ?? 30_000, // 30초
    gcTime: opts?.gcTime ?? 5 * 60_000, // 5분
    structuralSharing: true,
    meta: { scope: "auth" },
  });
};

// /** POST /auths/signup */
export const useSignup = () => {
  return useMutation<SignupResponse, Error, SignupBody>({
    mutationKey: authQueryKeys.mutation.signup(),
    mutationFn: signup,
  });
};

// /** POST /auths/signin */
export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation<SigninResponse, Error, SigninBody>({
    mutationKey: authQueryKeys.mutation.signin(),
    mutationFn: signin,

    /** 로그인 성공 시: 토큰 저장 + 인증 캐시 갱신 */
    onSuccess: async (res) => {
      // 1) 토큰 저장 (token | accessToken 모두 대응)
      const t = (res as any)?.token ?? (res as any)?.accessToken;
      if (typeof t === "string" && t) tokenStore.set(t); // 로컬 스토리지에 토큰 저장

      // 2) auth 전부: 진행 중 요청 취소
      await queryClient.cancelQueries({ queryKey: authQueryKeys.all() });
      // 3) auth 전부: 무효화(활성 쿼리만 즉시 재요청)
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.all(), refetchType: "active" });

      // 4) 새 토큰으로 /me 강제 조회(캐시에 자동 반영)
      await queryClient.fetchQuery({
        queryKey: meKey(true),
        queryFn: getAuthUser,
      });
    },
  });
};

// /** POST /auths/signout */
export const useSignout = () => {
  const queryClient = useQueryClient();

  return useMutation<SignoutResponse, Error, void>({
    mutationKey: authQueryKeys.mutation.signout(),
    mutationFn: signout,

    // 요청 직전: 즉시 로그아웃 UI 반영 (업데이트)
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: authQueryKeys.all() });
      tokenStore.clear?.();

      queryClient.setQueryData(meKey(true), null);
      queryClient.setQueryData(meKey(false), null);

      return {};
    },

    // 요청 완료 후: me/roles 등 인증 캐시 전체 무효화
    onSettled: async () => {
      await invalidateAuth(queryClient);
    },
  });
};

/** PUT /auths/user (multipart) */
export function useUpdateAuthUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAuthUser,
    onSuccess: async (user) => {
      useAuthStore.setState(() => ({ user }));
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}
