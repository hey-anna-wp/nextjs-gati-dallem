// src/constants/auth/errorMessages.ts

/**
 * 인증(로그인/회원가입) 도메인 고정 메시지 모음
 *
 * 사용 위치:
 * - [클라이언트 선검증] 제출 전 유효성 검사 시 → `AUTH_ERROR_MESSAGES.fields.*`
 * - [서버 검증 반영] 400 에러 + parameter 존재 시 → 해당 필드 메시지 매핑
 * - [코드 기반 폴백] 서버에서 message 누락 또는 숨김 시 → `AUTH_ERROR_MESSAGES.codes.*`
 *
 * 주의:
 * - 이 파일은 **UI 문구 상수 전용**입니다.
 *   (파싱/매핑 로직은 `/src/apis/_errorMessage.ts`에서 처리)
 *
 */
export const AUTH_ERROR_MESSAGES = {
  // 필드별 메시지(클라이언트 선검증 + 서버 400 parameter 매핑)
  fields: {
    email: {
      REQUIRED: "아이디(이메일)를 입력해 주세요.",
      INVALID: "유효한 이메일 주소를 입력해 주세요.",
      // 서버 중복 결과를 선검증처럼 보여줄 때도 재사용 가능
      DUPLICATE: "중복된 이메일입니다.",
    },
    name: {
      REQUIRED: "이름을 입력해 주세요.",
    },
    companyName: {
      REQUIRED: "회사명을 입력해 주세요.",
    },
    password: {
      REQUIRED: "비밀번호를 입력해 주세요.",
      WEAK: "비밀번호는 8자 이상이어야 합니다.",
    },
    confirmPassword: {
      REQUIRED: "비밀번호 확인을 입력해 주세요.",
      NOT_MATCH: "비밀번호가 일치하지 않습니다.",
    },
  },

  // 서버 에러 코드 → UI 문구(서버 메시지를 숨기거나 없을 때 폴백)
  codes: {
    INVALID_CREDENTIALS: "아이디 또는 비밀번호가 올바르지 않아요.",
    USER_NOT_FOUND: "가입되지 않은 계정이에요.",
    EMAIL_EXISTS: "이미 사용 중인 이메일이에요.", // 서버 중복 응답 폴백
    VALIDATION_ERROR: "입력값을 다시 확인해 주세요.",
    TOKEN_EXPIRED: "세션이 만료되었어요. 다시 로그인해 주세요.",
  },

  // 공통 배너/토스트/성공 문구 등
  generic: {
    LOGIN_FAILED: "로그인에 실패했습니다. 다시 시도해 주세요.",
    SIGNUP_FAILED: "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    SIGNUP_SUCCESS: "회원가입이 완료되었습니다.",
    UNKNOWN: "요청을 처리할 수 없습니다. 잠시 후 다시 시도해 주세요.",
  },
} as const;
