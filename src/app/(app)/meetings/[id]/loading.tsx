export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto mt-10 max-w-7xl px-4">
        {/* 메인 콘텐츠 영역 스켈레톤 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* 왼쪽: 모임 이미지 스켈레톤 */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full animate-pulse overflow-hidden rounded-3xl bg-gray-200 sm:aspect-auto sm:h-full"></div>
          </div>

          {/* 오른쪽: 모임 정보 스켈레톤 */}
          <div className="space-y-6">
            {/* 모임 상세 카드 스켈레톤 */}
            <div className="relative animate-pulse overflow-hidden rounded-3xl bg-white p-6">
              <div className="space-y-4">
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                <div className="h-8 w-full rounded bg-gray-200"></div>
                <div className="h-12 w-full rounded bg-gray-200"></div>
              </div>
            </div>

            {/* 참가자 목록 스켈레톤 */}
            <div className="relative animate-pulse overflow-hidden rounded-3xl bg-white p-6">
              <div className="space-y-4">
                <div className="h-6 w-1/3 rounded bg-gray-200"></div>
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-2 w-full rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단: 리뷰 섹션 스켈레톤 */}
        <div className="mt-8">
          <div className="animate-pulse space-y-6 rounded-3xl bg-white p-12">
            <div className="h-8 w-1/4 rounded bg-gray-200"></div>
            <div className="space-y-4">
              <div className="h-20 w-full rounded bg-gray-200"></div>
              <div className="h-20 w-full rounded bg-gray-200"></div>
              <div className="h-20 w-full rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
