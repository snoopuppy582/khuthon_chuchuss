import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin, Route } from "lucide-react";

const courseItems = [
  { name: "동궁과 월지", time: "도보 약 10분", note: "밤 풍경이 좋은 신라 궁궐 유적" },
  { name: "대릉원", time: "도보 약 15분", note: "신라 왕릉을 가까이서 볼 수 있는 산책 코스" },
  { name: "월정교", time: "도보 약 20분", note: "경주 야경과 함께 보기 좋은 교량" }
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
