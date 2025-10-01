import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import MeetingDetailCard from "@/components/meeting/MeetingDetailCard";
import ParticipantList from "@/components/meeting/ParticipantList";
import ReviewSection from "@/components/meeting/ReviewSection";
import type { Gathering, GatheringParticipant } from "@/types/gathering";
import type { ReviewList } from "@/types/review";
import {
  storybookMockGathering,
  storybookMockParticipants,
  storybookMockReviewList,
} from "@/mocks/meeting/storybookMocks";

// 페이지 컴포넌트
function MeetingDetailPage({
  gathering = storybookMockGathering,
  participants = storybookMockParticipants,
  reviewList = storybookMockReviewList,
  isJoined = false,
  isFavorite = false,
  isHost = false,
  onJoin,
  onLeave,
  onToggleFavorite,
  onShare,
  onPageChange,
}: {
  gathering?: Gathering;
  participants?: GatheringParticipant[];
  reviewList?: ReviewList;
  isJoined?: boolean;
  isFavorite?: boolean;
  isHost?: boolean;
  onJoin?: () => void;
  onLeave?: () => void;
  onToggleFavorite?: () => void;
  onShare?: () => void;
  onPageChange?: (page: number) => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto mt-10 max-w-7xl px-4">
        {/* 메인 콘텐츠 영역 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* 왼쪽: 모임 이미지 */}
          <div className="relative">
            {gathering.image ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl sm:aspect-auto sm:h-full">
                <img
                  src={gathering.image}
                  alt={gathering.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-3xl bg-gray-200">
                <div className="text-center">
                  <div className="mb-4 text-6xl">🏃‍♀️</div>
                  <p className="text-lg text-gray-500">모임 이미지</p>
                </div>
              </div>
            )}
          </div>

          {/* 오른쪽: 모임 정보와 참가자 정보 */}
          <div className="space-y-6">
            {/* 모임 정보 카드 */}
            <MeetingDetailCard
              gathering={gathering}
              isJoined={isJoined}
              isFavorite={isFavorite}
              isHost={isHost}
              onJoin={onJoin}
              onLeave={onLeave}
              onToggleFavorite={onToggleFavorite}
              onShare={onShare}
            />

            {/* 참가자 정보 섹션 */}
            <div className="rounded-3xl hover:border-purple-200">
              <ParticipantList participants={participants} maxDisplay={8} />
            </div>
          </div>
        </div>

        {/* 리뷰 섹션 */}
        <div className="mt-16">
          <ReviewSection reviewList={reviewList} onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof MeetingDetailPage> = {
  title: "Pages/MeetingDetailPage",
  component: MeetingDetailPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    isJoined: {
      control: { type: "boolean" },
      description: "참여 여부",
    },
    isFavorite: {
      control: { type: "boolean" },
      description: "즐겨찾기 여부",
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
    onPageChange: {
      action: "page changed",
      description: "페이지 변경 시 호출되는 콜백",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 상태
export const Default: Story = {
  args: {
    isJoined: false,
    isFavorite: false,
  },
};

// 참여한 상태
export const Joined: Story = {
  args: {
    isJoined: true,
    isFavorite: false,
  },
};

// 즐겨찾기한 상태
export const Favorited: Story = {
  args: {
    isJoined: false,
    isFavorite: true,
  },
};

// 참여하고 즐겨찾기한 상태
export const JoinedAndFavorited: Story = {
  args: {
    isJoined: true,
    isFavorite: true,
  },
};

// 정원이 가득 찬 모임
export const FullCapacity: Story = {
  args: {
    gathering: {
      ...storybookMockGathering,
      participantCount: 20,
      capacity: 20,
    },
    isJoined: false,
    isFavorite: false,
  },
};

// 취소된 모임
export const Canceled: Story = {
  args: {
    gathering: {
      ...storybookMockGathering,
      canceledAt: "2024-01-18T10:00:00.000Z",
    },
    isJoined: false,
    isFavorite: false,
  },
};

// 사무직 스트레칭 모임
export const OfficeStretching: Story = {
  args: {
    gathering: {
      ...storybookMockGathering,
      type: "OFFICE_STRETCHING",
      name: "사무직 스트레칭 모임",
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

// 적은 참가자
export const FewParticipants: Story = {
  args: {
    participants: storybookMockParticipants.slice(0, 2),
    isJoined: false,
    isFavorite: false,
  },
};

// 많은 참가자
export const ManyParticipants: Story = {
  args: {
    participants: [
      ...storybookMockParticipants,
      ...storybookMockParticipants.map((p, index) => ({
        ...p,
        userId: p.userId + 10,
        User: {
          ...p.User,
          id: p.User.id + 10,
          name: `추가참가자${index + 1}`,
          email: `additional${index + 1}@example.com`,
        },
      })),
    ],
    isJoined: false,
    isFavorite: false,
  },
};

// 리뷰가 많은 페이지
export const ManyReviews: Story = {
  args: {
    reviewList: {
      ...storybookMockReviewList,
      currentPage: 5,
      totalPages: 10,
    },
    isJoined: false,
    isFavorite: false,
  },
};

// 주최자 페이지
export const HostPage: Story = {
  args: {
    isJoined: true,
    isFavorite: false,
    isHost: true,
  },
};

// 주최자 + 즐겨찾기 페이지
export const HostAndFavoritedPage: Story = {
  args: {
    isJoined: true,
    isFavorite: true,
    isHost: true,
  },
};

// 참가자 페이지 (크라운 아이콘 없음)
export const ParticipantPage: Story = {
  args: {
    isJoined: false,
    isFavorite: false,
    isHost: false,
  },
};

// 참가자 + 참여함 페이지
export const ParticipantJoinedPage: Story = {
  args: {
    isJoined: true,
    isFavorite: false,
    isHost: false,
  },
};

// 참가자 + 즐겨찾기 페이지
export const ParticipantFavoritedPage: Story = {
  args: {
    isJoined: false,
    isFavorite: true,
    isHost: false,
  },
};

// 리뷰가 없는 빈 상태
export const NoReviews: Story = {
  args: {
    reviewList: {
      data: [],
      totalItemCount: 0,
      currentPage: 1,
      totalPages: 0,
    },
    isJoined: false,
    isFavorite: false,
  },
};

// 모바일 뷰 (세로 레이아웃)
export const MobileView: Story = {
  args: {
    isJoined: false,
    isFavorite: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

// 태블릿 뷰 (가로 레이아웃)
export const TabletView: Story = {
  args: {
    isJoined: false,
    isFavorite: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

// 데스크톱 뷰 (가로 레이아웃)
export const DesktopView: Story = {
  args: {
    isJoined: false,
    isFavorite: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

// 주최자 - 모임 취소 가능 상태
export const HostCanCancel: Story = {
  args: {
    isJoined: true,
    isFavorite: false,
    isHost: true,
  },
};

// 주최자 - 즐겨찾기한 상태
export const HostFavorited: Story = {
  args: {
    isJoined: true,
    isFavorite: true,
    isHost: true,
  },
};

// 참가자 - 참여하지 않은 상태
export const ParticipantNotJoined: Story = {
  args: {
    isJoined: false,
    isFavorite: false,
    isHost: false,
  },
};

// 참가자 - 참여한 상태
export const ParticipantJoined: Story = {
  args: {
    isJoined: true,
    isFavorite: false,
    isHost: false,
  },
};

// 참가자 - 참여하고 즐겨찾기한 상태
export const ParticipantJoinedAndFavorited: Story = {
  args: {
    isJoined: true,
    isFavorite: true,
    isHost: false,
  },
};

// 신청 마감된 모임
export const RegistrationEnded: Story = {
  args: {
    gathering: {
      ...storybookMockGathering,
      registrationEnd: "2024-01-15T18:00:00.000Z", // 과거 날짜로 설정
    },
    isJoined: false,
    isFavorite: false,
    isHost: false,
  },
};
