import { cn } from "@/lib/utils";

const shapeSvgClass = "w-full fill-background text-foreground";

const flipClasses = {
	none: "",
	/** Center origin keeps flips inside the viewBox; edge origins mirror the path out of frame. */
	vertical: "origin-center -scale-y-100",
	horizontal: "origin-center -scale-x-100",
	both: "origin-center -scale-x-100 -scale-y-100",
} as const;

export type BandShapeFlip = keyof typeof flipClasses;

export interface BandShapeProps {
	path: string;
	viewBox: string;
	flip?: BandShapeFlip;
	className?: string;
	/** Accessible name; defaults to a generic label when omitted. */
	title?: string;
}

/**
 * Generic section ornament: pass a closed clockwise `path` plus `viewBox`.
 * Use `flip` for mirrored top/bottom or left/right trims (mirrors around the viewBox center).
 */
export function BandShape({
	path,
	viewBox,
	flip = "none",
	className,
	title = "Decorative section shape",
}: BandShapeProps) {
	return (
		<svg
			className={cn(shapeSvgClass, flipClasses[flip], className)}
			fill="none"
			viewBox={viewBox}
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{title}</title>
			<path d={path} stroke="currentColor" />
		</svg>
	);
}

/** Band: flat top with a single downward angle on the right. Flip vertical for a bottom trim. */
export function FlatSingleAngleBandSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 200"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Flat top band with single right-side angle</title>
			<path
				d="M1 199V6C1 3 3 1 6 1H1792C1796 1 1800 2 1802 5L2395 193C2397 196 2398 198 2399 199H1Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

const CASTLE_WALL_TEETH = 12;
const CASTLE_WALL_BOTTOM_Y = 179;
const CASTLE_WALL_TOP_Y = 46;
const CASTLE_WALL_CRENE_Y = 106;
const CASTLE_WALL_X_MIN = 1;
const CASTLE_WALL_X_MAX = 2399;

function fmtPathX(x: number): string {
	const r = Math.round(x * 1000) / 1000;
	return Number.isInteger(r) ? String(r) : r.toFixed(3);
}

/** Even battlement: `toothCount` merlons, equal merlon and crene run in x (span 1–2399). */
export function castleWallBandPath(toothCount: number): string {
	if (toothCount < 1) {
		throw new RangeError("castleWallBandPath: toothCount must be >= 1");
	}
	const span = CASTLE_WALL_X_MAX - CASTLE_WALL_X_MIN;
	const parts = [
		`M${CASTLE_WALL_X_MIN} ${CASTLE_WALL_BOTTOM_Y}H${CASTLE_WALL_X_MAX}V${CASTLE_WALL_TOP_Y}`,
	];
	for (let i = 0; i < toothCount; i++) {
		const xMerlonEnd =
			CASTLE_WALL_X_MAX - ((2 * i + 1) * span) / (2 * toothCount);
		const xCreneEnd =
			CASTLE_WALL_X_MAX - ((2 * i + 2) * span) / (2 * toothCount);
		parts.push(
			`H${fmtPathX(xMerlonEnd)}`,
			`V${CASTLE_WALL_CRENE_Y}`,
			`H${fmtPathX(xCreneEnd)}`,
			`V${CASTLE_WALL_TOP_Y}`,
		);
	}
	parts.push(`V${CASTLE_WALL_BOTTOM_Y}Z`);
	return parts.join("");
}

/**
 * Band: crenellated / battlement top (castle-wall silhouette) — 12 alternating merlons and crenels.
 * Flip vertical for a bottom trim with teeth pointing downward.
 */
export function CastleWallBandSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 180"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Castle wall battlement band</title>
			<path d={castleWallBandPath(CASTLE_WALL_TEETH)} stroke="currentColor" />
		</svg>
	);
}

