// src/apis/favorites/favorites.schema.ts
import { z } from "zod";
import { IsoDateTime } from "../_shared.schema";

export const FavoriteSchema = z.object({
  count: z.number().nonnegative(),
  ids: z.array(z.number().int().nonnegative()),
  updatedAt: IsoDateTime,
});
export type FavoriteDTO = z.infer<typeof FavoriteSchema>;

export const FavoritesMapSchema = z.record(z.string(), FavoriteSchema);
export type FavoritesMapDTO = z.infer<typeof FavoritesMapSchema>;
