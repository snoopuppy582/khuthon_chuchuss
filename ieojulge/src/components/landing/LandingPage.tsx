import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function LandingPage() {
  return (
    <main className="landing-page">
      <section className="landing-hero">
        <Image
          className="landing-hero-image"
          src="/media/cheomseongdae-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="landing-scrim" aria-hidden="true" />

        <div className="landing-content">
          <p className="eyebrow">단절을 잇는 전통문화 체험</p>
          <h1>이어줄게</h1>
          <p className="hero-subtitle">
            3D 체험과 AI 창작으로 전통문화의 접근, 소비, 실제 방문을 하나의 흐름으로 잇습니다.
          </p>

          <div className="hero-actions">
            <Link className="primary-action" href="/experience">
              <Sparkles size={20} />
              체험 시작하기
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="landing-place" aria-hidden="true">
          첨성대 · 경주
        </div>
      </section>
    </main>
  );
}
