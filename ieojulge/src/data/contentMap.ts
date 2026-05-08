export type CreationStyle = "starlight-gukak" | "cyber-silla" | "dream-night";
export type CreationFormat = "image" | "song" | "video";

export type StyleOption = {
  id: CreationStyle;
  label: string;
  tone: string;
  promptHint: string;
  promptTemplate: string;
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
    promptHint: "warm starlight, Korean traditional music mood, elegant gold accents",
    promptTemplate:
      "첨성대를 별빛 아래 고요하게 세우고, 신라의 밤과 국악적 분위기가 느껴지는 따뜻한 이미지로 만들어줘."
  },
  {
    id: "cyber-silla",
    label: "사이버 신라",
    tone: "신라 문양과 현대적인 네온 감각",
    promptHint: "cyber Silla, subtle neon, Korean heritage pattern, cinematic",
    promptTemplate:
      "첨성대를 현대적인 네온 빛과 신라 문양으로 표현하되, 실제 유적의 형태는 존중하는 미래적인 이미지로 만들어줘."
  },
  {
    id: "dream-night",
    label: "몽환적 밤하늘",
    tone: "푸른 밤하늘과 은하수 분위기",
    promptHint: "dreamlike night sky, milky way, poetic atmosphere, soft glow",
    promptTemplate:
      "첨성대 위로 은하수와 별자리가 흐르는 몽환적인 밤하늘을 만들고, 조용하고 시적인 분위기로 표현해줘."
  }
];

export const contentMap: Record<CreationStyle, ContentPreset> = {
  "starlight-gukak": {
    style: "starlight-gukak",
    songs: [
      {
        id: "cheomseongdae-starlight-song-1",
        title: "선덕여왕의 별노래",
        src: "/media/cheomseongdae_starlight_song_01.mp3",
        poster: "/media/cheomseongdae_song_artwork.jpg",
        description: "첨성대와 별빛, 선덕여왕의 밤을 떠올리며 만든 오디오 콘텐츠입니다."
      }
    ],
    videos: [
      {
        id: "cheomseongdae-starlight-film",
        title: "첨성대의 별빛",
        src: "/media/cheomseongdae_starlight_film.mp4",
        poster: "/media/cheomseongdae_starlight_film_poster.png",
        description: "선덕여왕의 실루엣과 회전하는 별빛으로 첨성대의 밤하늘을 AI 영상으로 상상해봤습니다."
      }
    ],
    fallbackImages: ["/media/cheomseongdae_cute_image.png", "/media/cheomseongdae_poster_01.svg"]
  },
  "cyber-silla": {
    style: "cyber-silla",
    songs: [
      {
        id: "cheomseongdae-starlight-song-1",
        title: "선덕여왕의 별노래",
        src: "/media/cheomseongdae_starlight_song_01.mp3",
        poster: "/media/cheomseongdae_song_artwork.jpg",
        description: "첨성대와 별빛, 선덕여왕의 밤을 떠올리며 만든 오디오 콘텐츠입니다."
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
        id: "cheomseongdae-starlight-song-1",
        title: "선덕여왕의 별노래",
        src: "/media/cheomseongdae_starlight_song_01.mp3",
        poster: "/media/cheomseongdae_song_artwork.jpg",
        description: "첨성대와 별빛, 선덕여왕의 밤을 떠올리며 만든 오디오 콘텐츠입니다."
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

export function getStylePromptTemplate(style: CreationStyle) {
  return styleOptions.find((item) => item.id === style)?.promptTemplate ?? styleOptions[0].promptTemplate;
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
