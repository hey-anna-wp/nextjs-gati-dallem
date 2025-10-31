import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Badge from "@/components/ui/Badge";

const meta = {
  title: "Components/UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Badge 컴포넌트

숫자나 알림을 표시하는 작은 배지 컴포넌트입니다.

## 특징
- **숫자 표시**: 알림 개수나 카운트를 시각적으로 표시
- **크기 옵션**: small, large 두 가지 크기 지원
- **최대값 제한**: maxCount를 초과하면 "99+" 형태로 표시
- **반응형 디자인**: 다양한 화면 크기에 적응
- **커스터마이징**: className prop으로 추가 스타일 적용 가능

## 사용법
\`\`\`tsx
// 기본 배지
<Badge count={5} />

// 큰 배지
<Badge count={25} size="large" />

// 최대값 제한
<Badge count={150} maxCount={99} />
\`\`\`

## 사용 사례
- 네비게이션 메뉴의 알림 개수 표시
- 찜한 모임 개수 표시
- 메시지나 알림의 개수 표시
        `,
      },
    },
  },
  argTypes: {
    count: {
      control: { type: "number", min: 0, max: 200 },
      description: "배지에 표시할 숫자. 0 이상의 정수를 입력할 수 있습니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    maxCount: {
      control: { type: "number", min: 1, max: 999 },
      description: "최대 표시 숫자. 이 값을 초과하면 '99+' 형태로 표시됩니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "99" },
      },
    },
    className: {
      control: { type: "text" },
      description:
        "추가 CSS 클래스. Tailwind CSS 클래스를 사용하여 스타일을 커스터마이징할 수 있습니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 배지 (작은 크기)
export const Default: Story = {
  args: {
    count: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "기본 배지입니다. 작은 크기로 알림 개수나 카운트를 표시합니다.",
      },
    },
  },
};

// 0개 (배지 숨김)
export const Zero: Story = {
  args: {
    count: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "카운트가 0일 때의 배지입니다. 알림이 없을 때는 배지가 숨겨집니다.",
      },
    },
  },
};

// 1개
export const One: Story = {
  args: {
    count: 1,
  },
  parameters: {
    docs: {
      description: {
        story: "카운트가 1일 때의 배지입니다. 단일 알림이나 아이템을 표시할 때 사용합니다.",
      },
    },
  },
};

// 99개 (최대 표시)
export const MaxDisplay: Story = {
  args: {
    count: 99,
  },
  parameters: {
    docs: {
      description: {
        story: "최대 표시 가능한 숫자(99)의 배지입니다. 이 값까지는 정확한 숫자가 표시됩니다.",
      },
    },
  },
};

// 100개 (99+ 표시)
export const Overflow: Story = {
  args: {
    count: 100,
  },
  parameters: {
    docs: {
      description: {
        story:
          "최대값을 초과할 때 '99+' 형태로 표시되는 배지입니다. 많은 알림이 있을 때 사용됩니다.",
      },
    },
  },
};

// 150개 (99+ 표시)
export const Many: Story = {
  args: {
    count: 150,
  },
  parameters: {
    docs: {
      description: {
        story: "많은 수량(150개)의 배지입니다. 99를 초과하므로 '99+'로 표시됩니다.",
      },
    },
  },
};

// 커스텀 최대값 (50)
export const CustomMax: Story = {
  args: {
    count: 75,
    maxCount: 50,
  },
  parameters: {
    docs: {
      description: {
        story: "커스텀 최대값(50)을 설정한 배지입니다. 75는 50을 초과하므로 '50+'로 표시됩니다.",
      },
    },
  },
};

// 커스텀 스타일 적용
export const WithCustomStyle: Story = {
  args: {
    count: 8,
    className: "bg-red-500 text-white",
  },
  parameters: {
    docs: {
      description: {
        story:
          "커스텀 스타일이 적용된 배지입니다. className prop을 사용하여 배경색과 텍스트 색상을 변경할 수 있습니다.",
      },
    },
  },
};

// 다양한 숫자 예시
export const NumberExamples: Story = {
  args: { count: 1 },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge count={1} />
      <Badge count={5} />
      <Badge count={12} />
      <Badge count={25} />
      <Badge count={50} />
      <Badge count={99} />
      <Badge count={100} />
      <Badge count={150} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "다양한 숫자 값의 배지 예시입니다. 1부터 150까지의 숫자가 어떻게 표시되는지 확인할 수 있습니다.",
      },
    },
  },
};
