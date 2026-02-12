/**
 * @module PixelHeading (Character variant)
 *
 * Per-character pixel-font heading with four animation modes.
 *
 * Setup — Geist Pixel Fonts with Tailwind CSS
 * =============================================
 *
 * All Geist fonts can be used through CSS variables:
 *
 *   GeistSans:          --font-geist-sans
 *   GeistMono:          --font-geist-mono
 *   GeistPixelSquare:   --font-geist-pixel-square
 *   GeistPixelGrid:     --font-geist-pixel-grid
 *   GeistPixelCircle:   --font-geist-pixel-circle
 *   GeistPixelTriangle: --font-geist-pixel-triangle
 *   GeistPixelLine:     --font-geist-pixel-line
 *
 * 1. Register the font variables in app/layout.js:
 *
 *   ```js
 *   import { GeistSans } from "geist/font/sans";
 *   import { GeistMono } from "geist/font/mono";
 *   import { GeistPixelSquare } from "geist/font/pixel";
 *
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html
 *         lang="en"
 *         className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}
 *       >
 *         <body>{children}</body>
 *       </html>
 *     );
 *   }
 *   ```
 *
 * 2. Map the CSS variables in your Tailwind CSS v4 theme (tailwind.css):
 *
 *   ```css
 *   @theme {
 *     --font-sans: var(--font-geist-sans);
 *     --font-mono: var(--font-geist-mono);
 *     --font-pixel-square: var(--font-geist-pixel-square);
 *     --font-pixel-grid: var(--font-geist-pixel-grid);
 *     --font-pixel-circle: var(--font-geist-pixel-circle);
 *     --font-pixel-triangle: var(--font-geist-pixel-triangle);
 *     --font-pixel-line: var(--font-geist-pixel-line);
 *   }
 *   ```
 *
 * Once configured, the `font-pixel-*` utility classes used by this
 * component will resolve correctly.
 */

"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

/* ─── Constants ─── */

const PIXEL_FONTS = [
	"font-pixel-square",
	"font-pixel-grid",
	"font-pixel-circle",
	"font-pixel-triangle",
	"font-pixel-line",
] as const;

const FONT_LABELS = ["Square", "Grid", "Circle", "Triangle", "Line"] as const;
const FONT_COUNT = PIXEL_FONTS.length;

/** Map short name → Tailwind class for the prefix font. */
const PREFIX_FONT_MAP: Record<string, string> = {
	square: "font-pixel-square",
	grid: "font-pixel-grid",
	circle: "font-pixel-circle",
	triangle: "font-pixel-triangle",
	line: "font-pixel-line",
};

/** Map short name → Tailwind class for isolated (non-pixel) characters. */
const ISOLATE_FONT_MAP: Record<string, string> = {
	sans: "font-sans",
	mono: "font-mono",
};

function resolveIsolateFont(value: string): string {
	return ISOLATE_FONT_MAP[value] ?? value;
}

/** Golden ratio — maximises spacing between identical values in a sequence. */
const PHI = (1 + Math.sqrt(5)) / 2;

/** Internal tick rate in ms — drives the stagger resolution. */
const TICK_MS = 50;

/* ─── Distribution algorithms ─── */

/**
 * Golden-ratio–based index.
 * Maps a sequential position to a font index such that
 * adjacent positions almost never share the same font.
 */
function goldenBase(index: number): number {
	return Math.floor((index * PHI * FONT_COUNT) % FONT_COUNT);
}

/**
 * Deterministic pseudo-random via Knuth multiplicative hash.
 * Produces a uniform-ish distribution across FONT_COUNT for any (tick, index) pair.
 */
function pseudoRandom(tick: number, index: number): number {
	return ((tick * 2654435761 + index * 340573321) >>> 0) % FONT_COUNT;
}

/* ─── Helpers ─── */

/** Recursively extract text content from React children. */
function extractText(children: React.ReactNode): string {
	if (typeof children === "string") return children;
	if (typeof children === "number") return String(children);
	if (Array.isArray(children)) return children.map(extractText).join("");
	if (
		children !== null &&
		children !== undefined &&
		typeof children === "object" &&
		"props" in children
	) {
		return extractText(
			(children as React.ReactElement<{ children?: React.ReactNode }>).props
				.children,
		);
	}
	return "";
}

