// src/app/api/favorites/route.ts

import { GetGatheringsQuery, GetGatheringsQuerySchema } from "@/apis/gatherings/gatherings.schema";
import { getGatherings } from "@/apis/gatherings/gatherings.service";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const raw = Object.fromEntries(url.searchParams.entries());

  const parsed = GetGatheringsQuerySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const q = parsed.data as GetGatheringsQuery;
  const list = await getGatherings({ ...q });

  return NextResponse.json(list);
}
