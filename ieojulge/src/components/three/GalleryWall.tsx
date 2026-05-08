"use client";

import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { communityFeed, type CommunityItem } from "@/data/communityFeed";
import { useAppStore } from "@/store/useAppStore";

function useNoticeTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 320;

    const context = canvas.getContext("2d");
    if (!context) {
      return new THREE.CanvasTexture(canvas);
    }

    context.fillStyle = "#17241f";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#d4a957";
    context.fillRect(0, 0, canvas.width, 16);
    context.fillRect(0, canvas.height - 16, canvas.width, 16);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#fff4d8";
    context.font = "700 74px Arial, sans-serif";
    context.fillText("참여 게시판", 512, 122);
    context.fillStyle = "#cfc7b4";
    context.font = "500 36px Arial, sans-serif";
    context.fillText("AI 창작물이 이곳에 쌓입니다", 512, 214);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, []);
}

function NoticeBoard() {
  const noticeTexture = useNoticeTexture();

  return (
    <group position={[0, 1.02, -3.98]}>
      <mesh castShadow receiveShadow position={[-3.92, -0.22, -0.04]}>
        <boxGeometry args={[0.16, 2.22, 0.16]} />
        <meshStandardMaterial color="#3a2b20" roughness={0.82} />
      </mesh>
      <mesh castShadow receiveShadow position={[3.92, -0.22, -0.04]}>
        <boxGeometry args={[0.16, 2.22, 0.16]} />
        <meshStandardMaterial color="#3a2b20" roughness={0.82} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.08, -0.08]}>
        <boxGeometry args={[8.3, 2.12, 0.14]} />
        <meshStandardMaterial color="#3f3024" roughness={0.86} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.08, 0.015]}>
        <boxGeometry args={[7.8, 1.74, 0.06]} />
        <meshStandardMaterial color="#7b6848" roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.98, 0.06]}>
        <planeGeometry args={[2.2, 0.68]} />
        <meshBasicMaterial map={noticeTexture} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function GalleryFrame({
  item,
  index,
  total
}: {
  item: CommunityItem;
  index: number;
  total: number;
}) {
  const texture = useTexture(item.previewImage);
  const setCurrentResult = useAppStore((state) => state.setCurrentResult);
  const angle = (-34 + (68 / Math.max(total - 1, 1)) * index) * (Math.PI / 180);
  const radius = 4.55;
  const x = Math.sin(angle) * radius;
  const z = -3.15 - Math.cos(angle) * 0.55;

  return (
    <group position={[x, 1.04, z]} rotation={[0, -angle * 0.78, 0]}>
      <mesh
        castShadow
        onClick={(event) => {
          event.stopPropagation();
          setCurrentResult(item);
        }}
      >
        <boxGeometry args={[0.94, 1.16, 0.055]} />
        <meshStandardMaterial color="#2f2420" roughness={0.82} metalness={0.02} />
      </mesh>
      <mesh position={[0, 0.03, 0.034]} onClick={() => setCurrentResult(item)}>
        <planeGeometry args={[0.76, 0.9]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.62, 0.01]}>
        <boxGeometry args={[1.05, 0.08, 0.18]} />
        <meshStandardMaterial color="#6f6046" roughness={0.74} />
      </mesh>
      <mesh position={[0, -0.72, -0.02]}>
        <boxGeometry args={[0.9, 0.1, 0.34]} />
        <meshStandardMaterial color="#191f1b" roughness={0.9} />
      </mesh>
    </group>
  );
}

export function GalleryWall() {
  const generatedItems = useAppStore((state) => state.generatedItems);
  const items = [...generatedItems, ...communityFeed].slice(0, 6);

  return (
    <group>
      <NoticeBoard />
      {items.map((item, index) => (
        <GalleryFrame item={item} index={index} total={items.length} key={item.id} />
      ))}
    </group>
  );
}
