import Avatar from "@/components/ui/Avatar";
import Pagination from "@/components/ui/Pagination";
import { cn } from "@/lib/utils";
import type { Review, ReviewList } from "@/types";
import Image from "next/image";

// 개별 리뷰 카드 컴포넌트
interface ReviewCardProps {
  review: Review;
  isLast: boolean;
}

function ReviewCard({ review, isLast }: ReviewCardProps) {
  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Image
        key={i}
        src={i < score ? "/icon/heart_active.svg" : "/icon/heart_inactive.svg"}
        alt={i < score ? "별점 활성" : "별점 비활성"}
        width={24}
        height={24}
        className="h-6 w-6"
      />
    ));
  };

  return (
    <section
      className={cn(
        "w-full !max-w-full !min-w-0 !rounded-none !p-0",
        "hover:!shadow-none hover:!drop-shadow-none",
      )}
    >
      <div className={cn("!rounded-none !p-0", !isLast && "mb-6 border-b border-gray-200 pb-6")}>
        <div className="flex items-start gap-4">
          {/* 사용자 프로필 */}
          <Avatar
            userProfile={{
              teamId: review.User.teamId,
              id: review.User.id,
              email: "",
              name: review.User.name,
              companyName: "",
              image: review.User.image || "",
              createdAt: "",
              updatedAt: "",
            }}
            size="medium"
            className="h-10 w-10 flex-shrink-0"
          />

          {/* 사용자 정보 */}
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-600">{review.User.name}</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">{renderStars(review.score)}</div>
                <span className="text-sm text-gray-400">
                  {new Date(review.createdAt)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\./g, ".")
                    .replace(/\s/g, "")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 리뷰 내용 */}
        <p
          className={cn(
            "mt-6 mb-7 text-base leading-relaxed font-medium text-gray-700",
            isLast && "mb-0",
          )}
        >
          {review.comment}
        </p>
      </div>
    </section>
  );
}

interface ReviewSectionProps {
  // API 응답 데이터
  reviewList?: ReviewList;
  // 또는 개별 props로 전달
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
  currentPage?: number;
  totalPages?: number;
  totalItemCount?: number;

  className?: string;
  onPageChange?: (page: number) => void;
}

export default function ReviewSection({
  reviewList,
  reviews,
  currentPage = 1,
  totalPages = 9,
  totalItemCount,
  className,
  onPageChange,
}: ReviewSectionProps) {
  // ReviewList가 있으면 우선 사용, 없으면 개별 props 사용
  const displayReviews = reviewList?.data || reviews || [];
  const displayCurrentPage = reviewList?.currentPage || currentPage;
  const displayTotalPages = reviewList?.totalPages || totalPages;
  const displayTotalItemCount = reviewList?.totalItemCount || totalItemCount || 0;

  // 빈 상태 확인
  const isEmpty = displayReviews.length === 0;

  return (
    <div className={cn("", className)}>
      <h2 className="mb-8 ml-4 text-2xl font-semibold text-gray-900">리뷰 모아보기</h2>

      {/* 리뷰 목록 또는 빈 상태 */}
      {isEmpty ? (
        // 빈 상태
        <div className="flex flex-col items-center justify-center rounded-xl bg-white py-16 md:rounded-3xl">
          <div className="relative mb-6 flex h-24 w-24 items-center justify-center sm:h-32 sm:w-32">
            <Image
              src="/image/empty.svg"
              alt="리뷰가 없음"
              fill
              className="object-contain opacity-30"
            />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-400">아직 리뷰가 없어요</h3>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-white px-12 pt-10 pb-12 md:rounded-3xl">
          {displayReviews.map((review: Review, index: number) => (
            <ReviewCard
              key={review.id}
              review={review}
              isLast={index === displayReviews.length - 1}
            />
          ))}
        </div>
      )}

      {/* 페이지네이션 - 리뷰가 있을 때만 표시 */}
      {!isEmpty && (
        <Pagination
          currentPage={displayCurrentPage}
          totalPages={displayTotalPages}
          onPageChange={onPageChange || (() => {})}
          className="mt-8"
        />
      )}
    </div>
  );
}
