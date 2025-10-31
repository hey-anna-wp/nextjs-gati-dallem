import CreatedCardItem from "@/components/my/hosted/CreatedCardItem";
import { mockMyGathering } from "@/mocks/my/mockMyGathering";
import { pushSpy } from "@/test/__mocks__/next";
import { resetOverlaySpy } from "@/test/__mocks__/overlay";
import { fireEvent, render, screen } from "@testing-library/react";

describe("마이페이지 - 내가 만든 모임 - 내가 만든 모임 카드 컴포넌트 (CreatedCardItem)", () => {
  beforeEach(() => {
    pushSpy.mockClear();
    resetOverlaySpy();
  });

  test("기본 렌더링 테스트 (이미지/제목/인원/위치/날짜/시간)", () => {
    const mockData = mockMyGathering[0];
    render(<CreatedCardItem {...mockData} />);

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

    expect(screen.getByText("홍대입구")).toBeInTheDocument();
    expect(screen.getByText("11월 04일")).toBeInTheDocument();
    expect(screen.getByText("19:00")).toBeInTheDocument();
  });

  test("나의 모임 카드 클릭 시 router.push 호출 확인", () => {
    const mockData = mockMyGathering[0];
    render(<CreatedCardItem {...mockData} />);

    const card = screen.getByLabelText("모임 목록 아이템");
    fireEvent.click(card);
    expect(pushSpy).toHaveBeenCalledTimes(1);
  });
});
