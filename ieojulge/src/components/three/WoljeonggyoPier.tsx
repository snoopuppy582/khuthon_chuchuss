"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

const WOLJEONGGYO_MODEL = "/models/optimized/woljeonggyo-pier.glb";

export function WoljeonggyoPier() {
  const { scene } = useGLTF(WOLJEONGGYO_MODEL);

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
      }
    });

    return {
      scene: model,
      scale: 4.4 / Math.max(size.x, size.z, 1)
    };
  }, [scene]);

  return (
    <group position={[0, -0.03, 4.7]} scale={preparedModel.scale}>
      <primitive object={preparedModel.scene} />
    </group>
  );
}

useGLTF.preload(WOLJEONGGYO_MODEL);
