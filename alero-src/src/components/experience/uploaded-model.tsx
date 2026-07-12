"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Box3, Group, Vector3 } from "three";

export function UploadedModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const group = useRef<Group>(null);
  const inner = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const box = new Box3().setFromObject(inner);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 1.8 / maxDim;
    inner.scale.setScalar(scale);
    inner.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }, [inner]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 1.6) * 0.08;
    group.current.rotation.y = Math.sin(t * 0.6) * 0.35;
  });

  return (
    <group ref={group}>
      <primitive object={inner} />
    </group>
  );
}
