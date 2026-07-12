export type BackgroundCategory =
  | "forest"
  | "beach"
  | "city"
  | "landscape"
  | "abstract-space";

export const BACKGROUND_CATEGORIES: BackgroundCategory[] = [
  "forest",
  "beach",
  "city",
  "landscape",
  "abstract-space",
];

export const CATEGORY_LABELS: Record<BackgroundCategory, string> = {
  forest: "Whispering Forest",
  beach: "Faraway Shore",
  city: "Midnight City",
  landscape: "Gentle Hills",
  "abstract-space": "Dream Nebula",
};

function mulberry32(seed: number) {
  let a = seed;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function verticalGradient(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  stops: [number, string][]
) {
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  stops.forEach(([offset, color]) => grad.addColorStop(offset, color));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

function drawForest(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: () => number
) {
  verticalGradient(ctx, w, h, [
    [0, "#2c1f3d"],
    [0.55, "#4a2f4f"],
    [1, "#7c4a52"],
  ]);

  const layers = [
    { color: "#1c1329", baseY: 0.68, amp: 0.05 },
    { color: "#241a33", baseY: 0.78, amp: 0.06 },
    { color: "#160f20", baseY: 0.9, amp: 0.05 },
  ];

  layers.forEach((layer) => {
    ctx.fillStyle = layer.color;
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, h * layer.baseY);
    const trees = 14;
    for (let i = 0; i <= trees; i++) {
      const x = (w / trees) * i;
      const treeH = h * layer.baseY - h * layer.amp * (0.4 + rand() * 0.6);
      ctx.lineTo(x, treeH);
      ctx.lineTo(x + w / trees / 2, h * layer.baseY);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  });

  for (let i = 0; i < 40; i++) {
    const x = rand() * w;
    const y = h * 0.4 + rand() * h * 0.4;
    const r = rand() * 1.6 + 0.4;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 220, 150, ${0.2 + rand() * 0.5})`;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBeach(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: () => number
) {
  verticalGradient(ctx, w, h, [
    [0, "#3d2b5e"],
    [0.45, "#c9557b"],
    [0.65, "#ffb072"],
    [1, "#ffe3b0"],
  ]);

  const sunY = h * 0.42;
  const grad = ctx.createRadialGradient(w / 2, sunY, 10, w / 2, sunY, 140);
  grad.addColorStop(0, "rgba(255,240,210,0.95)");
  grad.addColorStop(1, "rgba(255,240,210,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(w / 2, sunY, 140, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#fff3d9";
  ctx.beginPath();
  ctx.arc(w / 2, sunY, 55, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#2a3a5e";
  ctx.fillRect(0, h * 0.68, w, h * 0.32);

  for (let i = 0; i < 4; i++) {
    const y = h * 0.7 + i * 18 + rand() * 6;
    ctx.strokeStyle = `rgba(255,255,255,${0.15 + rand() * 0.15})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= w; x += 20) {
      ctx.lineTo(x, y + Math.sin(x * 0.05 + i) * 4);
    }
    ctx.stroke();
  }

  ctx.fillStyle = "#e8cfa0";
  ctx.fillRect(0, h * 0.86, w, h * 0.14);
}

