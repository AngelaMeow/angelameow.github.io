"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CreatureViewer } from "./creature-viewer";

type Mode = "upload" | "premade" | null;

export function UploadScreen({
  onSubmit,
}: {
  onSubmit: (modelUrl: string | null) => void;
}) {
  const [mode, setMode] = useState<Mode>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [modelBroken, setModelBroken] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = useCallback((file: File | null | undefined) => {
    if (!file) return;
    if (!file.name.toLowerCase().match(/\.(glb|gltf)$/)) {
      setError("Please upload a .glb (or .gltf) 3D model.");
      return;
    }
    setError(null);
    setModelBroken(false);
    const url = URL.createObjectURL(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
    setFileName(file.name);
    setMode("upload");
  }, []);

  const selectPremade = () => {
    setError(null);
    setModelBroken(false);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setFileName(null);
    setMode("premade");
  };

  const canSubmit = mode === "premade" || (mode === "upload" && !!previewUrl);

  return (
    <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-muted">
          Screen 1 of 3
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Alero
        </h1>
        <p className="mt-4 max-w-md text-muted">
          Alero turns a 3D model into an imaginary friend. Upload your own
          character as a <code className="text-accent">.glb</code> file, or
          borrow one already waiting for you — then watch them come to life
          through a small illustrated journey that ends in three postcards
          from places only they know.
        </p>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          onClick={() => inputRef.current?.click()}
          className={`mt-8 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 text-center transition-colors ${
            dragOver ? "border-accent bg-accent/5" : "border-border"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".glb,.gltf"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <p className="font-medium">
            {fileName ?? "Drop your .glb model here, or click to browse"}
          </p>
          <p className="mt-1 text-sm text-muted">Max recommended: 20MB</p>
        </div>

        {error && <p className="mt-3 text-sm text-accent">{error}</p>}

        <div className="mt-6 flex items-center gap-4">
          <span className="text-sm text-muted">or</span>
          <button
            type="button"
            onClick={selectPremade}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
              mode === "premade"
                ? "border-accent text-accent"
                : "border-border hover:border-accent"
            }`}
          >
            Use a pre-made imaginary friend
          </button>
        </div>

        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => onSubmit(mode === "upload" ? previewUrl : null)}
          className="mt-10 w-full rounded-full bg-accent py-3 font-medium text-white transition-transform enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-10"
        >
          Bring them to life
        </button>
      </div>

      <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-card">
        {mode ? (
          <CreatureViewer
            modelUrl={mode === "upload" ? previewUrl : null}
            onModelError={() => setModelBroken(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-center text-sm text-muted">
            Your friend&rsquo;s preview will appear here
          </div>
        )}
        {modelBroken && (
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-background/90 p-3 text-center text-xs text-muted">
            That file couldn&rsquo;t be read as a 3D model, so we&rsquo;re
            showing a placeholder friend instead.
          </div>
        )}
      </div>
    </div>
  );
}
