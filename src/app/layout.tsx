// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { pretendard, tenada } from "@/lib/fonts";
import "../styles/globals.css";

import Providers from "./providers";
import MainNav from "@/layout/Header";
import AppInitializer from "./AppInitializer";
import GlobalAuthHydrator from "./GlobalAuthHydrator";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export const metadata: Metadata = {
  title: {
    template: "%s | 같이 달램",
    default: "모임 플랫폼",
  },
  description: "다양한 모임을 찾고 참여하세요",
  keywords: ["모임", "커뮤니티", "활동", "취미"],
  authors: [{ name: "코드잇 프론트엔드11기 6조" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "11기 6조 모임 플랫폼",
    description: "다양한 모임을 찾고 참여하세요",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${tenada.variable}`}>
      <body className="flex min-h-dvh flex-col bg-gray-50">
        <Providers>
          {/* Authorization 헤더 동기화 (토큰 변경 시 apiClient에 반영)  */}
          <AppInitializer />
          {/* 토큰 존재 시 로그인 사용자 정보 하이드레이트 */}
          <GlobalAuthHydrator />
          <MainNav />
          {/* 메인이 남는 공간만 차지 = 헤더+푸터 있어도 100dvh 초과 안 함 */}
          <main className="min-h-0 flex-1">{children}</main>
        </Providers>
        <div
          id="global-loading"
          className="fixed inset-0 z-[9999] hidden items-center justify-center bg-[var(--color-purple-50)]/40 backdrop-blur-[3px] transition-opacity duration-200"
          role="status"
        >
          <LoadingSpinner />
        </div>
      </body>
    </html>
  );
}
