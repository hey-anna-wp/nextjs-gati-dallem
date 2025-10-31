import { AuthUser } from "@/types";
import { UseQueryOptions } from "@tanstack/react-query";

// useAuthUser
export type GetTokenFn = () => string | undefined | null;

export type AuthUserQueryOptions<T = AuthUser> = Omit<
  UseQueryOptions<AuthUser | null, Error, T | null>,
  "queryKey" | "queryFn"
> & {
  enabled?: boolean;
  retry?: number;
  select?: (u: AuthUser | null) => T | null;
  refetchOnWindowFocus?: boolean | "always";
  refetchOnReconnect?: boolean;
  initialData?: AuthUser | null | (() => AuthUser | null);
  getToken?: GetTokenFn;
  queryKey?: any[];
};
