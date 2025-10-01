import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "@/components/ui/Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/UI/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1 },
      description: "현재 페이지 번호",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "전체 페이지 수",
    },
    showPageNumbers: {
      control: { type: "number", min: 3, max: 10 },
      description: "표시할 페이지 번호 개수",
    },
    onPageChange: {
      action: "page changed",
      description: "페이지 변경 시 호출되는 콜백 함수",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 페이지네이션
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

// 중간 페이지
export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

// 마지막 페이지
export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

// 많은 페이지 (생략 표시)
export const ManyPages: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

// 많은 페이지 - 시작 부분
export const ManyPagesStart: Story = {
  args: {
    currentPage: 2,
    totalPages: 20,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

// 많은 페이지 - 끝 부분
export const ManyPagesEnd: Story = {
  args: {
    currentPage: 19,
    totalPages: 20,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

// 매우 많은 페이지
export const VeryManyPages: Story = {
  args: {
    currentPage: 50,
    totalPages: 100,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

// 페이지 번호 개수 조정
export const CustomPageNumbers: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    showPageNumbers: 7,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

// 단일 페이지
export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

// 두 페이지
export const TwoPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 2,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};
