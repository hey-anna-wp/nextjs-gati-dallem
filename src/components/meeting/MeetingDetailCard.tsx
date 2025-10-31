import { cn } from "@/lib/utils";
import { Gathering } from "@/types/gathering";
import Chip, { ChipInfo } from "@/components/ui/Chip";
import { Button } from "@/components/common/Button";
import Image from "next/image";
import { Card } from "@/components/common/Card";
import { useState } from "react";
import { formatDateAndTime } from "@/utils/datetime";

interface MeetingDetailCardProps {
  gathering: Gathering;
  isJoined?: boolean;
  isFavorite?: boolean;
  isHost?: boolean; // 주최자 여부
  onJoin?: () => void;
  onLeave?: () => void;
  onToggleFavorite?: () => void;
  onShare?: () => void;
  className?: string;
}

export default function MeetingDetailCard({
  gathering,
  isJoined = false,
  isFavorite = false,
  isHost = false,
  onJoin,
  onLeave,
  onToggleFavorite,
  onShare,
  className,
}: MeetingDetailCardProps) {
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const [date, time] = formatDateAndTime(gathering.dateTime);
  const isRegistrationEnded =
    gathering.registrationEnd && new Date(gathering.registrationEnd) < new Date();
  const isFullCapacity = gathering.participantCount >= gathering.capacity;
  const isConfirmed = gathering.participantCount >= 5; // 최소 5명 이상이면 개설확정
  const isCanceled = gathering.canceledAt !== null; // 모임이 취소되었는지 확인

  const handleJoin = async () => {
    if (onJoin) {
      setIsJoining(true);
      try {
        await onJoin();
      } finally {
        setIsJoining(false);
      }
    }
  };

  const handleLeave = async () => {
    if (onLeave) {
      setIsLeaving(true);
      try {
        await onLeave();
      } finally {
        setIsLeaving(false);
      }
    }
  };

  const handleToggleFavorite = () => {
    onToggleFavorite?.();
  };

  const handleShare = () => {
    onShare?.();
  };

  return (
    <Card gathering={gathering} className={cn("w-full !max-w-full !min-w-0 !flex-none", className)}>
      <Card.Detail className="flex-between flex h-full flex-col gap-6 p-3">
        {/* 상단 태그와 마감 정보 */}
        <div className="flex-between w-full">
          <div className="flex-start gap-2">
            {/* 마감 알림 태그 */}
            {isCanceled ? (
              <div className="flex-start gap-2 rounded-lg bg-red-50 px-3 py-1.5">
                <span className="text-sm font-semibold text-red-600">모임 취소</span>
              </div>
            ) : isRegistrationEnded ? (
              <div className="flex-start gap-2 rounded-lg bg-pink-50 px-3 py-1.5">
                <span className="text-sm font-semibold text-pink-600">신청 마감</span>
              </div>
            ) : (
              <Chip variant="tag">오늘 21시 마감</Chip>
            )}

            {/* 날짜/시간 칩 */}
            <ChipInfo>{date}</ChipInfo>
            <ChipInfo>{time}</ChipInfo>
          </div>

          {/* 주최자 크라운 아이콘 (주최자일 때만 표시) */}
          {isHost && (
            <div className="flex h-8 w-8 items-center justify-center">
              <Image
                src="/icon/crown.svg"
                alt="주최자"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </div>
          )}
        </div>

        {/* 모임 제목과 위치 */}
        <div className="w-full">
          <h1 className="mb-4 text-3xl font-semibold text-gray-900">{gathering.name}</h1>
          <div className="flex-start gap-2">
            <span className="text-sm font-medium text-gray-500">위치</span>
            <span className="text-gray-600">{gathering.location}</span>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex-start w-full gap-4">
          {/* 찜하기 버튼 */}
          <Button
            onClick={handleToggleFavorite}
            variant="ghost"
            size="icon"
            className="h-10 w-10 p-0 sm:h-12 sm:w-12 md:h-15 md:w-15"
          >
            <Image
              src={isFavorite ? "/icon/save_active.svg" : "/icon/save_inactive.svg"}
              alt={isFavorite ? "찜하기 취소" : "찜하기"}
              width={20}
              height={20}
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-[60px] md:w-[60px]"
            />
          </Button>

          {/* 주최자인 경우 */}
          {isHost ? (
            <>
              {/* 모임 취소 버튼 (주최자용) */}
              <Button
                onClick={handleLeave}
                disabled={isLeaving}
                isLoading={isLeaving}
                variant="outline"
                size="lg"
                className="h-12 flex-1 border-2 border-purple-200 text-base font-medium text-purple-600 hover:border-purple-300 hover:bg-purple-50"
              >
                {isLeaving ? "취소 중..." : "취소하기"}
              </Button>

              {/* 공유하기 버튼 */}
              <Button
                onClick={handleShare}
                variant="primary"
                size="lg"
                className="h-12 flex-1 text-base font-bold"
              >
                공유하기
              </Button>
            </>
          ) : (
            <>
              {/* 참여/참여 취소 버튼 (참가자용) */}
              {isCanceled ? (
                <Button
                  disabled={true}
                  variant="gray"
                  size="lg"
                  className="h-12 flex-1 rounded-xl text-base font-bold md:rounded-2xl"
                >
                  모임 취소됨
                </Button>
              ) : isJoined ? (
                <Button
                  onClick={handleLeave}
                  disabled={isLeaving || !!isRegistrationEnded}
                  isLoading={isLeaving}
                  variant="outline"
                  size="lg"
                  className="h-12 flex-1 rounded-xl border-2 border-purple-200 text-base font-medium text-purple-600 hover:border-purple-300 hover:bg-purple-50 md:rounded-2xl"
                >
                  {isLeaving ? "취소 중..." : isRegistrationEnded ? "신청 마감" : "참여 취소하기"}
                </Button>
              ) : (
                <Button
                  onClick={handleJoin}
                  disabled={isJoining || !!isRegistrationEnded || isFullCapacity}
                  isLoading={isJoining}
                  variant={isRegistrationEnded || isFullCapacity ? "gray" : "primary"}
                  size="lg"
                  className="h-12 flex-1 rounded-xl text-base font-bold md:rounded-2xl"
                >
                  {isJoining
                    ? "참여 중..."
                    : isRegistrationEnded
                      ? "신청 마감"
                      : isFullCapacity
                        ? "정원 마감"
                        : "참여하기"}
                </Button>
              )}
            </>
          )}
        </div>
      </Card.Detail>
    </Card>
  );
}
