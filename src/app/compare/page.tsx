"use client";

import { useState } from "react";

// shadcn/ui components
import { Button as ShadcnButton } from "@/components/ui/button";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Carbon Design System components
import {
  Button as CarbonButton,
  TextInput as CarbonTextInput,
  Checkbox as CarbonCheckbox,
} from "@carbon/react";

function Section({
  title,
  shadcn,
  carbon,
}: {
  title: string;
  shadcn: React.ReactNode;
  carbon: React.ReactNode;
}) {
  return (
    <div className="border-b border-neutral-200 py-8">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-neutral-500">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium text-neutral-400">shadcn/ui</span>
          {shadcn}
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium text-neutral-400">Carbon</span>
          {carbon}
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  const [shadcnChecked, setShadcnChecked] = useState(true);
  const [carbonChecked, setCarbonChecked] = useState(true);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">
        shadcn/ui vs Carbon
      </h1>
      <p className="mt-2 text-neutral-500">
        같은 UI 요소를 두 라이브러리로 나란히 렌더링한 비교 데모입니다.
      </p>

      {/* Buttons */}
      <Section
        title="Buttons"
        shadcn={
          <div className="flex flex-wrap items-center gap-3">
            <ShadcnButton>Primary</ShadcnButton>
            <ShadcnButton variant="secondary">Secondary</ShadcnButton>
            <ShadcnButton variant="outline">Outline</ShadcnButton>
            <ShadcnButton variant="destructive">Danger</ShadcnButton>
            <ShadcnButton variant="ghost">Ghost</ShadcnButton>
          </div>
        }
        carbon={
          <div className="flex flex-wrap items-center gap-3">
            <CarbonButton kind="primary">Primary</CarbonButton>
            <CarbonButton kind="secondary">Secondary</CarbonButton>
            <CarbonButton kind="tertiary">Tertiary</CarbonButton>
            <CarbonButton kind="danger">Danger</CarbonButton>
            <CarbonButton kind="ghost">Ghost</CarbonButton>
          </div>
        }
      />

      {/* Text input */}
      <Section
        title="Text input"
        shadcn={
          <div className="grid w-full max-w-sm gap-2">
            <Label htmlFor="shadcn-email">Email</Label>
            <ShadcnInput
              id="shadcn-email"
              type="email"
              placeholder="you@example.com"
            />
          </div>
        }
        carbon={
          <div className="max-w-sm">
            <CarbonTextInput
              id="carbon-email"
              labelText="Email"
              type="email"
              placeholder="you@example.com"
            />
          </div>
        }
      />

      {/* Checkbox */}
      <Section
        title="Checkbox"
        shadcn={
          <div className="flex items-center gap-2">
            <ShadcnCheckbox
              id="shadcn-terms"
              checked={shadcnChecked}
              onCheckedChange={(v) => setShadcnChecked(Boolean(v))}
            />
            <Label htmlFor="shadcn-terms">Accept terms</Label>
          </div>
        }
        carbon={
          <CarbonCheckbox
            id="carbon-terms"
            labelText="Accept terms"
            checked={carbonChecked}
            onChange={(_, { checked }) => setCarbonChecked(checked)}
          />
        }
      />
    </main>
  );
}
