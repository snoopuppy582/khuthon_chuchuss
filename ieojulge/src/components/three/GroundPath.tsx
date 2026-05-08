"use client";

function StonePavers() {
  return (
    <group>
      {Array.from({ length: 12 }).map((_, index) => (
        <mesh
          key={index}
          rotation={[-Math.PI / 2, 0, 0.02 * (index % 3)]}
          receiveShadow
          position={[
            (index % 2 === 0 ? -0.04 : 0.04),
            0.006,
            3.9 - index * 0.34
          ]}
        >
          <boxGeometry args={[0.72 + (index % 3) * 0.04, 0.25, 0.035]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#5d5f55" : "#6c6a5d"} roughness={0.96} />
        </mesh>
      ))}
    </group>
  );
}

export function GroundPath() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.06, 0]}>
        <circleGeometry args={[8.6, 128]} />
        <meshStandardMaterial color="#101714" roughness={1} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.044, 0]}>
        <circleGeometry args={[2.05, 96]} />
        <meshStandardMaterial color="#23241f" roughness={0.98} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.036, 0]}>
        <ringGeometry args={[1.85, 2.02, 128]} />
        <meshStandardMaterial color="#6f6046" roughness={0.92} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.038, 2.2]}>
        <planeGeometry args={[1.55, 4.2]} />
        <meshStandardMaterial color="#1c211d" roughness={1} />
      </mesh>

      <StonePavers />
    </group>
  );
}
