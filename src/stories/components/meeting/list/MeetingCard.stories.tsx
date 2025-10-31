import MeetingCard from "@/components/meeting/list/MeetingCard";
import { mockGatherings } from "@/mocks/meeting/mockGatherings";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Meeting/List/MeetingCard",
  component: MeetingCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[95vw] max-w-[800px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MeetingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gathering: mockGatherings[1],
  },
};

export const Confirmed: Story = {
  args: {
    gathering: mockGatherings[2],
  },
};

export const LowParticipants: Story = {
  args: {
    gathering: mockGatherings[3],
  },
};

export const ClosingDeadline: Story = {
  args: {
    gathering: {
      ...mockGatherings[1],
      registrationEnd: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    },
  },
};

export const Full: Story = {
  args: {
    gathering: {
      ...mockGatherings[1],
      participantCount: 12,
    },
  },
};

export const NoImage: Story = {
  args: {
    gathering: {
      ...mockGatherings[1],
      image: undefined,
    },
  },
};
