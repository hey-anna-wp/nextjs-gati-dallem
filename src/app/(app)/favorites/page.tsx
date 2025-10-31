"use client";

import { useFavoriteGatheringsQuery } from "@/apis/favorites/favorites.query";
import LoginModal from "@/components/common/LoginModal";
import FavoriteCardItem from "@/components/favorites/FavoriteCardItem";
import { EmptyFavoriteList } from "@/components/favorites/FavoriteCardList";
import FilterBar from "@/components/meeting/list/FilterBar";
import { useUrlFilters } from "@/hooks/meeting/useUrlFilters";
import { useAuthStore } from "@/store/authStore";
import { DefaultGatheringType, GatheringLocation } from "@/types";
import { cn } from "@/utils/classNames";
import Image from "next/image";

export default function FavoriteGatheringsPage() {
  const { user } = useAuthStore();
  const [filters, setFilters] = useUrlFilters();

  const userId = user?.id ?? -1;
  const { data = [] } = useFavoriteGatheringsQuery(userId, {
    type: filters.category as DefaultGatheringType | undefined,
    location: filters.location as GatheringLocation | undefined,
    date: filters.date,
    sortBy: filters.sort === "popular" ? "participantCount" : "dateTime",
    sortOrder: "desc",
  });

  if (!user) return <LoginModal />;
  return (
    <div
      className={cn(
        "grid items-start justify-stretch gap-6 md:gap-8",
        "my-8 px-4 md:my-8 md:px-6 lg:my-15 lg:p-0",
        "lg:mx-auto lg:max-w-7xl lg:gap-10",
      )}
    >
      <div className="flex items-end gap-6 md:gap-7 lg:gap-[33px]">
        <div className="relative h-14 w-[70px] shrink-0 md:h-[57px] md:w-[70px] lg:h-[91px] lg:w-[97px]">
          <Image
            className="object-contain"
            src="/image/favorite.svg"
            alt="찜한 모임 헤더 일러스트"
            fill
            priority
          />
        </div>
        <div className="grid gap-2 md:gap-4">
          <h1 className="text-lg leading-7 font-semibold text-gray-900 md:text-2xl lg:text-[32px] lg:leading-9">
            찜한 모임
          </h1>
          <p className="text-base leading-6 font-medium text-slate-400 md:text-lg md:leading-7 lg:text-xl lg:leading-7">
            마감되기 전에 지금 바로 참여해보세요 👀
          </p>
        </div>
      </div>
      <div className="grid justify-stretch gap-4 md:gap-8">
        <FilterBar value={filters} onChange={setFilters} />
        {data?.length > 0 ? (
          <div className="grid justify-stretch gap-4 lg:grid-cols-2 lg:gap-6">
            {data.map((gathering) => (
              <FavoriteCardItem key={gathering.id} {...gathering} />
            ))}
          </div>
        ) : (
          <EmptyFavoriteList />
        )}
      </div>
    </div>
  );
}
