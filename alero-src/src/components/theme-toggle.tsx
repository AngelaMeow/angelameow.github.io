"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-16 rounded-full border border-border" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      className="relative h-9 w-16 rounded-full border border-border bg-card transition-colors cursor-pointer"
    >
      <span
        className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] transition-transform duration-300 ease-out"
        style={{ transform: isDark ? "translateX(28px)" : "translateX(0)" }}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