/** Band: symmetric shallow “V” on top; mirror vertically for an inverted profile. */
export function SymmetricVBandSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 300"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Symmetric V-profile top band</title>
			<path
				d="M1 299H2399V15C2399 9 2394 4 2388 4L2006 246C2003 249 1998 250 1993 250H407C402 250 397 249 394 246L12 4C6 4 1 9 1 15V299Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

/**
 * Band: twin V-notches along the top edge (skill gallery); flip vertical for a bottom crown.
 * Lighter than dual-notch full frame or single center tab.
 */
export function NotchedTopBandSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 250"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Top band with twin notches</title>
			<path
				d="M1 249V31H600C602 31 604 32 605 34L636 77C637 79 639 80 641 80H659C661 80 663 79 664 77L695 34C696 32 698 31 700 31H1700C1702 31 1704 32 1705 34L1736 77C1737 79 1739 80 1741 80H1759C1761 80 1763 79 1764 77L1795 34C1796 32 1798 31 1800 31H2399V249H1Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

const ZIGZAG_X_MIN = 1;
const ZIGZAG_X_MAX = 2399;
const ZIGZAG_BOTTOM_Y = 199;
const ZIGZAG_PEAK_Y = 2;
const ZIGZAG_VALLEY_Y = 100;

/** Clockwise sawtooth top / flat bottom; period = 2400 / `teeth` on the wide grid (8 / 12 / 16 / 24 typical). */
export function zigzagSawtoothBandPath(teeth: number): string {
	if (teeth < 2) {
		throw new RangeError("zigzagSawtoothBandPath: teeth must be >= 2");
	}
	const period = 2400 / teeth;
	const parts = [`M${ZIGZAG_X_MIN} ${ZIGZAG_BOTTOM_Y}`, `V${ZIGZAG_VALLEY_Y}`];
	for (let i = 0; i < teeth - 1; i++) {
		const peakX = Math.round((i + 0.5) * period);
		const valleyX = Math.round((i + 1) * period);
		parts.push(`L${peakX} ${ZIGZAG_PEAK_Y}`, `L${valleyX} ${ZIGZAG_VALLEY_Y}`);
	}
	const lastPeak = Math.round((teeth - 0.5) * period);
	parts.push(
		`L${lastPeak} ${ZIGZAG_PEAK_Y}`,
		`L${ZIGZAG_X_MAX} ${ZIGZAG_VALLEY_Y}`,
		`V${ZIGZAG_BOTTOM_Y}`,
		`H${ZIGZAG_X_MIN}`,
		"Z",
	);
	return parts.join("");
}

/**
 * Band: zigzag / sawtooth profile (sharp peaks & valleys). Flip vertical with `origin-bottom -scale-y-100` for a bottom trim.
 * @param teeth — default 12 (~200px period); use 8 / 16 / 24 for chunkier / finer zigzag.
 */
export function ZigzagSawtoothBandSvg({
	className,
	teeth = 12,
}: {
	className?: string;
	teeth?: number;
}) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 200"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Zigzag sawtooth section band</title>
			<path d={zigzagSawtoothBandPath(teeth)} stroke="currentColor" />
		</svg>
	);
}

/**
 * Band: flat top with a single centered rectangular tab (SKILL — 2400×200). Tab ~300px; flip vertical for bottom variant.
 */
export function CenterTabBandSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 200"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Band band with centered top tab</title>
			<path
				d="M1 199V80H1044C1044 80 1044 76 1048 76V6C1048 2 1052 2 1056 2H1344C1348 2 1352 2 1352 6V76C1352 80 1356 80 1360 80H2399V199H1Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

/** Band: parallelogram slash — diagonal left edge, flat top, vertical right. */
export function DiagonalSlashBandSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 250"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Diagonal slash parallelogram band</title>
			<path
				d="M1 249L394 8C397 4 400 2 404 2H2399V249H1Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

