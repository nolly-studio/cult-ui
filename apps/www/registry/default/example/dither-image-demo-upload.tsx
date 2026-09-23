"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type ReactNode,
} from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  DitherImage,
  DitherImageContent,
  DitherImageFrame,
  DitherImageOverlay,
  DitherImageReveal,
  type DitherRevealDirection,
  type DitherSize,
} from "@/registry/default/ui/dither-image";

/** Layered edge + lift (SKILL-DESIGN) — replaces flat card borders. */
const PANEL_SURFACE = cn(
  "bg-card/65 rounded-2xl p-4 md:p-5",
  "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)]",
  "dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.06),0px_1px_2px_-1px_rgba(255,255,255,0.03),0px_2px_4px_0px_rgba(0,0,0,0.2)]",
  "transition-shadow duration-200",
  "hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)]",
  "dark:hover:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1),0px_1px_2px_-1px_rgba(255,255,255,0.05),0px_2px_4px_0px_rgba(0,0,0,0.25)]"
);

const BTN_PRESS =
  "active:scale-[0.96] transition-transform duration-150 ease-[cubic-bezier(0.2,0,0,1)]";

const SELECT_SURFACE = cn(
  "border-input/80 bg-input/15 h-10 w-full rounded-[calc(var(--radius)-2px)] border px-2.5 text-sm outline-none",
  "focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:ring-2"
);

const FALLBACK_SRC = "/images/gibli/gibli-1.jpg";
const FALLBACK_ALT = "Sample wallpaper — upload or paste a URL to preview";

const REMOTE_HTTP_RE = /^https?:\/\//i;

function labelFromRemoteUrl(href: string): string {
  if (href.startsWith("/")) {
    const file = href.split("/").pop();
    return file ?? href;
  }
  try {
    const u = new URL(href);
    const path =
      u.pathname.length > 48 ? `${u.pathname.slice(0, 48)}…` : u.pathname;
    return `${u.hostname}${path}`;
  } catch {
    return "Remote image";
  }
}

/** Use with `next/image` when the optimizer cannot fetch the host (arbitrary URLs, blobs, data). */
function needsUnoptimizedImage(src: string): boolean {
  return (
    src.startsWith("blob:") ||
    src.startsWith("data:") ||
    REMOTE_HTTP_RE.test(src)
  );
}

const SIZE_OPTIONS: { value: DitherSize; label: string }[] = [
  { value: "xs", label: "xs (8px)" },
  { value: "sm", label: "sm (12px)" },
  { value: "md", label: "md (16px)" },
  { value: "lg", label: "lg (20px)" },
  { value: "xl", label: "xl (28px)" },
  { value: "2xl", label: "2xl (40px)" },
];

const ASPECT_OPTIONS = [
  { value: "square" as const, label: "1:1" },
  { value: "video" as const, label: "16:9" },
  { value: "portrait" as const, label: "3:4" },
  { value: "wide" as const, label: "21:9" },
];

const REVEAL_DIRECTION_OPTIONS: {
  value: DitherRevealDirection;
  label: string;
}[] = [
  { value: "r", label: "Right fade (clean left)" },
  { value: "l", label: "Left fade (clean right)" },
  { value: "t", label: "Top fade (clean top)" },
  { value: "b", label: "Bottom fade (clean bottom)" },
  { value: "tl-br", label: "Diagonal ↘ (clean top-left)" },
  { value: "tr-bl", label: "Diagonal ↙ (clean top-right)" },
  { value: "bl-tr", label: "Diagonal ↗ (clean bottom-left)" },
  { value: "br-tl", label: "Diagonal ↖ (clean bottom-right)" },
  { value: "radial", label: "Radial" },
];

