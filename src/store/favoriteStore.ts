import { GatheringId, UserId } from "@/types";
import { type FavoritesMap } from "@/types/favorite";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const FAVORITES_STORAGE_KEY = "favorites";
export const nowISO = () => new Date().toISOString();

interface FavoriteState {
  favorites: FavoritesMap;
  toggle: (userId: UserId, gatheringId: GatheringId) => void;
  has: (userId: UserId, gatheringId: GatheringId) => boolean;
  getIds: (userId: UserId) => GatheringId[];
  reset: () => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: {},
      has: (userId, gatheringId) => {
        const uid = String(userId);
        return get().favorites[uid]?.ids.includes(gatheringId) ?? false;
      },
      getIds: (userId) => {
        const uid = String(userId);
        return get().favorites[uid]?.ids ?? [];
      },
      toggle: (userId, gatheringId) => {
        const uid = String(userId);
        const all = { ...get().favorites };
        const cur = all[uid] ?? { ids: [], count: 0, updatedAt: nowISO() };

        const exist = cur.ids.includes(gatheringId);
        const nextIds = exist
          ? cur.ids.filter((x) => x !== gatheringId)
          : [...cur.ids, gatheringId];

        all[uid] = { ids: nextIds, count: nextIds.length, updatedAt: nowISO() };

        set({ favorites: all });
      },
      reset: () => set({ favorites: {} }),
    }),
    { name: FAVORITES_STORAGE_KEY },
  ),
);
