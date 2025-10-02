import { Card } from "@/components/common/Card";
import ReservedCardItem from "@/components/my/bookings/ReservedCardItem";
import CreatedCardItem from "@/components/my/hosted/CreatedCardItem";
import UnreviewedCardItem from "@/components/my/reviews/UnreviewedCardItem";
import { ChipInfo } from "@/components/ui/Chip";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Common/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;
export default meta;

type Story = StoryObj<typeof meta>;

const mockData = {
  teamId: "11-6",
  id: 0,
  type: "DALLAEMFIT",
  name: "같이달램 프론트엔드 네트워킹",
  dateTime: "2025-09-23T00:16:21.224Z",
  registrationEnd: "2025-09-23T00:16:21.224Z",
  location: "강남",
  participantCount: 18,
  capacity: 20,
  image:
    "https://t1.kakaocdn.net/thumb/C630x354.fwebp.q100/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Fkakaocorp%2Fkakaocorp%2Fadmin%2Fnews%2F76058ec8019900001.jpeg",
  createdBy: 0,
  canceledAt: "2025-09-23T00:16:21.224Z",
  joinedAt: "2025-09-23T00:16:21.224Z",
  isCompleted: true,
  isReviewed: true,
};

export const CustomCardExample: Story = {
  render: () => {
    const { id, name } = mockData;
    return (
      <Card>
        <Card.Image image={mockData.image} />
        <Card.Detail>
          <div className="flex h-full flex-col items-start justify-between gap-4">
            <Card.Title id={id}>
              <div className="flex gap-1.5 md:gap-2">{name}</div>
            </Card.Title>
            <div className="flex-start gap-2">
              <ChipInfo>XX월 XX일</ChipInfo>
              <ChipInfo>00:00</ChipInfo>
            </div>
            <div className="flex-end w-full">
              <button className="rounded-2xl bg-purple-100 px-6 py-2.5 text-base font-bold text-purple-500">
                리뷰 작성하기
              </button>
            </div>
          </div>
        </Card.Detail>
        <Card.LikeButton isLiked={true} />
      </Card>
    );
  },
};

/** 마이페이지 나의 모임 카드 컴포넌트 */
export const CardReserved: Story = {
  render: () => <ReservedCardItem {...mockData} />,
};
/** 마이페이지 나의 리뷰 - 작성 가능한 리뷰 카드 컴포넌트 */
export const CardUnreviewed: Story = {
  render: () => <UnreviewedCardItem {...mockData} />,
};
/** 마이페이지 내가 만든 모임 카드 컴포넌트 */
export const CardCreatedGathering: Story = {
  render: () => <CreatedCardItem {...mockData} />,
};
