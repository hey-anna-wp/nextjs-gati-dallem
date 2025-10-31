import { Input } from "@/components/common/Input";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Input 컴포넌트", () => {
  describe("기본 동작", () => {
    test("input 렌더링 및 placeholder 표시", () => {
      render(<Input placeholder="이메일을 입력하세요" />);

      const input = screen.getByPlaceholderText("이메일을 입력하세요");
      expect(input).toBeInTheDocument();
    });

    test("사용자 입력 시 onChange 호출", () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "새로운 값" } });

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(input).toHaveValue("새로운 값");
    });
  });

  describe("disabled 상태", () => {
    test("disabled prop 적용 시 입력 불가", () => {
      render(<Input disabled />);

      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });
  });

  describe("validation 상태", () => {
    test("state=invalid 적용 시 aria-invalid 설정", () => {
      render(<Input state="invalid" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveClass("border-red-500");
    });

    test("state=success 적용 시 성공 스타일", () => {
      render(<Input state="success" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-purple-500");
    });
  });

  describe("제어 컴포넌트", () => {
    test("value와 onChange로 제어 가능", () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState("");
        return <Input value={value} onChange={(e: any) => setValue(e.target.value)} />;
      };

      const React = require("react");
      render(<TestComponent />);

      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "테스트" } });

      expect(input).toHaveValue("테스트");
    });
  });

  describe("type 속성", () => {
    test("type=password", () => {
      render(<Input type="password" />);

      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    test("type=number", () => {
      render(<Input type="number" />);

      const input = screen.getByRole("spinbutton");
      expect(input).toHaveAttribute("type", "number");
    });
  });

  describe("size 변형", () => {
    test("size=lg 스타일 적용", () => {
      render(<Input size="lg" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("h-14");
    });
  });
});
