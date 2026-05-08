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
    title: "귀여운 첨성대 상상",
    src: "/media/cheomseongdae_cute_image.png",
    previewImage: "/media/cheomseongdae_cute_image.png",
    style: "dream-night",
    description: "첨성대의 귀여운 이미지를 상상해봤어요"
  },
  {
    id: "dummy-2",
    author: "신라여행자",
    type: "song",
    title: "선덕여왕의 별노래",
    src: "/media/cheomseongdae_starlight_song_01.mp3",
    previewImage: "/media/cheomseongdae_song_artwork.jpg",
    style: "starlight-gukak",
    description: "선덕여왕이 별을 보며 부른 노래를 상상해봤습니다"
  },
  {
    id: "dummy-3",
    author: "경주러버",
    type: "video",
    title: "첨성대의 별빛",
    src: "/media/cheomseongdae_starlight_film.mp4",
    previewImage: "/media/cheomseongdae_starlight_film_poster.png",
    style: "starlight-gukak",
    description: "아름다운 밤 하늘 아래 첨성대의 모습입니다"
  }
];
