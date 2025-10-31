import FilterBar, { MeetingFilters } from "@/components/meeting/list/FilterBar";
import { render, screen, fireEvent } from "@testing-library/react";

describe("FilterBar 컴포넌트", () => {
  const mockOnChange = jest.fn();
  const defaultFilters: MeetingFilters = {
    keyword: "",
    category: "DALLAEMFIT",
    location: "",
    date: "",
    sort: "latest",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("대분류 탭 전환", () => {
    test("네트워킹 탭 클릭 시 category 변경", () => {
      render(
        <FilterBar
          value={{ ...defaultFilters, category: "WORKATION" }}
          onChange={mockOnChange}
        />,
      );

      const networkingTab = screen.getByText("네트워킹");
      fireEvent.click(networkingTab);

      expect(mockOnChange).toHaveBeenCalledWith({
        ...defaultFilters,
        category: "DALLAEMFIT",
      });
    });

    test("세미나 탭 클릭 시 category 변경", () => {
      render(<FilterBar value={defaultFilters} onChange={mockOnChange} />);

      const seminarTab = screen.getByText("세미나");
      fireEvent.click(seminarTab);

      expect(mockOnChange).toHaveBeenCalledWith({
        ...defaultFilters,
        category: "WORKATION",
      });
    });

    test("활성화된 탭에 스타일 적용", () => {
      render(<FilterBar value={defaultFilters} onChange={mockOnChange} />);

      const networkingTab = screen.getByText("네트워킹").closest("button");
      expect(networkingTab).toHaveClass("text-purple-500");
    });
  });

  describe("소분류 탭 전환", () => {
    test("네트워킹 선택 시 소분류 탭 표시", () => {
      render(<FilterBar value={defaultFilters} onChange={mockOnChange} />);

      expect(screen.getByText("전체")).toBeInTheDocument();
      expect(screen.getByText("개발자 모임")).toBeInTheDocument();
      expect(screen.getByText("비개발자와 함께하는 모임")).toBeInTheDocument();
    });

    test("소분류 탭 클릭 시 category 변경", () => {
      render(<FilterBar value={defaultFilters} onChange={mockOnChange} />);

      const officeStretchingTab = screen.getByText("개발자 모임");
      fireEvent.click(officeStretchingTab);

      expect(mockOnChange).toHaveBeenCalledWith({
        ...defaultFilters,
        category: "OFFICE_STRETCHING",
      });
    });

    test("활성화된 소분류 탭에 스타일 적용", () => {
      render(
        <FilterBar
          value={{ ...defaultFilters, category: "OFFICE_STRETCHING" }}
          onChange={mockOnChange}
        />,
      );

      const activeTab = screen.getByText("개발자 모임");
      expect(activeTab).toHaveClass("bg-purple-500", "text-white");
    });
  });

  describe("필터 렌더링", () => {
    test("지역, 날짜, 정렬 필터 표시", () => {
      render(<FilterBar value={defaultFilters} onChange={mockOnChange} />);

      expect(screen.getByLabelText("지역")).toBeInTheDocument();
      expect(screen.getByLabelText("날짜")).toBeInTheDocument();
      expect(screen.getByLabelText("정렬")).toBeInTheDocument();
    });

    test("날짜 선택 시 필터 값 표시", () => {
      const filtersWithDate = { ...defaultFilters, date: "2025-10-24" };
      render(<FilterBar value={filtersWithDate} onChange={mockOnChange} />);

      expect(screen.getByText("2025-10-24")).toBeInTheDocument();
    });
  });
});