/** Band: right-pointing arrow / chevron (flat top & bottom, tip at right center). */
export function ArrowChevronBandSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 300"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Right-pointing arrow chevron band</title>
			<path
				d="M1 298V2H2094C2098 2 2102 3 2105 6L2399 144C2399 148 2399 152 2399 156L2105 294C2102 297 2098 298 2094 298H1Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

/** Band: five equal steps descending along the top edge (480px treads, 60px risers). */
export function StaircaseBandSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 350"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Descending staircase section band</title>
			<path
				d="M1 349V2H474C478 2 480 4 480 8V56C480 60 482 62 486 62H954C958 62 960 64 960 68V116C960 120 962 122 966 122H1434C1438 122 1440 124 1440 128V176C1440 180 1442 182 1446 182H1914C1918 182 1920 184 1920 188V236C1920 240 1922 242 1926 242H2399V349H1Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

/**
 * Band: stepped-out segment on the left edge plus steep angled transition on the right (SKILL §3).
 * Flip vertical for a bottom-oriented variant pinned to the section edge.
 */
export function SteppedLeftSteepRightBandSvg({
	className,
}: {
	className?: string;
}) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 400"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Left stepped edge with steep right angle band</title>
			<path
				d="M1 399V255C1 251 4 248 9 247H71C76 247 80 243 80 238V2H2145C2150 2 2155 4 2158 9L2399 200V399H1Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

/**
 * Panel: inset stepped frame — outer rectangle with rectangular bite inward on all four sides
 * (skill gallery). Distinct from dual-notch ornamental frame.
 */
export function SteppedInsetFrameSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 1000"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Inset stepped rectangular frame panel</title>
			<path
				d="M1 1H2399V300H2350V700H2399V999H1V700H50V300H1Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

/** Panel: chamfered rectangle — equal angled cuts on all four corners; good for hero or card frames. */
export function AngledCornerPanelSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 800"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Panel with chamfered corners</title>
			<path
				d="M1 84C1 81 3 78 6 76L76 6C78 3 81 1 84 1H2316C2319 1 2322 3 2324 6L2394 76C2397 78 2399 81 2399 84V716C2399 719 2397 722 2394 724L2324 794C2322 797 2319 799 2316 799H84C81 799 78 797 76 794L6 724C3 722 1 719 1 716V84Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

const ornamentResponsiveClass =
	"origin-top-right max-md:translate-x-3 max-md:scale-x-250 max-md:scale-y-125";

/** Full ornamental frame with matching notches on both sides (dual side tabs). */
export function DualSideNotchFrameSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, ornamentResponsiveClass, className)}
			fill="none"
			viewBox="0 0 2402 1372"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Ornamental frame with dual side notches</title>
			<path
				d="M1.6015 1033.34L4.26185 1343.72C4.39367 1359.1 16.9052 1371.49 32.2849 1371.48L2310.36 1369.51C2317.81 1369.5 2324.95 1366.53 2330.2 1361.25L2393.36 1297.69C2398.57 1292.44 2401.5 1285.35 2401.5 1277.95V1042.9C2401.5 1036.19 2399.09 1029.7 2394.71 1024.62L2364.79 989.877C2360.41 984.795 2358 978.311 2358 971.603V377.809C2358 370.258 2361.05 363.028 2366.46 357.758L2389.04 335.742C2394.45 330.472 2397.5 323.242 2397.5 315.691V29C2397.5 13.536 2384.96 1 2369.5 1H2300.5H1544.71C1536.92 1 1529.49 4.24189 1524.19 9.94736L1501.81 34.0526C1496.51 39.7581 1489.08 43 1481.29 43H926.196C918.712 43 911.539 40.0038 906.279 34.6801L881.221 9.31992C875.961 3.99621 868.788 1 861.304 1H87.598C80.1719 1 73.05 3.95 67.799 9.20102L9.20101 67.799C3.94999 73.05 1 80.1719 1 87.598V315.075C1 322.101 3.64086 328.869 8.3986 334.038L34.1014 361.962C38.8591 367.131 41.5 373.899 41.5 380.925V970.299C41.5 977.786 38.5014 984.961 33.1741 990.222L9.9264 1013.18C4.53979 1018.5 1.53662 1025.77 1.6015 1033.34Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

