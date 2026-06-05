// Tiny self-contained "image generator".
// Turns a prompt + options into a deterministic abstract SVG (as a data URL),
// so the demo works with no external API or network access.

export type ImageStyle = "gradient" | "mesh" | "geometric";

export interface GenerateOptions {
  prompt: string;
  seed: number;
  size: number; // px (square)
  style: ImageStyle;
}

// Deterministic string hash (FNV-1a-ish).
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Seeded PRNG (mulberry32).
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hsl(h: number, s: number, l: number): string {
  return `hsl(${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%)`;
}

function palette(rand: () => number): string[] {
  const base = rand() * 360;
  const spread = 30 + rand() * 90;
  return [
    hsl(base, 70, 55),
    hsl((base + spread) % 360, 65, 60),
    hsl((base + spread * 2) % 360, 75, 50),
    hsl((base + spread * 3) % 360, 60, 65),
  ];
}

function buildSvg(opts: GenerateOptions): string {
  const seed = hash(opts.prompt + "|" + opts.style) ^ Math.imul(opts.seed, 2654435761);
  const rand = rng(seed >>> 0);
  const s = opts.size;
  const colors = palette(rand);
  const pick = () => colors[Math.floor(rand() * colors.length)];

  let body = "";

  if (opts.style === "gradient") {
    const stops = colors
      .map((c, i) => `<stop offset="${(i / (colors.length - 1)) * 100}%" stop-color="${c}"/>`)
      .join("");
    const angle = Math.floor(rand() * 360);
    body = `
      <defs><linearGradient id="g" gradientTransform="rotate(${angle})">${stops}</linearGradient></defs>
      <rect width="${s}" height="${s}" fill="url(#g)"/>
      ${Array.from({ length: 5 })
        .map(() => {
          const r = s * (0.1 + rand() * 0.3);
          return `<circle cx="${rand() * s}" cy="${rand() * s}" r="${r}" fill="${pick()}" opacity="0.25"/>`;
        })
        .join("")}`;
  } else if (opts.style === "mesh") {
    const blobs = Array.from({ length: 7 })
      .map(() => {
        const r = s * (0.25 + rand() * 0.45);
        return `<circle cx="${rand() * s}" cy="${rand() * s}" r="${r}" fill="${pick()}" opacity="0.55"/>`;
      })
      .join("");
    body = `
      <defs><filter id="b"><feGaussianBlur stdDeviation="${s * 0.06}"/></filter></defs>
      <rect width="${s}" height="${s}" fill="${colors[0]}"/>
      <g filter="url(#b)">${blobs}</g>`;
  } else {
    // geometric
    const shapes = Array.from({ length: 14 })
      .map(() => {
        const x = rand() * s;
        const y = rand() * s;
        const w = s * (0.1 + rand() * 0.35);
        const rot = Math.floor(rand() * 360);
        const op = (0.4 + rand() * 0.5).toFixed(2);
        if (rand() > 0.5) {
          return `<rect x="${x}" y="${y}" width="${w}" height="${w}" fill="${pick()}" opacity="${op}" transform="rotate(${rot} ${x} ${y})"/>`;
        }
        return `<circle cx="${x}" cy="${y}" r="${w / 2}" fill="${pick()}" opacity="${op}"/>`;
      })
      .join("");
    body = `<rect width="${s}" height="${s}" fill="${colors[3]}"/>${shapes}`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">${body}</svg>`;
}

export function generateImage(opts: GenerateOptions): string {
  const svg = buildSvg(opts);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Simulate an async generation call (e.g. an API round-trip).
export function generateImages(
  base: Omit<GenerateOptions, "seed">,
  count: number,
): Promise<string[]> {
  return new Promise((resolve) => {
    const delay = 500 + Math.random() * 700;
    setTimeout(() => {
      const out = Array.from({ length: count }, (_, i) =>
        generateImage({ ...base, seed: Date.now() + i * 9973 }),
      );
      resolve(out);
    }, delay);
  });
}