/* ─── Types ─── */

/**
 * Animation mode for per-character font distribution.
 *
 * | Mode       | At rest                         | On hover                                           |
 * |------------|---------------------------------|----------------------------------------------------|
 * | `uniform`  | Single font (original behavior) | Cycles one font for all characters                 |
 * | `multi`    | Golden-ratio distribution       | Staggered cascade — each char cycles independently |
 * | `wave`     | Position-based gradient         | Fonts flow left→right in a continuous wave         |
 * | `random`   | Golden-ratio distribution       | Each character scrambles independently              |
 */
export type PixelHeadingMode = "uniform" | "multi" | "wave" | "random";

/* ─── Props ─── */

export interface PixelHeadingProps extends React.ComponentProps<"h1"> {
	/**
	 * The heading level to render.
	 * @default "h1"
	 */
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	/**
	 * Interval in ms between font changes per character.
	 * @default 150
	 */
	cycleInterval?: number;
	/**
	 * Initial font index (0–4). Only meaningful in `uniform` mode.
	 * @default 0
	 */
	defaultFontIndex?: number;
	/**
	 * Callback fired when the active font changes (uniform mode only).
	 */
	onFontIndexChange?: (index: number) => void;
	/**
	 * Whether to show the label beneath the heading.
	 * @default true
	 */
	showLabel?: boolean;
	/**
	 * Controls how fonts are distributed across characters.
	 *
	 * - `"uniform"` — all characters share one font; cycles on hover (original)
	 * - `"multi"`   — golden-ratio distribution; staggered cascade on hover
	 * - `"wave"`    — fonts flow left-to-right in a continuous wave
	 * - `"random"`  — each character scrambles independently per tick
	 *
	 * @default "multi"
	 */
	mode?: PixelHeadingMode;
	/**
	 * Milliseconds of delay between each successive character's animation start.
	 * Creates a left→right cascade / ripple effect.
	 * Only applies in `multi`, `wave`, and `random` modes.
	 * @default 50
	 */
	staggerDelay?: number;
	/**
	 * When true the animation runs automatically on mount —
	 * no hover or focus required. Hover/focus still work to
	 * restart the cascade.
	 * @default false
	 */
	autoPlay?: boolean;
	/**
	 * Static text rendered before the animated children.
	 * Does not animate — stays locked to the font set by `prefixFont`.
	 * A trailing space is added automatically.
	 */
	prefix?: string;
	/**
	 * Which pixel font to apply to the `prefix` text.
	 * Set to `"none"` to use the inherited font (e.g. font-sans).
	 * @default "none"
	 */
	prefixFont?: "square" | "grid" | "circle" | "triangle" | "line" | "none";
	/**
	 * Map of characters to exclude from pixel-font animation.
	 * Keys are single characters (case-sensitive).
	 * Values are font short-names ("sans" | "mono") or arbitrary
	 * Tailwind font class names (e.g. "font-serif").
	 *
	 * Isolated characters always render in their assigned font,
	 * even during hover/auto-play animation.
	 */
	isolate?: Record<string, string>;
}

/* ─── Component ─── */

/**
 * Interactive heading where **each character** can display a different
 * pixel font. On hover the fonts animate — the distribution algorithm
 * and cascade timing are controlled via the `mode` and `staggerDelay` props.
 *
 * @example
 * ```tsx
 * <PixelHeading mode="multi" className="text-7xl">
 *   Shadcn, expanded
 * </PixelHeading>
 * ```
 *
 * @example
 * ```tsx
 * <PixelHeading mode="wave" cycleInterval={100} staggerDelay={30}>
 *   Wave effect
 * </PixelHeading>
 * ```
 *
 * @example
 * ```tsx
 * <PixelHeading mode="multi" autoPlay>
 *   Runs on mount, no hover needed
 * </PixelHeading>
 * ```
 *
 * @example
 * ```tsx
 * <PixelHeading prefix="Shadcn," prefixFont="grid" mode="wave" autoPlay>
 *   expanded
 * </PixelHeading>
 * ```
 *
 * @example
 * ```tsx
 * <PixelHeading
 *   prefix="Shadcn,"
 *   prefixFont="grid"
 *   isolate={{ x: "sans", h: "mono" }}
 *   mode="wave"
 *   autoPlay
 * >
 *   expanded
 * </PixelHeading>
 * ```
 *
 * @example
 * ```tsx
 * <PixelHeading mode="uniform" className="text-6xl">
 *   Classic single-font cycle
 * </PixelHeading>
 * ```
 */
