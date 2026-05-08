import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Eye, MapPin, Route, Sparkles } from "lucide-react";

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
        <div className="offline-copy">
          <p className="eyebrow">관객용 QR 연결</p>
          <h1>첨성대 방문 정보</h1>
          <p>
            3D 체험에서 생긴 관심이 실제 경주 방문으로 이어지도록 핵심 정보만 보여줍니다.
          </p>
          <div className="offline-actions">
            <Link className="command-button" href="/experience">
              <Sparkles size={18} />
              공개 3D 체험 보기
            </Link>
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

      <section className="qr-role-section">
        <article>
          <strong>발표자 시연</strong>
          <p>로컬 환경에서 3D 체험과 OpenAI 생성을 보여줍니다.</p>
        </article>
        <article>
          <strong>관객용 QR</strong>
          <p>공개 방문 정보 페이지로 연결되어 실제 장소까지 이어집니다.</p>
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
