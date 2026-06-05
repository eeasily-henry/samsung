"use client";

import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { generateImages, type ImageStyle } from "@/lib/image-gen";

export function ShadcnGenerator() {
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
    <Card className="h-full">
      <CardHeader>
        <CardTitle>shadcn/ui</CardTitle>
        <CardDescription>Tailwind · Radix primitives</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="grid gap-2">
          <Label htmlFor="shadcn-prompt">Prompt</Label>
          <Textarea
            id="shadcn-prompt"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image…"
          />
        </div>

        <div className="grid gap-2">
          <Label>Style</Label>
          <Select value={style} onValueChange={(v) => setStyle(v as ImageStyle)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gradient">Gradient</SelectItem>
              <SelectItem value="mesh">Mesh</SelectItem>
              <SelectItem value="geometric">Geometric</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Count: {count}</Label>
          <Slider
            min={1}
            max={8}
            step={1}
            value={[count]}
            onValueChange={([v]) => setCount(v)}
          />
        </div>

        <Button onClick={onGenerate} disabled={loading}>
          {loading ? "Generating…" : "Generate"}
        </Button>

        <div className="grid grid-cols-2 gap-3">
          {loading
            ? Array.from({ length: count }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-md" />
              ))
            : images.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`Generated ${i + 1}`}
                  width={256}
                  height={256}
                  unoptimized
                  className="aspect-square w-full rounded-md border object-cover"
                />
              ))}
        </div>
      </CardContent>
    </Card>
  );
}
