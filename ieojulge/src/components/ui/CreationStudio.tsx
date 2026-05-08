"use client";

import { ImageIcon, Loader2, Music, Sparkles, Video } from "lucide-react";
import { getMediaVariant, getStyleLabel, styleOptions, type CreationFormat } from "@/data/contentMap";
import { useAppStore } from "@/store/useAppStore";
import type { CommunityItem } from "@/data/communityFeed";

const formatOptions: Array<{ id: CreationFormat; label: string; icon: typeof ImageIcon }> = [
  { id: "image", label: "이미지", icon: ImageIcon },
  { id: "song", label: "노래", icon: Music },
  { id: "video", label: "영상", icon: Video }
];

export function CreationStudio() {
  const selectedStyle = useAppStore((state) => state.selectedStyle);
  const selectedFormat = useAppStore((state) => state.selectedFormat);
  const isGenerating = useAppStore((state) => state.isGenerating);
  const error = useAppStore((state) => state.error);
  const setSelectedStyle = useAppStore((state) => state.setSelectedStyle);
  const setSelectedFormat = useAppStore((state) => state.setSelectedFormat);
  const addGeneratedItem = useAppStore((state) => state.addGeneratedItem);
  const setGenerating = useAppStore((state) => state.setGenerating);
  const setError = useAppStore((state) => state.setError);

  async function handleCreate() {
    setGenerating(true);
    setError(null);

    try {
      if (selectedFormat === "image") {
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ style: selectedStyle })
        });

        if (!response.ok) {
          throw new Error("이미지 생성 요청이 실패했습니다.");
        }

        const data = (await response.json()) as { imageUrl: string; fallback?: boolean };
        const item: CommunityItem = {
          id: `generated-${Date.now()}`,
          author: "나",
          type: "image",
          title: `${getStyleLabel(selectedStyle)} 첨성대`,
          src: data.imageUrl,
          previewImage: data.imageUrl,
          style: selectedStyle,
          description: data.fallback
            ? "API 키 또는 네트워크 문제로 백업 이미지를 표시했습니다."
            : "OpenAI API로 생성된 실시간 이미지입니다."
        };
        addGeneratedItem(item);
        return;
      }

      const seed = Date.now();
      const media = getMediaVariant(selectedStyle, selectedFormat, seed);
      const item: CommunityItem = {
        id: `generated-${seed}`,
        author: "나",
        type: selectedFormat,
        title: media.title,
        src: media.src,
        previewImage: media.poster,
        style: selectedStyle,
        description: media.description
      };
      addGeneratedItem(item);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "창작 결과를 만들지 못했습니다.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="panel-section">
      <p className="eyebrow">소비를 잇다</p>
      <h2>AI 콘텐츠 창작</h2>
      <p>전통문화 요소를 이미지, 노래, 영상 형식으로 바꿔 직접 참여합니다.</p>

      <div className="control-group">
        <span className="control-label">스타일</span>
        <div className="segmented-list">
          {styleOptions.map((option) => (
            <button
              className={option.id === selectedStyle ? "segment active" : "segment"}
              key={option.id}
              type="button"
              onClick={() => setSelectedStyle(option.id)}
            >
              <span>{option.label}</span>
              <small>{option.tone}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <span className="control-label">형식</span>
        <div className="format-grid">
          {formatOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                className={option.id === selectedFormat ? "format-button active" : "format-button"}
                key={option.id}
                type="button"
                onClick={() => setSelectedFormat(option.id)}
              >
                <Icon size={20} />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}

      <button className="command-button" type="button" onClick={handleCreate} disabled={isGenerating}>
        {isGenerating ? <Loader2 className="spin" size={18} /> : <Sparkles size={18} />}
        {isGenerating ? "AI가 별을 다시 그리는 중" : "창작하기"}
      </button>
    </div>
  );
}
