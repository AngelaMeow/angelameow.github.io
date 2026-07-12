"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UploadScreen } from "@/components/experience/upload-screen";
import { LoadingScreen } from "@/components/experience/loading-screen";
import { PostcardsScreen } from "@/components/experience/postcards-screen";

type Stage = "upload" | "loading" | "postcards";

export default function ExperiencePage() {
  const [stage, setStage] = useState<Stage>("upload");
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (modelUrl) URL.revokeObjectURL(modelUrl);
    };
  }, [modelUrl]);

  const handleSubmit = (url: string | null) => {
    setModelUrl(url);
    setStage("loading");
  };

  const handleRestart = () => {
    if (modelUrl) URL.revokeObjectURL(modelUrl);
    setModelUrl(null);
    setStage("upload");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {stage === "upload" && <UploadScreen onSubmit={handleSubmit} />}
        {stage === "loading" && (
          <LoadingScreen onComplete={() => setStage("postcards")} />
        )}
        {stage === "postcards" && (
          <PostcardsScreen modelUrl={modelUrl} onRestart={handleRestart} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
