"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { ProceduralCreature } from "./procedural-creature";
import { UploadedModel } from "./uploaded-model";
import { ModelErrorBoundary } from "./model-error-boundary";

export function CreatureViewer({
  modelUrl,
  interactive = true,
  onModelError,
}: {
  modelUrl: string | null;
  interactive?: boolean;
  onModelError?: () => void;
}) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.6, 3.4], fov: 40 }}
      dpr={[1, 2]}
      gl={{ alpha: true, preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 2]} intensity={1.4} castShadow />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} />
      <pointLight position={[0, 2, 3]} intensity={0.4} />
      <Suspense fallback={null}>
        <ModelErrorBoundary
          fallback={<ProceduralCreature />}
          onError={onModelError}
        >
          {modelUrl ? <UploadedModel url={modelUrl} /> : <ProceduralCreature />}
        </ModelErrorBoundary>
        <ContactShadows
          position={[0, -0.9, 0]}
          opacity={0.35}
          scale={6}
          blur={2.5}
        />
      </Suspense>
      {interactive && (
        <OrbitControls
          enablePan={false}
          minDistance={2.2}
          maxDistance={5}
          autoRotate
          autoRotateSpeed={1.2}
        />
      )}
    </Canvas>
  );
}
