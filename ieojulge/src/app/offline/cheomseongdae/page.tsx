import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, ExternalLink, Eye, MapPin, Navigation, Route, Sparkles } from "lucide-react";

const courseItems = [
  { name: "동궁과 월지", time: "도보 약 10분", note: "밤 풍경이 좋은 신라 궁궐 유적" },
  { name: "대릉원", time: "도보 약 15분", note: "신라 왕릉을 가까이서 볼 수 있는 산책 코스" },
  { name: "월정교", time: "도보 약 20분", note: "경주 야경과 함께 보기 좋은 교량" }
];

const visitPoints = [
  { title: "돌의 층", text: "3D에서 본 석재의 결을 현장에서 다시 확인" },
  { title: "창의 방향", text: "첨성대 중앙 창이 만든 관찰의 감각 보기" },
  { title: "밤의 분위기", text: "별을 보던 장소라는 기억으로 다시 바라보기" }
];

const bridgeSteps = [
  { label: "01", title: "접근을 잇다", text: "3D 공간에서 첨성대의 형태를 기억합니다." },
  { label: "02", title: "참여를 잇다", text: "AI 창작으로 문화 경험에 참여합니다." },
  { label: "03", title: "경험을 잇다", text: "QR을 통해 실제 방문 정보로 이동합니다." }
];

export default function OfflineCheomseongdaePage() {
  return (
    <main className="offline-page">
      <section className="offline-hero">
        <Image
          className="offline-hero-image"
          src="/media/cheomseongdae-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="offline-scrim" aria-hidden="true" />
        <Link className="ghost-link" href="/experience">
          <ArrowLeft size={18} />
          3D 체험으로 돌아가기
        </Link>
        <div className="offline-hero-inner">
          <div className="offline-copy">
            <p className="eyebrow">관객용 QR 연결</p>
            <h1>첨성대 방문 정보</h1>
            <p>
              3D 체험을 즐기셨다면, 실제 첨성대를 방문해보는 것은 어떠신가요?
            </p>
            <div className="offline-actions">
              <Link className="command-button" href="/experience">
                <Sparkles size={18} />
                공개 3D 체험 보기
              </Link>
            </div>
          </div>

          <aside className="offline-quick-card">
            <strong>QR로 이어진 다음 행동</strong>
            <div>
              <MapPin size={18} />
              <span>경주시 인왕동 첨성대</span>
            </div>
            <div>
              <Clock size={18} />
              <span>권장 흐름: 첨성대 → 동궁과 월지 → 월정교</span>
            </div>
            <div>
              <Navigation size={18} />
              <span>도보 산책 중심의 짧은 방문 코스</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="bridge-step-section">
        {bridgeSteps.map((item) => (
          <article className="bridge-step-item" key={item.label}>
            <span>{item.label}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="visit-summary-section">
        <div className="visit-summary-copy">
          <p className="eyebrow">현장 방문 요약</p>
          <h2>스캔한 순간부터 실제 장소까지</h2>
          <p>
            관객은 발표장에서 QR을 스캔하고, 첨성대의 위치와 관람 포인트, 주변 코스를 한 화면에서 확인합니다.
          </p>
        </div>
        <div className="visit-summary-card">
          <div>
            <span>장소</span>
            <strong>경주 첨성대</strong>
          </div>
          <div>
            <span>핵심 경험</span>
            <strong>별을 보던 장소를 다시 보기</strong>
          </div>
          <div>
            <span>연결 방식</span>
            <strong>3D 체험 → AI 창작 → QR 방문</strong>
          </div>
        </div>
      </section>

      <section className="offline-grid">
        <article className="info-band">
          <MapPin size={22} />
          <div>
            <h2>위치</h2>
            <p>경상북도 경주시 인왕동 일대</p>
          </div>
        </article>

        <article className="info-band">
          <ExternalLink size={22} />
          <div>
            <h2>공식 정보</h2>
            <a href="https://www.heritage.go.kr/" target="_blank" rel="noreferrer">
              국가유산포털에서 상세 정보 확인
            </a>
          </div>
        </article>
      </section>

      <section className="visit-point-section">
        <div className="section-heading">
          <Eye size={22} />
          <h2>현장에서 다시 볼 것</h2>
        </div>
        <div className="visit-point-list">
          {visitPoints.map((item) => (
            <article className="visit-point-item" key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="course-section">
        <div className="section-heading">
          <Route size={22} />
          <h2>함께 이어지는 주변 코스</h2>
        </div>
        <div className="course-list">
          {courseItems.map((item) => (
            <article className="course-item" key={item.name}>
              <strong>{item.name}</strong>
              <span>{item.time}</span>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
