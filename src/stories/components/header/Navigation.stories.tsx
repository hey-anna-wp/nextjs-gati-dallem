import Navigation from "@/components/header/Navigation";
import { mockProfile } from "@/mocks/my/mockProfile";
import { useAuthStore } from "@/store/authStore";
import { useFavoriteStore } from "@/store/favoriteStore";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

useAuthStore.setState(() => ({ user: mockProfile }));
useFavoriteStore.setState(() => ({
  favorites: { [mockProfile.id]: { count: 5, ids: [], updatedAt: "" } },
}));

const meta = {
  title: "Components/Header/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Navigation 컴포넌트

헤더의 메인 네비게이션 메뉴를 담당하는 컴포넌트입니다.

## 특징
- **동적 메뉴 아이템** 지원 (items prop)
- **활성 상태 표시** (isActive 속성)
- **찜한 모임 배지** 표시 (favoriteCount)
- **반응형 디자인** 지원
- **접근성** 고려 (키보드 네비게이션)

## 사용법
\`\`\`tsx
const items = [
  { label: "모임 찾기", href: "/meetings", isActive: true },
  { label: "찜한 모임", href: "/favorites", isActive: false },
  { label: "모든 리뷰", href: "/reviews", isActive: false },
];

<Navigation items={items} favoriteCount={5} />
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 네비게이션 (모든 메뉴 비활성)
export const Default: Story = {
  args: {
    items: [
      { label: "모임 찾기", href: "/meetings", isActive: false },
      { label: "찜한 모임", href: "/favorites", isActive: false },
      { label: "모든 리뷰", href: "/reviews", isActive: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "기본 네비게이션 상태입니다. 모든 메뉴가 비활성 상태이며 찜한 모임이 없는 상태를 보여줍니다.",
      },
    },
  },
};

// 모임 찾기 활성 상태
export const MeetingsActive: Story = {
  args: {
    items: [
      { label: "모임 찾기", href: "/meetings", isActive: true },
      { label: "찜한 모임", href: "/favorites", isActive: false },
      { label: "모든 리뷰", href: "/reviews", isActive: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "'모임 찾기' 메뉴가 활성 상태인 네비게이션입니다. 활성 메뉴는 시각적으로 강조 표시됩니다.",
      },
    },
  },
};

// 찜한 모임 활성 상태 (배지 표시)
export const FavoritesActive: Story = {
  args: {
    items: [
      { label: "모임 찾기", href: "/meetings", isActive: false },
      { label: "찜한 모임", href: "/favorites", isActive: true },
      { label: "모든 리뷰", href: "/reviews", isActive: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "'찜한 모임' 메뉴가 활성 상태이며, 찜한 모임 개수가 배지로 표시됩니다.",
      },
    },
  },
};

// 리뷰 활성 상태
export const ReviewsActive: Story = {
  args: {
    items: [
      { label: "모임 찾기", href: "/meetings", isActive: false },
      { label: "찜한 모임", href: "/favorites", isActive: false },
      { label: "모든 리뷰", href: "/reviews", isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "'모든 리뷰' 메뉴가 활성 상태인 네비게이션입니다. 활성 메뉴는 시각적으로 강조 표시됩니다.",
      },
    },
  },
};
