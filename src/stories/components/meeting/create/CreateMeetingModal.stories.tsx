import CreateMeetingModal from "@/components/meeting/create/CreateMeetingModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Meeting/Create/CreateMeetingModal",
  component: CreateMeetingModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreateMeetingModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
