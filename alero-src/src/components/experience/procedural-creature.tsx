"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

export function ProceduralCreature() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 1.6) * 0.08;
    group.current.rotation.y = Math.sin(t * 0.6) * 0.35;
  });

  return (
    <group ref={group}>
      {/* body */}
      <mesh castShadow scale={[1, 0.92, 1]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color="#a394ff" roughness={0.35} />
      </mesh>

      {/* ear buds */}
      <mesh position={[-0.55, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color="#a394ff" roughness={0.35} />
      </mesh>
      <mesh position={[0.55, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color="#a394ff" roughness={0.35} />
      </mesh>

      {/* eyes */}
      <mesh position={[-0.32, 0.12, 0.88]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color="#1c1721" roughness={0.6} />
      </mesh>
      <mesh position={[0.32, 0.12, 0.88]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color="#1c1721" roughness={0.6} />
      </mesh>

      {/* blush */}
      <mesh position={[-0.58, -0.15, 0.78]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.14, 24]} />
        <meshStandardMaterial color="#ff8f70" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.58, -0.15, 0.78]}>
        <circleGeometry args={[0.14, 24]} />
        <meshStandardMaterial color="#ff8f70" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
