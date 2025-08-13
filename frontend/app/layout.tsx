import type { Metadata } from "next";
import { Noto_Sans_KR, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { MobileAppLayout } from "@/components/layout/mobile-app-layout";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SixBeat - DAY6 음원정보팀",
  description: "DAY6 음원 차트 실시간 추적 및 스트리밍/투표 지원 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKR.variable} ${montserrat.variable} antialiased font-sans`}
      >
        <Providers>
          <MobileAppLayout>{children}</MobileAppLayout>
        </Providers>
      </body>
    </html>
  );
}
