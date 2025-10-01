import type { Meta, StoryObj } from "@storybook/react";
import Link from "next/link";
import type { Gathering } from "@/types/gathering";

// 페이지 컴포넌트
function MeetingsPage({
  meetings = mockMeetings,
  showFilters = true,
}: {
  meetings?: Gathering[];
  showFilters?: boolean;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">모임 목록</h1>

        {showFilters && (
          <div className="mb-8 flex flex-wrap gap-4">
            <select className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500">
              <option value="">모든 타입</option>
              <option value="DALLAEMFIT">달렘핏</option>
              <option value="OFFICE_STRETCHING">사무직 스트레칭</option>
              <option value="MINDFULNESS">명상</option>
              <option value="WORKATION">워케이션</option>
            </select>
            <select className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500">
              <option value="">모든 위치</option>
              <option value="건대입구">건대입구</option>
              <option value="을지로3가">을지로3가</option>
              <option value="신림">신림</option>
              <option value="홍대입구">홍대입구</option>
            </select>
            <input
              type="date"
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
              placeholder="날짜 선택"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              {meeting.image && (
                <div className="flex h-48 items-center justify-center bg-gray-200">
                  <img
                    src={meeting.image}
                    alt={meeting.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
                    {meeting.type}
                  </span>
                  <span className="text-sm text-gray-500">
                    {meeting.participantCount}/{meeting.capacity}명
                  </span>
                </div>
                <h2 className="mb-2 line-clamp-2 text-xl font-semibold text-gray-900">
                  {meeting.name}
                </h2>
                <p className="mb-2 text-gray-600">📍 {meeting.location}</p>
                <p className="mb-4 text-gray-600">
                  📅{" "}
                  {new Date(meeting.dateTime).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-medium ${
                      meeting.participantCount >= meeting.capacity
                        ? "text-red-600"
                        : meeting.participantCount >= 5
                          ? "text-green-600"
                          : "text-yellow-600"
                    }`}
                  >
                    {meeting.participantCount >= meeting.capacity
                      ? "정원 마감"
                      : meeting.participantCount >= 5
                        ? "개설 확정"
                        : "개설 대기"}
                  </span>
                  <Link
                    href={`/meetings/${meeting.id}`}
                    className="rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-600"
                  >
                    자세히 보기
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {meetings.length === 0 && (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl text-gray-400">📅</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">모임이 없습니다</h3>
            <p className="text-gray-600">새로운 모임을 찾아보세요!</p>
          </div>
        )}
      </div>
    </main>
  );
}

const mockMeetings: Gathering[] = [
  {
    teamId: "team-1",
    id: 1,
    type: "DALLAEMFIT",
    name: "건대입구 달렘핏 모임",
    dateTime: "2024-01-25T10:00:00.000Z",
    registrationEnd: "2024-01-24T18:00:00.000Z",
    location: "건대입구",
    participantCount: 15,
    capacity: 20,
    image: "/image/profile.svg",
    createdBy: 1,
    canceledAt: null,
  },
  {
    teamId: "team-1",
    id: 2,
    type: "OFFICE_STRETCHING",
    name: "사무직 스트레칭 모임",
    dateTime: "2024-01-26T14:00:00.000Z",
    registrationEnd: "2024-01-25T18:00:00.000Z",
    location: "을지로3가",
    participantCount: 8,
    capacity: 15,
    image: "/image/profile.svg",
    createdBy: 2,
    canceledAt: null,
  },
  {
    teamId: "team-1",
    id: 3,
    type: "MINDFULNESS",
    name: "명상 세션",
    dateTime: "2024-01-27T09:00:00.000Z",
    registrationEnd: "2024-01-26T18:00:00.000Z",
    location: "신림",
    participantCount: 5,
    capacity: 10,
    image: "/image/profile.svg",
    createdBy: 3,
    canceledAt: null,
  },
  {
    teamId: "team-1",
    id: 4,
    type: "WORKATION",
    name: "워케이션 세미나",
    dateTime: "2024-01-28T19:00:00.000Z",
    registrationEnd: "2024-01-27T18:00:00.000Z",
    location: "홍대입구",
    participantCount: 12,
    capacity: 25,
    image: "/image/profile.svg",
    createdBy: 4,
    canceledAt: null,
  },
  {
    teamId: "team-1",
    id: 5,
    type: "DALLAEMFIT",
    name: "홍대 달렘핏 모임",
    dateTime: "2024-01-29T11:00:00.000Z",
    registrationEnd: "2024-01-28T18:00:00.000Z",
    location: "홍대입구",
    participantCount: 20,
    capacity: 20,
    image: "/image/profile.svg",
    createdBy: 5,
    canceledAt: null,
  },
  {
    teamId: "team-1",
    id: 6,
    type: "OFFICE_STRETCHING",
    name: "건대 스트레칭 모임",
    dateTime: "2024-01-30T16:00:00.000Z",
    registrationEnd: "2024-01-29T18:00:00.000Z",
    location: "건대입구",
    participantCount: 3,
    capacity: 12,
    image: "/image/profile.svg",
    createdBy: 6,
    canceledAt: null,
  },
];

const meta: Meta<typeof MeetingsPage> = {
  title: "Pages/MeetingsPage",
  component: MeetingsPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    showFilters: {
      control: { type: "boolean" },
      description: "필터 표시 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 모임 목록
export const Default: Story = {
  args: {
    meetings: mockMeetings,
    showFilters: true,
  },
};

// 필터 없는 버전
export const WithoutFilters: Story = {
  args: {
    meetings: mockMeetings,
    showFilters: false,
  },
};

// 적은 모임
export const FewMeetings: Story = {
  args: {
    meetings: mockMeetings.slice(0, 2),
    showFilters: true,
  },
};

// 많은 모임
export const ManyMeetings: Story = {
  args: {
    meetings: [
      ...mockMeetings,
      ...mockMeetings.map((m, index) => ({
        ...m,
        id: m.id + 10,
        name: `추가 모임 ${index + 1}`,
        dateTime: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000).toISOString(),
      })),
    ],
    showFilters: true,
  },
};

// 모임이 없는 경우
export const NoMeetings: Story = {
  args: {
    meetings: [],
    showFilters: true,
  },
};

// 정원이 가득 찬 모임들
export const FullCapacityMeetings: Story = {
  args: {
    meetings: mockMeetings.map((meeting) => ({
      ...meeting,
      participantCount: meeting.capacity,
    })),
    showFilters: true,
  },
};

// 개설 대기 중인 모임들
export const PendingMeetings: Story = {
  args: {
    meetings: mockMeetings.map((meeting) => ({
      ...meeting,
      participantCount: 3,
    })),
    showFilters: true,
  },
};
