"use client";

import Image from "next/image";
import { Images, Music, QrCode, Share2, Video } from "lucide-react";
import { getStyleLabel } from "@/data/contentMap";
import { useAppStore } from "@/store/useAppStore";

export function ResultDisplay() {
  const result = useAppStore((state) => state.currentResult);
  const setPanelMode = useAppStore((state) => state.setPanelMode);

  if (!result) {
    return null;
  }

  const TypeIcon = result.type === "image" ? Images : result.type === "song" ? Music : Video;

  return (
    <div className="panel-section">
      <p className="eyebrow">경험을 잇다</p>
      <h2>{result.title}</h2>

      <div className="result-preview">
        <Image src={result.previewImage} alt={result.title} fill sizes="360px" unoptimized />
        <div className="result-badge">
          <TypeIcon size={16} />
          {result.type}
        </div>
      </div>

      <p>{result.description}</p>
      <div className="meta-row">
        <span>{result.author}</span>
        <span>{getStyleLabel(result.style)}</span>
      </div>

      {result.type === "song" && result.src && (
        <audio className="media-control" controls src={result.src}>
          오디오를 재생할 수 없습니다.
        </audio>
      )}

      {result.type === "video" && (
        <div className="video-fallback">
          <span />
          <p>백업 영상 장면</p>
        </div>
      )}

      <button className="secondary-command" type="button" onClick={() => setPanelMode("create")}>
        <Share2 size={18} />
        다른 형식으로 다시 만들기
      </button>
      <button className="command-button" type="button" onClick={() => setPanelMode("qr")}>
        <QrCode size={18} />
        QR로 실제 방문 이어가기
      </button>
    </div>
  );
}
