// src/utils/auth/authQueryKeys.ts
import { queryKeys } from "@/apis/_react_query/keys";

/**
 * authQueryKeys
 * - 인증 도메인 전용 React Query 키 유틸
 * - Query / Mutation 키 관리
 */

type SessionState = "authed" | "guest";

export const authQueryKeys = {
  // Query
  all: () => queryKeys.auth.all(),
  me: () => queryKeys.auth.me(),
  meState: (state: SessionState) => [...queryKeys.auth.me(), state] as const,

  // Mutation
  mutation: {
    signin: () => [...authQueryKeys.all(), "mutation", "signin"] as const,
    signout: () => [...authQueryKeys.all(), "mutation", "signout"] as const,
    signup: () => [...authQueryKeys.all(), "mutation", "signup"] as const,
  },
} as const;

// authed 여부에 따라 meState 키 반환
export const meKey = (authed: boolean) => authQueryKeys.meState(authed ? "authed" : "guest");
