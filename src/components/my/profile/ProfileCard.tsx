"use client";

import { useOverlay } from "@/hooks/useOverlay";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/utils/classNames";
import Image from "next/image";
import ProfileUpdateModal from "./ProfileUpdateModal";

export default function ProfileCard() {
  const { user } = useAuthStore();
  const { overlay } = useOverlay();

  function handleClickEdit() {
    overlay(<ProfileUpdateModal />);
  }
  if (!user) return <ProfileCardSkeleton />;
  return (
    <section
      className={cn(
        "bg-gradient-purple-pink-100 rounded-3xl border-1 border-purple-300",
        "flex flex-1 items-start justify-between gap-2.5 lg:flex-col-reverse",
        "relative px-4 py-6 md:p-6 lg:pt-5 lg:pb-10",
      )}
      aria-label="프로필 영역"
    >
      <div
        className={cn(
          "flex-center gap-4 md:gap-[30px] lg:flex-col",
          "divide-x-1 divide-y-0 divide-[rgba(0,0,0,0.1)] lg:divide-x-0 lg:divide-y-1",
        )}
      >
        <div className="flex-center gap-2 pr-4 pb-0 md:pr-7 lg:w-full lg:flex-col lg:pr-0 lg:pb-7">
          <div className="relative aspect-square w-10 shrink-0 md:w-[54px] lg:w-[114px]">
            <Image src={user.image ?? "/image/profile.svg"} alt="프로필 이미지" fill priority />
          </div>
          <span className="shrink-0 text-sm font-semibold md:text-lg">{user.name}</span>
        </div>
        <ul className="flex flex-col items-start gap-2 text-sm font-medium md:text-base lg:w-full">
          <li className="flex-start gap-2">
            <span className="min-w-11 text-slate-400 lg:min-w-12">회사</span>
            <span className="text-slate-700">{user.companyName}</span>
          </li>
          <li className="flex-start gap-2">
            <span className="min-w-11 text-slate-400 lg:min-w-12">이메일</span>
            <span className="text-slate-700">{user.email}</span>
          </li>
        </ul>
      </div>
      <div className="flex-end absolute top-[-34px] right-0 md:static lg:w-full">
        <button
          className="flex-center btn relative aspect-square w-7 overflow-hidden md:w-10"
          onClick={handleClickEdit}
        >
          <Image src="/icon/edit.svg" alt="프로필 수정하기 버튼 이미지" fill />
        </button>
      </div>
    </section>
  );
}
function ProfileCardSkeleton() {
  return (
    <section
      className={cn(
        "bg-gradient-purple-pink-100 rounded-3xl border-1 border-purple-300",
        "flex flex-1 items-start justify-between gap-2.5 lg:flex-col-reverse",
        "relative min-w-[300px] px-4 py-6 md:p-6 lg:pt-5 lg:pb-10",
      )}
      aria-label="프로필 영역 스켈레톤"
    >
      <div
        className={cn(
          "flex-center w-full gap-4 md:gap-[30px] lg:flex-col",
          "divide-x-1 divide-y-0 divide-[rgba(0,0,0,0.1)] lg:divide-x-0 lg:divide-y-1",
        )}
      >
        <div className="flex-center flex-0 gap-2 pr-4 pb-0 md:pr-7 lg:w-full lg:flex-col lg:pr-0 lg:pb-7">
          <div className="relative aspect-square w-10 md:w-[54px] lg:w-[114px]">
            <Image src="/image/profile.svg" alt="프로필 이미지 스켈레톤" fill priority />
          </div>
          <div className="h-5 w-12 animate-pulse rounded-xl bg-slate-300 md:h-7" />
        </div>
        <ul className="flex flex-1 flex-col items-start gap-2 text-sm font-medium md:text-base lg:w-full">
          <li className="flex-start gap-2">
            <div className="h-5 min-w-11 animate-pulse rounded-xl bg-slate-300 md:h-6 lg:min-w-12" />
            <div className="h-5 w-40 animate-pulse rounded-xl bg-slate-300 md:h-6" />
          </li>
          <li className="flex-start gap-2">
            <div className="h-5 min-w-11 animate-pulse rounded-xl bg-slate-300 md:h-6 lg:min-w-12" />
            <div className="h-5 w-40 animate-pulse rounded-xl bg-slate-300 md:h-6" />
          </li>
        </ul>
      </div>
      <div className="flex-end absolute top-[-34px] right-0 md:static lg:w-full">
        <div className="aspect-square w-7 animate-pulse rounded-xl bg-slate-300 md:w-10" />
      </div>
    </section>
  );
}
