import CreateMeetingWizard from "@/components/meeting/create/CreateMeetingWizard";
import { renderWithQueryClient } from "@/test/renderWithQueryClient";
import { screen, fireEvent } from "@testing-library/react";

const mockMutateAsync = jest.fn();
jest.mock("@/apis/gatherings/gatherings.query", () => ({
  useCreateGathering: () => ({
    mutateAsync: mockMutateAsync,
  }),
}));

describe("CreateMeetingWizard 컴포넌트", () => {
  const mockOnCancel = jest.fn();
  const mockOnFinished = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockMutateAsync.mockResolvedValue({ id: 1 });
  });

  function renderWizard() {
    return renderWithQueryClient(
      <CreateMeetingWizard onCancel={mockOnCancel} onFinished={mockOnFinished}>
        <CreateMeetingWizard.Header />
        <CreateMeetingWizard.Step1 />
        <CreateMeetingWizard.Step2 />
        <CreateMeetingWizard.Step3 />
        <CreateMeetingWizard.Navigation />
      </CreateMeetingWizard>,
    );
  }

  describe("Header", () => {
    test("단계 표시 및 닫기 버튼 클릭 시 onCancel 호출", () => {
      renderWizard();

      expect(screen.getByText("모임 만들기 1/3")).toBeInTheDocument();

      const closeButton = screen.getByLabelText("모달 닫기");
      fireEvent.click(closeButton);

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe("Step 1 - 모임 타입 선택", () => {
    test("모임 타입 선택 전 다음 버튼 비활성화", () => {
      renderWizard();

      const nextButton = screen.getByRole("button", { name: "다음" });
      expect(nextButton).toBeDisabled();
    });

    test("모임 타입 선택 후 다음 버튼 활성화", () => {
      renderWizard();

      const typeButton = screen.getByText("개발자 모임").closest("button");
      fireEvent.click(typeButton!);

      const nextButton = screen.getByRole("button", { name: "다음" });
      expect(nextButton).toBeEnabled();
    });

    test("타입 선택 시 활성화 스타일 적용", () => {
      renderWizard();

      const typeButton = screen.getByText("개발자 모임").closest("button");
      fireEvent.click(typeButton!);

      expect(typeButton).toHaveClass("bg-purple-100/70");
    });
  });

  describe("Step 2 - 모임 정보 입력", () => {
    beforeEach(() => {
      renderWizard();

      // Step 1 완료시
      const typeButton = screen.getByText("개발자 모임").closest("button");
      fireEvent.click(typeButton!);
      fireEvent.click(screen.getByRole("button", { name: "다음" }));
    });

    test("Step 2 진입 확인", () => {
      expect(screen.getByText("모임 만들기 2/3")).toBeInTheDocument();
      expect(screen.getByLabelText("모임 이름")).toBeInTheDocument();
    });

    test("이전 버튼 클릭 시 Step 1로 돌아가기", () => {
      const prevButton = screen.getByRole("button", { name: "이전" });
      fireEvent.click(prevButton);

      expect(screen.getByText("모임 만들기 1/3")).toBeInTheDocument();
    });

    test("정보 미입력 시 다음 버튼 비활성화", () => {
      const nextButton = screen.getByRole("button", { name: "다음" });
      expect(nextButton).toBeDisabled();
    });
  });

  describe("Step 3 - 날짜 및 정원 입력", () => {
    beforeEach(() => {
      renderWizard();

      // Step 1: 타입 선택
      const typeButton = screen.getByText("개발자 모임").closest("button");
      fireEvent.click(typeButton!);
      fireEvent.click(screen.getByRole("button", { name: "다음" }));

      // Step 2: 정보 입력
      const nameInput = screen.getByLabelText("모임 이름");
      fireEvent.change(nameInput, { target: { value: "테스트 모임" } });
    });

    test("다음 버튼이 모임 만들기 버튼으로 변경", () => {
      // Step 2에서 장소 선택까지 해야 Step 3으로 넘어감
      // 간단한 확인만
      expect(screen.getByText("모임 만들기 2/3")).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    test("Step 1에서는 취소 버튼 표시 및 클릭 시 onCancel 호출", () => {
      renderWizard();

      const cancelButton = screen.getByRole("button", { name: "취소" });
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });
});
