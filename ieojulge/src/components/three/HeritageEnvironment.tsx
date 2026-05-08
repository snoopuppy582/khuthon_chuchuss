"use client";

import { useMemo } from "react";
import * as THREE from "three";

const wallSegments = [
  { position: [-3.95, 0.18, -2.55], rotation: 0.16, length: 6 },
  { position: [3.95, 0.18, -2.45], rotation: -0.2, length: 6 },
  { position: [-4.85, 0.18, 0.6], rotation: 1.36, length: 5 },
  { position: [4.85, 0.18, 0.45], rotation: -1.36, length: 5 }
] as const;

const rocks = [
  [-3.1, 0.08, 1.15, 0.34, 0.22, 0.28],
  [-2.65, 0.07, 1.55, 0.2, 0.14, 0.18],
  [2.9, 0.08, 1.35, 0.28, 0.2, 0.22],
  [3.35, 0.06, 1.75, 0.18, 0.12, 0.16],
  [-3.45, 0.07, -1.2, 0.25, 0.18, 0.21],
  [3.5, 0.07, -1.1, 0.22, 0.15, 0.2]
] as const;

const shrubs = [
  [-3.6, 0.02, 0.6, 0.5],
  [-3.2, 0.02, -0.8, 0.42],
  [3.4, 0.02, 0.5, 0.46],
  [3.7, 0.02, -0.65, 0.38],
  [-1.95, 0.02, -2.35, 0.33],
  [2.2, 0.02, -2.45, 0.36]
] as const;

function useHeritageSignTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 640;

    const context = canvas.getContext("2d");
    if (!context) {
      return new THREE.CanvasTexture(canvas);
    }

    context.fillStyle = "#ead7aa";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#23322b";
    context.fillRect(0, 0, canvas.width, 148);
    context.fillStyle = "#d2a64f";
    context.fillRect(0, 148, canvas.width, 10);

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#fff7df";
    context.font = "700 76px Arial, sans-serif";
    context.fillText("첨성대", 512, 75);

    context.fillStyle = "#1b2520";
    context.font = "700 52px Arial, sans-serif";
    context.fillText("별을 보던 곳", 512, 282);

    context.fillStyle = "#4a4033";
    context.font = "500 36px Arial, sans-serif";
    context.fillText("오늘의 문화로 다시 이어집니다", 512, 378);

    context.strokeStyle = "rgba(27, 37, 32, 0.22)";
    context.lineWidth = 7;
    context.strokeRect(38, 188, canvas.width - 76, canvas.height - 236);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, []);
}

function WallSegment({
  position,
  rotation,
  length
}: {
  position: readonly [number, number, number];
  rotation: number;
  length: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {Array.from({ length }).map((_, index) => (
        <group key={index} position={[(index - (length - 1) / 2) * 0.55, 0, 0]}>
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <boxGeometry args={[0.52, 0.22, 0.28]} />
            <meshStandardMaterial color={index % 2 === 0 ? "#5d5a50" : "#6a665b"} roughness={0.98} />
          </mesh>
          <mesh castShadow receiveShadow position={[0.04, 0.23, 0.01]}>
            <boxGeometry args={[0.46, 0.2, 0.26]} />
            <meshStandardMaterial color={index % 2 === 0 ? "#736e61" : "#625f55"} roughness={0.98} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function SignBoard() {
  const signTexture = useHeritageSignTexture();

  return (
    <group position={[3.02, 0.02, 1.28]} rotation={[0, -0.28, 0]} scale={0.72}>
      <mesh castShadow receiveShadow position={[0, 1.09, -0.03]}>
        <boxGeometry args={[1.58, 0.12, 0.18]} />
        <meshStandardMaterial color="#261d16" roughness={0.78} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 1.18, -0.03]} rotation={[0, 0, 0.02]}>
        <boxGeometry args={[1.44, 0.08, 0.22]} />
        <meshStandardMaterial color="#5d503c" roughness={0.72} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.46, 0.42, -0.04]}>
        <boxGeometry args={[0.08, 0.84, 0.08]} />
        <meshStandardMaterial color="#4e3d2c" roughness={0.78} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.46, 0.42, -0.04]}>
        <boxGeometry args={[0.08, 0.84, 0.08]} />
        <meshStandardMaterial color="#4e3d2c" roughness={0.78} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.68, 0]}>
        <boxGeometry args={[1.34, 0.72, 0.08]} />
        <meshStandardMaterial color="#32271d" roughness={0.82} />
      </mesh>
      <mesh position={[0, 0.69, 0.045]}>
        <planeGeometry args={[1.12, 0.56]} />
        <meshBasicMaterial map={signTexture} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.13, 0]}>
        <boxGeometry args={[1.48, 0.1, 0.34]} />
        <meshStandardMaterial color="#5d503c" roughness={0.78} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.04, 0]}>
        <boxGeometry args={[1.18, 0.08, 0.46]} />
        <meshStandardMaterial color="#3f3b32" roughness={0.96} />
      </mesh>
      <pointLight position={[0, 0.84, 0.18]} color="#f0c66a" intensity={0.18} distance={1.7} />
    </group>
  );
}

function Rock({
  item
}: {
  item: readonly [number, number, number, number, number, number];
}) {
  const [x, y, z, sx, sy, sz] = item;
  return (
    <mesh castShadow receiveShadow position={[x, y, z]} scale={[sx, sy, sz]} rotation={[0.2, x * 0.4, 0.1]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#67675d" roughness={0.98} />
    </mesh>
  );
}

function Shrub({
  item
}: {
  item: readonly [number, number, number, number];
}) {
  const [x, y, z, scale] = item;
  return (
    <group position={[x, y, z]} scale={scale}>
      <mesh castShadow position={[0, 0.18, 0]}>
        <coneGeometry args={[0.26, 0.42, 8]} />
        <meshStandardMaterial color="#2d4a34" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0.18, 0.14, 0.08]}>
        <coneGeometry args={[0.2, 0.32, 8]} />
        <meshStandardMaterial color="#36553d" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[-0.17, 0.13, -0.05]}>
        <coneGeometry args={[0.18, 0.3, 8]} />
        <meshStandardMaterial color="#263f2f" roughness={0.9} />
      </mesh>
    </group>
  );
}

function GroundTextureMarks() {
  const marks = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, index) => ({
        x: Math.sin(index * 2.1) * 3.8,
        z: Math.cos(index * 1.7) * 3.35,
        scale: 0.05 + ((index % 5) * 0.012),
        rotation: index * 0.41
      })),
    []
  );

  return (
    <group>
      {marks.map((mark, index) => (
        <mesh
          key={index}
          rotation={[-Math.PI / 2, 0, mark.rotation]}
          position={[mark.x, -0.031, mark.z]}
        >
          <circleGeometry args={[mark.scale, 10]} />
          <meshBasicMaterial color={index % 2 === 0 ? "#22261f" : "#191d19"} transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  );
}

export function HeritageEnvironment() {
  return (
    <group>
      <GroundTextureMarks />
      {wallSegments.map((segment) => (
        <WallSegment
          key={`${segment.position[0]}-${segment.position[2]}`}
          position={segment.position}
          rotation={segment.rotation}
          length={segment.length}
        />
      ))}
      <SignBoard />
      {rocks.map((item) => (
        <Rock key={`${item[0]}-${item[2]}`} item={item} />
      ))}
      {shrubs.map((item) => (
        <Shrub key={`${item[0]}-${item[2]}`} item={item} />
      ))}
    </group>
  );
}
