import { cn, cond } from "@/utils/classNames";
import Image from "next/image";
import { HtmlHTMLAttributes } from "react";

const CHIP_VARIANTS = {
  tag: "gap-1 pr-2 pl-1 rounded-xl bg-[rgba(255,133,224,0.2)] text-xs md:text-sm font-semibold text-pink-500",
  info: "px-2 py-0.5 rounded-xl border-1 border-slate-100 bg-white text-xs md:text-sm font-medium text-slate-500",
  active: "px-4 py-2 rounded-2xl bg-slate-700 text-base font-medium text-white",
  default: "px-4 py-2 rounded-2xl bg-slate-100 text-base font-medium text-slate-700",
  /** 이용 예정 */
  brand: "px-3 py-1.5 rounded-3xl bg-purple-100 text-sm font-semibold text-purple-600",
  /** 개설 대기 */
  tertiary:
    "px-3 py-1.5 rounded-3xl border-1 border-gray-200 bg-white text-sm font-semibold text-gray-500",
  /** 이용 완료 */
  disabled: "px-3 py-1.5 rounded-3xl bg-slate-50 text-sm font-semibold text-slate-500",
  /** 개설 확정 */
  outlined:
    "gap-0.5 pr-3 pl-2 py-1 rounded-3xl m-[1px] bg-white text-sm font-semibold text-purple-600",
};
interface ChipProps extends HtmlHTMLAttributes<HTMLDivElement> {
  /** 칩 스타일을 지정합니다 */
  variant?: keyof typeof CHIP_VARIANTS;
  /** 칩에 들어갈 내용을 작성합니다. */
  children?: React.ReactNode;
  /** 커스텀하여 적용할 스타일이 있을 시 클래스명을 작성합니다 */
  className?: string;
}
/** 필터, 모임 상태 등에서 사용하는 Chip 컴포넌트입니다. */
export default function Chip({
  variant = "default",
  className = "",
  children,
  ...props
}: ChipProps) {
  const chipClassName = cn("flex justify-center items-center", CHIP_VARIANTS[variant], className);
  return (
    <span
      className={cond(
        variant === "outlined",
        "rounded-3xl bg-linear-90 from-purple-300 to-pink-300",
      )}
      aria-label="chip area"
    >
      <div className={chipClassName} aria-label="chip content area" {...props}>
        {children}
      </div>
    </span>
  );
}
/** Chip을 활용한 Tag 컴포넌트 */
export const AlarmTag = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Chip variant="tag">
      <Image src="/icon/alarm.svg" width={24} height={24} alt="태그 아이콘 이미지" />
      <span>{children}</span>
    </Chip>
  );
};
/** 날짜, 시간 표기를 위한 컴포넌트 */
export const ChipInfo = ({ children }: { children: React.ReactNode }) => {
  return <Chip variant="info">{children}</Chip>;
};
/** 모임 이용 상태 표시를 위한 컴포넌트 */
export const CompletedChip = ({ isCompleted = false }: { isCompleted?: boolean }) => {
  return isCompleted ? (
    <Chip variant="disabled">이용 완료</Chip>
  ) : (
    <Chip variant="brand">이용 예정</Chip>
  );
};
/** 모임 개설 상태 표시를 위한 컴포넌트 */
export const ConfirmChip = ({ isConfirmed = false }: { isConfirmed?: boolean }) => {
  return isConfirmed ? (
    <Chip variant="outlined">
      <Image src="/icon/check.svg" width={24} height={24} alt="개설확정 상태표시 아이콘 이미지" />
      <span>개설확정</span>
    </Chip>
  ) : (
    <Chip variant="tertiary">개설대기</Chip>
  );
};
