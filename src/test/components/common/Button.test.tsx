import { Button } from "@/components/common/Button";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Button 컴포넌트", () => {
  describe("기본 동작", () => {
    test("버튼 렌더링 및 클릭 이벤트 호출", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>클릭</Button>);

      const button = screen.getByRole("button", { name: "클릭" });
      expect(button).toBeInTheDocument();

      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("disabled 상태에서는 클릭 불가", () => {
      const handleClick = jest.fn();
      render(
        <Button onClick={handleClick} disabled>
          비활성화
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();

      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("로딩 상태", () => {
    test("isLoading일 때 스피너 표시 및 aria-busy 설정", () => {
      render(<Button isLoading>로딩 중</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-busy", "true");

      const spinner = button.querySelector(".animate-spin");
      expect(spinner).toBeInTheDocument();
    });

    test("isLoading일 때 아이콘 표시 안 함", () => {
      render(
        <Button isLoading leftIcon={<span>←</span>}>
          로딩
        </Button>,
      );

      expect(screen.queryByText("←")).not.toBeInTheDocument();
    });
  });

  describe("아이콘 표시", () => {
    test("leftIcon 렌더링", () => {
      render(<Button leftIcon={<span data-testid="left-icon">←</span>}>이전</Button>);

      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    });

    test("rightIcon 렌더링", () => {
      render(<Button rightIcon={<span data-testid="right-icon">→</span>}>다음</Button>);

      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });
  });

  describe("variant 스타일", () => {
    test("primary 버튼 (기본값)", () => {
      render(<Button>Primary</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-[var(--color-purple-500)]");
    });

    test("outline 버튼", () => {
      render(<Button variant="outline">Outline</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("border");
    });
  });
});
