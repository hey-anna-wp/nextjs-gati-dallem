import type { Meta, StoryObj } from "@storybook/react";
import MeetingDetailCard from "@/components/meeting/MeetingDetailCard";
import {
  storybookMockGathering,
  storybookMockUpcomingGathering,
  storybookMockFullGathering,
  storybookMockCanceledGathering,
} from "@/mocks/meeting/storybookMocks";

const meta = {
  title: "Components/Meeting/MeetingDetailCard",
  component: MeetingDetailCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    gathering: {
      description: "모임 정보",
    },
    isJoined: {
      control: { type: "boolean" },
      description: "참여 여부",
    },
    isFavorite: {
      control: { type: "boolean" },
      description: "즐겨찾기 여부",
    },
    isHost: {
      control: { type: "boolean" },
      description: "주최자 여부",
    },
    onJoin: {
      action: "join clicked",
      description: "참여 버튼 클릭 시 호출되는 콜백",
    },
    onLeave: {
      action: "leave clicked",
      description: "참여 취소 버튼 클릭 시 호출되는 콜백",
    },
    onToggleFavorite: {
      action: "favorite toggled",
      description: "즐겨찾기 토글 시 호출되는 콜백",
    },
    onShare: {
      action: "share clicked",
      description: "공유 버튼 클릭 시 호출되는 콜백",
    },
  },
} satisfies Meta<typeof MeetingDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 상태 (참여하지 않음, 즐겨찾기 안함)
export const Default: Story = {
  args: {
    gathering: storybookMockGathering,
    isJoined: false,
    isFavorite: false,
  },
};

// 참여한 상태
export const Joined: Story = {
  args: {
    gathering: storybookMockGathering,
    isJoined: true,
    isFavorite: false,
  },
};

// 즐겨찾기한 상태
export const Favorited: Story = {
  args: {
    gathering: storybookMockGathering,
    isJoined: false,
    isFavorite: true,
  },
};

// 참여하고 즐겨찾기한 상태
export const JoinedAndFavorited: Story = {
  args: {
    gathering: storybookMockGathering,
    isJoined: true,
    isFavorite: true,
  },
};

// 다가오는 모임
export const Upcoming: Story = {
  args: {
    gathering: storybookMockUpcomingGathering,
    isJoined: false,
    isFavorite: false,
  },
};

// 정원이 가득 찬 모임
export const Full: Story = {
  args: {
    gathering: storybookMockFullGathering,
    isJoined: false,
    isFavorite: false,
  },
};

// 취소된 모임
export const Canceled: Story = {
  args: {
    gathering: storybookMockCanceledGathering,
    isJoined: false,
    isFavorite: false,
  },
};

// 사무직 스트레칭
export const OfficeStretching: Story = {
  args: {
    gathering: {
      ...storybookMockGathering,
      type: "OFFICE_STRETCHING",
      name: "사무직 스트레칭",
      location: "을지로3가",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&crop=center",
    },
    isJoined: false,
    isFavorite: false,
  },
};

// 명상 세션
export const Mindfulness: Story = {
  args: {
    gathering: {
      ...storybookMockGathering,
      type: "MINDFULNESS",
      name: "명상 세션",
      location: "신림",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
    },
    isJoined: false,
    isFavorite: false,
  },
};

// 워케이션 세미나
export const Workation: Story = {
  args: {
    gathering: {
      ...storybookMockGathering,
      type: "WORKATION",
      name: "워케이션 세미나",
      location: "홍대입구",
      image:
        "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop&crop=center",
    },
    isJoined: false,
    isFavorite: false,
  },
};

// 긴 제목의 모임
export const LongTitle: Story = {
  args: {
    gathering: {
      ...storybookMockGathering,
      name: "매우 긴 제목을 가진 달램핏 클래스 - 건강한 몸과 마음을 위한 특별한 시간",
    },
    isJoined: false,
    isFavorite: false,
  },
};

// 이미지가 없는 모임
export const NoImage: Story = {
  args: {
    gathering: {
      ...storybookMockGathering,
      image: undefined,
    },
    isJoined: false,
    isFavorite: false,
  },
};

// 주최자인 경우
export const Host: Story = {
  args: {
    gathering: storybookMockGathering,
    isJoined: true,
    isFavorite: false,
    isHost: true,
  },
};

// 주최자 + 즐겨찾기
export const HostAndFavorited: Story = {
  args: {
    gathering: storybookMockGathering,
    isJoined: true,
    isFavorite: true,
    isHost: true,
  },
};

// 주최자 + 정원 마감
export const HostWithFullCapacity: Story = {
  args: {
    gathering: {
      ...storybookMockGathering,
      participantCount: 20,
      capacity: 20,
    },
    isJoined: true,
    isFavorite: false,
    isHost: true,
  },
};

// 주최자 + 취소된 모임
export const HostWithCanceled: Story = {
  args: {
    gathering: {
      ...storybookMockGathering,
      canceledAt: "2024-01-18T10:00:00.000Z",
    },
    isJoined: true,
    isFavorite: false,
    isHost: true,
  },
};

// 참가자 (크라운 아이콘 없음)
export const Participant: Story = {
  args: {
    gathering: storybookMockGathering,
    isJoined: false,
    isFavorite: false,
    isHost: false,
  },
};

// 참가자 + 참여함
export const ParticipantJoined: Story = {
  args: {
    gathering: storybookMockGathering,
    isJoined: true,
    isFavorite: false,
    isHost: false,
  },
};

// 참가자 + 즐겨찾기
export const ParticipantFavorited: Story = {
  args: {
    gathering: storybookMockGathering,
    isJoined: false,
    isFavorite: true,
    isHost: false,
  },
};
