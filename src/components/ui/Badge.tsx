import { cn } from "@/lib/utils";
import React from "react";

interface BadgeProps {
  count: number;
  maxCount?: number;
  className?: string;
}

const DEFAULT_MAX_COUNT = 99;

const Badge: React.FC<BadgeProps> = ({ count, maxCount = DEFAULT_MAX_COUNT, className }) => {
  if (count <= 0) return null;

  const displayCount = count > maxCount ? `${maxCount}+` : count;

  return (
    <span
      className={cn(
        "flex-center rounded-full bg-[#5865f2] font-semibold text-white",
        "h-3 w-3 text-[10px] leading-[11px]", // 12x12px in Figma
        "md:h-4 md:w-5 md:text-xs md:leading-4", // 20x16px in Figma
        className,
      )}
    >
      {displayCount}
    </span>
  );
};

export default Badge;
