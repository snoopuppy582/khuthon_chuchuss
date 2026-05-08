import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "이어줄게",
  description: "3D 체험과 AI 창작으로 전통문화의 단절을 잇는 서비스"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
