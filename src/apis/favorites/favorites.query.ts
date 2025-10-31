// src/apis/favorites/favorites.query.ts
"use client";

import { Gathering, GatheringId, UserId } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../_react_query/keys";
import { GetGatheringsQuery } from "../gatherings/gatherings.schema";
import { fetchFavoriteGatherings } from "./favorites.service";
import { useFavoriteStore } from "@/store/favoriteStore";

/** 로컬스토리지 → /api/favorites 프록시 → 모임 목록 */
export function useFavoriteGatheringsQuery(userId: UserId, query?: Partial<GetGatheringsQuery>) {
  const count = useFavoriteStore((s) => s.favorites[String(userId)]?.count ?? 0);
  const enabled = userId > 0 && count >= 1;

  return useQuery<Gathering[]>({
    queryKey: queryKeys.favorites.list(userId, query),
    queryFn: () => fetchFavoriteGatherings(userId, query),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}

export function useFavoriteToggle(userId: number | undefined, gatheringId: GatheringId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (userId) useFavoriteStore.getState().toggle(userId, gatheringId);
      return true;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all() });
    },
  });
}
