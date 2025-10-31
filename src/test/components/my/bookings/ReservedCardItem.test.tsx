import ReservedCardItem from "@/components/my/bookings/ReservedCardItem";
import { mockJoinedGathering } from "@/mocks/my/mockJoinedGathering";
import { pushSpy } from "@/test/__mocks__/next";
import { overlaySpy, resetOverlaySpy } from "@/test/__mocks__/overlay";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("@/components/ui/Chip", () => {
  const Chip = ({ children, variant }: any) => (
    <span data-testid="chip" data-variant={variant}>
      {children}
    </span>
  );
  const CompletedChip = ({ isCompleted }: { isCompleted: boolean }) => (
    <span data-testid="completed-chip">{isCompleted ? "이용완료" : "이용예정"}</span>
  );
  const ConfirmChip = ({ isConfirmed }: { isConfirmed: boolean }) => (
    <span data-testid="confirm-chip">{isConfirmed ? "개설확정" : "개설대기"}</span>
  );
  return { __esModule: true, default: Chip, CompletedChip, ConfirmChip };
});

describe("마이페이지 - 나의 모임 - 나의 모임 카드 컴포넌트 (ReservedCardItem)", () => {
  describe("나의 모임 카드 컴포넌트 렌더링 - CCP 조립 통합 테스트", () => {
    beforeEach(() => {
      +pushSpy.mockClear();
      resetOverlaySpy();
    });

    test("기본 렌더링 테스트 (이미지/제목/인원/위치/날짜/시간)", () => {
      const mockData = mockJoinedGathering[0];
      render(<ReservedCardItem {...mockData} />);

      expect(screen.getByLabelText("모임 목록 아이템")).toBeInTheDocument();

      const img = screen.getByAltText("모임 이미지 미리보기") as HTMLImageElement;
      expect(img).toHaveAttribute("src", mockData.image);

      expect(screen.getByText(mockData.name)).toBeInTheDocument();
      expect(
        screen.getByText(`${mockData.participantCount}/${mockData.capacity}`),
      ).toBeInTheDocument();

      expect(screen.getByText("홍대입구")).toBeInTheDocument();
      expect(screen.getByText("11월 04일")).toBeInTheDocument();
      expect(screen.getByText("19:00")).toBeInTheDocument();
    });

    test("이용예정/개설대기 상태 - [참여 취소하기] 렌더링", () => {
      const mockData = mockJoinedGathering[0];
      render(<ReservedCardItem {...mockData} />);

      const cancelBtn = screen.getByRole("button", { name: "참여 취소하기" });
      fireEvent.click(cancelBtn);

      expect(overlaySpy).toHaveBeenCalledTimes(1);
      const element = overlaySpy.mock.calls[0][0];
      expect(element).toBeTruthy();
    });

    test("취소된 모임 상태", () => {
      const canceledAt = "2025-10-10T00:00:00.000Z";
      const mockData = { ...mockJoinedGathering[0], canceledAt };
      render(<ReservedCardItem {...mockData} />);

      expect(screen.getByTestId("chip")).toHaveTextContent("취소된 모임");
      expect(screen.queryByTestId("completed-chip")).not.toBeInTheDocument();
      expect(screen.queryByTestId("confirm-chip")).not.toBeInTheDocument();
    });

    test("이용예정/개설확정 상태", () => {
      const mockData = { ...mockJoinedGathering[0], participantCount: 5 };
      render(<ReservedCardItem {...mockData} />);

      expect(screen.getByTestId("completed-chip")).toHaveTextContent("이용예정");
      expect(screen.getByTestId("confirm-chip")).toHaveTextContent("개설확정");
      expect(screen.queryByText("취소된 모임")).not.toBeInTheDocument();

      const cancelBtn = screen.getByRole("button", { name: "참여 취소하기" });
      fireEvent.click(cancelBtn);

      expect(overlaySpy).toHaveBeenCalledTimes(1);
    });

    test("이용완료/개설대기 상태", () => {
      const mockData = mockJoinedGathering[1];
      render(<ReservedCardItem {...mockData} />);

      expect(screen.getByTestId("completed-chip")).toHaveTextContent("이용완료");
      // 이용완료 상태면 무조건 개설확정 표시
      expect(screen.getByTestId("confirm-chip")).toHaveTextContent("개설확정");
      expect(screen.queryByText("취소된 모임")).not.toBeInTheDocument();
    });

    test("이용완료 상태 - 리뷰 미작성 시 [리뷰 작성하기] 렌더링", () => {
      const mockData = { ...mockJoinedGathering[1], participantCount: 5 };
      render(<ReservedCardItem {...mockData} />);

      expect(screen.getByTestId("completed-chip")).toHaveTextContent("이용완료");
      expect(screen.getByTestId("confirm-chip")).toHaveTextContent("개설확정");

      const reviewBtn = screen.getByRole("button", { name: "리뷰 작성하기" });
      fireEvent.click(reviewBtn);

      expect(overlaySpy).toHaveBeenCalledTimes(1);
    });

    test("이용완료 상태 - 리뷰 작성 시 버튼 미렌더링", () => {
      const mockData = mockJoinedGathering[2];
      render(<ReservedCardItem {...mockData} />);

      expect(screen.queryByRole("button", { name: "리뷰 작성하기" })).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "참여 취소하기" })).not.toBeInTheDocument();
    });

    test("모임 카드 클릭 시 router.push 호출 확인", () => {
      const mockData = mockJoinedGathering[2];
      render(<ReservedCardItem {...mockData} />);

      const card = screen.getByLabelText("모임 목록 아이템");
      fireEvent.click(card);
      expect(pushSpy).toHaveBeenCalledTimes(1);
    });
  });
});
