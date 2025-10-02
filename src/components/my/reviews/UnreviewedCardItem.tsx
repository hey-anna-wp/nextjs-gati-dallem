"use client";

import { JoinedGathering } from "@/types";
import { Card } from "../../common/Card";
import { cn } from "@/utils/classNames";

/** 마이페이지 나의 리뷰 카드 컴포넌트 */
export default function UnreviewedCardItem({
  id,
  name,
  image,
  participantCount,
  capacity,
  dateTime,
  location,
  isReviewed,
}: JoinedGathering) {
  return (
    <Card>
      <Card.Image image={image} />
      <Card.Detail>
        <div className="flex h-full flex-col items-start justify-between gap-4">
          <Card.Title id={id}>
            <div className="flex gap-1.5 md:gap-2">{name}</div>
          </Card.Title>
          <div className="flex-between w-full flex-col gap-6 md:flex-row md:gap-3">
            <Card.GatheringDetail {...{ participantCount, capacity, location, dateTime }} />
            <Card.ReviewButton isReviewed={isReviewed} />
          </div>
        </div>
      </Card.Detail>
      <Card.LikeButton />
    </Card>
  );
}

/** 마이페이지 나의 리뷰 - 작성 가능한 리뷰 카드 스켈레톤 */
export function UnreviewedCardSkeleton() {
  return (
    <div
      className={cn(
        "relative animate-pulse overflow-hidden rounded-3xl bg-slate-100",
        "md:items-upper md:flex md:min-w-[650px] md:justify-start md:gap-6 md:rounded-4xl md:p-6 md:pr-9",
      )}
      aria-label="리뷰 작성 가능한 모임 목록 스켈레톤"
    >
      <div className="aspect-[2.2] w-full shrink-0 animate-pulse overflow-hidden bg-slate-200 md:aspect-square md:w-[170px] md:rounded-3xl" />
      <div className="flex-2 p-4 pb-5 md:px-0 md:py-2">
        <div className="flex h-full flex-1 flex-col items-start justify-between gap-3.5 md:gap-4">
          <div className="h-8 w-[300px] animate-pulse rounded-3xl bg-slate-200" />
          <div className="flex-between flex-col items-center gap-6 md:w-full md:flex-row md:gap-3">
            <div className="flex flex-col gap-2.5">
              <div className="h-5 w-16 animate-pulse rounded-3xl bg-slate-200" />
              <div className="flex gap-2.5 divide-x divide-slate-200">
                <div className="h-5 w-25 animate-pulse rounded-3xl bg-slate-200" />
                <div className="h-5 w-25 animate-pulse rounded-3xl bg-slate-200" />
                <div className="h-5 w-25 animate-pulse rounded-3xl bg-slate-200" />
              </div>
            </div>
            <div className="flex-end w-full md:w-fit">
              <div className="h-11 w-[130px] animate-pulse rounded-3xl bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
