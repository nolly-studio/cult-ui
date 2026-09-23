"use client";

import {
  DitherImage,
  DitherImageCaption,
  DitherImageContent,
  DitherImageFrame,
  DitherImageOverlay,
  DitherImageReveal,
  type DitherRevealDirection,
} from "@/registry/default/ui/dither-image";

const GHIBLI_STILLS: { alt: string; src: string }[] = Array.from(
  { length: 9 },
  (_, i) => ({
    src: `/images/gibli/gibli-${i + 1}.jpg`,
    alt: `Studio Ghibli-style still ${i + 1}, dithered`,
  })
);

const FRAME_SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw";
/** Fixed box for `DitherImageReveal` + overlay demos (`size-56` → 14rem). */
const REVEAL_SIZES = "224px";

const REVEAL_OVERLAY_VARIANTS: {
  direction: DitherRevealDirection;
  from: number;
  to: number;
  label: string;
  hint: string;
}[] = [
  {
    direction: "r",
    from: 0,
    to: 65,
    label: "r",
    hint: "Clean left → dither right",
  },
  {
    direction: "l",
    from: 0,
    to: 65,
    label: "l",
    hint: "Clean right → dither left",
  },
  {
    direction: "t",
    from: 0,
    to: 65,
    label: "t",
    hint: "Clean top → dither bottom",
  },
  {
    direction: "b",
    from: 0,
    to: 65,
    label: "b",
    hint: "Clean bottom → dither top",
  },
  {
    direction: "tl-br",
    from: 0,
    to: 70,
    label: "tl-br",
    hint: "Diagonal (clean top-left)",
  },
  {
    direction: "radial",
    from: 25,
    to: 75,
    label: "radial",
    hint: "Center clean, edges dither",
  },
];

