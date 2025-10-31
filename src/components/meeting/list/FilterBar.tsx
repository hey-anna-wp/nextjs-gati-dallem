"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/Calendar";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import { GatheringMapper } from "@/types/gathering";

export interface MeetingFilters {
  keyword: string;
  category: "all" | "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
  location: string; // 장소
  date: string; // YYYY-MM-DD
  sort: "latest" | "popular" | "closing";
}

interface FilterBarProps {
  value: MeetingFilters;
  onChange: (next: MeetingFilters) => void;
  className?: string;
}

export default function FilterBar({ value, onChange, className }: FilterBarProps) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value.date ? new Date(value.date) : undefined,
  );

  const set = <K extends keyof MeetingFilters>(k: K, v: MeetingFilters[K]) =>
    onChange({ ...value, [k]: v });

  // 대분류 탭 (네트워킹, 세미나)
  const mainTabs = useMemo(
    () => [
      { key: "DALLAEMFIT", label: "네트워킹", emoji: "💻" },
      { key: "WORKATION", label: "세미나", emoji: "💼" },
    ],
    [],
  );

  // 소분류 탭
  const subTabs = useMemo(() => {
    if (
      value.category === "DALLAEMFIT" ||
      value.category === "OFFICE_STRETCHING" ||
      value.category === "MINDFULNESS"
    ) {
      return [
        { key: "DALLAEMFIT", label: "전체" },
        { key: "OFFICE_STRETCHING", label: GatheringMapper.OFFICE_STRETCHING },
        { key: "MINDFULNESS", label: GatheringMapper.MINDFULNESS },
      ];
    } else if (value.category === "WORKATION") {
      return [{ key: "WORKATION", label: GatheringMapper.WORKATION }];
    }
    return [];
  }, [value.category]);

  // 장소 옵션
  const locationOptions = ["건대입구", "을지로3가", "신림", "홍대입구"];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleDateApply = () => {
    if (selectedDate) {
      set("date", format(selectedDate, "yyyy-MM-dd"));
    }
    setDatePickerOpen(false);
  };

  const handleDateReset = () => {
    setSelectedDate(undefined);
    set("date", "");
    setDatePickerOpen(false);
  };

  return (
    <div className={cn("space-y-4 md:space-y-8", className)}>
      {/* 대분류 탭 */}
      <div className="flex items-center border-b border-gray-200">
        {mainTabs.map((t) => {
          const isActive =
            (t.key === "DALLAEMFIT" &&
              (value.category === "DALLAEMFIT" ||
                value.category === "OFFICE_STRETCHING" ||
                value.category === "MINDFULNESS")) ||
            value.category === t.key;

          return (
            <button
              key={t.key}
              onClick={() => {
                set("category", t.key as MeetingFilters["category"]);
              }}
              className={cn(
                "relative flex flex-1 items-center justify-center gap-1.5 px-4 py-3 text-base font-semibold transition-colors",
                "md:flex-initial md:gap-2 md:px-8 md:py-4 md:text-lg",
                isActive ? "text-purple-500" : "text-gray-600 hover:text-gray-900",
              )}
            >
              <span className="text-xl md:text-2xl">{t.emoji}</span>
              <span>{t.label}</span>
              {isActive && <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-purple-500" />}
            </button>
          );
        })}
      </div>

      {/* 소분류 탭 + 필터 */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
        {/* 왼쪽: 소분류 탭 */}
        {subTabs.length > 0 && (
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto scrollbar-hide">
            {subTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => set("category", tab.key as MeetingFilters["category"])}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium whitespace-nowrap transition-all",
                  value.category === tab.key
                    ? "bg-purple-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* 오른쪽: 필터 */}
        <div className="flex flex-shrink-0 items-center gap-3 md:gap-4 text-sm">
          {/* 지역 필터 */}
          <Select
            value={value.location || "all"}
            onValueChange={(v) => set("location", v === "all" ? "" : v)}
          >
            <SelectTrigger aria-label="지역" className="w-auto border-none">
              <SelectValue placeholder="지역 전체" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">지역 전체</SelectItem>
              {locationOptions.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 날짜 필터  */}
          <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
            <PopoverTrigger asChild>
              <div>
                <Select value={selectedDate ? "selected" : "all"} open={false}>
                  <SelectTrigger aria-label="날짜" className="w-auto border-none">
                    {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "날짜 전체"}
                  </SelectTrigger>
                </Select>
              </div>
            </PopoverTrigger>
            <PopoverContent className="z-50 w-auto overflow-hidden rounded-xl p-0" align="center">
              <div className="flex flex-col bg-white">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  locale={ko}
                  formatters={{
                    formatWeekdayName: (date: Date) => format(date, "EEEEE", { locale: ko }),
                  }}
                />
                <div className="flex gap-2 p-3">
                  <button
                    onClick={handleDateReset}
                    className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    초기화
                  </button>
                  <button
                    onClick={handleDateApply}
                    className="flex-1 rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-600"
                  >
                    적용
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* 정렬 */}
          <Select
            value={value.sort}
            onValueChange={(v) => set("sort", v as MeetingFilters["sort"])}
          >
            <SelectTrigger aria-label="정렬" className="w-auto border-none">
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">마감임박</SelectItem>
              <SelectItem value="popular">참여인원순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
