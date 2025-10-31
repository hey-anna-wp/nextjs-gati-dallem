import CreateMeetingWizard from "@/components/meeting/create/CreateMeetingWizard";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Meeting/Create/CreateMeetingWizard",
  component: CreateMeetingWizard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[95vw] max-w-[640px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CreateMeetingWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onCancel: () => {},
    onFinished: () => {},
    children: null,
  },
  render: () => (
    <CreateMeetingWizard onCancel={() => {}} onFinished={() => {}}>
      <CreateMeetingWizard.Header />
      <CreateMeetingWizard.Step1 />
      <CreateMeetingWizard.Step2 />
      <CreateMeetingWizard.Step3 />
      <CreateMeetingWizard.Navigation />
    </CreateMeetingWizard>
  ),
};
