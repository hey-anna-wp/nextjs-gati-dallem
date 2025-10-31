"use client";

import { useFavoriteStore } from "@/store/favoriteStore";
import { useMemo } from "react";

/** 모임별 즐겨찾기 상태/토글 훅 */
export function useFavorites(userId?: number) {
  const favorites = useFavoriteStore((s) => s.favorites);
  const has = useFavoriteStore((s) => s.has);
  const getIds = useFavoriteStore((s) => s.getIds);

  const count = userId ? (favorites[userId]?.count ?? 0) : 0;
  const ids = useMemo(() => (userId ? getIds(userId) : []), [getIds, userId]);
  const isLiked = userId ? (gatheringId: number) => has(userId, gatheringId) : () => false;

  return { favoriteCount: count, favoriteIds: ids, isLiked };
}
