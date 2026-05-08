export type CreationStyle = "starlight-gukak" | "cyber-silla" | "dream-night";
export type CreationFormat = "image" | "song" | "video";

export type StyleOption = {
  id: CreationStyle;
  label: string;
  tone: string;
  promptHint: string;
};

export type MediaVariant = {
  id: string;
  title: string;
  src?: string;
  poster: string;
  description: string;
};

export type ContentPreset = {
  style: CreationStyle;
  songs: MediaVariant[];
  videos: MediaVariant[];
  fallbackImages: string[];
};

export const styleOptions: StyleOption[] = [
  {
    id: "starlight-gukak",
    label: "별빛 국악",
    tone: "따뜻한 금빛과 국악적 분위기",
    promptHint: "warm starlight, Korean traditional music mood, elegant gold accents"
  },
  {
    id: "cyber-silla",
    label: "사이버 신라",
    tone: "신라 문양과 현대적인 네온 감각",
    promptHint: "cyber Silla, subtle neon, Korean heritage pattern, cinematic"
  },
  {
    id: "dream-night",
    label: "몽환적 밤하늘",
    tone: "푸른 밤하늘과 은하수 분위기",
    promptHint: "dreamlike night sky, milky way, poetic atmosphere, soft glow"
  }
];

export const contentMap: Record<CreationStyle, ContentPreset> = {
  "starlight-gukak": {
    style: "starlight-gukak",
    songs: [
      {
        id: "cheomseongdae-starlight-song-1",
        title: "첨성대의 별빛 1",
        src: "/media/cheomseongdae_starlight_song_01.mp3",
        poster: "/media/cheomseongdae_poster_01.svg",
        description: "첨성대와 별빛을 주제로 만든 오디오 콘텐츠입니다."
      },
      {
        id: "cheomseongdae-starlight-song-2",
        title: "첨성대의 별빛 2",
        src: "/media/cheomseongdae_starlight_song_02.mp3",
        poster: "/media/community/dummy_galaxy.svg",
        description: "같은 주제를 다른 분위기로 이어 만든 두 번째 오디오 콘텐츠입니다."
      }
    ],
    videos: [
      {
        id: "cheomseongdae-starlight-film",
        title: "첨성대의 별빛",
        poster: "/media/cheomseongdae_starlight_story.svg",
        description: "사전 제작 영상 파일이 들어오기 전까지 쓰는 영상형 백업 장면입니다."
      }
    ],
    fallbackImages: ["/media/cheomseongdae_poster_01.svg", "/media/community/dummy_galaxy.svg"]
  },
  "cyber-silla": {
    style: "cyber-silla",
    songs: [
      {
        id: "cyber-silla-rhythm",
        title: "사이버 신라 리듬",
        src: "/media/cheomseongdae_starlight_gukak.wav",
        poster: "/media/cheomseongdae_poster_02.svg",
        description: "신라 문양과 전자음을 결합한다는 설정의 백업 오디오입니다."
      }
    ],
    videos: [
      {
        id: "neon-silla-night",
        title: "네온 신라의 밤",
        poster: "/media/cheomseongdae_cyber_story.svg",
        description: "네온 신라 콘셉트를 보여주는 영상형 백업 장면입니다."
      }
    ],
    fallbackImages: ["/media/cheomseongdae_poster_02.svg", "/media/community/dummy_cyber.svg"]
  },
  "dream-night": {
    style: "dream-night",
    songs: [
      {
        id: "gyeongju-night-sky",
        title: "경주의 밤하늘",
        src: "/media/cheomseongdae_starlight_gukak.wav",
        poster: "/media/cheomseongdae_poster_03.svg",
        description: "몽환적인 별빛 분위기의 백업 오디오입니다."
      }
    ],
    videos: [
      {
        id: "sky-people-night",
        title: "하늘과 사람을 잇는 밤",
        poster: "/media/cheomseongdae_dream_story.svg",
        description: "별자리와 첨성대를 연결한 영상형 백업 장면입니다."
      }
    ],
    fallbackImages: ["/media/cheomseongdae_poster_03.svg", "/media/community/dummy_night.svg"]
  }
};

export function getStyleLabel(style: CreationStyle) {
  return styleOptions.find((item) => item.id === style)?.label ?? "별빛 국악";
}

export function getMediaVariant(style: CreationStyle, format: Exclude<CreationFormat, "image">, seed: number) {
  const preset = contentMap[style];
  const variants = format === "song" ? preset.songs : preset.videos;
  const index = variants.length > 0 ? Math.abs(seed) % variants.length : 0;

  return variants[index] ?? {
    id: `${format}-fallback`,
    title: format === "song" ? "첨성대 사운드" : "첨성대 영상",
    poster: preset.fallbackImages[0],
    description: "미디어 파일이 들어오기 전까지 쓰는 백업 콘텐츠입니다."
  };
}
