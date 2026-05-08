"use client";

import { ChevronRight, MousePointer2, QrCode } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { HeritageInfo } from "./HeritageInfo";
import { CreationStudio } from "./CreationStudio";
import { ResultDisplay } from "./ResultDisplay";
import { OfflineConnect } from "./OfflineConnect";

export function SidePanel() {
  const panelMode = useAppStore((state) => state.panelMode);
  const setSelectedObject = useAppStore((state) => state.setSelectedObject);
  const setPanelMode = useAppStore((state) => state.setPanelMode);

  return (
    <aside className="side-panel">
      {panelMode === "idle" && (
        <div className="panel-section">
          <p className="eyebrow">3D 전통문화 공간</p>
          <h2>단절된 전통문화를 다시 이어줍니다.</h2>
          <p>
            웹에서 첨성대를 먼저 체험하고, AI로 직접 콘텐츠를 만든 뒤 실제 방문 정보로 이어집니다.
          </p>
          <button className="command-button" type="button" onClick={() => setSelectedObject("cheomseongdae")}>
            <MousePointer2 size={18} />
            첨성대 설명 열기
            <ChevronRight size={18} />
          </button>
          <button className="secondary-command" type="button" onClick={() => setPanelMode("qr")}>
            <QrCode size={18} />
            QR 연결 바로 보기
          </button>
        </div>
      )}

      {panelMode === "info" && <HeritageInfo />}
      {panelMode === "create" && <CreationStudio />}
      {panelMode === "result" && <ResultDisplay />}
      {panelMode === "qr" && <OfflineConnect />}
    </aside>
  );
}
