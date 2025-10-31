import { cn } from "@/utils/classNames";
import { formatDateAndTime, getDeadlineText } from "@/utils/datetime";
import Image from "next/image";
import { AlarmTag, ChipInfo } from "../ui/Chip";

interface GatheringTimeInfoProps {
  dateTime: string;
  registrationEnd?: string;
  showOnlyMobile?: boolean;
}

export function GatheringTimeInfo({
  dateTime,
  registrationEnd,
  showOnlyMobile = false,
}: GatheringTimeInfoProps) {
  const [date, time] = formatDateAndTime(dateTime);
  const deadlineText = getDeadlineText(registrationEnd);
  return (
    <div
      className={cn(
        "shrink-0 items-center gap-2 overflow-hidden",
        showOnlyMobile ? "flex md:hidden" : "hidden md:flex",
      )}
    >
      <ChipInfo>{date}</ChipInfo>
      <ChipInfo>{time}</ChipInfo>
      {deadlineText && <AlarmTag>{deadlineText}</AlarmTag>}
    </div>
  );
}

interface GatheringCapacityGraphProps {
  participantCount: number;
  capacity: number;
}

export function GatheringCapacityGraph({
  participantCount,
  capacity,
}: GatheringCapacityGraphProps) {
  const participantPercentage = (participantCount / capacity) * 100;
  return (
    <div className="flex-center gap-2">
      <Image src="/icon/person.svg" width={16} height={16} alt="인원" />
      <div className="h-1.5 min-w-28 flex-1 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full bg-linear-to-r from-purple-400 via-purple-500 to-pink-400 transition-all"
          style={{ width: `${Math.min(participantPercentage, 100)}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-700">
        {participantCount}/{capacity}
      </span>
    </div>
  );
}
