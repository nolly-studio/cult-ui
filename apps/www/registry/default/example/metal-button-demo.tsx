"use client";

import { ArrowRight, Pause, Play, Sparkles, Wand2, Zap } from "lucide-react";
import type { MetalFxPreset } from "metal-fx";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MetalButton,
  MetalIconButton,
} from "@/registry/default/ui/metal-button";

const PRESET_ROW: { key: MetalFxPreset; label: string }[] = [
  { key: "chromatic", label: "Chromatic" },
  { key: "silver", label: "Silver" },
  { key: "gold", label: "Gold" },
];

const METAL_VARIANTS = ["button", "circle"] as const;

const STRENGTH_ROW = [
  { value: 0.5, label: "50%" },
  { value: 0.75, label: "75%" },
  { value: 0.9, label: "90%" },
  { value: 1, label: "100%" },
] as const;

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-foreground text-sm font-semibold tracking-tight">
          {title}
        </h3>
        {description ? (
          <p className="text-muted-foreground text-xs leading-relaxed text-pretty">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export default function MetalButtonDemo() {
  const id = useId();
  const chipRef = useRef<HTMLButtonElement>(null);
  const [preset, setPreset] = useState<MetalFxPreset>("chromatic");
  const [metalPaused, setMetalPaused] = useState(false);
  const [respectsReducedMotion, setRespectsReducedMotion] = useState(false);

  const activePresetLabel =
    PRESET_ROW.find((row) => row.key === preset)?.label ?? "Chromatic";

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setRespectsReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const effectivePaused = metalPaused || respectsReducedMotion;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10 px-4 py-8 md:px-6">
      <header className="space-y-2 text-center">
        <p className="text-muted-foreground text-[11px] font-medium tracking-[0.2em] uppercase">
          Liquid metal
        </p>
        <h2 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
          Button + animated metal ring
        </h2>
        <p className="text-muted-foreground mx-auto max-w-lg text-sm leading-relaxed text-pretty">
          <span className="text-foreground/90">className</span> targets the
          shadcn <span className="text-foreground/90">Button</span>;{" "}
          <span className="text-foreground/90">metalFxClassName</span> styles
          the MetalFx wrapper. Use{" "}
          <span className="text-foreground/90">preset</span>,{" "}
          <span className="text-foreground/90">metalVariant</span>, and{" "}
          <span className="text-foreground/90">paused</span> to tune the effect.
        </p>
      </header>

      <Section
        description="Outline and secondary read well against the ring; default adds a stronger fill."
        title="Button variants"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <MetalButton preset={preset} type="button" variant="default">
            Continue
          </MetalButton>
          <MetalButton preset={preset} type="button" variant="outline">
            Outline
          </MetalButton>
          <MetalButton preset={preset} type="button" variant="secondary">
            Secondary
          </MetalButton>
          <MetalButton preset={preset} type="button" variant="ghost">
            Ghost
          </MetalButton>
        </div>
      </Section>

      <Section
        description="metal-fx shares one WebGL palette for the whole page — pick a preset, then watch the ring update on the preview below."
        title="Metal preset"
      >
        <div className="flex flex-col items-center gap-4">
          <fieldset
            aria-label="Metal preset"
            className="m-0 flex min-w-0 flex-wrap items-center justify-center gap-2 border-0 p-0"
          >
            {PRESET_ROW.map(({ key, label }) => (
              <Button
                aria-pressed={preset === key}
                key={key}
                onClick={() => setPreset(key)}
                size="sm"
                type="button"
                variant={preset === key ? "default" : "outline"}
              >
                {label}
              </Button>
            ))}
          </fieldset>
          <div className="flex w-full justify-center rounded-xl bg-neutral-950 px-6 py-8">
            <MetalButton
              preset={preset}
              theme="dark"
              type="button"
              variant="default"
            >
              {activePresetLabel}
            </MetalButton>
          </div>
        </div>
      </Section>

      <Section
        description="button is a pill ring; circle uses a thicker ring suited to compact controls."
        title="Metal variant"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          {METAL_VARIANTS.map((variant) => (
            <MetalButton
              key={variant}
              metalVariant={variant}
              preset={preset}
              type="button"
              variant="outline"
            >
              <span className="font-mono text-xs">{variant}</span>
            </MetalButton>
          ))}
        </div>
      </Section>

      <Section
        description="Strength scales shader opacity and glow; the animation keeps running underneath."
        title="Strength"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          {STRENGTH_ROW.map(({ value, label }) => (
            <MetalButton
              key={label}
              preset={preset}
              strength={value}
              type="button"
              variant="outline"
            >
              <span className="font-mono text-xs">{label}</span>
            </MetalButton>
          ))}
        </div>
      </Section>

      <Section
        description="Icon buttons default to icon sizing and circle variant. The Wand icon disables the halo glow."
        title="Icon buttons"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <MetalIconButton
            aria-label="Sparkles"
            preset={preset}
            title="Sparkles"
            type="button"
            variant="outline"
          >
            <Sparkles aria-hidden className="size-3.5" />
          </MetalIconButton>
          <MetalIconButton
            aria-label="Zap"
            preset={preset}
            title="Zap"
            type="button"
            variant="secondary"
          >
            <Zap aria-hidden className="size-3.5" />
          </MetalIconButton>
          <MetalIconButton
            aria-label="Wand"
            disableGlow
            preset={preset}
            title="Wand"
            type="button"
            variant="outline"
          >
            <Wand2 aria-hidden className="size-3.5" />
          </MetalIconButton>
        </div>
      </Section>

      <Section
        description="Toggle the shader without hiding the button. Respects prefers-reduced-motion. Dark-mode reflections hit the chip ref."
        title="Interactive"
      >
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            className="border-border bg-muted/50 text-muted-foreground rounded-full border px-3 py-1.5 text-xs"
            ref={chipRef}
            type="button"
          >
            Tools
          </button>
          <MetalButton
            className="gap-2 pr-5 pl-6"
            paused={effectivePaused}
            preset={preset}
            reflectionTargets={[chipRef]}
            type="button"
            variant="outline"
          >
            Get started
            <ArrowRight aria-hidden className="size-4 opacity-80" />
          </MetalButton>
          <MetalIconButton
            aria-label={effectivePaused ? "Play metal" : "Pause metal"}
            aria-pressed={!metalPaused}
            onClick={() => setMetalPaused((v) => !v)}
            paused={effectivePaused}
            preset={preset}
            title={effectivePaused ? "Play metal" : "Pause metal"}
            type="button"
            variant="secondary"
          >
            {effectivePaused ? (
              <Play aria-hidden className="size-3.5" />
            ) : (
              <Pause aria-hidden className="size-3.5" />
            )}
          </MetalIconButton>
        </div>
        <p
          className={cn(
            "text-center text-xs",
            respectsReducedMotion
              ? "text-amber-600 dark:text-amber-400"
              : "text-muted-foreground"
          )}
          id={`${id}-hint`}
        >
          {respectsReducedMotion
            ? "Reduced motion is on — metal animation stays paused."
            : "Tip: pause freezes the ring on the last frame; the button stays clickable."}
        </p>
      </Section>
    </div>
  );
}
