// src/apis/favorites/favorites.service.ts
"use client";

import { FAVORITES_STORAGE_KEY, nowISO, useFavoriteStore } from "@/store/favoriteStore";
import { Favorite, FavoritesMap, Gathering } from "@/types";
import { GetGatheringsQuery } from "../gatherings/gatherings.schema";
import { FavoriteSchema, FavoritesMapDTO, FavoritesMapSchema } from "./favorites.schema";

const isClient = typeof window !== "undefined";

/** 전체 맵 읽기 (유효성 검증 포함, 실패 시 {}) */
export function readFavoritesMap(): FavoritesMap {
  if (!isClient) return {};

  const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
  let data: unknown = {};

  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    data = {};
  }
  const parsed = FavoritesMapSchema.safeParse(data);

  return parsed.success ? (parsed.data as FavoritesMapDTO) : {};
}

/** 특정 사용자 즐겨찾기 가져오기 (count 자동 보정) */
export function getFavoriteFor(userId: number): Favorite {
  let map = readFavoritesMap();
  const key = String(userId);
  const rec = map[key] ?? useFavoriteStore.getState().favorites[userId];

  const parsed = FavoriteSchema.safeParse(rec);
  if (!parsed.success) return { ids: [], count: 0, updatedAt: nowISO() };

  if (parsed.data.count !== parsed.data.ids.length) {
    // 데이터 오염 보정
    const fixed: Favorite = { ...parsed.data, count: parsed.data.ids.length };
    try {
      map[key] = fixed;
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(map));
    } catch {}
    return fixed;
  }
  return parsed.data;
}

/** 즐겨찾기 기반 모임 목록 조회: /api/favorites?{query} */
export async function fetchFavoriteGatherings(
  userId: number,
  query?: Partial<GetGatheringsQuery>,
): Promise<Gathering[]> {
  const { ids = [] } = getFavoriteFor(userId);

  const urlSearchParams = new URLSearchParams();

  Object.entries(query ?? {}).forEach(([k, v]) => {
    if (!!v) urlSearchParams.set(k, String(v));
  });
  if (ids.length > 0) urlSearchParams.append("id", ids.join(","));

  const res = await fetch(`/api/favorites?${urlSearchParams.toString()}`, { method: "GET" });
  if (!res.ok) throw new Error("Failed to fetch favorite gatherings");
  return res.json();
}
