import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showPageNumbers?: number; // 표시할 페이지 번호 개수 (기본값: 5)
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showPageNumbers = 5,
}: PaginationProps) {
  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const half = Math.floor(showPageNumbers / 2);

    if (totalPages <= showPageNumbers) {
      // 전체 페이지가 표시할 개수보다 적으면 모든 페이지 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 시작 페이지 계산
      let startPage = Math.max(1, currentPage - half);
      let endPage = Math.min(totalPages, startPage + showPageNumbers - 1);

      // 끝 페이지가 마지막 페이지에 가까우면 시작 페이지 조정
      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - showPageNumbers + 1);
      }

      // 시작 페이지가 1이 아니면 첫 페이지와 생략 표시 추가
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      // 중간 페이지들
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // 끝 페이지가 마지막 페이지가 아니면 생략 표시와 마지막 페이지 추가
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {/* 이전 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft className="h-5 w-5 text-gray-400" />
      </button>

      {/* 페이지 번호들 */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <div key={`dots-${index}`} className="flex items-center gap-1">
                <div className="h-1 w-1 rounded-full bg-gray-400"></div>
                <div className="h-1 w-1 rounded-full bg-gray-400"></div>
                <div className="h-1 w-1 rounded-full bg-gray-400"></div>
              </div>
            );
          }

          const pageNum = page as number;
          const isCurrentPage = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-lg font-semibold transition-colors",
                isCurrentPage ? "bg-purple-100 text-purple-600" : "text-gray-400 hover:bg-gray-50",
              )}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  );
}
