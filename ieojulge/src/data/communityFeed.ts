import type { CreationFormat, CreationStyle } from "./contentMap";

export type CommunityItem = {
  id: string;
  author: string;
  type: CreationFormat;
  title: string;
  src?: string;
  previewImage: string;
  style: CreationStyle;
  description: string;
};

export const communityFeed: CommunityItem[] = [
  {
    id: "dummy-1",
    author: "별을_세는_밤",
    type: "image",
    title: "첨성대 위의 은하수",
    src: "/media/community/dummy_galaxy.svg",
    previewImage: "/media/community/dummy_galaxy.svg",
    style: "dream-night",
    description: "첨성대와 은하수를 연결한 백업 이미지 콘텐츠"
  },
  {
    id: "dummy-2",
    author: "신라여행자",
    type: "song",
    title: "선덕여왕의 별노래",
    src: "/media/cheomseongdae_starlight_gukak.wav",
    previewImage: "/media/cheomseongdae_poster_01.svg",
    style: "starlight-gukak",
    description: "국악 분위기를 떠올리게 하는 백업 오디오 콘텐츠"
  },
  {
    id: "dummy-3",
    author: "경주러버",
    type: "video",
    title: "네온 신라의 밤",
    previewImage: "/media/cheomseongdae_cyber_story.svg",
    style: "cyber-silla",
    description: "사이버 신라 콘셉트의 백업 영상 콘텐츠"
  }
];