const QUICK_GIFS = [
  {
    href: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzBrNXo4dzFia3BpYzg5YnR6aGptcmxxY2VuN2d0ZDZvZnlhZTNzaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6ipe9NBXm39n0f6JCw/giphy.gif",
    label: "GIF 0",
  },
  {
    href: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3A5eWlqY2lyaW9mNHJkeGczanQ5azkxdDV1MzVnd3dpZWk0dTZ1dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/x2N5CFzAjQ0NSaGKAO/giphy.gif",
    label: "GIF 1",
  },
  {
    href: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm5tbTZ1ZGlibDB6bTJ0ZjluMnduYXNncjJwZDlqcHN2ZDZoMndnaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26xBs1E58r3ZHYvgQ/giphy.gif",
    label: "GIF 2",
  },
  {
    href: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2FyMjN6ZDc4YTdiMzY5dWtwbjhrb29pc2xlNDg1aTl0ZmU3eHVjMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xhzaJAhrcuDMUs1IjI/giphy.gif",
    label: "GIF 3",
  },
  {
    href: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGxmaTUybzN3ZmVqMDV4aHd6eXBwcDhuMWNicWZueTk4eWppNmQ2ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LUl2tRY5oVlBu/giphy.gif",
    label: "GIF 4",
  },
] as const;

/** Local stills: `public/images/gibli/gibli-1.jpg` … `gibli-9.jpg` → `/images/gibli/...`. */
const QUICK_GHIBLI: { href: string; label: string }[] = Array.from(
  { length: 9 },
  (_, i) => {
    const n = i + 1;
    return {
      href: `/images/gibli/gibli-${n}.jpg`,
      label: String(n),
    };
  }
);

function RangeField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <Label className="text-foreground text-xs" htmlFor={id}>
          {label}
        </Label>
        <span className="text-muted-foreground font-mono text-[0.65rem] tabular-nums">
          {value}
          {suffix ?? ""}
        </span>
      </div>
      <input
        className={cn(
          "bg-muted accent-primary h-2 w-full cursor-pointer appearance-none rounded-full",
          "[&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
        )}
        id={id}
        max={max}
        min={min}
        onChange={(e) => onChange(Number(e.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </div>
  );
}

/** Single stat pill — wraps as one unit so lines never break mid-value (e.g. “reveal r”). */
function CaptionMetaChip({
  kicker,
  children,
}: {
  kicker: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full min-w-0 items-center gap-1.5 rounded-md whitespace-nowrap",
        "border-border/45 bg-muted/40 border px-2 py-1",
        "text-[0.7rem] leading-none tracking-tight",
        "dark:bg-muted/25 shadow-[0_1px_0_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
      )}
    >
      <span className="text-muted-foreground shrink-0 text-[0.6rem] font-medium tracking-[0.1em] uppercase">
        {kicker}
      </span>
      <span className="text-foreground min-w-0 font-medium tabular-nums">
        {children}
      </span>
    </span>
  );
}

