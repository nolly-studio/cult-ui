/**
 * @module PixelParagraph
 *
 * Renders a paragraph where specific words / phrases use an interactive
 * pixel font that swaps or cycles on hover — while the rest of the text
 * stays in the normal font.
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
 *
 * @example
 * // Swap mode — pixel words swap between two fonts on hover
 * <PixelParagraph
 *   text="54+ animated components and effects. Free, open source, and built to drop into any shadcn/ui project."
 *   pixelWords={["animated", "shadcn/ui"]}
 *   initialFont="square"
 *   hoverFont="circle"
 *   className="text-lg text-muted-foreground"
 * />
 *
 * @example
 * // Cycle mode — pixel words cycle through all fonts on hover
 * <PixelParagraph
 *   text="Build beautiful interfaces with pixel-perfect typography."
 *   pixelWords={["beautiful", "pixel-perfect"]}
 *   cycleInterval={200}
 * />
 */

"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Pixel-font constants                                                */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* PixelWord — an individual interactive pixel-font word / phrase      */
/* ------------------------------------------------------------------ */

interface PixelWordProps {
	children: React.ReactNode;
	/** The resting pixel font. @default "square" */
	initialFont?: PixelFont;
	/** The pixel font on hover. When set, swaps instead of cycling. */
	hoverFont?: PixelFont;
	/** Interval in ms between font cycles on hover. @default 300 */
	cycleInterval?: number;
	className?: string;
}

function PixelWord({
	children,
	initialFont = "square",
	hoverFont,
	cycleInterval = 300,
	className,
}: PixelWordProps) {
	const resolvedDefaultIndex = PIXEL_FONT_KEYS.indexOf(initialFont);
	const hoverIndex = hoverFont ? PIXEL_FONT_KEYS.indexOf(hoverFont) : null;
	const isSwapMode = hoverIndex !== null;

	const [fontIndex, setFontIndex] = useState(resolvedDefaultIndex);
	const [isActive, setIsActive] = useState(false);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	/* ---- Cycling helpers ---- */
	const advanceFont = useCallback(() => {
		setFontIndex((prev) => (prev + 1) % PIXEL_FONTS.length);
	}, []);

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
	}, [hoverIndex]);

	const swapToInitial = useCallback(() => {
		setIsActive(false);
		setFontIndex(resolvedDefaultIndex);
	}, [resolvedDefaultIndex]);

	/* ---- Event handlers ---- */
	const handleMouseEnter = useCallback(() => {
		isSwapMode ? swapToHover() : startCycling();
	}, [isSwapMode, swapToHover, startCycling]);

	const handleMouseLeave = useCallback(() => {
		isSwapMode ? swapToInitial() : stopCycling();
	}, [isSwapMode, swapToInitial, stopCycling]);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: decorative hover effect, not an interactive control
		<span
			data-slot="pixel-word"
			data-state={isActive ? "active" : "idle"}
			data-font={PIXEL_FONT_KEYS[fontIndex]}
			className={cn(
				"cursor-default transition-all duration-150",
				PIXEL_FONTS[fontIndex],
				className,
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</span>
	);
}

/* ------------------------------------------------------------------ */
/* Text-splitting helper                                               */
/* ------------------------------------------------------------------ */

type Segment =
	| { type: "plain"; text: string }
	| { type: "pixel"; text: string };

/**
 * Splits `text` into alternating plain / pixel segments based on the
 * provided `pixelWords`.  Longer phrases are matched first so that
 * "shadcn/ui" wins over a hypothetical "ui" match.
 */
function splitTextByPixelWords(
	text: string,
	pixelWords: string[],
): Segment[] {
	if (pixelWords.length === 0) return [{ type: "plain", text }];

	// Sort by length descending so longer matches take priority
	const sorted = [...pixelWords].sort((a, b) => b.length - a.length);

	// Escape regex-special characters in each word
	const escaped = sorted.map((w) =>
		w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
	);

	const pattern = new RegExp(`(${escaped.join("|")})`, "g");

	const segments: Segment[] = [];
	let lastIndex = 0;

	for (const match of text.matchAll(pattern)) {
		const matchStart = match.index ?? 0;
		if (matchStart > lastIndex) {
			segments.push({ type: "plain", text: text.slice(lastIndex, matchStart) });
		}
		segments.push({ type: "pixel", text: match[0] });
		lastIndex = matchStart + match[0].length;
	}

	if (lastIndex < text.length) {
		segments.push({ type: "plain", text: text.slice(lastIndex) });
	}

	return segments;
}

/* ------------------------------------------------------------------ */
/* PixelParagraph                                                      */
/* ------------------------------------------------------------------ */

export interface PixelParagraphProps extends React.ComponentProps<"p"> {
	/** The paragraph text to render. */
	text: string;
	/**
	 * Words or phrases within `text` to render in a pixel font.
	 * Matching is case-sensitive and longest-match-first.
	 */
	pixelWords?: string[];
	/** The wrapper element to render. @default "p" */
	as?: "p" | "span" | "div";
	/** The resting pixel font for highlighted words. @default "square" */
	initialFont?: PixelFont;
	/** The pixel font on hover. When set, words swap instead of cycling. */
	hoverFont?: PixelFont;
	/** Interval in ms between font cycles on hover. @default 300 */
	cycleInterval?: number;
	/** Extra className applied to each pixel-word span. */
	pixelWordClassName?: string;
}

/**
 * Paragraph that renders specific words / phrases in an interactive
 * pixel font while the rest stays in the normal typeface.
 *
 * @example
 * <PixelParagraph
 *   text="54+ animated components and effects. Free, open source, and built to drop into any shadcn/ui project."
 *   pixelWords={["animated", "shadcn/ui"]}
 *   initialFont="square"
 *   hoverFont="circle"
 *   className="text-lg text-muted-foreground"
 * />
 */
export function PixelParagraph({
	text,
	pixelWords = [],
	as: Tag = "p",
	className,
	initialFont = "square",
	hoverFont,
	cycleInterval = 300,
	pixelWordClassName,
	...props
}: PixelParagraphProps) {
	const segments = splitTextByPixelWords(text, pixelWords);

	return (
		<Tag data-slot="pixel-paragraph" className={cn(className)} {...props}>
		{segments.map((segment, index) => {
			const key = `${segment.type}-${segment.text}-${index}`;
				return segment.type === "pixel" ? (
					<PixelWord
						key={key}
						initialFont={initialFont}
						hoverFont={hoverFont}
						cycleInterval={cycleInterval}
						className={pixelWordClassName}
					>
						{segment.text}
					</PixelWord>
				) : (
					<span key={key}>{segment.text}</span>
				);
			})}
		</Tag>
	);
}