export function PixelHeading({
	children,
	as: Tag = "h1",
	className,
	cycleInterval = 150,
	defaultFontIndex = 0,
	onFontIndexChange,
	showLabel = false,
	mode = "multi",
	staggerDelay = 50,
	autoPlay = false,
	prefix,
	prefixFont = "none",
	isolate,
	onMouseEnter,
	onMouseLeave,
	onFocus,
	onBlur,
	onKeyDown,
	...props
}: PixelHeadingProps) {
	const text = useMemo(() => extractText(children), [children]);

	const [msElapsed, setMsElapsed] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const prevUniformIndex = useRef(defaultFontIndex);

	/* ── Cleanup ── */
	useEffect(() => {
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	/* ── Auto-play: start cycling on mount ── */
	useEffect(() => {
		if (!autoPlay) return;
		// Kick off the interval immediately
		setIsActive(true);
		setMsElapsed(0);
		intervalRef.current = setInterval(() => {
			setMsElapsed((prev) => prev + TICK_MS);
		}, TICK_MS);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [autoPlay]);

	/* ── Compute per-character font indices ── */
	const charFonts = useMemo(() => {
		const fonts: number[] = [];
		let vi = 0; // visible-character index (skips spaces)

		for (let i = 0; i < text.length; i++) {
			if (text[i] === " ") {
				fonts.push(-1);
				continue;
			}

			switch (mode) {
				case "uniform": {
					const cycles = Math.floor(msElapsed / cycleInterval);
					const idx = (defaultFontIndex + cycles) % FONT_COUNT;
					fonts.push(idx);
					break;
				}
				case "multi": {
					const base = goldenBase(vi);
					const charMs = Math.max(0, msElapsed - vi * staggerDelay);
					const cycles = Math.floor(charMs / cycleInterval);
					fonts.push((base + cycles) % FONT_COUNT);
					break;
				}
				case "wave": {
					const charMs = Math.max(0, msElapsed - vi * staggerDelay);
					const cycles = Math.floor(charMs / cycleInterval);
					fonts.push((vi + cycles) % FONT_COUNT);
					break;
				}
				case "random": {
					const charMs = Math.max(0, msElapsed - vi * staggerDelay);
					const cycles = Math.floor(charMs / cycleInterval);
					fonts.push(cycles > 0 ? pseudoRandom(cycles, vi) : goldenBase(vi));
					break;
				}
			}
			vi++;
		}
		return fonts;
	}, [text, mode, msElapsed, cycleInterval, staggerDelay, defaultFontIndex]);

	/* ── Fire callback for uniform mode ── */
	useEffect(() => {
		if (mode !== "uniform") return;
		const idx = charFonts.find((f) => f !== -1) ?? defaultFontIndex;
		if (idx !== prevUniformIndex.current) {
			prevUniformIndex.current = idx;
			onFontIndexChange?.(idx);
		}
	}, [charFonts, mode, defaultFontIndex, onFontIndexChange]);

	/* ── Label text ── */
	const activeLabel = useMemo(() => {
		if (mode === "uniform") {
			const idx = charFonts.find((f) => f !== -1) ?? 0;
			return FONT_LABELS[idx];
		}
		const modeLabels: Record<PixelHeadingMode, string> = {
			uniform: "",
			multi: "Multi",
			wave: "Wave",
			random: "Random",
		};
		return modeLabels[mode];
	}, [mode, charFonts]);

	/* ── Start / stop cycling ── */
	const startCycling = useCallback(() => {
		// Clear any existing interval first to avoid stacking
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		setIsActive(true);
		setMsElapsed(0);
		intervalRef.current = setInterval(() => {
			setMsElapsed((prev) => prev + TICK_MS);
		}, TICK_MS);
	}, []);

	const stopCycling = useCallback(() => {
		if (autoPlay) {
			// Auto-play keeps running — just restart the cascade
			setIsActive(true);
			return;
		}
		setIsActive(false);
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, [autoPlay]);

	/* ── Event handlers ── */
	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLHeadingElement>) => {
			startCycling();
			onMouseEnter?.(e);
		},
		[startCycling, onMouseEnter],
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLHeadingElement>) => {
			stopCycling();
			onMouseLeave?.(e);
		},
		[stopCycling, onMouseLeave],
	);

	const handleFocus = useCallback(
		(e: React.FocusEvent<HTMLHeadingElement>) => {
			startCycling();
			onFocus?.(e);
		},
		[startCycling, onFocus],
	);

	const handleBlur = useCallback(
		(e: React.FocusEvent<HTMLHeadingElement>) => {
			stopCycling();
			onBlur?.(e);
		},
		[stopCycling, onBlur],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLHeadingElement>) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				setMsElapsed((prev) => prev + cycleInterval);
			}
			onKeyDown?.(e);
		},
		[cycleInterval, onKeyDown],
	);

	/* ── Uniform font index (for class on the Tag itself) ── */
	const uniformIdx =
		mode === "uniform"
			? (charFonts.find((f) => f !== -1) ?? defaultFontIndex)
			: 0;

	return (
		<div
			data-slot="pixel-heading"
			className="inline-flex flex-col items-start gap-2"
		>
			<Tag
				data-state={isActive ? "active" : "idle"}
				data-mode={mode}
				aria-label={prefix ? `${prefix} ${text}` : text}
				tabIndex={0}
				className={cn(
					"cursor-default select-none",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
					mode === "uniform" && PIXEL_FONTS[uniformIdx],
					className,
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
				{...props}
			>
				{/* ── Static prefix ── */}
				{prefix && (
					<>
						{isolate ? (
							prefix.split("").map((char, i) => (
								<span
									// biome-ignore lint/suspicious/noArrayIndexKey: stable character sequence
									key={`p${i}`}
									className={cn(
										prefixFont !== "none"
											? PREFIX_FONT_MAP[prefixFont]
											: undefined,
										isolate[char]
											? resolveIsolateFont(isolate[char])
											: undefined,
									)}
									aria-hidden
								>
									{char}
								</span>
							))
						) : (
							<span
								className={
									prefixFont !== "none"
										? PREFIX_FONT_MAP[prefixFont]
										: undefined
								}
								aria-hidden
							>
								{prefix}
							</span>
						)}
						<span> </span>
					</>
				)}

				{/* ── Animated characters ── */}
				{mode === "uniform"
					? children
					: text.split("").map((char, i) =>
							char === " " ? (
								// biome-ignore lint/suspicious/noArrayIndexKey: stable character sequence
								<span key={i}> </span>
							) : isolate?.[char] ? (
								<span
									// biome-ignore lint/suspicious/noArrayIndexKey: stable character sequence
									key={i}
									className={resolveIsolateFont(isolate[char])}
									aria-hidden
								>
									{char}
								</span>
							) : (
								<span
									// biome-ignore lint/suspicious/noArrayIndexKey: stable character sequence
									key={i}
									className={PIXEL_FONTS[charFonts[i]]}
									aria-hidden
								>
									{char}
								</span>
							),
						)}
			</Tag>
			{showLabel && (
				<output
					data-slot="pixel-heading-label"
					aria-live="polite"
					className={cn(
						"text-xs uppercase tracking-widest text-muted-foreground transition-opacity duration-200",
						isActive || autoPlay ? "opacity-100" : "opacity-0",
					)}
				>
					{activeLabel}
				</output>
			)}
		</div>
	);
}
