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

function useFrameLabelTexture(item: CommunityItem) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 180;

    const context = canvas.getContext("2d");
    if (!context) {
      return new THREE.CanvasTexture(canvas);
    }

    context.fillStyle = "#efe0b6";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#253028";
    context.fillRect(0, 0, canvas.width, 44);
    context.fillStyle = "#fff5da";
    context.font = "700 24px Arial, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(item.type.toUpperCase(), canvas.width / 2, 22);

    context.fillStyle = "#17231f";
    context.font = "700 34px Arial, sans-serif";
    context.fillText(item.title.slice(0, 12), canvas.width / 2, 94);

    context.fillStyle = "#6d5b3d";
    context.font = "500 22px Arial, sans-serif";
    context.fillText(item.author, canvas.width / 2, 138);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, [item]);
}

function BoardLantern({ x }: { x: number }) {
  return (
    <group position={[x, 1.08, 0.08]}>
      <mesh castShadow position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.36, 12]} />
        <meshStandardMaterial color="#372a20" roughness={0.72} />
      </mesh>
      <mesh castShadow position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.14, 0.18, 0.28, 18]} />
        <meshStandardMaterial color="#dfb457" emissive="#8a4f1d" emissiveIntensity={0.38} roughness={0.55} />
      </mesh>
      <pointLight position={[0, -0.02, 0.18]} color="#f0bd65" intensity={0.42} distance={2.4} />
    </group>
  );
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
      <mesh castShadow receiveShadow position={[0, 1.04, -0.06]}>
        <boxGeometry args={[8.7, 0.22, 0.24]} />
        <meshStandardMaterial color="#261d16" roughness={0.8} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -1.19, -0.04]}>
        <boxGeometry args={[8.58, 0.16, 0.22]} />
        <meshStandardMaterial color="#2b2119" roughness={0.86} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.08, 0.015]}>
        <boxGeometry args={[7.8, 1.74, 0.06]} />
        <meshStandardMaterial color="#7b6848" roughness={0.92} />
      </mesh>
      <mesh position={[0, -0.08, 0.048]}>
        <planeGeometry args={[7.52, 1.48]} />
        <meshBasicMaterial color="#5f513a" transparent opacity={0.3} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.98, 0.06]}>
        <planeGeometry args={[2.2, 0.68]} />
        <meshBasicMaterial map={noticeTexture} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <BoardLantern x={-3.35} />
      <BoardLantern x={3.35} />
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
  const labelTexture = useFrameLabelTexture(item);
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
        <boxGeometry args={[1.02, 1.28, 0.07]} />
        <meshStandardMaterial color="#2f2420" roughness={0.82} metalness={0.02} />
      </mesh>
      <mesh position={[0, 0.1, 0.04]} onClick={() => setCurrentResult(item)}>
        <planeGeometry args={[0.8, 0.84]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.48, 0.046]} onClick={() => setCurrentResult(item)}>
        <planeGeometry args={[0.78, 0.25]} />
        <meshBasicMaterial map={labelTexture} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.71, 0.01]}>
        <boxGeometry args={[1.05, 0.08, 0.18]} />
        <meshStandardMaterial color="#6f6046" roughness={0.74} />
      </mesh>
      <mesh position={[0, -0.81, -0.02]}>
        <boxGeometry args={[0.9, 0.1, 0.34]} />
        <meshStandardMaterial color="#191f1b" roughness={0.9} />
      </mesh>
      <mesh position={[-0.43, 0.1, 0.05]}>
        <boxGeometry args={[0.035, 0.93, 0.03]} />
        <meshStandardMaterial color="#b58e48" roughness={0.62} />
      </mesh>
      <mesh position={[0.43, 0.1, 0.05]}>
        <boxGeometry args={[0.035, 0.93, 0.03]} />
        <meshStandardMaterial color="#b58e48" roughness={0.62} />
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
