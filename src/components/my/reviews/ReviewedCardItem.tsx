"use client";

import { GatheringMapper, Review } from "@/types";
import { cn } from "@/utils/classNames";
import { formatDate } from "@/utils/datetime";
import Image from "next/image";
import Link from "next/link";
import HeartScore from "./HeartScore";

export default function ReviewedCardItem({ Gathering, User, score, createdAt, comment }: Review) {
  return (
    <div className="flex items-start justify-start gap-4 pb-6">
      {Gathering.image && (
        <div className="relative hidden aspect-square w-20 shrink-0 overflow-hidden rounded-xl border-1 border-slate-100 md:block md:w-[160px] md:rounded-3xl">
          <Image
            className="object-cover"
            src={Gathering.image}
            alt="모임 이미지"
            fill
            sizes="80px, (min-width: 768px) 160px"
          />
        </div>
      )}
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex-start gap-3">
            <Image
              src={User.image || "/image/profile.svg"}
              alt="모임 이미지"
              width={40}
              height={40}
            />
            <div className="grid gap-1">
              <div className="text-sm font-medium text-slate-600">{User.name}</div>
              <div className="flex-start gap-2">
                <HeartScore score={score} />
                <div className="text-sm text-slate-500">{formatDate(createdAt)}</div>
              </div>
            </div>
          </div>
          <div className="flex-start max-w-full gap-2 overflow-hidden text-sm font-medium text-slate-500">
            <div className="ml-0.5 h-4 w-[3px] bg-slate-200" />
            <Link
              href={`/meetings/${Gathering.id}`}
              className={cn(
                "flex-start gap-0.5 overflow-hidden text-sm font-medium whitespace-nowrap text-slate-500",
              )}
            >
              <span>{GatheringMapper[Gathering.type]}</span>
              <span>·</span>
              <span className="truncate">{Gathering.name}</span>
            </Link>
          </div>
        </div>
        <div className="grow-1">
          {comment.split("\n").map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className="flex animate-pulse items-start justify-start gap-4 pb-6">
      <div className="hidden aspect-square w-20 rounded-xl bg-slate-100 md:block md:w-[160px] md:rounded-3xl" />
      <div className="grid w-full gap-4">
        <div className="grid gap-2">
          <div className="flex-start gap-3">
            <div className="aspect-square w-10 rounded-full bg-slate-100" />
            <div className="grid gap-1">
              <div className="h-5 w-17 rounded-xl bg-slate-100" />
              <div className="flex-start gap-2">
                <div className="h-5 w-25.5 rounded-xl bg-slate-100 md:h-6 md:w-31" />
                <div className="h-5 w-17 rounded-xl bg-slate-100" />
              </div>
            </div>
          </div>
          <div className="flex-start max-w-full gap-2 overflow-hidden text-sm font-medium text-slate-500">
            <div className="ml-0.5 h-4 w-[3px] bg-slate-200" />
            <div className="flex-start gap-1">
              <div className="h-5 w-17 rounded-xl bg-slate-100" />
              <span className="text-slate-300">·</span>
              <div className="h-5 w-17 rounded-xl bg-slate-100" />
            </div>
          </div>
        </div>
        <div className="grid w-full gap-2">
          <div className="h-5 w-full rounded-xl bg-slate-100" />
          <div className="h-5 w-full rounded-xl bg-slate-100" />
          <div className="h-5 w-17 rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
