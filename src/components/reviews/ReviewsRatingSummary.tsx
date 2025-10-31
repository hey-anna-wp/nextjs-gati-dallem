import Image from "next/image";

interface ScoreBarProps {
  label: string;
  count: number;
  total: number;
  isHighlighted?: boolean;
}

function ScoreBar({ label, count, total, isHighlighted = false }: ScoreBarProps) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="flex items-center gap-2 md:gap-2">
      <span
        className={`text-xs leading-4 font-semibold md:text-base md:leading-6 ${
          isHighlighted ? "text-purple-600" : "text-slate-500"
        }`}
      >
        {label}
      </span>
      <div className="relative h-1.5 flex-1 overflow-hidden rounded-md bg-gray-200 md:h-2">
        {percentage > 0 && (
          <div
            className="absolute top-0 left-0 h-full rounded-md bg-gradient-to-r from-purple-400 to-pink-400 transition-all"
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
      <span
        className={`text-xs leading-4 font-semibold md:text-base md:leading-6 ${
          isHighlighted ? "text-purple-600" : "text-slate-500"
        }`}
      >
        {count}
      </span>
    </div>
  );
}

interface ReviewsRatingSummaryProps {
  averageScore?: number;
  totalReviews?: number;
  scoreBreakdown?: { score: number; count: number }[];
}

export default function ReviewsRatingSummary({
  averageScore = 4.0,
  totalReviews = 32,
  scoreBreakdown = [
    { score: 5, count: 27 },
    { score: 4, count: 4 },
    { score: 3, count: 1 },
    { score: 2, count: 0 },
    { score: 1, count: 0 },
  ],
}: ReviewsRatingSummaryProps) {
  const filledHearts = Math.floor(averageScore);

  return (
    <div className="rounded-3xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6 md:rounded-[32px] md:px-6 md:py-10 lg:px-[151px] lg:py-[41px]">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-6 lg:gap-[142px]">
        {/* Left: Average Score */}
        <div className="flex flex-col items-center gap-2 md:gap-3">
          <div className="flex flex-col items-center gap-2 md:gap-3">
            <div className="flex items-start gap-1.5">
              <div className="text-[28px] leading-9 font-bold text-gray-900 md:text-[40px] md:leading-9">
                {averageScore.toFixed(1)}
              </div>
              <div className="flex items-center pt-3">
                <span className="text-sm leading-6 font-normal text-slate-500 md:text-base">
                  (총 {totalReviews}명 참여)
                </span>
              </div>
            </div>
            <div className="flex items-start gap-0.5 md:gap-[2px]">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="relative h-6 w-6 md:h-[38px] md:w-[38px]">
                  <Image
                    src={`/icon/heart_${i <= filledHearts ? "active" : "inactive"}.svg`}
                    alt={`${i}번째 하트`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden h-[141px] w-px bg-purple-200 md:block" />

        {/* Right: Score Breakdown */}
        <div className="w-full space-y-2 md:w-[337px]">
          {scoreBreakdown.map((item, index) => (
            <ScoreBar
              key={`score-${item.score}-${index}`}
              label={`${item.score}점`}
              count={item.count}
              total={totalReviews}
              isHighlighted={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