function drawCity(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: () => number
) {
  verticalGradient(ctx, w, h, [
    [0, "#0d0a1f"],
    [0.6, "#1c1440"],
    [1, "#3a2a5c"],
  ]);

  for (let i = 0; i < 60; i++) {
    const x = rand() * w;
    const y = rand() * h * 0.55;
    const r = rand() * 1.3;
    ctx.fillStyle = `rgba(255,255,255,${0.3 + rand() * 0.5})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const buildings = 10;
  let x = 0;
  for (let i = 0; i < buildings; i++) {
    const bw = w / buildings + rand() * 10 - 5;
    const bh = h * (0.25 + rand() * 0.45);
    const by = h - bh;
    ctx.fillStyle = i % 2 === 0 ? "#150f2b" : "#1d1638";
    ctx.fillRect(x, by, bw, bh);

    for (let wy = by + 10; wy < h - 10; wy += 14) {
      for (let wx = x + 6; wx < x + bw - 6; wx += 12) {
        if (rand() > 0.55) {
          ctx.fillStyle = `rgba(255, 210, 130, ${0.4 + rand() * 0.5})`;
          ctx.fillRect(wx, wy, 5, 7);
        }
      }
    }
    x += bw;
  }
}

function drawLandscape(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: () => number
) {
  verticalGradient(ctx, w, h, [
    [0, "#bfe3ff"],
    [0.5, "#ffe6c9"],
    [1, "#ffd9e6"],
  ]);

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  for (let i = 0; i < 5; i++) {
    const cx = rand() * w;
    const cy = h * 0.18 + rand() * h * 0.15;
    for (let j = 0; j < 4; j++) {
      ctx.beginPath();
      ctx.ellipse(
        cx + j * 22,
        cy + (j % 2) * 6,
        20 + rand() * 10,
        14 + rand() * 6,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }

  const hills = [
    { color: "#8fbf7a", baseY: 0.62 },
    { color: "#6fa668", baseY: 0.78 },
    { color: "#4d8a56", baseY: 0.94 },
  ];

  hills.forEach((hill, i) => {
    ctx.fillStyle = hill.color;
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, h * hill.baseY);
    const cp1 = { x: w * 0.3, y: h * hill.baseY - h * (0.06 + rand() * 0.04) };
    const cp2 = { x: w * 0.7, y: h * hill.baseY + h * (0.02 + i * 0.01) };
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, w, h * hill.baseY);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  });
}

function drawAbstractSpace(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rand: () => number
) {
  verticalGradient(ctx, w, h, [
    [0, "#0a0618"],
    [0.6, "#160e30"],
    [1, "#241247"],
  ]);

  const nebulae = [
    { color: "124, 108, 240", x: 0.3, y: 0.35 },
    { color: "255, 122, 89", x: 0.7, y: 0.55 },
    { color: "47, 184, 138", x: 0.5, y: 0.75 },
  ];

  nebulae.forEach((n) => {
    const cx = w * n.x;
    const cy = h * n.y;
    const r = Math.max(w, h) * (0.3 + rand() * 0.2);
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, `rgba(${n.color}, 0.35)`);
    grad.addColorStop(1, `rgba(${n.color}, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  });

  for (let i = 0; i < 120; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const r = rand() * 1.4;
    ctx.fillStyle = `rgba(255,255,255,${0.3 + rand() * 0.6})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const px = w * (0.2 + rand() * 0.6);
  const py = h * (0.25 + rand() * 0.3);
  const pr = 26 + rand() * 14;
  const planetGrad = ctx.createRadialGradient(
    px - pr * 0.3,
    py - pr * 0.3,
    2,
    px,
    py,
    pr
  );
  planetGrad.addColorStop(0, "#ffe6c9");
  planetGrad.addColorStop(1, "#a394ff");
  ctx.fillStyle = planetGrad;
  ctx.beginPath();
  ctx.arc(px, py, pr, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(px, py, pr * 1.7, pr * 0.4, -0.3, 0, Math.PI * 2);
  ctx.stroke();
}

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  category: BackgroundCategory,
  seed: number
) {
  const rand = mulberry32(seed);
  ctx.clearRect(0, 0, w, h);
  switch (category) {
    case "forest":
      return drawForest(ctx, w, h, rand);
    case "beach":
      return drawBeach(ctx, w, h, rand);
    case "city":
      return drawCity(ctx, w, h, rand);
    case "landscape":
      return drawLandscape(ctx, w, h, rand);
    case "abstract-space":
      return drawAbstractSpace(ctx, w, h, rand);
  }
}

export function pickRandomCategories(count: number): BackgroundCategory[] {
  const pool = [...BACKGROUND_CATEGORIES];
  const picked: BackgroundCategory[] = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}
