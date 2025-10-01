// src/app/(app)/meetings/page.tsx
import Link from "next/link";

export default function MeetingsPage() {
  const testMeetings = [
    {
      id: 1,
      name: "건대입구 달렘핏 모임",
      location: "건대입구",
      dateTime: "2024-01-20T10:00:00Z",
    },
    { id: 2, name: "홍대 스트레칭 모임", location: "홍대입구", dateTime: "2024-01-21T14:00:00Z" },
    { id: 3, name: "신림 마인드풀니스 모임", location: "신림", dateTime: "2024-01-22T09:00:00Z" },
  ];

  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-bold">모임 목록</h1>
      <div className="space-y-4">
        {testMeetings.map((meeting) => (
          <div key={meeting.id} className="rounded-lg border p-4">
            <h2 className="text-lg font-semibold">{meeting.name}</h2>
            <p className="text-gray-600">위치: {meeting.location}</p>
            <p className="text-gray-600">
              날짜: {new Date(meeting.dateTime).toLocaleDateString("ko-KR")}
            </p>
            <Link
              href={`/meetings/${meeting.id}`}
              className="mt-2 inline-block rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
            >
              상세보기
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
