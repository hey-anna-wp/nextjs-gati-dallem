"use client";

import { cn } from "@/utils/classNames";
import { formatDateAndTime } from "@/utils/datetime";
import Image from "next/image";
import Link from "next/link";
import { CompletedChip, ConfirmChip } from "../ui/Chip";

/**
 * CCP로 직접 구현하는 모임 카드 컴포넌트
 */
export function Card({ children }: { children?: React.ReactNode }) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-3xl bg-white hover:drop-shadow-sm",
        "md:items-upper md:flex md:min-w-[650px] md:justify-start md:gap-6 md:rounded-4xl md:p-6 md:pr-9",
      )}
      aria-label="모임 목록 아이템"
    >
      {children}
    </article>
  );
}

/** 모임 이미지 영역 */
function CardImage({ image }: { image?: string }) {
  return (
    <div className="border-slate-120 relative aspect-[2.2] overflow-hidden border-1 md:aspect-square md:w-[170px] md:rounded-3xl">
      {image ? (
        <Image className="object-cover" src={image} alt="모임 이미지 미리보기" fill />
      ) : (
        <div className="h-full w-full bg-gray-200" />
      )}
    </div>
  );
}
Card.Image = CardImage;

/** 모임 상세 정보 영역 */
function CardDetail({ children }: { children?: React.ReactNode }) {
  return <div className="flex-2 bg-white p-4 pb-5 md:px-0 md:py-2">{children}</div>;
}
Card.Detail = CardDetail;

/** 모임 상태 칩 모음 (이용상태, 개설상태) */
function CardTags({
  isCompleted = false,
  isConfirmed = false,
}: {
  isCompleted?: boolean;
  isConfirmed?: boolean;
}) {
  return (
    <div className="flex-start gap-2">
      <CompletedChip isCompleted={isCompleted} />
      <ConfirmChip isConfirmed={isConfirmed} />
    </div>
  );
}
Card.Tags = CardTags;

/** 모임명 영역 */
function CardTitle({ id, children }: { id: number; children: React.ReactNode }) {
  return (
    <Link href={`/meetings/${id}`} className="text-xl font-semibold break-all text-ellipsis">
      {children}
    </Link>
  );
}
Card.Title = CardTitle;

/** 모임 상세정보 (인원, 위치, 날짜, 시간) */
function CardGatheringDetail({
  participantCount = 0,
  capacity = 0,
  location,
  dateTime,
}: {
  participantCount?: number;
  capacity?: number;
  location: string;
  dateTime: string;
}) {
  const [date, time] = formatDateAndTime(dateTime);
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex-start gap-1 text-sm font-medium">
        <Image src="/icon/person.svg" width={16} height={16} alt="모임 이용인원 정보 아이콘" />
        {participantCount}/{capacity}
      </div>
      <ul className="flex gap-2.5 divide-x divide-slate-200 text-sm font-medium">
        <li className="flex gap-2.5 pr-2.5">
          <span className="text-slate-400">위치</span>
          <span className="text-slate-500">{location}</span>
        </li>
        <li className="flex gap-2.5 pr-2.5">
          <span className="text-slate-400">날짜</span>
          <span className="text-slate-500">{date}</span>
        </li>
        <li className="flex gap-2.5 pr-2.5">
          <span className="text-slate-400">시간</span>
          <span className="text-slate-500">{time}</span>
        </li>
      </ul>
    </div>
  );
}
Card.GatheringDetail = CardGatheringDetail;

/** 모임 찜하기 버튼 */
function CardLikeButton({ isLiked = false }: { isLiked?: boolean }) {
  function handleLikeGathering() {
    // TODO
  }
  return (
    <button
      className={cn(
        "border-color-gray-200 md:border-color-slate-100 flex-center h-12 w-12 rounded-full border-1 bg-white",
        "absolute top-4 right-4 md:top-6 md:right-8",
      )}
      onClick={handleLikeGathering}
    >
      {isLiked ? (
        <Image src="/icon/heart_active.svg" alt="모임 찜하기 버튼 이미지" width={24} height={24} />
      ) : (
        <Image
          src="/icon/heart_inactive.svg"
          alt="모임 찜하기 버튼 이미지"
          width={24}
          height={24}
        />
      )}
    </button>
  );
}
Card.LikeButton = CardLikeButton;

/** 나의 모임 카드 버튼 */
function CardReservedButton({
  isCompleted = false,
  isReviewed = false,
}: {
  isCompleted?: boolean;
  isReviewed?: boolean;
}) {
  function handleCancel() {
    // TODO
  }
  function handleWriteReview() {
    // TODO
  }

  return (
    <div className="flex-end w-full md:w-fit">
      {!isCompleted ? (
        <button
          className="rounded-2xl border-1 border-purple-500 px-6 py-2.5 text-base font-semibold text-purple-500"
          onClick={handleCancel}
        >
          예약 취소하기
        </button>
      ) : !isReviewed ? (
        <button
          className="rounded-2xl bg-purple-100 px-6 py-2.5 text-base font-bold text-purple-500"
          onClick={handleWriteReview}
        >
          리뷰 작성하기
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
Card.ReservedButton = CardReservedButton;

/** 나의 리뷰 카드 버튼 */
function CardReviewButton({ isReviewed = false }: { isReviewed?: boolean }) {
  function handleWriteReview() {
    // TODO
  }
  return (
    <div className="flex-end w-full md:w-fit">
      {!isReviewed ? (
        <button
          className="rounded-2xl bg-purple-100 px-6 py-2.5 text-base font-bold text-purple-500"
          onClick={handleWriteReview}
        >
          리뷰 작성하기
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
Card.ReviewButton = CardReviewButton;
