"use client";

import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

type StarPoint = readonly [number, number, number];

type ConstellationData = {
  key: string;
  position: StarPoint;
  scale: number;
  stars: readonly StarPoint[];
  links: readonly (readonly [number, number])[];
};

const constellations: readonly ConstellationData[] = [
  {
    key: "dipper",
    position: [-4.6, 3.05, -8.2],
    scale: 0.6,
    stars: [
      [-1.7, 0.1, 0],
      [-1.05, 0.35, 0],
      [-0.34, 0.25, 0],
      [0.28, 0.54, 0],
      [0.92, 0.9, 0],
      [1.58, 1.08, 0],
      [2.18, 0.78, 0],
      [-0.2, -0.48, 0],
      [0.52, -0.66, 0]
    ],
    links: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [2, 7],
      [7, 8],
      [8, 4]
    ]
  },
  {
    key: "orion",
    position: [-0.64, 3.08, -6.5],
    scale: 0.52,
    stars: [
      [-0.82, 1.22, 0],
      [-0.02, 0.46, 0],
      [0.86, 1.08, 0],
      [-0.2, -0.46, 0],
      [0.36, -0.56, 0],
      [0.1, -1.3, 0],
      [-1.0, -1.15, 0],
      [1.12, -1.16, 0],
      [-0.58, -0.02, 0],
      [0.02, -0.1, 0],
      [0.62, -0.18, 0]
    ],
    links: [
      [0, 1],
      [1, 2],
      [1, 3],
      [3, 4],
      [4, 5],
      [6, 3],
      [4, 7],
      [8, 9],
      [9, 10]
    ]
  },
  {
    key: "cassiopeia",
    position: [-1.8, 3.92, -8.6],
    scale: 0.48,
    stars: [
      [-1.5, -0.28, 0],
      [-0.72, 0.48, 0],
      [0.06, -0.18, 0],
      [0.88, 0.58, 0],
      [1.68, -0.08, 0]
    ],
    links: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4]
    ]
  }
];

function MoonDisc() {
  const texture = useTexture("/media/moon-background-clean.png");

  return (
    <sprite position={[0.05, 3.65, -6.2]} scale={[1.18, 1.18, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={0.82}
        depthWrite={false}
        fog={false}
        toneMapped={false}
      />
    </sprite>
  );
}

function Constellation({ data }: { data: ConstellationData }) {
  const lineGeometry = useMemo(() => {
    const positions: number[] = [];

    data.links.forEach(([startIndex, endIndex]) => {
      positions.push(...data.stars[startIndex], ...data.stars[endIndex]);
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [data]);

  return (
    <group position={data.position} scale={data.scale}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#f7f1e7" transparent opacity={0.34} depthWrite={false} fog={false} toneMapped={false} />
      </lineSegments>
      {data.stars.map((star, index) => (
        <mesh key={`${data.key}-${index}`} position={star}>
          <sphereGeometry args={[index === 4 ? 0.055 : 0.044, 12, 12]} />
          <meshBasicMaterial color="#fff8d7" transparent opacity={0.78} depthWrite={false} fog={false} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

export function CelestialSky() {
  return (
    <group>
      <MoonDisc />
      {constellations.map((constellation) => (
        <Constellation key={constellation.key} data={constellation} />
      ))}
    </group>
  );
}
