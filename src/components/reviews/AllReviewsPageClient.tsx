"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/common/PageHeader";
import FilterBar, { MeetingFilters } from "@/components/common/FilterBar";
import ReviewsRatingSummary from "@/components/reviews/ReviewsRatingSummary";
import ReviewList from "@/components/reviews/ReviewList";
import { useInfiniteReviews, useReviewScores } from "@/apis/reviews/reviews.query";
import type { GetReviewsQuery, GetReviewScoresQuery } from "@/apis/reviews/reviews.schema";

export default function AllReviewsPageClient() {
  const [filters, setFilters] = useState<MeetingFilters>({
    keyword: "",
    category: "DALLAEMFIT",
    location: "",
    date: "",
    sort: "latest",
  });

  // API 호출을 위한 쿼리 파라미터 변환
  const getQueryParams = () => {
    const params: GetReviewsQuery = {
      limit: 20,
    };

    // 카테고리 필터 (API 스키마에 맞게 type으로 변경)
    if (filters.category && filters.category !== "all") {
      params.type = filters.category;
    }

    // 위치 필터 (API 스키마에 정의된 enum 값만 허용)
    const allowedLocations = ["건대입구", "을지로3가", "신림", "홍대입구"] as const;
    if (filters.location && (allowedLocations as readonly string[]).includes(filters.location)) {
      params.location = filters.location as (typeof allowedLocations)[number];
    }

    // 날짜 필터
    if (filters.date) {
      params.date = filters.date;
    }

    // 정렬 (API 스키마에 맞게 수정)
    const sortConfig = {
      latest: { sortBy: "createdAt", sortOrder: "desc" },
      popular: { sortBy: "participantCount", sortOrder: "desc" },
      closing: { sortBy: "createdAt", sortOrder: "asc" }, // registrationEnd는 정렬 필드가 아니므로 createdAt으로 대체
    } as const;

    if (filters.sort && sortConfig[filters.sort]) {
      const { sortBy, sortOrder } = sortConfig[filters.sort];
      params.sortBy = sortBy;
      params.sortOrder = sortOrder;
    }

    return params;
  };

  // 무한 스크롤 쿼리
  const {
    data: infiniteData,
    isLoading: reviewsLoading,
    error: reviewsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteReviews(getQueryParams());

  // 평점 요약을 위한 쿼리 (지역 필터가 없을 때만 서버에서 가져옴)
  const queryParams = getQueryParams();

  // 지역 필터가 있으면 서버 API를 사용하지 않음 (scores API는 location을 받지 않음)
  const hasLocationFilter = filters.location && filters.location !== "";

  // scores API 스키마에 맞게 파라미터 축소(type, gatheringId CSV)
  const scoresQuery: GetReviewScoresQuery | undefined = hasLocationFilter
    ? undefined
    : (() => {
        const q: GetReviewScoresQuery = {};
        if (queryParams.type) q.type = queryParams.type;
        // gatheringId가 필요하다면 CSV string으로 변환 필요. 현재는 사용하지 않음.
        return q;
      })();

  const {
    data: ratingScores,
    isLoading: scoresLoading,
    error: scoresError,
  } = useReviewScores(scoresQuery, {
    enabled: !hasLocationFilter,
  });

  // 리뷰 데이터 (무한 스크롤에서 모든 페이지 데이터 합치기)
  const reviews = infiniteData?.pages.flatMap((page) => page.data) || [];

  // 지역 필터 적용된 리뷰
  const filteredReviews = hasLocationFilter
    ? reviews.filter((r) => r.Gathering?.location === filters.location)
    : reviews;

  // 전체 로딩 상태 (첫 페이지 로딩 중일 때만)
  const isInitialLoading = reviewsLoading && reviews.length === 0;

  // 필터 변경 중인지 확인 (이전 데이터가 있으면 필터 변경 중)
  const isFilterChanging = reviewsLoading && reviews.length > 0;

  // 필터 변경 핸들러
  const handleFilterChange = (newFilters: MeetingFilters) => {
    setFilters(newFilters);
  };

  // 무한 스크롤을 위한 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const loadMoreElement = document.getElementById("load-more-trigger");
    if (loadMoreElement) {
      observer.observe(loadMoreElement);
    }

    return () => {
      if (loadMoreElement) {
        observer.unobserve(loadMoreElement);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 평점 요약 데이터 변환 (지역 필터가 있으면 클라이언트 계산, 없으면 서버 데이터 사용)
  const ratingSummary = (() => {
    // 지역 필터가 있으면 클라이언트에서 계산
    if (hasLocationFilter) {
      if (filteredReviews.length > 0) {
        const scores = filteredReviews
          .map((review) => review.score)
          .filter((score) => score != null);
        const totalReviews = scores.length;

        if (totalReviews === 0) {
          return {
            averageScore: 0,
            totalReviews: 0,
            scoreBreakdown: [
              { score: 5, count: 0 },
              { score: 4, count: 0 },
              { score: 3, count: 0 },
              { score: 2, count: 0 },
              { score: 1, count: 0 },
            ],
          };
        }

        const averageScore = scores.reduce((sum, score) => sum + score, 0) / totalReviews;

        const scoreBreakdown = [1, 2, 3, 4, 5].map((score) => {
          const count = scores.filter((s) => s === score).length;
          return { score, count };
        });

        return {
          averageScore: Math.round(averageScore * 10) / 10,
          totalReviews,
          scoreBreakdown,
        };
      }

      // 리뷰가 없으면 0으로 표시
      return {
        averageScore: 0,
        totalReviews: 0,
        scoreBreakdown: [
          { score: 5, count: 0 },
          { score: 4, count: 0 },
          { score: 3, count: 0 },
          { score: 2, count: 0 },
          { score: 1, count: 0 },
        ],
      };
    }

    // 지역 필터가 없으면 서버에서 받은 필터된 평점 데이터 사용
    if (!hasLocationFilter && ratingScores && ratingScores.length > 0) {
      const firstScore = ratingScores[0];
      const totalReviews = firstScore
        ? firstScore.oneStar +
          firstScore.twoStars +
          firstScore.threeStars +
          firstScore.fourStars +
          firstScore.fiveStars
        : 0;
      const averageScore = firstScore ? firstScore.averageScore : 0;

      const scoreBreakdown = [1, 2, 3, 4, 5].map((score) => {
        const firstScore = ratingScores[0];
        if (!firstScore) return { score, count: 0 };

        const count =
          score === 1
            ? firstScore.oneStar
            : score === 2
              ? firstScore.twoStars
              : score === 3
                ? firstScore.threeStars
                : score === 4
                  ? firstScore.fourStars
                  : score === 5
                    ? firstScore.fiveStars
                    : 0;

        return { score, count };
      });

      return {
        averageScore: Math.round(averageScore * 10) / 10,
        totalReviews,
        scoreBreakdown,
      };
    }

    // API 데이터가 없으면 0으로 표시
    return {
      averageScore: 0,
      totalReviews: 0,
      scoreBreakdown: [
        { score: 5, count: 0 },
        { score: 4, count: 0 },
        { score: 3, count: 0 },
        { score: 2, count: 0 },
        { score: 1, count: 0 },
      ],
    };
  })();

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header Section */}
      <PageHeader
        imageSrc="/image/empty.svg"
        imageAlt="리뷰 헤더 일러스트"
        title="모든 리뷰"
        description="같이달램을 이용자들은 이렇게 느꼈어요 🫶"
      />

      {/* Filter Bar */}
      <FilterBar value={filters} onChange={handleFilterChange} />

      {/* Rating Summary */}
      <div className="mt-4 md:mt-8">
        <ReviewsRatingSummary
          averageScore={ratingSummary.averageScore}
          totalReviews={ratingSummary.totalReviews}
          scoreBreakdown={ratingSummary.scoreBreakdown}
        />
        {isInitialLoading && (
          <div className="mt-2 flex justify-center">
            <div className="text-sm text-gray-500">평점을 계산하는 중...</div>
          </div>
        )}
      </div>

      {/* Reviews List / Empty State */}
      <div className="relative mt-6 lg:mt-8">
        {isInitialLoading ? (
          <div className="flex justify-center py-12">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
              <span className="text-gray-500">리뷰를 불러오는 중...</span>
            </div>
          </div>
        ) : reviewsError ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-2 text-lg font-medium text-red-500">
              리뷰를 불러오는데 실패했습니다
            </div>
            <div className="text-sm text-gray-500">잠시 후 다시 시도해주세요</div>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-2 text-lg font-medium text-gray-400">아직 리뷰가 없습니다</div>
            <div className="text-sm text-gray-500">첫 번째 리뷰를 작성해보세요!</div>
          </div>
        ) : (
          <>
            <ReviewList reviews={filteredReviews} />
            {hasNextPage && (
              <div id="load-more-trigger" className="mt-8 flex justify-center">
                {isFetchingNextPage ? (
                  <div className="text-gray-500">더 많은 리뷰를 불러오는 중...</div>
                ) : (
                  <div className="text-sm text-gray-400">스크롤하여 더 보기</div>
                )}
              </div>
            )}
          </>
        )}

        {/* 필터 변경 중 오버레이 */}
        {isFilterChanging && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm">
            <div className="rounded-lg bg-white px-4 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
                <span className="text-sm text-gray-600">필터 적용 중...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
