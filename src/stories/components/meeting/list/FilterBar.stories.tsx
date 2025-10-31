import FilterBar, { MeetingFilters } from "@/components/meeting/list/FilterBar";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta = {
  title: "Components/Meeting/List/FilterBar",
  component: FilterBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultFilters: MeetingFilters = {
  keyword: "",
  category: "DALLAEMFIT",
  location: "",
  date: "",
  sort: "latest",
};

export const Default: Story = {
  args: {
    value: defaultFilters,
    onChange: () => {},
  },
  render: () => {
    const [filters, setFilters] = useState<MeetingFilters>(defaultFilters);
    return <FilterBar value={filters} onChange={setFilters} />;
  },
};

export const WorkationTab: Story = {
  args: {
    value: { ...defaultFilters, category: "WORKATION" },
    onChange: () => {},
  },
  render: () => {
    const [filters, setFilters] = useState<MeetingFilters>({
      ...defaultFilters,
      category: "WORKATION",
    });
    return <FilterBar value={filters} onChange={setFilters} />;
  },
};

export const WithFilters: Story = {
  args: {
    value: {
      keyword: "",
      category: "OFFICE_STRETCHING",
      location: "홍대입구",
      date: "2025-03-01",
      sort: "popular",
    },
    onChange: () => {},
  },
  render: () => {
    const [filters, setFilters] = useState<MeetingFilters>({
      keyword: "",
      category: "OFFICE_STRETCHING",
      location: "홍대입구",
      date: "2025-03-01",
      sort: "popular",
    });
    return <FilterBar value={filters} onChange={setFilters} />;
  },
};
