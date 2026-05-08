"use client";

import { useCursor, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useAppStore } from "@/store/useAppStore";

const CHEOMSEONGDAE_MODEL = "/models/optimized/cheomseongdae.glb";

export function Cheomseongdae() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const setSelectedObject = useAppStore((state) => state.setSelectedObject);
  const { scene } = useGLTF(CHEOMSEONGDAE_MODEL);
  useCursor(hovered);

  const preparedModel = useMemo(() => {
    const model = scene.clone(true);
    model.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    model.position.set(-center.x, -box.min.y, -center.z);
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.roughness = 0.88;
          child.material.metalness = 0.03;
        }
      }
    });

    return {
      scene: model,
      scale: 3.35 / Math.max(size.y, 1)
    };
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.025;
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0.05, 0]}
      onClick={(event) => {
        event.stopPropagation();
        setSelectedObject("cheomseongdae");
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <group scale={preparedModel.scale}>
        <primitive object={preparedModel.scene} />
      </group>
    </group>
  );
}

useGLTF.preload(CHEOMSEONGDAE_MODEL);
