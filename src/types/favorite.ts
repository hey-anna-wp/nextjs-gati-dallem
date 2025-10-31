// src/types/favorites.ts

import { ISODateTimeString } from "./common";

/** userId별 value */
export interface Favorite {
  count: number; // ids.length와 동일해야 함
  ids: number[]; // 찜한 모임 id 리스트
  updatedAt: ISODateTimeString; // ISO8601
}

/** VK 구조: localStorage['favorites'] = Record<userId, Favorite> */
export type FavoritesMap = Record<string, Favorite>;
