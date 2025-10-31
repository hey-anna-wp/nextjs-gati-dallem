import CreateMeetingModal from "@/components/meeting/create/CreateMeetingModal";
import { closeSpy, resetCloseSpy } from "@/test/__mocks__/overlay";
import { renderWithQueryClient } from "@/test/renderWithQueryClient";
import { screen, fireEvent } from "@testing-library/react";

const mockMutateAsync = jest.fn();
jest.mock("@/apis/gatherings/gatherings.query", () => ({
  useCreateGathering: () => ({
    mutateAsync: mockMutateAsync,
  }),
}));

describe("CreateMeetingModal 컴포넌트", () => {
  beforeEach(() => {
    resetCloseSpy();
    mockMutateAsync.mockResolvedValue({ id: 1 });
  });

  describe("모달 렌더링", () => {
    test("모달과 Wizard 초기 상태 표시", () => {
      renderWithQueryClient(<CreateMeetingModal />);

      expect(screen.getByLabelText("모달 영역")).toBeInTheDocument();
      expect(screen.getByText("모임 만들기 1/3")).toBeInTheDocument();
    });
  });

  describe("모달 닫기 동작", () => {
    test("헤더 닫기 버튼 클릭 시 close 호출", () => {
      renderWithQueryClient(<CreateMeetingModal />);

      const closeButton = screen.getByLabelText("모달 닫기");
      fireEvent.click(closeButton);

      expect(closeSpy).toHaveBeenCalled();
    });

    test("취소 버튼 클릭 시 close 호출", () => {
      renderWithQueryClient(<CreateMeetingModal />);

      const cancelButton = screen.getByRole("button", { name: "취소" });
      fireEvent.click(cancelButton);

      expect(closeSpy).toHaveBeenCalled();
    });
  });
});
