// /src/store/authStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthUser } from "@/types/auth";
import { deleteCookie, setCookie } from "@/utils/next-cookie";
import { tokenStore } from "@/utils/auth/token.store";

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  actions: {
    setToken: (token?: string | null) => void;
    setUser: (user: AuthUser | null) => void;
    clear: () => Promise<void>;
    hydrateUser: (fetcher: () => Promise<AuthUser | null>) => Promise<void>;
  };
};

const STORAGE_KEY = "auth-store"; // 유지해도 되지만 token은 저장 안 함

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false, // UI 플래그 (토큰은 tokenStore에서 파생)
      actions: {
        setToken: (token) => {
          // 토큰은 오직 tokenStore로만
          if (token) tokenStore.set(token);
          else tokenStore.clear();

          // isAuthenticated는 '현재 tokenStore에 토큰이 있느냐'로만 판단
          const has = !!tokenStore.get();
          set((s) => ({ ...s, isAuthenticated: has }));
        },
        setUser: (user) => {
          set((s) => ({ ...s, user, isAuthenticated: !!tokenStore.get() }));
        },
        clear: async () => {
          await deleteCookie("loggedIn");
          tokenStore.clear();
          set({ user: null, isAuthenticated: false });
        },
        hydrateUser: async (fetcher) => {
          const token = tokenStore.get();
          if (!token) return;
          try {
            const me = await fetcher();
            if (!me) {
              // 서버가 null 주는 경우(비로그인) 안전 처리
              await get().actions.clear();
              return;
            }
            set((s) => ({ ...s, user: me, isAuthenticated: true }));
            await setCookie("loggedIn", new Date().getTime().toString());
          } catch (e: unknown) {
            console.log(e);
            // unknown → 안전 추출
            const status =
              (e as { status?: number })?.status ??
              (e as { response?: { status?: number } })?.response?.status ??
              (e as { cause?: { status?: number } })?.cause?.status;

            if (status === 401) {
              await get().actions.clear();
            } else {
              console.warn("[hydrateUser] non-401 error, keep token", e);
            }
          }
        },
      },
    }),
    {
      name: STORAGE_KEY,
      version: 2,
      storage: createJSONStorage(() => localStorage),
      // user만 저장
      partialize: (s) => ({ user: s.user }) as Partial<AuthState>,
    },
  ),
);

export const selectUser = (s: AuthState) => s.user;
export const selectIsAuthenticated = (s: AuthState) => s.isAuthenticated;

export const authActions = {
  setToken: (token?: string | null) => useAuthStore.getState().actions.setToken(token),
  setUser: (user: AuthUser | null) => useAuthStore.getState().actions.setUser(user),
  clear: () => useAuthStore.getState().actions.clear(),
  hydrateUser: (fetcher: () => Promise<AuthUser | null>) =>
    useAuthStore.getState().actions.hydrateUser(fetcher),
};
