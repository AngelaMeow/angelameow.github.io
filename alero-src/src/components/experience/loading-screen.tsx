"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STEP_DURATION = 2400;

const steps = [
  {
    title: "Create your friend",
    body: "Every shape, every color — shaping someone new to keep you company.",
  },
  {
    title: "Enjoy the journey",
    body: "Your friend takes their first steps into a world made just for them.",
  },
  {
    title: "Follow their steps, and connect",
    body: "Small moments, shared with others who imagined their own friends too.",
  },
];

function CreateGraphic() {
  return (
    <svg viewBox="0 0 200 200" className="h-40 w-40 sm:h-56 sm:w-56">
      <motion.circle
        cx="100"
        cy="100"
        r="60"
        fill="var(--accent-2)"
        initial={{ scale: 0.6, opacity: 0.5 }}
        animate={{ scale: [0.6, 1, 0.9, 1], opacity: 1 }}
        transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.circle
        cx="78"
        cy="90"
        r="8"
        fill="#1c1721"
        animate={{ scale: [1, 0.2, 1] }}
        transition={{ duration: 2.6, repeat: Infinity }}
      />
      <motion.circle
        cx="122"
        cy="90"
        r="8"
        fill="#1c1721"
        animate={{ scale: [1, 0.2, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, delay: 0.1 }}
      />
    </svg>
  );
}

function JourneyGraphic() {
  const hops = [10, 60, 110, 160, 210];
  return (
    <svg viewBox="0 0 240 160" className="h-32 w-56 sm:h-44 sm:w-80">
      {hops.map((x, i) => (
        <circle key={i} cx={x} cy={130} r="3" fill="var(--border)" />
      ))}
      <motion.circle
        r="14"
        fill="var(--accent)"
        animate={{
          cx: hops,
          cy: hops.map((_, i) => (i % 2 === 0 ? 130 : 90)),
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function ConnectGraphic() {
  const nodes = [
    { x: 60, y: 60 },
    { x: 160, y: 50 },
    { x: 110, y: 120 },
    { x: 190, y: 130 },
  ];
  return (
    <svg viewBox="0 0 240 180" className="h-36 w-56 sm:h-48 sm:w-80">
      {nodes.map((n, i) =>
        nodes.slice(i + 1).map((m, j) => (
          <motion.line
            key={`${i}-${j}`}
            x1={n.x}
            y1={n.y}
            x2={m.x}
            y2={m.y}
            stroke="var(--accent-3)"
            strokeWidth="1.5"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }}
          />
        ))
      )}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="12"
          fill="var(--accent-2)"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </svg>
  );
}

const graphics = [<CreateGraphic key={0} />, <JourneyGraphic key={1} />, <ConnectGraphic key={2} />];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= steps.length - 1) {
      const timer = setTimeout(onComplete, STEP_DURATION);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setStep((s) => s + 1), STEP_DURATION);
    return () => clearTimeout(timer);
  }, [step, onComplete]);

  return (
    <div
      className="relative flex min-h-[calc(100vh-4rem)] cursor-pointer flex-col items-center justify-center overflow-hidden px-6 text-center"
      onClick={onComplete}
      role="button"
      aria-label="Skip intro"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="mb-8 flex items-center justify-center">
            {graphics[step]}
          </div>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            {steps[step].title}
          </h2>
          <p className="mt-3 max-w-sm text-muted">{steps[step].body}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex gap-2">
        {steps.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-8 rounded-full transition-colors ${
              i <= step ? "bg-accent" : "bg-border"
            }`}
          />
        ))}
      </div>

      <p className="mt-6 text-xs text-muted">Tap anywhere to skip</p>
    </div>
  );
}
