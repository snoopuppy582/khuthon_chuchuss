"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";
import { ConstellationBackdrop } from "./ConstellationBackdrop";
import { SidePanel } from "./SidePanel";
import { useAppStore } from "@/store/useAppStore";

const HeritageScene = dynamic(
  () => import("@/components/three/HeritageScene").then((mod) => mod.HeritageScene),
  {
    ssr: false,
    loading: () => <div className="scene-loading">3D 공간을 불러오는 중</div>
  }
);

export function ExperienceShell() {
  const reset = useAppStore((state) => state.reset);

  return (
    <main className="experience-shell">
      <header className="topbar">
        <Link className="icon-link" href="/" aria-label="홈으로 이동">
          <Home size={18} />
        </Link>
        <div>
          <strong>이어줄게</strong>
          <span>단절 → 이어짐 → 참여</span>
        </div>
        <button className="icon-link" type="button" onClick={reset} aria-label="체험 초기화">
          <RotateCcw size={18} />
        </button>
      </header>

      <section className="experience-layout">
        <div className="scene-wrap">
          <HeritageScene />
          <ConstellationBackdrop className="experience-sky-backdrop" />
          <div className="scene-caption">
            <span>첨성대 클릭 → AI 창작</span>
          </div>
        </div>
        <SidePanel />
      </section>
    </main>
  );
}
