"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import { CelestialSky } from "./CelestialSky";
import { Cheomseongdae } from "./Cheomseongdae";
import { GalleryWall } from "./GalleryWall";
import { GroundPath } from "./GroundPath";
import { HeritageEnvironment } from "./HeritageEnvironment";
import { StarField } from "./StarField";
import { WoljeonggyoPier } from "./WoljeonggyoPier";

export function HeritageScene() {
  return (
    <Canvas
      camera={{ position: [6.2, 3.9, 7.4], fov: 42 }}
      shadows
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.6]}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.88;
      }}
    >
      <color attach="background" args={["#060c0d"]} />
      <fog attach="fog" args={["#060c0d", 9, 24]} />
      <ambientLight intensity={0.38} />
      <directionalLight
        position={[5.2, 7.5, 4.8]}
        intensity={1.95}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-3.4, 2.4, 2.8]} intensity={8.5} color="#d6a65b" distance={8} />
      <pointLight position={[3.3, 4.6, -5.2]} intensity={6.5} color="#8fc8bd" distance={12} />

      <Suspense fallback={null}>
        <Stars radius={80} depth={28} count={1400} factor={3.4} saturation={0.15} fade speed={0.18} />
        <StarField />
        <CelestialSky />
        <GroundPath />
        <WoljeonggyoPier />
        <HeritageEnvironment />
        <Cheomseongdae />
        <GalleryWall />
        <ContactShadows position={[0, 0.015, 0]} opacity={0.42} scale={9} blur={2.8} far={5} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={10.5}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 1.3, 0]}
      />
    </Canvas>
  );
}
