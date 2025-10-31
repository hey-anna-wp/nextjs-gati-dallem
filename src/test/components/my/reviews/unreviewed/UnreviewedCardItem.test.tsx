import UnreviewedCardItem from "@/components/my/reviews/unreviewed/UnreviewedCardItem";
import { mockUnreviewed } from "@/mocks/my/mockMyReview";
import { pushSpy } from "@/test/__mocks__/next";
import { overlaySpy, resetOverlaySpy } from "@/test/__mocks__/overlay";
import { formatDateAndTime } from "@/utils/datetime";
import { fireEvent, render, screen } from "@testing-library/react";

describe("마이페이지 - 나의 리뷰 - 작성 가능한 리뷰 카드 컴포넌트 (UnreviewedCardItem)", () => {
  const mockData = mockUnreviewed[0];

  beforeEach(() => {
    pushSpy.mockClear();
    resetOverlaySpy();
    render(<UnreviewedCardItem {...mockData} />);
  });

  test("기본 렌더링 테스트 (아티클/이미지/제목/인원/위치/날짜/시간)", () => {
    const card = screen.getByLabelText("모임 목록 아이템");
    expect(card).toBeInTheDocument();

    fireEvent.click(card);
    expect(pushSpy).toHaveBeenCalledTimes(1);

    const img = screen.getByAltText("모임 이미지 미리보기") as HTMLImageElement;
    expect(img).toHaveAttribute("src", mockData.image);

    expect(screen.getByText(mockData.name)).toBeInTheDocument();

    expect(
      screen.getByText(`${mockData.participantCount}/${mockData.capacity}`),
    ).toBeInTheDocument();

    expect(screen.getByText(mockData.location)).toBeInTheDocument();

    const [date, time] = formatDateAndTime(mockData.dateTime);
    expect(screen.getByText(date)).toBeInTheDocument();
    expect(screen.getByText(time)).toBeInTheDocument();
  });

  test("[리뷰 작성하기] 버튼 클릭 - useOverlay().overlay() 호출", () => {
    const btn = screen.getByRole("button", { name: "리뷰 작성하기" });
    fireEvent.click(btn);

    expect(pushSpy).toHaveBeenCalledTimes(0);
    expect(overlaySpy).toHaveBeenCalledTimes(1);
    expect(overlaySpy.mock.calls[0][0]).toBeTruthy();
  });
});
