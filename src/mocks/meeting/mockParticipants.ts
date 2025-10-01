import { GatheringParticipant } from "@/types/gathering";

export const mockParticipants: Record<number, GatheringParticipant[]> = {
  1: [
    {
      teamId: "team-1",
      userId: 1,
      gatheringId: 1,
      joinedAt: "2024-01-15T09:00:00Z",
      User: {
        id: 1,
        email: "user1@example.com",
        name: "김철수",
        companyName: "테크스타트업",
        image: "/avatars/male.svg",
      },
    },
    {
      teamId: "team-1",
      userId: 2,
      gatheringId: 1,
      joinedAt: "2024-01-15T10:00:00Z",
      User: {
        id: 2,
        email: "user2@example.com",
        name: "이영희",
        companyName: "디자인스튜디오",
        image: "/avatars/female.svg",
      },
    },
    {
      teamId: "team-1",
      userId: 3,
      gatheringId: 1,
      joinedAt: "2024-01-15T11:00:00Z",
      User: {
        id: 3,
        email: "user3@example.com",
        name: "박민수",
        companyName: "마케팅 에이전시",
        image: "/avatars/male.svg",
      },
    },
  ],
  2: [
    {
      teamId: "team-1",
      userId: 4,
      gatheringId: 2,
      joinedAt: "2024-01-16T09:00:00Z",
      User: {
        id: 4,
        email: "user4@example.com",
        name: "정수진",
        companyName: "금융회사",
        image: "/avatars/female.svg",
      },
    },
    {
      teamId: "team-1",
      userId: 5,
      gatheringId: 2,
      joinedAt: "2024-01-16T10:00:00Z",
      User: {
        id: 5,
        email: "user5@example.com",
        name: "최현우",
        companyName: "게임회사",
        image: "/avatars/male.svg",
      },
    },
  ],
  3: [
    {
      teamId: "team-1",
      userId: 6,
      gatheringId: 3,
      joinedAt: "2024-01-17T09:00:00Z",
      User: {
        id: 6,
        email: "user6@example.com",
        name: "한지영",
        companyName: "헬스케어",
        image: "/avatars/female.svg",
      },
    },
  ],
};
