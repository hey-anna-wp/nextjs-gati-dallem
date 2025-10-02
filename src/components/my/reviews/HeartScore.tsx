"use client";

import Image from "next/image";

export default function HeartScore({ score }: { score: number }) {
  return (
    <div className="flex-center gap-[1px]">
      {Array(5)
        .fill(undefined)
        .map((_, idx) => (
          <div key={idx} className="relative aspect-square w-5 md:w-6">
            <Image
              className="object-fill"
              src={`/icon/heart_${score >= idx + 1 ? "active" : "inactive"}.svg`}
              alt="리뷰 평점 표시 이미지"
              fill
            />
          </div>
        ))}
    </div>
  );
}
