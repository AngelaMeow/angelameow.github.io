"use client";

import { motion } from "framer-motion";

export function AmbientGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute -left-24 -top-24 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "var(--accent-2)", opacity: 0.25 }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-1/3 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "var(--accent)", opacity: 0.2 }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "var(--accent-3)", opacity: 0.18 }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