/**
 * Narrow top band: shallow slope on the left, steep apex at the upper-right.
 * Single subpath (no corner fillet) so the outline stays one clean quadrilateral.
 */
export function TopBandSteepRightSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 350"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Band top band, steep slope on the right</title>
			<path
				d="M1 351.897L73.4616 269.083C77.9667 264.549 84.094 262 90.4852 262H2119.12C2131.85 262 2144.06 256.943 2153.06 247.941L2399 2V351.897H1Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

/**
 * Symmetric steep corners: left shelf fillet matches the right (12.73 unit handle, P1 along the
 * steep diagonal for a clean tangent). Same shelf + right path as TopBandSteepRightSvg.
 */
export function TopBandSteepBothSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 350"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Band top band, steep on both sides</title>
			<path
				d="M1 351.897V2L246.94 247.941C255.94 256.943 268.15 262 280.88 262H2119.12C2131.85 262 2144.06 256.943 2153.06 247.941L2399 2V351.897H1Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

/**
 * Horizontal mirror of TopBandSteepRightSvg — steep apex at the upper-left, shallow
 * slope on the right.
 */
export function TopBandSteepLeftSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 350"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Band top band, steep slope on the left</title>
			<g transform="translate(2400 0) scale(-1 1)">
				<path
					d="M1 351.897L73.4616 269.083C77.9667 264.549 84.094 262 90.4852 262H2119.12C2131.85 262 2144.06 256.943 2153.06 247.941L2399 2V351.897H1Z"
					stroke="currentColor"
				/>
			</g>
		</svg>
	);
}

/** Bottom edge band — vertical flip of TopBandSteepRightSvg for section footers. */
export function BottomBandSteepRightSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, "origin-bottom -scale-y-100", className)}
			fill="none"
			viewBox="0 0 2400 350"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Band bottom band, mirrored steep-right top geometry</title>
			<path
				d="M1 351.897L73.4616 269.083C77.9667 264.549 84.094 262 90.4852 262H2119.12C2131.85 262 2144.06 256.943 2153.06 247.941L2399 2V351.897H1Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

/** Low undulating strip along the bottom edge (smooth repeating wave). */
export function WavyBottomEdgeSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, ornamentResponsiveClass, className)}
			fill="none"
			viewBox="0 0 2400 172"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Band bottom, undulating wave trim</title>
			<path
				d="M1.6015 169.87L1.6015 111.42C200.534 111.42 400.267 24.2919 600.801 24.2919C801.335 24.2919 1000.53 111.42 1200 111.42C1399.47 111.42 1598.67 24.2919 1799.2 24.2919C1999.73 24.2919 2199.47 111.42 2398.4 111.42L2398.4 169.87L1.6015 169.87Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

/**
 * Shorter top ornament: one centered upward tab and filleted upper corners on a 2402-wide
 * grid (proportions aligned with DualSideNotchFrameSvg shoulders).
 */
export function CenterTabTopBandSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, ornamentResponsiveClass, className)}
			fill="none"
			viewBox="0 0 2402 436"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Band top, single centered tab band</title>
			<path
				d="M1.6015 433.34L1.6015 98.598C1.6015 86.9052 11.1376 77.48 23.2849 77.48H1048.12C1058.72 77.48 1068.96 72.9463 1075.46 64.1826C1102.08 28.2919 1150.44 10.1826 1200 10.1826C1249.56 10.1826 1297.92 28.2919 1324.54 64.1826C1331.04 72.9463 1341.28 77.48 1351.88 77.48H2378.72C2390.86 77.48 2400.4 86.9052 2400.4 98.598V433.34H1.6015Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

