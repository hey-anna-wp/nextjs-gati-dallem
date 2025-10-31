"use client";

import { Card } from "@/components/common/Card";
import { Gathering } from "@/types";
import { cn } from "@/utils/classNames";

/** 마이페이지 내가 만든 모임 카드 컴포넌트 */
export default function CreatedCardItem(gathering: Gathering) {
  return (
    <Card gathering={gathering}>
      <Card.Image />
      <Card.Detail className="flex flex-col items-start justify-between gap-4">
        <Card.Title className="md:pr-12">{gathering.name}</Card.Title>
        <div className="flex-end md:flex-between flex-col gap-6 md:flex-row md:gap-3">
          <Card.GatheringDetail />
        </div>
      </Card.Detail>
      <Card.LikeButton />
    </Card>
  );
}
/** 마이페이지 내가 만든 모임 카드 스켈레톤 */
export function CreatedCardSkeleton() {
  return (
    <div
      className={cn(
        "relative animate-pulse overflow-hidden rounded-3xl bg-slate-100",
        "md:items-upper md:flex md:min-w-[650px] md:justify-start md:gap-6 md:rounded-4xl md:p-6 md:pr-9",
      )}
      aria-label="내가 만든 모임 목록 스켈레톤"
    >
      <div className="aspect-[2.2] w-full shrink-0 animate-pulse overflow-hidden bg-slate-200 md:aspect-square md:w-[170px] md:rounded-3xl" />
      <div className="flex-2 p-4 pb-5 md:px-0 md:py-2">
        <div className="flex h-full flex-1 flex-col items-start justify-between gap-3.5 md:gap-4">
          <div className="h-8 w-[300px] animate-pulse rounded-3xl bg-slate-200" />
          <div className="flex flex-col gap-2.5">
            <div className="h-5 w-16 animate-pulse rounded-3xl bg-slate-200" />
            <div className="flex gap-2.5 divide-x divide-slate-200">
              <div className="h-5 w-25 animate-pulse rounded-3xl bg-slate-200" />
              <div className="h-5 w-25 animate-pulse rounded-3xl bg-slate-200" />
              <div className="h-5 w-25 animate-pulse rounded-3xl bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
