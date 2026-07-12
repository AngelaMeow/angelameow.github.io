"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ProceduralCreature } from "./procedural-creature";
import { UploadedModel } from "./uploaded-model";
import { ModelErrorBoundary } from "./model-error-boundary";
import {
  BackgroundCategory,
  CATEGORY_LABELS,
  drawBackground,
  pickRandomCategories,
} from "@/lib/backgrounds";

const POSTCARD_W = 640;
const POSTCARD_H = 800;

type Slot = {
  category: BackgroundCategory;
  seed: number;
  dataUrl: string | null;
};

function makeSlots(): Slot[] {
  return pickRandomCategories(3).map((category) => ({
    category,
    seed: Math.floor(Math.random() * 1_000_000),
    dataUrl: null,
  }));
}

function CaptureRig({
  modelUrl,
  category,
  seed,
  onCapture,
}: {
  modelUrl: string | null;
  category: BackgroundCategory;
  seed: number;
  onCapture: (dataUrl: string) => void;
}) {
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);
  const onCaptureRef = useRef(onCapture);
  onCaptureRef.current = onCapture;

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled || !canvasElRef.current) return;
      const charDataUrl = canvasElRef.current.toDataURL("image/png");

      const bg = document.createElement("canvas");
      bg.width = POSTCARD_W;
      bg.height = POSTCARD_H;
      const ctx = bg.getContext("2d");
      if (!ctx) return;
      drawBackground(ctx, POSTCARD_W, POSTCARD_H, category, seed);

      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        ctx.drawImage(img, 0, 0, POSTCARD_W, POSTCARD_H);
        onCaptureRef.current(bg.toDataURL("image/png"));
      };
      img.src = charDataUrl;
    }, 900);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [category, seed]);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        left: -99999,
        top: 0,
        width: POSTCARD_W,
        height: POSTCARD_H,
      }}
    >
      <Canvas
        gl={{ alpha: true, preserveDrawingBuffer: true }}
        camera={{ position: [0, 0.5, 6.2], fov: 34 }}
        onCreated={({ gl }) => {
          canvasElRef.current = gl.domElement;
        }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 4, 2]} intensity={1.3} />
        <directionalLight position={[-3, 1, -2]} intensity={0.4} />
        <Suspense fallback={null}>
          <group position={[0, -0.6, 0]}>
            <ModelErrorBoundary fallback={<ProceduralCreature />}>
              {modelUrl ? (
                <UploadedModel url={modelUrl} />
              ) : (
                <ProceduralCreature />
              )}
            </ModelErrorBoundary>
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}

async function sharePostcard(dataUrl: string, category: BackgroundCategory) {
  const shareData = {
    title: "A postcard from my imaginary friend",
    text: "I made an imaginary friend with Alero — here's a postcard from their journey.",
  };

  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], `alero-postcard-${category}.png`, {
      type: "image/png",
    });

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ ...shareData, files: [file] });
      return;
    }
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") return;
  }

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `alero-postcard-${category}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function PostcardCard({
  slot,
  index,
  modelUrl,
  onCapture,
}: {
  slot: Slot;
  index: number;
  modelUrl: string | null;
  onCapture: (index: number, dataUrl: string) => void;
}) {
  const handleCapture = useCallback(
    (dataUrl: string) => onCapture(index, dataUrl),
    [index, onCapture]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card"
    >
      <div className="relative aspect-[4/5] w-full bg-background">
        {slot.dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={slot.dataUrl}
            alt={`Postcard from ${CATEGORY_LABELS[slot.category]}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            <p className="text-xs text-muted">Painting the scene…</p>
          </div>
        )}
        {!slot.dataUrl && (
          <CaptureRig
            modelUrl={modelUrl}
            category={slot.category}
            seed={slot.seed}
            onCapture={handleCapture}
          />
        )}
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <span className="text-sm font-medium">
          {CATEGORY_LABELS[slot.category]}
        </span>
        {slot.dataUrl && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => sharePostcard(slot.dataUrl!, slot.category)}
              className="rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-white transition-transform hover:scale-105"
            >
              Share
            </button>
            <a
              href={slot.dataUrl}
              download={`alero-postcard-${slot.category}.png`}
              className="rounded-full border border-border px-4 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Download
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function PostcardsScreen({
  modelUrl,
  onRestart,
}: {
  modelUrl: string | null;
  onRestart: () => void;
}) {
  const [slots, setSlots] = useState<Slot[]>(() => makeSlots());

  const handleCapture = useCallback((index: number, dataUrl: string) => {
    setSlots((prev) =>
      prev.map((s, i) => (i === index ? { ...s, dataUrl } : s))
    );
  }, []);

  const regenerate = () => setSlots(makeSlots());

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-muted">
          Screen 3 of 3
        </p>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Postcards from your friend
        </h1>
        <p className="mt-3 text-muted">
          Three imaginary places, three moments to keep.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {slots.map((slot, i) => (
          <PostcardCard
            key={i}
            slot={slot}
            index={i}
            modelUrl={modelUrl}
            onCapture={handleCapture}
          />
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-border bg-card px-6 py-5 text-center">
        <p className="text-sm text-muted">
          A friend is only as close as the last time you reached out.
          Staying in touch is part of the magic — share a postcard with
          someone today.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={regenerate}
          className="rounded-full border border-border px-8 py-3 font-medium transition-colors hover:border-accent"
        >
          Generate new postcards
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="rounded-full bg-accent px-8 py-3 font-medium text-white transition-transform hover:scale-105"
        >
          Create another friend
        </button>
      </div>
    </div>
  );
}
