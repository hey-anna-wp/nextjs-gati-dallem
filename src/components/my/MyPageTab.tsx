"use client";

import { cn, cond } from "@/utils/classNames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyPageTab() {
  const pathname = usePathname();
  const isMain = pathname?.endsWith("/bookings");
  const isReviews = pathname?.endsWith("/reviews");
  const isHosted = pathname?.endsWith("/hosted");

  const listItemClassName = "flex-center h-10 w-[114px] md:h-[62px] md:w-[159px]";
  const activeItemClassName = "border-b-2 border-b-purple-500 text-slate-800";
  return (
    <nav className="flex-1 border-b-1 border-b-slate-200 text-sm font-semibold text-slate-500 md:text-lg">
      <ul className="flex-start">
        <li className={cn(listItemClassName, cond(isMain, activeItemClassName))}>
          <Link href="/my/bookings">나의 모임</Link>
        </li>
        <li className={cn(listItemClassName, cond(isReviews, activeItemClassName))}>
          <Link href="/my/reviews">나의 리뷰</Link>
        </li>
        <li className={cn(listItemClassName, cond(isHosted, activeItemClassName))}>
          <Link href="/my/hosted">내가 만든 모임</Link>
        </li>
      </ul>
    </nav>
  );
}
