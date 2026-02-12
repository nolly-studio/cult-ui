/**
 * @module PixelHeading
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

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type PixelFont = "square" | "grid" | "circle" | "triangle" | "line";

const PIXEL_FONT_MAP: Record<PixelFont, string> = {
	square: "font-pixel-square",
	grid: "font-pixel-grid",
	circle: "font-pixel-circle",
	triangle: "font-pixel-triangle",
	line: "font-pixel-line",
};

const PIXEL_FONTS = Object.values(PIXEL_FONT_MAP);
const PIXEL_FONT_KEYS = Object.keys(PIXEL_FONT_MAP) as PixelFont[];

/**
 * Props for the PixelHeading component.
 *
 * Extends native heading element attributes so all standard HTML
 * props (id, aria-*, data-*, event handlers) are forwarded.
 */
export interface PixelHeadingProps extends React.ComponentProps<"h1"> {
	/**
	 * The heading level to render.
	 * @default "h1"
	 */
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	/**
	 * The resting pixel font displayed by default.
	 * @default "square"
	 */
	initialFont?: PixelFont;
	/**
	 * The pixel font to show on hover / focus.
	 * When set the component swaps between `initialFont` and `hoverFont`
	 * instead of cycling through every font.
	 */
	hoverFont?: PixelFont;
	/**
	 * Interval in milliseconds between font cycles on hover.
	 * Only used when `hoverFont` is **not** set (cycling mode).
	 * @default 300
	 */
	cycleInterval?: number;
	/**
	 * Initial font index (0–4) for the starting pixel font.
	 * Ignored when `initialFont` is set.
	 * @default 0
	 */
	defaultFontIndex?: number;
	/**
	 * Callback fired when the active font index changes.
	 */
	onFontIndexChange?: (index: number) => void;
	/**
	 * Whether to show the font name label beneath the heading.
	 * @default true
	 */
	showLabel?: boolean;
	/**
	 * Disable all hover / focus interactions.
	 * The heading stays locked to `initialFont` (or `defaultFontIndex`).
	 * @default false
	 */
	disableHover?: boolean;
	/**
	 * Disable the auto-cycling interval in cycle mode.
	 * Swap mode (`hoverFont`) still works unless `disableHover` is also set.
	 * @default false
	 */
	disableCycling?: boolean;
}

/**
 * Interactive heading that swaps or cycles through pixel font styles on hover.
 *
 * **Swap mode** — set `initialFont` and `hoverFont` to swap between two
 * specific fonts on hover:
 *
 * @example
 * <PixelHeading initialFont="square" hoverFont="circle" className="text-6xl">
 *   Swap on hover
 * </PixelHeading>
 *
 * **Cycle mode** — omit `hoverFont` to cycle through every pixel font on
 * hover (the original behavior):
 *
 * @example
 * <PixelHeading
 *   as="h2"
 *   cycleInterval={200}
 *   onFontIndexChange={(i) => console.log(i)}
 * >
 *   Cycle on hover
 * </PixelHeading>
 */
export function PixelHeading({
	children,
	as: Tag = "h1",
	className,
	initialFont,
	hoverFont,
	cycleInterval = 300,
	defaultFontIndex = 0,
	onFontIndexChange,
	showLabel = false,
	disableHover = false,
	disableCycling = false,
	onMouseEnter,
	onMouseLeave,
	onFocus,
	onBlur,
	onKeyDown,
	...props
}: PixelHeadingProps) {
	/* ------------------------------------------------------------------ */
	/* Resolve the starting index from `initialFont` or `defaultFontIndex` */
	/* ------------------------------------------------------------------ */
	const resolvedDefaultIndex = initialFont
		? PIXEL_FONT_KEYS.indexOf(initialFont)
		: defaultFontIndex;

	const hoverIndex = hoverFont ? PIXEL_FONT_KEYS.indexOf(hoverFont) : null;
	const isSwapMode = hoverIndex !== null;

	const [fontIndex, setFontIndex] = useState(resolvedDefaultIndex);
	const [isActive, setIsActive] = useState(false);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	/* ---- Cycling helpers (cycle mode only) ---- */
	const advanceFont = useCallback(() => {
		setFontIndex((prev) => {
			const next = (prev + 1) % PIXEL_FONTS.length;
			onFontIndexChange?.(next);
			return next;
		});
	}, [onFontIndexChange]);

	const startCycling = useCallback(() => {
		setIsActive(true);
		intervalRef.current = setInterval(advanceFont, cycleInterval);
	}, [advanceFont, cycleInterval]);

	const stopCycling = useCallback(() => {
		setIsActive(false);
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	/* ---- Swap helpers ---- */
	const swapToHover = useCallback(() => {
		if (hoverIndex === null) return;
		setIsActive(true);
		setFontIndex(hoverIndex);
		onFontIndexChange?.(hoverIndex);
	}, [hoverIndex, onFontIndexChange]);

	const swapToInitial = useCallback(() => {
		setIsActive(false);
		setFontIndex(resolvedDefaultIndex);
		onFontIndexChange?.(resolvedDefaultIndex);
	}, [resolvedDefaultIndex, onFontIndexChange]);

	/* ---- Event handlers ---- */
	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLHeadingElement>) => {
			if (!disableHover) {
				if (isSwapMode) {
					swapToHover();
				} else if (!disableCycling) {
					startCycling();
				}
			}
			onMouseEnter?.(e);
		},
		[disableHover, disableCycling, isSwapMode, swapToHover, startCycling, onMouseEnter],
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLHeadingElement>) => {
			if (!disableHover) {
				isSwapMode ? swapToInitial() : stopCycling();
			}
			onMouseLeave?.(e);
		},
		[disableHover, isSwapMode, swapToInitial, stopCycling, onMouseLeave],
	);

	const handleFocus = useCallback(
		(e: React.FocusEvent<HTMLHeadingElement>) => {
			if (!disableHover) {
				isSwapMode ? swapToHover() : setIsActive(true);
			}
			onFocus?.(e);
		},
		[disableHover, isSwapMode, swapToHover, onFocus],
	);

	const handleBlur = useCallback(
		(e: React.FocusEvent<HTMLHeadingElement>) => {
			if (!disableHover) {
				isSwapMode ? swapToInitial() : setIsActive(false);
			}
			onBlur?.(e);
		},
		[disableHover, isSwapMode, swapToInitial, onBlur],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLHeadingElement>) => {
			if (!disableHover && !disableCycling) {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					if (!isSwapMode) advanceFont();
				}
			}
			onKeyDown?.(e);
		},
		[disableHover, disableCycling, isSwapMode, advanceFont, onKeyDown],
	);

	const currentFontLabel = PIXEL_FONT_KEYS[fontIndex];

	return (
		<div
			data-slot="pixel-heading"
			className="inline-flex flex-col items-start gap-2"
		>
			<Tag
				data-state={isActive ? "active" : "idle"}
				data-font={currentFontLabel}
				tabIndex={0}
				className={cn(
					"cursor-default select-none transition-all duration-150",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
					PIXEL_FONTS[fontIndex],
					className,
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
				{...props}
			>
				{children}
			</Tag>
			{showLabel && (
				<output
					data-slot="pixel-heading-label"
					aria-live="polite"
					className={cn(
						"text-xs uppercase tracking-widest text-muted-foreground transition-opacity duration-200",
						isActive ? "opacity-100" : "opacity-0",
					)}
				>
					{currentFontLabel}
				</output>
			)}
		</div>
	);
}
