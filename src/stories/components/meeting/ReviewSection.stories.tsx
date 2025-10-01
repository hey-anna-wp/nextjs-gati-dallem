import type { Meta, StoryObj } from "@storybook/react";
import ReviewSection from "@/components/meeting/ReviewSection";
import type { Review, ReviewList } from "@/types";

const meta: Meta<typeof ReviewSection> = {
  title: "Components/Meeting/ReviewSection",
  component: ReviewSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    reviewList: {
      description: "API 응답 데이터 (ReviewList)",
    },
    reviews: {
      description: "개별 리뷰 배열",
    },
    averageRating: {
      control: { type: "number", min: 0, max: 5, step: 0.1 },
      description: "평균 평점",
    },
    totalReviews: {
      control: { type: "number", min: 0 },
      description: "총 리뷰 수",
    },
    currentPage: {
      control: { type: "number", min: 1 },
      description: "현재 페이지",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "전체 페이지 수",
    },
    totalItemCount: {
      control: { type: "number", min: 0 },
      description: "전체 아이템 수",
    },
    onPageChange: {
      action: "page changed",
      description: "페이지 변경 시 호출되는 콜백 함수",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 (Mock 데이터 사용)
export const Default: Story = {
  args: {
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

// API 응답 데이터 사용
export const WithApiData: Story = {
  args: {
    reviewList: {
      data: [
        {
          teamId: "team-1",
          id: 1,
          score: 5,
          comment: "정말 좋은 경험이었습니다! 강추합니다.",
          createdAt: "2024-01-25T10:30:00.000Z",
          Gathering: {
            teamId: "team-1",
            id: 1,
            type: "DALLAEMFIT",
            name: "달램핏 클래스",
            dateTime: "2024-01-25T10:00:00.000Z",
            location: "건대입구",
            image: "/image/profile.svg",
          },
          User: { teamId: "team-1", id: 1, name: "김철수", image: "/avatars/male.svg" },
        },
        {
          teamId: "team-1",
          id: 2,
          score: 4,
          comment: "만족스러운 수업이었어요.",
          createdAt: "2024-01-24T15:20:00.000Z",
          Gathering: {
            teamId: "team-1",
            id: 1,
            type: "DALLAEMFIT",
            name: "달램핏 클래스",
            dateTime: "2024-01-25T10:00:00.000Z",
            location: "건대입구",
            image: "/image/profile.svg",
          },
          User: { teamId: "team-1", id: 2, name: "이영희", image: "/avatars/female.svg" },
        },
      ],
      totalItemCount: 25,
      currentPage: 1,
      totalPages: 3,
    },
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

// 개별 props 사용
export const WithIndividualProps: Story = {
  args: {
    reviews: [
      {
        teamId: "team-1",
        id: 1,
        score: 5,
        comment: "최고의 경험이었습니다!",
        createdAt: "2024-01-25T10:30:00.000Z",
        Gathering: {
          teamId: "team-1",
          id: 1,
          type: "DALLAEMFIT",
          name: "달램핏 클래스",
          dateTime: "2024-01-25T10:00:00.000Z",
          location: "건대입구",
          image: "/image/profile.svg",
        },
        User: { teamId: "team-1", id: 1, name: "박민수", image: "/avatars/male.svg" },
      },
    ],
    averageRating: 4.5,
    totalReviews: 15,
    currentPage: 2,
    totalPages: 5,
    totalItemCount: 15,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

// 페이지네이션 없는 버전
export const WithoutPagination: Story = {
  args: {
    reviews: [
      {
        teamId: "team-1",
        id: 1,
        score: 5,
        comment: "페이지네이션이 없는 버전입니다.",
        createdAt: "2024-01-25T10:30:00.000Z",
        Gathering: {
          teamId: "team-1",
          id: 1,
          type: "DALLAEMFIT",
          name: "달램핏 클래스",
          dateTime: "2024-01-25T10:00:00.000Z",
          location: "건대입구",
          image: "/image/profile.svg",
        },
        User: { teamId: "team-1", id: 1, name: "정수진", image: "/avatars/female.svg" },
      },
    ],
    // onPageChange가 없으면 페이지네이션이 표시되지 않음
  },
};

// 많은 페이지
export const ManyPages: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

// 마지막 페이지
export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

// 첫 페이지
export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 8,
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
