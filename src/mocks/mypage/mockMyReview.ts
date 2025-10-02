import { JoinedGathering, Review } from "@/types";

export const mockUnreviewed: JoinedGathering[] = [
  {
    teamId: "11-6",
    id: 1,
    type: "WORKATION",
    name: "프론트엔드 엔지니어를 위한 Next.js 세미나",
    dateTime: "2025-11-04T10:00:00.000Z",
    registrationEnd: "2025-11-03T10:00:00.000Z",
    location: "홍대입구",
    participantCount: 1,
    capacity: 28,
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1758264082588_images.jpeg",
    createdBy: 2227,
    canceledAt: null,
    joinedAt: "2025-09-25T07:22:04.094Z",
    isCompleted: false,
    isReviewed: false,
  },
  {
    teamId: "11-6",
    id: 2,
    type: "MINDFULNESS",
    name: "건강한 협업문화를 위한 쿠션어 네트워킹",
    dateTime: "2025-11-03T10:00:00.000Z",
    registrationEnd: "2025-11-03T09:30:00.000Z",
    location: "을지로3가",
    participantCount: 1,
    capacity: 28,
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1758264082588_images.jpeg",
    createdBy: 2227,
    canceledAt: null,
    joinedAt: "2025-09-25T07:22:04.094Z",
    isCompleted: false,
    isReviewed: false,
  },
  {
    teamId: "11-6",
    id: 3,
    type: "OFFICE_STRETCHING",
    name: "건강한 프론트엔드 개발 문화",
    dateTime: "2025-11-02T10:00:00.000Z",
    registrationEnd: "2025-11-01T10:00:00.000Z",
    location: "건대입구",
    participantCount: 1,
    capacity: 28,
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1758264082588_images.jpeg",
    createdBy: 2227,
    canceledAt: null,
    joinedAt: "2025-09-25T07:22:04.094Z",
    isCompleted: false,
    isReviewed: false,
  },
];

export const mockReviewed: Review[] = [
  {
    teamId: "11-6",
    id: 1,
    score: 5,
    comment:
      "좋아요 너무 좋아요 1\n좋아요 너무 좋아요 1 좋아요 너무 좋아요 1 좋아요 너무 좋아요 1 좋아요 너무 좋아요 1 좋아요 너무 좋아요 1 좋아요 너무 좋아요 1 좋아요 너무 좋아요 1 좋아요 너무 좋아요 1 좋아요 너무 좋아요 1 좋아요 너무 좋아요 1 좋아요 너무 좋아요 1 ",
    createdAt: "2025-10-01T09:33:25.213Z",
    Gathering: {
      teamId: "11-6",
      id: 1,
      type: "WORKATION",
      name: "React-Query로 우아하게 상태 관리 하기",
      dateTime: "2025-10-01T09:33:25.213Z",
      location: "홍대입구",
      image:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1758264082588_images.jpeg",
    },
    User: {
      teamId: "11-6",
      id: 1,
      name: "이수정",
    },
  },
  {
    teamId: "11-6",
    id: 2,
    score: 5,
    comment: "좋아요 너무 좋아요 2",
    createdAt: "2025-10-01T09:33:25.213Z",
    Gathering: {
      teamId: "11-6",
      id: 2,
      type: "MINDFULNESS",
      name: "Zustand로 우아하게 상태 관리 하기",
      dateTime: "2025-10-01T09:33:25.213Z",
      location: "을지로3가",
    },
    User: {
      teamId: "11-6",
      id: 1,
      name: "이수정",
    },
  },
  {
    teamId: "11-6",
    id: 3,
    score: 5,
    comment: "좋아요 너무 좋아요 3",
    createdAt: "2025-10-01T09:33:25.213Z",
    Gathering: {
      teamId: "11-6",
      id: 3,
      type: "OFFICE_STRETCHING",
      name: "Framer Motion으로 우아하게 애니메이션 구현하기",
      dateTime: "2025-10-01T09:33:25.213Z",
      location: "건대입구",
    },
    User: {
      teamId: "11-6",
      id: 1,
      name: "이수정",
    },
  },
];