function PanelSection({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-1">
        <p className="text-muted-foreground text-[0.65rem] font-medium tracking-[0.14em] uppercase">
          {eyebrow}
        </p>
        <h2 className="text-foreground text-lg font-semibold tracking-tight text-balance">
          {title}
        </h2>
        {description ? (
          <p className="text-muted-foreground text-xs leading-relaxed text-pretty">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export interface DitherImageDemoUploadProps {
  /** Starting image: same-origin path (e.g. `/images/foo.jpg`) or `https://…` image / GIF. */
  initialSrc?: string;
  /** Caption label when `initialSrc` is set; if omitted and `initialSrc` is remote, a short URL label is derived. */
  initialLabel?: string;
}

export default function DitherImageDemoUpload({
  initialSrc,
  initialLabel,
}: DitherImageDemoUploadProps = {}) {
  const baseId = useId();
  const blobUrlRef = useRef<string | null>(null);

  const [previewSrc, setPreviewSrc] = useState(
    () => initialSrc ?? FALLBACK_SRC
  );
  const [fileLabel, setFileLabel] = useState<string | null>(() => {
    if (initialLabel) {
      return initialLabel;
    }
    if (initialSrc && REMOTE_HTTP_RE.test(initialSrc)) {
      return labelFromRemoteUrl(initialSrc);
    }
    if (initialSrc?.startsWith("data:")) {
      return "Data URL";
    }
    return null;
  });
  const [urlDraft, setUrlDraft] = useState(() => {
    if (initialSrc && REMOTE_HTTP_RE.test(initialSrc)) {
      return initialSrc;
    }
    return "";
  });

  const [size, setSize] = useState<DitherSize>("md");
  const [aspect, setAspect] =
    useState<(typeof ASPECT_OPTIONS)[number]["value"]>("square");
  const [grayscale, setGrayscale] = useState(1);
  const [contrast, setContrast] = useState(120);
  const [brightness, setBrightness] = useState(1);
  const [blurPx, setBlurPx] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const [revealEnabled, setRevealEnabled] = useState(true);
  const [revealDir, setRevealDir] = useState<DitherRevealDirection>("r");
  const [revealFrom, setRevealFrom] = useState(0);
  const [revealTo, setRevealTo] = useState(65);
  const [fileDragging, setFileDragging] = useState(false);
  const fileDropDepth = useRef(0);

  const revokeBlob = useCallback(() => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  }, []);

  useEffect(() => () => revokeBlob(), [revokeBlob]);

  const applyFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        return;
      }
      revokeBlob();
      const url = URL.createObjectURL(file);
      blobUrlRef.current = url;
      setPreviewSrc(url);
      setFileLabel(file.name);
      setUrlDraft("");
    },
    [revokeBlob]
  );

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        applyFile(file);
      }
      e.target.value = "";
    },
    [applyFile]
  );

  const onFileDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileDropDepth.current += 1;
    if (e.dataTransfer.types.includes("Files")) {
      setFileDragging(true);
    }
  }, []);

  const onFileDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileDropDepth.current -= 1;
    if (fileDropDepth.current <= 0) {
      fileDropDepth.current = 0;
      setFileDragging(false);
    }
  }, []);

  const onFileDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const onFileDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      fileDropDepth.current = 0;
      setFileDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) {
        applyFile(file);
      }
    },
    [applyFile]
  );

  const loadRemoteImage = useCallback(
    (href: string) => {
      revokeBlob();
      setPreviewSrc(href);
      setFileLabel(labelFromRemoteUrl(href));
      setUrlDraft(href);
    },
    [revokeBlob]
  );

  const applyImageUrl = useCallback(() => {
    const raw = urlDraft.trim();
    if (!raw) {
      return;
    }
    if (raw.startsWith("data:")) {
      revokeBlob();
      setPreviewSrc(raw);
      setFileLabel("Pasted data URL");
      return;
    }
    let href: string;
    try {
      const u = new URL(raw);
      if (u.protocol === "http:" || u.protocol === "https:") {
        href = u.href;
      } else {
        return;
      }
    } catch {
      try {
        const u = new URL(`https://${raw}`);
        href = u.href;
      } catch {
        return;
      }
    }
    loadRemoteImage(href);
  }, [loadRemoteImage, urlDraft, revokeBlob]);

  const resetToSample = useCallback(() => {
    revokeBlob();
    setPreviewSrc(FALLBACK_SRC);
    setFileLabel(null);
    setUrlDraft("");
  }, [revokeBlob]);

  const resetSliders = useCallback(() => {
    setSize("md");
    setAspect("square");
    setGrayscale(1);
    setContrast(120);
    setBrightness(1);
    setBlurPx(0);
    setOpacity(1);
    setRevealEnabled(true);
    setRevealDir("r");
    setRevealFrom(0);
    setRevealTo(65);
  }, []);

  const unoptimized = needsUnoptimizedImage(previewSrc);

  return (
    <main className="bg-background min-h-screen antialiased">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-8 flex max-w-3xl flex-col gap-2 md:mb-10">
          <p className="text-muted-foreground text-[0.65rem] font-medium tracking-[0.14em] uppercase">
            Cult UI · sandbox
          </p>
          <h1 className="text-foreground text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            DitherImage — upload
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
            Upload a file, paste an image or GIF URL, or use the sample. Tune{" "}
            <code className="bg-muted/80 rounded-md px-1.5 py-0.5 font-mono text-[0.75rem]">
              dither-plugin
            </code>{" "}
            live. Remote URLs, blobs, and{" "}
            <code className="bg-muted/80 rounded-md px-1.5 py-0.5 font-mono text-[0.75rem]">
              data:
            </code>{" "}
            use{" "}
            <code className="bg-muted/80 rounded-md px-1.5 py-0.5 font-mono text-[0.75rem]">
              next/image
            </code>{" "}
            with{" "}
            <code className="bg-muted/80 rounded-md px-1.5 py-0.5 font-mono text-[0.75rem]">
              unoptimized
            </code>{" "}
            so any host works without changing{" "}
            <code className="bg-muted/80 rounded-md px-1.5 py-0.5 font-mono text-[0.75rem]">
              next.config
            </code>
            .
          </p>
        </header>

        <div
          className={cn(
            "flex flex-col gap-6",
            "xl:grid xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]",
            "xl:gap-x-10 xl:gap-y-8"
          )}
        >
          {/* Left rail — source */}
          <aside
            className={cn(
              "order-2 flex min-h-0 min-w-0 flex-col xl:col-start-1 xl:row-start-1 xl:h-full",
              PANEL_SURFACE
            )}
          >
            <PanelSection
              className="min-h-0 flex-1 xl:min-h-0"
              description="Paste a URL, pick a preset, or upload a file."
              eyebrow="01"
              title="Source"
            >
              <div className="flex min-h-0 flex-1 flex-col gap-3">
                <div className="flex shrink-0 flex-col gap-1.5">
                  <Label
                    className="text-foreground text-xs"
                    htmlFor={`${baseId}-url`}
                  >
                    Image or GIF URL
                  </Label>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
                    <Input
                      className="min-w-0 flex-1 rounded-[calc(var(--radius)-2px)] font-mono text-xs"
                      id={`${baseId}-url`}
                      onChange={(e) => setUrlDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          applyImageUrl();
                        }
                      }}
                      placeholder="https://example.com/photo.jpg or animated.gif"
                      type="url"
                      value={urlDraft}
                    />
                    <Button
                      className={cn("shrink-0 sm:w-auto", BTN_PRESS)}
                      onClick={applyImageUrl}
                      type="button"
                      variant="secondary"
                    >
                      Load URL
                    </Button>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-1.5">
                  <span className="text-foreground text-xs">Quick GIFs</span>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_GIFS.map((g) => (
                      <Button
                        className={BTN_PRESS}
                        key={g.href}
                        onClick={() => loadRemoteImage(g.href)}
                        size="sm"
                        type="button"
                        variant={previewSrc === g.href ? "default" : "outline"}
                      >
                        {g.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-1.5">
                  <span className="text-foreground text-xs">
                    Ghibli stills (local)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_GHIBLI.map((g) => (
                      <Button
                        className={BTN_PRESS}
                        key={g.href}
                        onClick={() => loadRemoteImage(g.href)}
                        size="sm"
                        type="button"
                        variant={previewSrc === g.href ? "default" : "outline"}
                      >
                        {g.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="border-border/60 flex min-h-0 flex-1 flex-col gap-2 border-t pt-3">
                  <p className="text-foreground shrink-0 text-xs font-medium">
                    Upload image or GIF
                  </p>
                  <label
                    className={cn(
                      "flex min-h-32 flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed px-4 py-10 text-center transition-colors",
                      "border-border/55 bg-muted/15 hover:border-border hover:bg-muted/30",
                      "focus-within:border-ring focus-within:ring-ring/25 focus-within:ring-2",
                      fileDragging &&
                        "border-primary bg-primary/8 hover:border-primary"
                    )}
                    htmlFor={`${baseId}-file`}
                    onDragEnter={onFileDragEnter}
                    onDragLeave={onFileDragLeave}
                    onDragOver={onFileDragOver}
                    onDrop={onFileDrop}
                  >
                    <input
                      accept="image/*"
                      aria-label="Upload image or GIF"
                      className="sr-only"
                      id={`${baseId}-file`}
                      onChange={onFileChange}
                      type="file"
                    />
                    <span className="text-foreground text-sm font-medium">
                      {fileDragging ? "Drop to load" : "Drop image or GIF here"}
                    </span>
                    <span className="text-muted-foreground max-w-[14rem] text-xs leading-snug">
                      or click to choose — same formats as URL presets
                    </span>
                  </label>
                </div>
                <div className="shrink-0 pt-2">
                  <Button
                    className={cn("w-full", BTN_PRESS)}
                    onClick={resetSliders}
                    type="button"
                  >
                    Reset settings
                  </Button>
                </div>
              </div>
            </PanelSection>
          </aside>

          {/* Preview — shares top row with source */}
          <section
            className={cn(
              "order-1 w-full min-w-0 xl:col-start-2 xl:row-start-1",
              "xl:w-full xl:max-w-none"
            )}
          >
            <div
              className={cn(
                "bg-muted/20 rounded-[calc(var(--radius)+6px)] p-1.5",
                "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_2px_8px_-2px_rgba(0,0,0,0.08)]",
                "dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.08),0px_2px_12px_-2px_rgba(0,0,0,0.45)]",
                "ring-1 ring-black/10 ring-inset dark:ring-white/10"
              )}
            >
              <div className="overflow-hidden rounded-xl">
                <DitherImage className="w-full">
                  {revealEnabled ? (
                    <DitherImageReveal className="w-full overflow-hidden rounded-xl">
                      <DitherImageFrame
                        aspectRatio={aspect}
                        blur={blurPx}
                        brightness={brightness}
                        className="rounded-none"
                        contrast={contrast}
                        grayscale={grayscale}
                        invertOnDark
                        opacity={opacity}
                        rounded={false}
                        size={size}
                      >
                        <DitherImageContent
                          alt={fileLabel ?? FALLBACK_ALT}
                          fill
                          sizes="(max-width: 1280px) 100vw, 60vw"
                          src={previewSrc}
                          unoptimized={unoptimized}
                        />
                      </DitherImageFrame>
                      <DitherImageOverlay
                        alt={fileLabel ?? FALLBACK_ALT}
                        direction={revealDir}
                        fill
                        from={revealFrom}
                        sizes="(max-width: 1280px) 100vw, 60vw"
                        src={previewSrc}
                        to={revealTo}
                        unoptimized={unoptimized}
                      />
                    </DitherImageReveal>
                  ) : (
                    <DitherImageFrame
                      aspectRatio={aspect}
                      blur={blurPx}
                      brightness={brightness}
                      contrast={contrast}
                      grayscale={grayscale}
                      invertOnDark
                      opacity={opacity}
                      size={size}
                    >
                      <DitherImageContent
                        alt={fileLabel ?? FALLBACK_ALT}
                        fill
                        sizes="(max-width: 1280px) 100vw, 60vw"
                        src={previewSrc}
                        unoptimized={unoptimized}
                      />
                    </DitherImageFrame>
                  )}
                  {/* <DitherImageCaption
                    className={cn(
                      "w-full min-w-0 max-w-full border-border/50 border-t pt-3",
                      "text-sm leading-snug"
                    )}
                  >
                    <div className="flex min-w-0 flex-col gap-2.5">
                      <p
                        className="min-w-0 text-balance font-medium text-foreground text-sm leading-snug tracking-tight"
                        title={fileLabel ?? undefined}
                      >
                        {fileLabel ?? "Sample image"}
                      </p>
                      <ul
                        aria-label="Dither settings"
                        className="m-0 flex list-none flex-wrap gap-1.5 p-0"
                      >
                        <li className="inline-flex">
                          <CaptionMetaChip kicker="Cell">
                            {size}
                          </CaptionMetaChip>
                        </li>
                        <li className="inline-flex">
                          <CaptionMetaChip kicker="Contrast">
                            {contrast}
                          </CaptionMetaChip>
                        </li>
                        <li className="inline-flex">
                          <CaptionMetaChip kicker="Grayscale">
                            {grayscale.toFixed(2)}
                          </CaptionMetaChip>
                        </li>
                        {revealEnabled ? (
                          <li className="inline-flex">
                            <CaptionMetaChip kicker="Mask">
                              {revealDir}
                              <span className="text-muted-foreground"> · </span>
                              <span className="tabular-nums">
                                {revealFrom}→{revealTo}%
                              </span>
                            </CaptionMetaChip>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </DitherImageCaption> */}
                </DitherImage>
              </div>
            </div>
          </section>

          {/* Below preview: reveal, dither, frame */}
          <footer
            className={cn(
              "order-3 min-w-0 xl:col-span-2 xl:col-start-1 xl:row-start-2",
              PANEL_SURFACE
            )}
          >
            <div className="flex flex-col gap-8">
              <PanelSection
                description="Layer a masked clean copy over the dither stack."
                eyebrow="02"
                title="Reveal (partial dither)"
              >
                <div className="flex flex-col gap-4">
                  <div className="border-border/60 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
                    <div className="flex flex-col gap-0.5">
                      <Label
                        className="text-foreground text-xs"
                        htmlFor={`${baseId}-reveal`}
                      >
                        Partial reveal
                      </Label>
                      <p className="text-muted-foreground text-[0.65rem] leading-snug">
                        Show dither on one side and the original photo on the
                        other via a CSS mask.
                      </p>
                    </div>
                    <Switch
                      checked={revealEnabled}
                      id={`${baseId}-reveal`}
                      onCheckedChange={setRevealEnabled}
                    />
                  </div>

                  <div
                    className={cn(
                      "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                      !revealEnabled && "pointer-events-none opacity-50"
                    )}
                  >
                    <div className="flex flex-col gap-1.5">
                      <Label
                        className="text-foreground text-xs"
                        htmlFor={`${baseId}-reveal-dir`}
                      >
                        Mask direction
                      </Label>
                      <select
                        className={SELECT_SURFACE}
                        disabled={!revealEnabled}
                        id={`${baseId}-reveal-dir`}
                        onChange={(e) =>
                          setRevealDir(e.target.value as DitherRevealDirection)
                        }
                        value={revealDir}
                      >
                        {REVEAL_DIRECTION_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <RangeField
                      id={`${baseId}-reveal-from`}
                      label="Mask from %"
                      max={100}
                      min={0}
                      onChange={setRevealFrom}
                      step={1}
                      suffix="%"
                      value={revealFrom}
                    />
                    <RangeField
                      id={`${baseId}-reveal-to`}
                      label="Mask to %"
                      max={100}
                      min={0}
                      onChange={setRevealTo}
                      step={1}
                      suffix="%"
                      value={revealTo}
                    />
                  </div>
                </div>
              </PanelSection>

              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
                <div className="min-w-0 flex-1">
                  <PanelSection
                    description="Filters run on the source before the dot screen. All transitions are plain state updates — tweak freely."
                    eyebrow="03"
                    title="Dither parameters"
                  >
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
                      <RangeField
                        id={`${baseId}-gray`}
                        label="Grayscale (0 = color, 1 = B&W)"
                        max={1}
                        min={0}
                        onChange={setGrayscale}
                        step={0.05}
                        value={grayscale}
                      />
                      <RangeField
                        id={`${baseId}-contrast`}
                        label="Contrast"
                        max={220}
                        min={40}
                        onChange={setContrast}
                        step={1}
                        value={contrast}
                      />
                      <RangeField
                        id={`${baseId}-bright`}
                        label="Brightness"
                        max={1.8}
                        min={0.4}
                        onChange={setBrightness}
                        step={0.05}
                        value={brightness}
                      />
                      <RangeField
                        id={`${baseId}-blur`}
                        label="Blur (px)"
                        max={4}
                        min={0}
                        onChange={setBlurPx}
                        step={0.25}
                        suffix="px"
                        value={blurPx}
                      />
                      <RangeField
                        id={`${baseId}-opacity`}
                        label="Dot overlay opacity"
                        max={1}
                        min={0}
                        onChange={setOpacity}
                        step={0.05}
                        value={opacity}
                      />
                    </div>
                  </PanelSection>
                </div>
              </div>

              <PanelSection
                description="Cell size maps to the Bayer matrix; aspect crops the frame without stretching your asset."
                eyebrow="04"
                title="Frame"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label
                      className="text-foreground text-xs"
                      htmlFor={`${baseId}-size`}
                    >
                      Cell size
                    </Label>
                    <select
                      className={SELECT_SURFACE}
                      id={`${baseId}-size`}
                      onChange={(e) => setSize(e.target.value as DitherSize)}
                      value={size}
                    >
                      {SIZE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      className="text-foreground text-xs"
                      htmlFor={`${baseId}-aspect`}
                    >
                      Aspect ratio
                    </Label>
                    <select
                      className={SELECT_SURFACE}
                      id={`${baseId}-aspect`}
                      onChange={(e) =>
                        setAspect(
                          e.target
                            .value as (typeof ASPECT_OPTIONS)[number]["value"]
                        )
                      }
                      value={aspect}
                    >
                      {ASPECT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </PanelSection>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
