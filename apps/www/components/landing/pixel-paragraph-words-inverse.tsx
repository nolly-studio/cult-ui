/**
 * @module PixelParagraphInverse
 *
 * Renders a paragraph where the base text is in a pixel font and
 * specific words / phrases escape into sans or mono — with an
 * interactive hover that swaps or cycles between sans ↔ mono.
 *
 * This is the inverse of `PixelParagraph`: instead of highlighting
 * words *in* pixel, everything is pixel *except* the specified words.
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
 * Once configured, the `font-pixel-*` and `font-sans` / `font-mono`
 * utility classes used by this component will resolve correctly.
 *
 * @example
 * // Swap mode — plain words swap between sans and mono on hover
 * <PixelParagraphInverse
 *   text="54+ animated components and effects. Free, open source, and built to drop into any shadcn/ui project."
 *   plainWords={["animated", "shadcn/ui"]}
 *   initialPlainFont="sans"
 *   hoverPlainFont="mono"
 *   pixelFont="square"
 *   className="text-lg text-muted-foreground"
 * />
 *
 * @example
 * // Cycle mode — plain words cycle between sans and mono on hover
 * <PixelParagraphInverse
 *   text="Build beautiful interfaces with pixel-perfect typography."
 *   plainWords={["beautiful", "pixel-perfect"]}
 *   cycleInterval={200}
 * />
 */

"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Font constants                                                      */
/* ------------------------------------------------------------------ */

type PlainFont = "sans" | "mono";
type PixelFont = "square" | "grid" | "circle" | "triangle" | "line";

const PLAIN_FONT_MAP: Record<PlainFont, string> = {
	sans: "font-sans",
	mono: "font-mono",
};

const PLAIN_FONTS = Object.values(PLAIN_FONT_MAP);
const PLAIN_FONT_KEYS = Object.keys(PLAIN_FONT_MAP) as PlainFont[];

const PIXEL_FONT_MAP: Record<PixelFont, string> = {
	square: "font-pixel-square",
	grid: "font-pixel-grid",
	circle: "font-pixel-circle",
	triangle: "font-pixel-triangle",
	line: "font-pixel-line",
};

/* ------------------------------------------------------------------ */
/* PlainWord — an individual interactive sans/mono word / phrase        */
/* ------------------------------------------------------------------ */

interface PlainWordProps {
	children: React.ReactNode;
	/** The resting plain font. @default "sans" */
	initialFont?: PlainFont;
	/** The plain font on hover. When set, swaps instead of cycling. */
	hoverFont?: PlainFont;
	/** Interval in ms between font cycles on hover. @default 300 */
	cycleInterval?: number;
	className?: string;
}

function PlainWord({
	children,
	initialFont = "sans",
	hoverFont,
	cycleInterval = 300,
	className,
}: PlainWordProps) {
	const resolvedDefaultIndex = PLAIN_FONT_KEYS.indexOf(initialFont);
	const hoverIndex = hoverFont ? PLAIN_FONT_KEYS.indexOf(hoverFont) : null;
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
		setFontIndex((prev) => (prev + 1) % PLAIN_FONTS.length);
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
			data-slot="plain-word"
			data-state={isActive ? "active" : "idle"}
			data-font={PLAIN_FONT_KEYS[fontIndex]}
			className={cn(
				"cursor-default transition-all duration-150",
				PLAIN_FONTS[fontIndex],
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
	| { type: "pixel"; text: string }
	| { type: "plain"; text: string };

/**
 * Splits `text` into alternating pixel / plain segments based on the
 * provided `plainWords`.  Longer phrases are matched first so that
 * "shadcn/ui" wins over a hypothetical "ui" match.
 */
function splitTextByPlainWords(
	text: string,
	plainWords: string[],
): Segment[] {
	if (plainWords.length === 0) return [{ type: "pixel", text }];

	// Sort by length descending so longer matches take priority
	const sorted = [...plainWords].sort((a, b) => b.length - a.length);

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
			segments.push({ type: "pixel", text: text.slice(lastIndex, matchStart) });
		}
		segments.push({ type: "plain", text: match[0] });
		lastIndex = matchStart + match[0].length;
	}

	if (lastIndex < text.length) {
		segments.push({ type: "pixel", text: text.slice(lastIndex) });
	}

	return segments;
}

/* ------------------------------------------------------------------ */
/* PixelParagraphInverse                                               */
/* ------------------------------------------------------------------ */

export interface PixelParagraphInverseProps extends React.ComponentProps<"p"> {
	/** The paragraph text to render. */
	text: string;
	/**
	 * Words or phrases within `text` to render in a plain (sans/mono) font.
	 * Everything else renders in the pixel font.
	 * Matching is case-sensitive and longest-match-first.
	 */
	plainWords?: string[];
	/** The wrapper element to render. @default "p" */
	as?: "p" | "span" | "div";
	/** The pixel font used for the base text. @default "square" */
	pixelFont?: PixelFont;
	/** The resting plain font for highlighted words. @default "sans" */
	initialPlainFont?: PlainFont;
	/** The plain font on hover. When set, words swap instead of cycling. */
	hoverPlainFont?: PlainFont;
	/** Interval in ms between font cycles on hover. @default 300 */
	cycleInterval?: number;
	/** Extra className applied to each plain-word span. */
	plainWordClassName?: string;
}

/**
 * Paragraph where the base text is in a pixel font and specific words
 * or phrases escape into an interactive sans / mono font that swaps
 * or cycles on hover.
 *
 * @example
 * <PixelParagraphInverse
 *   text="54+ animated components and effects. Free, open source, and built to drop into any shadcn/ui project."
 *   plainWords={["animated", "shadcn/ui"]}
 *   initialPlainFont="sans"
 *   hoverPlainFont="mono"
 *   pixelFont="square"
 *   className="text-lg text-muted-foreground"
 * />
 */
export function PixelParagraphInverse({
	text,
	plainWords = [],
	as: Tag = "p",
	className,
	pixelFont = "square",
	initialPlainFont = "sans",
	hoverPlainFont,
	cycleInterval = 300,
	plainWordClassName,
	...props
}: PixelParagraphInverseProps) {
	const segments = splitTextByPlainWords(text, plainWords);
	const pixelFontClass = PIXEL_FONT_MAP[pixelFont];

	return (
		<Tag
			data-slot="pixel-paragraph-inverse"
			className={cn(pixelFontClass, className)}
			{...props}
		>
		{segments.map((segment, index) => {
			const key = `${segment.type}-${segment.text}-${index}`;
				return segment.type === "plain" ? (
					<PlainWord
						key={key}
						initialFont={initialPlainFont}
						hoverFont={hoverPlainFont}
						cycleInterval={cycleInterval}
						className={plainWordClassName}
					>
						{segment.text}
					</PlainWord>
				) : (
					<span key={key}>{segment.text}</span>
				);
			})}
		</Tag>
	);
}
