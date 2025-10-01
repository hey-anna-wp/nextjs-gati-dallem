import { ReviewList } from "@/types/review";

export const mockReviewsByGathering: Record<number, ReviewList> = {
  1: {
    data: [
      {
        teamId: "team-1",
        id: 1,
        score: 5,
        comment: "정말 좋은 경험이었습니다! 강추합니다.",
        createdAt: "2024-01-25T10:30:00.000Z",
        Gathering: {
          teamId: "team-1",
          id: 1,
          type: "DALLAEMFIT",
          name: "건대입구 달렘핏 모임",
          dateTime: "2024-01-25T10:00:00.000Z",
          location: "건대입구",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
        },
        User: { teamId: "team-1", id: 1, name: "김철수", image: "/avatars/male.svg" },
      },
      {
        teamId: "team-1",
        id: 2,
        score: 4,
        comment: "만족스러운 수업이었어요. 다음에도 참여하고 싶습니다.",
        createdAt: "2024-01-24T15:20:00.000Z",
        Gathering: {
          teamId: "team-1",
          id: 1,
          type: "DALLAEMFIT",
          name: "건대입구 달렘핏 모임",
          dateTime: "2024-01-25T10:00:00.000Z",
          location: "건대입구",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
        },
        User: { teamId: "team-1", id: 2, name: "이영희", image: "/avatars/female.svg" },
      },
      {
        teamId: "team-1",
        id: 3,
        score: 5,
        comment: "강사분도 친절하시고 너무 좋은 공간에서 긴장과 스트레스 모두 잘 풀고 가요.",
        createdAt: "2024-01-24T09:15:00.000Z",
        Gathering: {
          teamId: "team-1",
          id: 1,
          type: "DALLAEMFIT",
          name: "건대입구 달렘핏 모임",
          dateTime: "2024-01-25T10:00:00.000Z",
          location: "건대입구",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
        },
        User: { teamId: "team-1", id: 3, name: "박민수", image: "/avatars/male.svg" },
      },
      {
        teamId: "team-1",
        id: 4,
        score: 3,
        comment: "수업이 단조로워요. 좀 더 다양한 프로그램이 있었으면 좋겠어요.",
        createdAt: "2024-01-23T14:45:00.000Z",
        Gathering: {
          teamId: "team-1",
          id: 1,
          type: "DALLAEMFIT",
          name: "건대입구 달렘핏 모임",
          dateTime: "2024-01-25T10:00:00.000Z",
          location: "건대입구",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
        },
        User: { teamId: "team-1", id: 4, name: "김지수", image: "/avatars/female.svg" },
      },
    ],
    totalItemCount: 15,
    currentPage: 1,
    totalPages: 3,
  },
  2: {
    data: [
      {
        teamId: "team-1",
        id: 5,
        score: 5,
        comment: "사무직 스트레칭이 정말 도움이 되었어요!",
        createdAt: "2024-01-22T16:30:00.000Z",
        Gathering: {
          teamId: "team-1",
          id: 2,
          type: "OFFICE_STRETCHING",
          name: "홍대 스트레칭 모임",
          dateTime: "2024-01-21T14:00:00.000Z",
          location: "홍대입구",
          image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&crop=center",
        },
        User: { teamId: "team-1", id: 5, name: "최현우", image: "/avatars/male.svg" },
      },
      {
        teamId: "team-1",
        id: 6,
        score: 4,
        comment: "운동 강도가 적당해서 좋았어요. 다음에도 참여할 예정입니다.",
        createdAt: "2024-01-21T11:20:00.000Z",
        Gathering: {
          teamId: "team-1",
          id: 2,
          type: "OFFICE_STRETCHING",
          name: "홍대 스트레칭 모임",
          dateTime: "2024-01-21T14:00:00.000Z",
          location: "홍대입구",
          image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&crop=center",
        },
        User: { teamId: "team-1", id: 6, name: "정수진", image: "/avatars/female.svg" },
      },
    ],
    totalItemCount: 8,
    currentPage: 1,
    totalPages: 2,
  },
  3: {
    data: [
      {
        teamId: "team-1",
        id: 7,
        score: 4,
        comment: "마인드풀니스 수업이 마음의 평화를 가져다주었어요.",
        createdAt: "2024-01-23T09:00:00.000Z",
        Gathering: {
          teamId: "team-1",
          id: 3,
          type: "MINDFULNESS",
          name: "신림 마인드풀니스 모임",
          dateTime: "2024-01-22T09:00:00.000Z",
          location: "신림",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
        },
        User: { teamId: "team-1", id: 7, name: "한지영", image: "/avatars/female.svg" },
      },
    ],
    totalItemCount: 5,
    currentPage: 1,
    totalPages: 1,
  },
};
