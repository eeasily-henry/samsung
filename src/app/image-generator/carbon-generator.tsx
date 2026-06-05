"use client";

import { useState } from "react";
import Image from "next/image";

import {
  Tile,
  TextArea,
  Select,
  SelectItem,
  Slider,
  Button,
  SkeletonPlaceholder,
} from "@carbon/react";

import { generateImages, type ImageStyle } from "@/lib/image-gen";

export function CarbonGenerator() {
  const [prompt, setPrompt] = useState("a calm cosmic landscape, soft light");
  const [style, setStyle] = useState<ImageStyle>("mesh");
  const [count, setCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  async function onGenerate() {
    setLoading(true);
    setImages([]);
    const result = await generateImages(
      { prompt: prompt.trim() || "untitled", style, size: 256 },
      count,
    );
    setImages(result);
    setLoading(false);
  }

  return (
    <Tile className="h-full">
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="text-lg font-semibold">Carbon</h3>
          <p className="text-sm text-neutral-500">IBM Design System · SCSS</p>
        </div>

        <TextArea
          id="carbon-prompt"
          labelText="Prompt"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image…"
        />

        <Select
          id="carbon-style"
          labelText="Style"
          value={style}
          onChange={(e) => setStyle(e.target.value as ImageStyle)}
        >
          <SelectItem value="gradient" text="Gradient" />
          <SelectItem value="mesh" text="Mesh" />
          <SelectItem value="geometric" text="Geometric" />
        </Select>

        <Slider
          id="carbon-count"
          labelText="Count"
          min={1}
          max={8}
          step={1}
          value={count}
          onChange={({ value }) => setCount(value)}
        />

        <Button kind="primary" onClick={onGenerate} disabled={loading}>
          {loading ? "Generating…" : "Generate"}
        </Button>

        <div className="grid grid-cols-2 gap-3">
          {loading
            ? Array.from({ length: count }).map((_, i) => (
                <SkeletonPlaceholder key={i} className="!h-auto !w-full aspect-square" />
              ))
            : images.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`Generated ${i + 1}`}
                  width={256}
                  height={256}
                  unoptimized
                  className="aspect-square w-full border border-neutral-200 object-cover"
                />
              ))}
        </div>
      </div>
    </Tile>
  );
}
