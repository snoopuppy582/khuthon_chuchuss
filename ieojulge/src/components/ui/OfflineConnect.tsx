"use client";

import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { ExternalLink, Loader2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getOfflineTargetUrl } from "@/lib/qrTarget";

export function OfflineConnect() {
  const [qrState, setQrState] = useState<{ dataUrl: string; targetUrl: string } | null>(null);

  useEffect(() => {
    const origin = window.location.origin;
    const url = getOfflineTargetUrl(origin);
    QRCode.toDataURL(url, {
      margin: 2,
      width: 260,
      color: {
        dark: "#14231f",
        light: "#fffaf0"
      }
    }).then((dataUrl) => setQrState({ dataUrl, targetUrl: url }));
  }, []);

  return (
    <div className="panel-section">
      <p className="eyebrow">실제 방문 연결</p>
      <h2>관객용 QR로 첨성대 방문 정보 확인</h2>
      <p>로컬 AI 시연과 분리된 공개 방문 페이지로 이어집니다.</p>

      <div className="qr-box">
        {qrState ? (
          <Image src={qrState.dataUrl} alt="첨성대 방문 정보 QR 코드" width={220} height={220} unoptimized />
        ) : (
          <Loader2 className="spin" size={32} />
        )}
      </div>

      <div className="location-line">
        <MapPin size={18} />
        <span>경주시 인왕동 첨성대</span>
      </div>

      <div className="qr-mode-list">
        <div>
          <strong>로컬 시연</strong>
          <span>3D 체험 + OpenAI 생성</span>
        </div>
        <div>
          <strong>관객 QR</strong>
          <span>공개 방문 정보 페이지</span>
        </div>
      </div>

      {qrState && <p className="qr-url">{qrState.targetUrl}</p>}

      <Link className="command-button" href="/offline/cheomseongdae">
        <ExternalLink size={18} />
        방문 정보 페이지 열기
      </Link>
    </div>
  );
}