export default function DitherImageDemo() {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-foreground text-2xl font-semibold tracking-tight text-balance">
            DitherImage
          </h1>
          <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
            CSS-only Bayer dither via{" "}
            <code className="bg-muted rounded px-1 py-0.5 font-mono text-[0.75rem]">
              dither-plugin
            </code>
            . Compound:{" "}
            <code className="bg-muted rounded px-1 py-0.5 font-mono text-[0.75rem]">
              DitherImage
            </code>{" "}
            wraps a{" "}
            <code className="bg-muted rounded px-1 py-0.5 font-mono text-[0.75rem]">
              DitherImageFrame
            </code>{" "}
            (the dithered surface) containing a{" "}
            <code className="bg-muted rounded px-1 py-0.5 font-mono text-[0.75rem]">
              DitherImageContent
            </code>
            , with an optional{" "}
            <code className="bg-muted rounded px-1 py-0.5 font-mono text-[0.75rem]">
              DitherImageCaption
            </code>{" "}
            that stays outside the filter.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <DitherImage>
            <DitherImageFrame aspectRatio="square" size="xs">
              <DitherImageContent
                alt={GHIBLI_STILLS[0].alt}
                fill
                sizes={FRAME_SIZES}
                src={GHIBLI_STILLS[0].src}
              />
            </DitherImageFrame>
            <DitherImageCaption>
              <span className="text-foreground font-medium">xs</span> · 8px
              cell, defaults
            </DitherImageCaption>
          </DitherImage>

          <DitherImage>
            <DitherImageFrame aspectRatio="square" size="sm">
              <DitherImageContent
                alt={GHIBLI_STILLS[1].alt}
                fill
                sizes={FRAME_SIZES}
                src={GHIBLI_STILLS[1].src}
              />
            </DitherImageFrame>
            <DitherImageCaption>
              <span className="text-foreground font-medium">sm</span> · 12px
              cell, defaults
            </DitherImageCaption>
          </DitherImage>

          <DitherImage>
            <DitherImageFrame aspectRatio="square" size="md">
              <DitherImageContent
                alt={GHIBLI_STILLS[2].alt}
                fill
                sizes={FRAME_SIZES}
                src={GHIBLI_STILLS[2].src}
              />
            </DitherImageFrame>
            <DitherImageCaption>
              <span className="text-foreground font-medium">md</span> · 16px
              cell, defaults
            </DitherImageCaption>
          </DitherImage>

          <DitherImage>
            <DitherImageFrame aspectRatio="square" size="lg">
              <DitherImageContent
                alt={GHIBLI_STILLS[3].alt}
                fill
                sizes={FRAME_SIZES}
                src={GHIBLI_STILLS[3].src}
              />
            </DitherImageFrame>
            <DitherImageCaption>
              <span className="text-foreground font-medium">lg</span> · 20px
              cell, defaults
            </DitherImageCaption>
          </DitherImage>
        </section>

        <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <DitherImage>
            <DitherImageFrame
              aspectRatio="square"
              contrast={80}
              grayscale={0}
              size="md"
            >
              <DitherImageContent
                alt={GHIBLI_STILLS[4].alt}
                fill
                sizes={FRAME_SIZES}
                src={GHIBLI_STILLS[4].src}
              />
            </DitherImageFrame>
            <DitherImageCaption>
              <span className="text-foreground font-medium">Color + soft</span>{" "}
              · grayscale 0, contrast 80
            </DitherImageCaption>
          </DitherImage>

          <DitherImage>
            <DitherImageFrame
              aspectRatio="square"
              brightness={1.15}
              opacity={0.6}
              size="lg"
            >
              <DitherImageContent
                alt={GHIBLI_STILLS[5].alt}
                fill
                sizes={FRAME_SIZES}
                src={GHIBLI_STILLS[5].src}
              />
            </DitherImageFrame>
            <DitherImageCaption>
              <span className="text-foreground font-medium">Faded overlay</span>{" "}
              · opacity 0.6, brightness 1.15
            </DitherImageCaption>
          </DitherImage>

          <DitherImage>
            <DitherImageFrame
              aspectRatio="square"
              invertOnDark
              rounded="rounded-full"
              size="sm"
            >
              <DitherImageContent
                alt={GHIBLI_STILLS[6].alt}
                fill
                sizes={FRAME_SIZES}
                src={GHIBLI_STILLS[6].src}
              />
            </DitherImageFrame>
            <DitherImageCaption>
              <span className="text-foreground font-medium">
                Circle · invert on dark
              </span>{" "}
              · <code className="font-mono text-[0.7rem]">rounded-full</code>,
              12px cell, dots flip in dark mode
            </DitherImageCaption>
          </DitherImage>
        </section>

        <section className="flex flex-col gap-6">
          <header className="flex flex-col gap-2">
            <h2 className="text-foreground text-lg font-semibold tracking-tight text-balance">
              Reveal · DitherImageOverlay
            </h2>
            <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
              Partial dither:{" "}
              <code className="bg-muted rounded px-1 py-0.5 font-mono text-[0.75rem]">
                DitherImageReveal
              </code>{" "}
              stacks a masked{" "}
              <code className="bg-muted rounded px-1 py-0.5 font-mono text-[0.75rem]">
                DitherImageOverlay
              </code>{" "}
              on the dithered frame.{" "}
              <code className="bg-muted rounded px-1 py-0.5 font-mono text-[0.75rem]">
                direction
              </code>{" "}
              controls the gradient axis;{" "}
              <code className="bg-muted rounded px-1 py-0.5 font-mono text-[0.75rem]">
                from
              </code>{" "}
              /{" "}
              <code className="bg-muted rounded px-1 py-0.5 font-mono text-[0.75rem]">
                to
              </code>{" "}
              set mask stops (see component types for diagonals).
            </p>
          </header>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {REVEAL_OVERLAY_VARIANTS.map(
              ({ direction, from, to, label, hint }, i) => {
                const img = GHIBLI_STILLS[(7 + i) % GHIBLI_STILLS.length];
                return (
                  <DitherImage key={direction}>
                    <DitherImageReveal className="mx-auto size-56 overflow-hidden rounded-xl">
                      <DitherImageFrame
                        aspectRatio="square"
                        className="rounded-none"
                        invertOnDark
                        rounded={false}
                        size="md"
                      >
                        <DitherImageContent
                          alt={img.alt}
                          className="object-cover"
                          fill
                          sizes={REVEAL_SIZES}
                          src={img.src}
                        />
                      </DitherImageFrame>
                      <DitherImageOverlay
                        alt={img.alt}
                        className="object-cover"
                        direction={direction}
                        fill
                        from={from}
                        sizes={REVEAL_SIZES}
                        src={img.src}
                        to={to}
                      />
                    </DitherImageReveal>
                    <DitherImageCaption>
                      <span className="text-foreground font-medium">
                        {label}
                      </span>{" "}
                      · {hint}
                      <span className="tabular-nums">
                        {" "}
                        — {from}%→{to}%
                      </span>
                    </DitherImageCaption>
                  </DitherImage>
                );
              }
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
