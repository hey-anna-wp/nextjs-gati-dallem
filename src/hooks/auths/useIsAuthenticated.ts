// src/hooks/auths/useIsAuthenticated.ts
"use client";
import { useAuthToken } from "./useAuthToken";

export function useIsAuthenticated() {
  const token = useAuthToken();
  return !!token;
}
