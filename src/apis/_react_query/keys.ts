// /src/apis/_rq/keys.ts

import { GetGatheringsQuery } from "../gatherings/gatherings.schema";

export const queryKeys = {
  auth: {
    all: () => ["auth"] as const,
    me: () => [...queryKeys.auth.all(), "me"] as const,
  },
  gatherings: {
    all: () => ["gatherings"] as const,
    list: (params?: unknown) => [...queryKeys.gatherings.all(), "list", params ?? {}] as const,
    detail: (id: number) => [...queryKeys.gatherings.all(), "detail", id] as const,
    joined: (params?: unknown) => [...queryKeys.gatherings.all(), "joined", params ?? {}] as const,
    participants: (id: number, params?: unknown) =>
      [...queryKeys.gatherings.all(), "participants", id, params ?? {}] as const,
  },
  reviews: {
    all: () => ["reviews"] as const,
    list: (params?: unknown) => [...queryKeys.reviews.all(), "list", params ?? {}] as const,
    scores: (params?: unknown) => [...queryKeys.reviews.all(), "scores", params ?? {}] as const,
  },
  favorites: {
    all: () => ["favorites"] as const,
    list: (userId: number, query?: Partial<GetGatheringsQuery>) =>
      ["favorites", userId, query] as const,
  },
} as const;

export const targets = {
  authAll: [queryKeys.auth.all()],
  gatheringsAll: [queryKeys.gatherings.all()],
  reviewsAll: [queryKeys.reviews.all()],
  favoritesAll: [queryKeys.favorites.all()],
};
