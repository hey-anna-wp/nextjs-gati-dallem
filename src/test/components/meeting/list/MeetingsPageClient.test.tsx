import MeetingsPageClient from "@/components/meeting/list/MeetingsPageClient";
import { renderWithQueryClient } from "@/test/renderWithQueryClient";
import { screen, waitFor } from "@testing-library/react";

const mockFilters = {
  keyword: "",
  category: "all" as const,
  location: "",
  date: "",
  sort: "latest" as const,
};
const mockSetFilters = jest.fn();

jest.mock("@/hooks/meeting/useUrlFilters", () => ({
  useUrlFilters: () => [mockFilters, mockSetFilters],
}));

const mockFetchNextPage = jest.fn();
const mockInfiniteGatheringsData = {
  data: {
    pages: [
      [
        {
          id: 1,
          type: "OFFICE_STRETCHING",
          name: "테스트 모임 1",
          dateTime: "2025-12-31T10:00:00.000Z",
          registrationEnd: "2025-12-30T10:00:00.000Z",
          location: "건대입구",
          participantCount: 3,
          capacity: 10,
          image: "/test.jpg",
          createdBy: 1,
          canceledAt: null,
        },
        {
          id: 2,
          type: "MINDFULNESS",
          name: "테스트 모임 2",
          dateTime: "2025-12-31T14:00:00.000Z",
          registrationEnd: "2025-12-30T14:00:00.000Z",
          location: "홍대입구",
          participantCount: 5,
          capacity: 20,
          image: "/test2.jpg",
          createdBy: 2,
          canceledAt: null,
        },
      ],
    ],
  },
  isLoading: false,
  error: null,
  fetchNextPage: mockFetchNextPage,
  hasNextPage: false,
  isFetchingNextPage: false,
};

jest.mock("@/apis/gatherings/gatherings.query", () => ({
  useInfiniteGatherings: jest.fn(() => mockInfiniteGatheringsData),
  useJoinGathering: () => ({ mutate: jest.fn() }),
}));

const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();

global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
  observe: mockObserve,
  unobserve: mockUnobserve,
  disconnect: mockDisconnect,
  root: null,
  rootMargin: "",
  thresholds: [],
})) as any;

describe("MeetingsPageClient 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("기본 렌더링 - FilterBar와 ListGrid 표시", () => {
    renderWithQueryClient(<MeetingsPageClient />);

    // FilterBar가 렌더링되는지 확인
    expect(screen.getByText("네트워킹")).toBeInTheDocument();
    expect(screen.getByText("세미나")).toBeInTheDocument();

    // ListGrid가 렌더링되는지 확인
    expect(screen.getByText("테스트 모임 1")).toBeInTheDocument();
    expect(screen.getByText("테스트 모임 2")).toBeInTheDocument();
  });

  test("로딩 상태 표시", () => {
    const { useInfiniteGatherings } = require("@/apis/gatherings/gatherings.query");
    useInfiniteGatherings.mockReturnValueOnce({
      ...mockInfiniteGatheringsData,
      isLoading: true,
      data: undefined,
    });

    renderWithQueryClient(<MeetingsPageClient />);

    expect(screen.getByText("로딩 중...")).toBeInTheDocument();
  });

  test("에러 상태 표시", () => {
    const { useInfiniteGatherings } = require("@/apis/gatherings/gatherings.query");
    useInfiniteGatherings.mockReturnValueOnce({
      ...mockInfiniteGatheringsData,
      isLoading: false,
      error: new Error("Failed to fetch"),
      data: undefined,
    });

    renderWithQueryClient(<MeetingsPageClient />);

    expect(screen.getByText("모임 목록을 불러오는데 실패했습니다.")).toBeInTheDocument();
  });

  test("빈 목록 처리 - 모임이 없을 때", () => {
    const { useInfiniteGatherings } = require("@/apis/gatherings/gatherings.query");
    useInfiniteGatherings.mockReturnValueOnce({
      ...mockInfiniteGatheringsData,
      data: { pages: [[]] },
    });

    renderWithQueryClient(<MeetingsPageClient />);

    expect(
      screen.getByText("조건에 맞는 모임이 없습니다. 필터를 조정해 보세요."),
    ).toBeInTheDocument();
  });

  test("무한 스크롤 - IntersectionObserver 설정", async () => {
    renderWithQueryClient(<MeetingsPageClient />);

    await waitFor(() => {
      expect(mockObserve).toHaveBeenCalled();
    });
  });

  test("다음 페이지 로딩 중 표시", () => {
    const { useInfiniteGatherings } = require("@/apis/gatherings/gatherings.query");
    useInfiniteGatherings.mockReturnValueOnce({
      ...mockInfiniteGatheringsData,
      isFetchingNextPage: true,
    });

    renderWithQueryClient(<MeetingsPageClient />);

    expect(screen.getByText("더 불러오는 중...")).toBeInTheDocument();
  });
});
