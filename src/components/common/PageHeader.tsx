"use client";

import Image from "next/image";

interface PageHeaderProps {
  /** 헤더 이미지 경로 */
  imageSrc: string;
  /** 헤더 이미지 alt 텍스트 */
  imageAlt: string;
  /** 페이지 제목 */
  title: string;
  /** 페이지 설명 */
  description: string;
  /** 이미지 크기 클래스 (기본값: h-14 w-[70px] md:h-[57px] md:w-[70px] lg:h-[91px] lg:w-[97px]) */
  imageSize?: string;
}

export default function PageHeader({
  imageSrc,
  imageAlt,
  title,
  description,
  imageSize = "h-14 w-[70px] md:h-[57px] md:w-[70px] lg:h-[91px] lg:w-[97px]",
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-end gap-6 md:gap-7 lg:mb-8 lg:gap-[33px]">
      <div className={`relative ${imageSize} flex-shrink-0`}>
        <Image src={imageSrc} alt={imageAlt} fill className="object-contain" />
      </div>
      <div className="flex flex-col gap-2 md:gap-4">
        <h1 className="text-lg leading-7 font-semibold text-gray-900 md:text-2xl lg:text-[32px] lg:leading-9">
          {title}
        </h1>
        <p className="text-base leading-6 font-medium text-slate-400 md:text-lg md:leading-7 lg:text-xl lg:leading-7">
          {description}
        </p>
      </div>
    </div>
  );
}