/** Tall panel with angled header and vertical sides — hero / feature backdrop. */
export function TallAngledHeroPanelSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 1653"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Tall angled hero backdrop panel</title>
			<path
				d="M6.81602 605.752L38.684 642.748C42.4362 647.104 44.5 652.662 44.5 658.411V1628.23C44.5 1641.59 55.4076 1652.38 68.7652 1652.23L2375.26 1626.76C2388.42 1626.62 2399 1615.92 2399 1602.76V2L2153.06 247.941C2144.06 256.943 2131.85 262 2119.12 262H90.4852C84.094 262 77.9667 264.549 73.4616 269.083L7.97632 334.98C3.50795 339.476 1 345.558 1 351.897V590.089C1 595.838 3.06383 601.396 6.81602 605.752Z"
				stroke="currentColor"
			/>
		</svg>
	);
}

/**
 * Truncated pyramid profile: four up-steps, flat top plateau, four down-steps (symmetric).
 * Closed band — filled lid + stroke — aligned to 2400-wide ornaments.
 */
export function PyramidStepBandSvg({ className }: { className?: string }) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 320"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Band band, symmetric pyramid stair steps</title>
			<path
				className="fill-background/35"
				d="M0 300L0 240L80 240L80 180L160 180L160 120L240 120L240 60L320 60L2080 60L2160 60L2160 120L2240 120L2240 180L2320 180L2320 240L2400 240L2400 300Z"
				stroke="none"
			/>
			<path
				d="M2400 300L2400 240L2320 240L2320 180L2240 180L2240 120L2160 120L2160 60L2080 60L320 60L240 60L240 120L160 120L160 180L80 180L80 240L0 240L0 300"
				fill="none"
				stroke="currentColor"
			/>
		</svg>
	);
}

/**
 * Truncated pyramid profile: 12 up-steps, flat top plateau, 12 down-steps (symmetric).
 * Closed band — filled lid + stroke — aligned to 2400-wide ornaments.
 */
export function PyramidStepBandLotsOfStepsSvg({
	className,
}: {
	className?: string;
}) {
	return (
		<svg
			className={cn(shapeSvgClass, className)}
			fill="none"
			viewBox="0 0 2400 320"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Band band, twelve symmetric pyramid stair steps</title>
			<path
				className="fill-background/35"
				d="M0 300L0 280L26.667 280L26.667 260L53.333 260L53.333 240L80 240L80 220L106.667 220L106.667 200L133.333 200L133.333 180L160 180L160 160L186.667 160L186.667 140L213.333 140L213.333 120L240 120L240 100L266.667 100L266.667 80L293.333 80L293.333 60L320 60L2080 60L2106.667 60L2106.667 80L2133.333 80L2133.333 100L2160 100L2160 120L2186.667 120L2186.667 140L2213.333 140L2213.333 160L2240 160L2240 180L2266.667 180L2266.667 200L2293.333 200L2293.333 220L2320 220L2320 240L2346.667 240L2346.667 260L2373.333 260L2373.333 280L2400 280L2400 300Z"
				stroke="none"
			/>
			<path
				d="M2400 300L2400 280L2373.333 280L2373.333 260L2346.667 260L2346.667 240L2320 240L2320 220L2293.333 220L2293.333 200L2266.667 200L2266.667 180L2240 180L2240 160L2213.333 160L2213.333 140L2186.667 140L2186.667 120L2160 120L2160 100L2133.333 100L2133.333 80L2106.667 80L2106.667 60L2080 60L320 60L293.333 60L293.333 80L266.667 80L266.667 100L240 100L240 120L213.333 120L213.333 140L186.667 140L186.667 160L160 160L160 180L133.333 180L133.333 200L106.667 200L106.667 220L80 220L80 240L53.333 240L53.333 260L26.667 260L26.667 280L0 280L0 300"
				fill="none"
				stroke="currentColor"
			/>
		</svg>
	);
}
