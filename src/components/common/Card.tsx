"use client";

import { useFavoriteToggle } from "@/apis/favorites/favorites.query";
import { useFavorites } from "@/hooks/favorites/useFavorites";
import { useOverlay } from "@/hooks/useOverlay";
import { useAuthStore } from "@/store/authStore";
import { Gathering, JoinedGathering } from "@/types";
import { cn, cond } from "@/utils/classNames";
import { formatDateAndTime } from "@/utils/datetime";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createContext, HTMLAttributes, useContext } from "react";
import ConfirmLeaveModal from "../my/bookings/ConfirmLeaveModal";
import ReviewCreateModal from "../my/reviews/modal/ReviewCreateModal";
import Chip, { CompletedChip, ConfirmChip } from "../ui/Chip";
import { Button } from "./Button";
import LoginModal from "./LoginModal";

interface CardCtxProps extends Gathering {
  isCompleted?: boolean;
  isReviewed?: boolean;
}
const CardCtx = createContext<CardCtxProps | null>(null);

export const useCardCtx = () => {
  const v = useContext(CardCtx);
  if (!v) throw new Error("Card.Root 내부에서만 사용하세요");
  return v;
};

interface CardProps extends HTMLAttributes<HTMLElement> {
  gathering: Gathering | JoinedGathering;
  className?: string;
  children?: React.ReactNode;
}

/**
 * CCP로 직접 구현하는 모임 카드 컴포넌트
 */
export function Card({ gathering, className, children }: CardProps) {
  const router = useRouter();
  const meetingId = gathering?.id;

  function handleClickCard() {
    if (meetingId) router.push(`/meetings/${meetingId}`);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.currentTarget !== e.target) return;
    if (meetingId && (e.key === "Enter" || e.key === " " || e.key === "Spacebar")) {
      e.preventDefault();
      router.push(`/meetings/${meetingId}`);
    }
  }
  return (
    <CardCtx.Provider value={gathering}>
      <section
        aria-label="모임 목록 아이템"
        role="region"
        tabIndex={meetingId ? 0 : -1} // 키보드 포커스 허용
        className={cn(
          "relative overflow-hidden rounded-3xl bg-white hover:drop-shadow-sm",
          "md:items-upper md:flex md:justify-start md:gap-6 md:rounded-4xl md:p-6 md:pr-9",
          cond(!!meetingId, "cursor-pointer"),
          className,
        )}
        onClick={handleClickCard}
        onKeyDown={handleKeyDown}
      >
        {children}
      </section>
    </CardCtx.Provider>
  );
}

/** 모임 이미지 영역 */
function CardImage() {
  const { image } = useCardCtx();
  return (
    <div className="border-slate-120 relative aspect-[2.2] shrink-0 overflow-hidden border md:aspect-square md:w-[170px] md:rounded-3xl">
      {image ? (
        <Image
          className="object-cover"
          src={image}
          alt="모임 이미지 미리보기"
          fill
          sizes="(min-width: 768px) 200px, 100vw"
          priority
        />
      ) : (
        <div className="flex-center h-full w-full bg-gray-100" data-testid="no-card-image">
          <Image src="/image/empty.svg" alt="모임 이미지 썸네일" width={100} height={100} />
        </div>
      )}
    </div>
  );
}
Card.Image = CardImage;

/** 모임 상세 정보 영역 */
function CardDetail({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div className={cn("bg-white p-4 pb-5 md:px-0 md:py-2", className)}>{children}</div>;
}
Card.Detail = CardDetail;

/** 모임 상태 칩 모음 (이용상태, 개설상태) */
function CardTags() {
  const { participantCount, isCompleted, canceledAt } = useCardCtx();
  const isConfirmed = isCompleted || participantCount >= 5;

  return isCompleted || canceledAt === null ? (
    <div className="flex-start gap-2">
      <CompletedChip isCompleted={isCompleted} />
      <ConfirmChip isConfirmed={isConfirmed} />
    </div>
  ) : (
    <div className="flex-start">
      <Chip variant="disabled">취소된 모임</Chip>
    </div>
  );
}
Card.Tags = CardTags;

/** 모임명 영역 */
function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn("text-xl font-semibold break-all text-ellipsis", className)}>{children}</h3>
  );
}
Card.Title = CardTitle;

/** 모임 상세정보 (인원, 위치, 날짜, 시간) */
function CardGatheringDetail() {
  const { participantCount, capacity, location, dateTime } = useCardCtx();
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
function CardLikeButton() {
  const { user } = useAuthStore();
  const { overlay } = useOverlay();
  const { id: gatheringId, canceledAt } = useCardCtx();

  const fav = useFavorites(user?.id);
  const { mutate } = useFavoriteToggle(user?.id, gatheringId);
  const handleLoginModal = () => overlay(<LoginModal />);

  const isLiked = user ? !!fav.isLiked?.(gatheringId) : false;
  const toggleLike = user ? () => mutate() : handleLoginModal;
  if (canceledAt) return null;

  function handleClickLike(e: React.MouseEvent) {
    e.stopPropagation();
    toggleLike();
  }

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      animate={{ scale: 1, transition: { duration: 0.2 } }}
      onClick={handleClickLike}
      aria-label={isLiked ? "찜 취소" : "찜하기"}
      className="flex-center absolute top-4 right-4 h-12 w-12 cursor-pointer rounded-full border bg-white shadow-sm hover:shadow-md"
    >
      <Image
        src={isLiked ? "/icon/heart_active.svg" : "/icon/heart_inactive.svg"}
        alt={isLiked ? "찜한 모임 버튼 이미지" : "모임 찜하기 버튼 이미지"}
        width={24}
        height={24}
      />
    </motion.button>
  );
}
Card.LikeButton = CardLikeButton;

/** 나의 모임 카드 버튼 */
function CardReservedButton() {
  const { id, isCompleted = false, isReviewed = false } = useCardCtx();
  const { overlay } = useOverlay();

  function handleWriteReview(e: React.MouseEvent) {
    e.stopPropagation();
    overlay(<ReviewCreateModal id={id} />);
  }

  function handleCancel(e: React.MouseEvent) {
    e.stopPropagation();
    overlay(<ConfirmLeaveModal id={id} />);
  }

  return isReviewed ? (
    <></>
  ) : (
    <div className="flex-end w-full md:min-w-fit">
      {isCompleted ? (
        <Button
          variant="primary"
          className="btn rounded-2xl px-6 py-2.5 text-base font-bold"
          onClick={handleWriteReview}
        >
          리뷰 작성하기
        </Button>
      ) : (
        <Button
          variant="outline"
          className="btn rounded-2xl px-6 py-2.5 text-base font-semibold hover:bg-purple-300"
          onClick={handleCancel}
        >
          참여 취소하기
        </Button>
      )}
    </div>
  );
}
Card.ReservedButton = CardReservedButton;

/** 나의 리뷰 카드 버튼 */
function CardReviewButton() {
  const { id } = useCardCtx();
  const { overlay } = useOverlay();

  function handleWriteReview(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    overlay(<ReviewCreateModal id={id} />);
  }

  return (
    <div className="flex-end w-full md:w-fit">
      <Button
        variant="primary"
        className="btn rounded-2xl px-6 py-2.5 text-base font-bold"
        onClick={handleWriteReview}
      >
        리뷰 작성하기
      </Button>
    </div>
  );
}
Card.ReviewButton = CardReviewButton;
