import { ReviewList } from "@/types/review";

export const mockReviewList: ReviewList = {
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
  ],
  totalItemCount: 25,
  currentPage: 1,
  totalPages: 3,
};
