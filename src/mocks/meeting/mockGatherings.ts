import { Gathering } from "@/types/gathering";

export const mockGatherings: Record<number, Gathering> = {
  1: {
    teamId: "team-1",
    id: 1,
    type: "DALLAEMFIT",
    name: "건대입구 달렘핏 모임",
    dateTime: "2024-01-20T10:00:00Z",
    registrationEnd: "2024-01-19T18:00:00Z",
    location: "건대입구",
    participantCount: 8,
    capacity: 12,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
    createdBy: 1,
    canceledAt: null,
  },
  2: {
    teamId: "team-1",
    id: 2,
    type: "OFFICE_STRETCHING",
    name: "홍대 스트레칭 모임",
    dateTime: "2024-01-21T14:00:00Z",
    registrationEnd: "2024-01-20T18:00:00Z",
    location: "홍대입구",
    participantCount: 5,
    capacity: 10,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&crop=center",
    createdBy: 2,
  },
  3: {
    teamId: "team-1",
    id: 3,
    type: "MINDFULNESS",
    name: "신림 마인드풀니스 모임",
    dateTime: "2024-01-22T09:00:00Z",
    registrationEnd: "2024-01-21T18:00:00Z",
    location: "신림",
    participantCount: 3,
    capacity: 8,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
    createdBy: 3,
  },
};
