import { Card } from "@/components/common/Card";
import { mockMyGathering } from "@/mocks/my/mockMyGathering";
import { mockProfile } from "@/mocks/my/mockProfile";
import { useAuthStore } from "@/store/authStore";
import { useFavoriteStore } from "@/store/favoriteStore";
import { pushSpy } from "@/test/__mocks__/next";
import { overlaySpy, resetOverlaySpy } from "@/test/__mocks__/overlay";
import { fireEvent, render, screen } from "@testing-library/react";

const mockData = mockMyGathering[0];

describe("Card 컴포넌트", () => {
  beforeEach(() => {
    pushSpy.mockClear();
    resetOverlaySpy();
  });

  describe("Card root", () => {
    test("모임 카드 렌더링 및 children 표시", () => {
      render(
        <Card gathering={mockData}>
          <div>child</div>
        </Card>,
      );

      const article = screen.getByLabelText("모임 목록 아이템");
      expect(article).toBeInTheDocument();
      expect(screen.getByText("child")).toBeInTheDocument();
    });

    test("클릭 시 router.push 호출 + cursor-pointer 클래스", () => {
      const gatheringInfo = { ...mockData, id: 123 };
      render(<Card gathering={gatheringInfo}>x</Card>);

      const section = screen.getByLabelText("모임 목록 아이템");
      expect(section).toHaveClass("cursor-pointer");

      fireEvent.click(section);
      expect(pushSpy).toHaveBeenCalledWith("/meetings/123");
    });
  });

  describe("Card.Image", () => {
    test("image prop이 없으면 placeholder div 렌더", () => {
      const gatheringInfo = { ...mockData, image: null };
      render(
        <Card gathering={gatheringInfo}>
          <Card.Image />
        </Card>,
      );
      expect(screen.getByTestId("no-card-image")).toBeInTheDocument();
    });

    test("image prop이 있으면 이미지(alt: 모임 이미지 미리보기) 렌더", () => {
      const gatheringInfo = { ...mockData, image: "/image/empty.svg" };
      render(
        <Card gathering={gatheringInfo}>
          <Card.Image />
        </Card>,
      );
      const img = screen.getByAltText("모임 이미지 미리보기");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "/image/empty.svg");
    });
  });

  describe("Card.Detail", () => {
    test("children을 그대로 출력", () => {
      render(
        <Card gathering={mockData}>
          <Card.Detail>
            <p>상세내용</p>
          </Card.Detail>
        </Card>,
      );
      expect(screen.getByText("상세내용")).toBeInTheDocument();
    });
  });

  describe("Card.Tags", () => {
    test("이용중/개설대기 표시", () => {
      const gatheringInfo = {
        ...mockData,
        isCompleted: false,
        isConfirmed: false,
        canceledAt: null,
      };
      render(
        <Card gathering={gatheringInfo}>
          <Card.Tags />
        </Card>,
      );
      expect(screen.getByText("이용 예정")).toBeInTheDocument();
      expect(screen.getByText("개설대기")).toBeInTheDocument();
    });

    test("이용완료/개설확정 표시", () => {
      const gatheringInfo = { ...mockData, isCompleted: true, isConfirmed: true, canceledAt: null };
      render(
        <Card gathering={gatheringInfo}>
          <Card.Tags />
        </Card>,
      );
      expect(screen.getByText("이용 완료")).toBeInTheDocument();
      expect(screen.getByText("개설확정")).toBeInTheDocument();
      expect(screen.queryByText("취소된 모임")).not.toBeInTheDocument();
    });

    test("취소된 모임 표시", () => {
      const gatheringInfo = { ...mockData, canceledAt: "2025-10-01T00:00:00Z" };
      render(
        <Card gathering={gatheringInfo}>
          <Card.Tags />
        </Card>,
      );
      expect(screen.getByText("취소된 모임")).toBeInTheDocument();
    });
  });

  describe("Card.Title", () => {
    test("모임명 텍스트 렌더", () => {
      render(
        <Card gathering={mockData}>
          <Card.Title>모임명</Card.Title>
        </Card>,
      );
      const card = screen.getByLabelText("모임 목록 아이템");
      expect(card).toHaveTextContent("모임명");
    });
  });

  describe("Card.GatheringDetail", () => {
    test("인원/위치/날짜/시간 표시, 날짜 포맷터 적용", () => {
      const gatheringInfo = {
        ...mockData,
        participantCount: 7,
        capacity: 12,
        location: "서울 강남",
        dateTime: "2025-10-17T12:30:00.000Z",
      };
      render(
        <Card gathering={gatheringInfo}>
          <Card.GatheringDetail />
        </Card>,
      );

      expect(screen.getByText("7/12")).toBeInTheDocument();

      expect(screen.getByText("위치")).toBeInTheDocument();
      expect(screen.getByText("서울 강남")).toBeInTheDocument();

      expect(screen.getByText("날짜")).toBeInTheDocument();
      expect(screen.getByText("10월 17일")).toBeInTheDocument();

      expect(screen.getByText("시간")).toBeInTheDocument();
      expect(screen.getByText("21:30")).toBeInTheDocument();
    });
  });

  describe("Card.LikeButton", () => {
    test("heart_inactive 아이콘 적용", () => {
      render(
        <Card gathering={mockData}>
          <Card.LikeButton />
        </Card>,
      );
      const img = screen.getByAltText("모임 찜하기 버튼 이미지");
      expect(img).toHaveAttribute("src", "/icon/heart_inactive.svg");
    });

    test("heart_active 하트 아이콘 src", () => {
      useAuthStore.setState({ user: mockProfile });
      useFavoriteStore.setState({
        favorites: { [mockProfile.id]: { count: 1, ids: [mockData.id], updatedAt: "" } },
      });
      render(
        <Card gathering={mockData}>
          <Card.LikeButton />
        </Card>,
      );
      const img = screen.getByAltText("찜한 모임 버튼 이미지");
      expect(img).toHaveAttribute("src", "/icon/heart_active.svg");
    });

    test("찜하기 기능", () => {
      useAuthStore.setState({ user: mockProfile });
      const gatheringInfo = { ...mockData, id: 20 };
      render(
        <Card gathering={gatheringInfo}>
          <Card.LikeButton />
        </Card>,
      );

      const btn = screen.getByRole("button", { name: /찜/i });
      const img = screen.getByRole("img");

      // 초기 상태: 찜 안됨
      expect(img).toHaveAttribute("src", expect.stringContaining("heart_inactive"));

      // 클릭 (찜 추가)
      fireEvent.click(btn);
      expect(img).toHaveAttribute("src", expect.stringContaining("heart_active"));
      expect(useFavoriteStore.getState().has(1, 20)).toBe(true);

      // 클릭 (찜 해제)
      fireEvent.click(btn);
      expect(img).toHaveAttribute("src", expect.stringContaining("heart_inactive"));
      expect(useFavoriteStore.getState().has(1, 20)).toBe(false);
    });
  });

  describe("Card.ReservedButton", () => {
    test("이용 예정, 리뷰 미작성 상태 - [참여 취소하기] 버튼 렌더링, 클릭 시 overlay 호출, ConfirmLeaveModal 렌더링", () => {
      const gatheringInfo = { ...mockData, id: 77, isCompleted: false, isReviewed: false };
      render(
        <Card gathering={gatheringInfo}>
          <Card.ReservedButton />
        </Card>,
      );
      const btn = screen.getByRole("button", { name: "참여 취소하기" });
      fireEvent.click(btn);

      expect(overlaySpy).toHaveBeenCalledTimes(1);
      setTimeout(
        () => expect(screen.getByText("모임 참여를 정말 취소하시겠습니까?")).toBeInTheDocument(),
        100,
      );
    });

    test("이용 완료, 리뷰 미작성 상태 - [리뷰 작성하기] 버튼 렌더링, 클릭 시 overlay 호출, ReviewCreateModal 렌더링", () => {
      const gatheringInfo = { ...mockData, id: 88, isCompleted: true, isReviewed: false };
      const { container } = render(
        <Card gathering={gatheringInfo}>
          <Card.ReservedButton />
        </Card>,
      );
      const btn = screen.getByRole("button", { name: "리뷰 작성하기" });
      fireEvent.click(btn);

      expect(overlaySpy).toHaveBeenCalledTimes(1);
      setTimeout(() => expect(screen.getByText("리뷰 쓰기")).toBeInTheDocument(), 100);
      expect(container).toBeTruthy();
    });

    test("이용 완료, 리뷰 작성 상태 - 버튼 렌더하지 않음", () => {
      const gatheringInfo = { ...mockData, id: 1, isCompleted: false, isReviewed: true };
      const { container } = render(
        <Card gathering={gatheringInfo}>
          <Card.ReservedButton />
        </Card>,
      );
      expect(screen.queryByRole("button", { name: "참여 취소하기" })).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "리뷰 작성하기" })).not.toBeInTheDocument();
      expect(container).toBeTruthy();
    });
  });

  describe("Card.ReviewButton", () => {
    test("[리뷰 작성하기] 클릭 시 overlay 호출, ReviewCreateModal 렌더링", () => {
      render(
        <Card gathering={mockData}>
          <Card.ReviewButton />
        </Card>,
      );
      const btn = screen.getByRole("button", { name: "리뷰 작성하기" });
      fireEvent.click(btn);

      expect(overlaySpy).toHaveBeenCalledTimes(1);
      setTimeout(() => expect(screen.getByText("리뷰 쓰기")).toBeInTheDocument(), 100);
    });
  });
});
