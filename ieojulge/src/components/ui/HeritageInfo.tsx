"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { cheomseongdaeInfo } from "@/data/heritageData";
import { useAppStore } from "@/store/useAppStore";

export function HeritageInfo() {
  const setPanelMode = useAppStore((state) => state.setPanelMode);

  return (
    <div className="panel-section">
      <p className="eyebrow">접근을 잇다</p>
      <h2>{cheomseongdaeInfo.name}</h2>
      <p>{cheomseongdaeInfo.summary}</p>

      <div className="location-line">
        <MapPin size={18} />
        <span>{cheomseongdaeInfo.location}</span>
      </div>

      <ul className="plain-list">
        {cheomseongdaeInfo.bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <button className="command-button" type="button" onClick={() => setPanelMode("create")}>
        AI 콘텐츠 창작하기
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
