// src/hooks/auths/useRequireAuthAction.ts
"use client";
import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useIsAuthenticated } from "./useIsAuthenticated";

type RequireAuthOptions = {
  onBlocked?: () => void; // 스낵바/모달
  redirectOnBlocked?: boolean; // 기본 true
  redirectTo?: string; // 기본 /signin?redirect=현재경로
};

export function useRequireAuthAction(opts?: RequireAuthOptions) {
  const isAuthed = useIsAuthenticated();
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const requireAuthAction = useCallback(
    <T extends any[]>(action: (...args: T) => Promise<void> | void) =>
      async (...args: T) => {
        if (isAuthed) return action(...args);
        opts?.onBlocked?.();
        if (opts?.redirectOnBlocked ?? true) {
          const current = `${pathname}${search?.toString() ? `?${search}` : ""}`;
          router.push(opts?.redirectTo ?? `/signin?redirect=${encodeURIComponent(current)}`);
        }
      },
    [isAuthed, opts, pathname, search, router],
  );

  return { isAuthed, requireAuthAction };
}
