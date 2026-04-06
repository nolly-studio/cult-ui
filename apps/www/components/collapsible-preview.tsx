"use client";

import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";

const GRID_COLS: Record<number, string> = {
	1: "grid-cols-1",
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4",
	5: "grid-cols-5",
	6: "grid-cols-6",
};

function gridBreakpointClass(
	prefix: "" | "sm:" | "md:" | "lg:" | "xl:",
	n: number | undefined,
): string {
	if (n == null) return "";
	const cls = GRID_COLS[n];
	if (!cls) return "";
	return prefix ? `${prefix}${cls}` : cls;
}

function gridColsClass(columns: {
	default: number;
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
}): string {
	return [
		gridBreakpointClass("", columns.default),
		gridBreakpointClass("sm:", columns.sm),
		gridBreakpointClass("md:", columns.md),
		gridBreakpointClass("lg:", columns.lg),
		gridBreakpointClass("xl:", columns.xl),
	]
		.filter(Boolean)
		.join(" ");
}

// Types
export type CollapsiblePreviewItem = {
	id: string;
	title: string;
	image: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
};

// Context
type CollapsiblePreviewContextValue = {
	items: CollapsiblePreviewItem[];
	visibleItems: CollapsiblePreviewItem[];
	previewItems: CollapsiblePreviewItem[];
	isExpanded: boolean;
	toggleExpand: () => void;
	isExpandable: boolean;
	initialVisibleCount: number;
	hasMoreItems: boolean;
	seeMoreUrl?: string;
	seeMoreText: string;
};

const CollapsiblePreviewContext = React.createContext<
	CollapsiblePreviewContextValue | undefined
>(undefined);

function useCollapsiblePreview() {
	const context = React.useContext(CollapsiblePreviewContext);

	if (!context) {
		throw new Error(
			"useCollapsiblePreview must be used within a CollapsiblePreview",
		);
	}

	return context;
}

// Helper Components
function SeeMoreIcon() {
	return (
		<svg
			aria-hidden="true"
			className="-mr-0.5 w-2.5"
			fill="currentColor"
			viewBox="0 0 10 10"
		>
			<path d="M4.85355 0.146423L9.70711 4.99998L4.85355 9.85353L4.14645 9.14642L7.79289 5.49998H0V4.49998H7.79289L4.14645 0.85353L4.85355 0.146423Z" />
		</svg>
	);
}

// Main Components
type CollapsiblePreviewProps = {
	title?: string;
	items: CollapsiblePreviewItem[];
	initialVisibleCount?: number;
	seeMoreUrl?: string;
	seeMoreText?: string;
	isDefaultExpanded?: boolean;
	children: React.ReactNode;
};

export function CollapsiblePreview({
	title,
	items,
	initialVisibleCount = 4,
	seeMoreUrl,
	seeMoreText = "See more",
	isDefaultExpanded = false,
	children,
}: CollapsiblePreviewProps) {
	const [isExpanded, setIsExpanded] = React.useState(isDefaultExpanded);

	const isExpandable = !seeMoreUrl;

	const visibleItems = isExpanded ? items : items.slice(0, initialVisibleCount);

	const previewItems = items.slice(
		initialVisibleCount,
		initialVisibleCount + initialVisibleCount,
	);

	const hasMoreItems = items.length > initialVisibleCount;

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	const value = {
		items,
		visibleItems,
		previewItems,
		isExpanded,
		toggleExpand,
		isExpandable,
		initialVisibleCount,
		hasMoreItems,
		seeMoreUrl,
		seeMoreText,
	};

	return (
		<CollapsiblePreviewContext.Provider value={value}>
			<div className="w-full bg-muted rounded-xl p-2 shadow-elevation-light">
				{title && <h2 className="mb-6 font-semibold text-2xl">{title}</h2>}
				{children}
			</div>
		</CollapsiblePreviewContext.Provider>
	);
}

type CollapsiblePreviewGridProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: (item: any, index: number) => React.ReactNode;
	className?: string;
	columns?: {
		default: number;
		sm?: number;
		md?: number;
		lg?: number;
		xl?: number;
	};
	gap?: string;
};

export function CollapsiblePreviewGrid({
	children,
	className = "",
	columns = { default: 1, md: 2, lg: 4 },
	gap = "gap-6",
}: CollapsiblePreviewGridProps) {
	const { visibleItems } = useCollapsiblePreview();

	const gridCols = gridColsClass(columns);

	return (
		<div className={`grid ${gridCols} ${gap} mb-6 ${className} `}>
			{visibleItems.map((item, index) => children(item, index))}
		</div>
	);
}

type CollapsiblePreviewMoreProps = {
	className?: string;
	buttonClassName?: string;
	gradientClassName?: string;
	renderButton?: (props: {
		isExpanded: boolean;
		toggleExpand: () => void;
		seeMoreText: string;
		seeMoreUrl?: string;
	}) => React.ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	renderPreview?: (item: any, index: number) => React.ReactNode;
	previewHeight?: string;
};

export function CollapsiblePreviewMore({
	className = "",
	buttonClassName = "pointer-events-auto cursor-pointer gap-2 inline-flex justify-center rounded-full px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
	gradientClassName = "pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-40 items-end justify-center bg-gradient-to-t from-background to-transparent pb-8",
	renderButton,
	renderPreview,
	previewHeight = "120px",
}: CollapsiblePreviewMoreProps) {
	const {
		previewItems,
		isExpanded,
		toggleExpand,
		isExpandable,
		hasMoreItems,
		seeMoreUrl,
		seeMoreText,
	} = useCollapsiblePreview();

	if (!hasMoreItems || (isExpanded && isExpandable)) {
		return null;
	}

	const defaultButtonRenderer = () => {
		if (isExpandable) {
			return (
				<Button className={buttonClassName} onClick={toggleExpand}>
					{seeMoreText}
					<SeeMoreIcon />
				</Button>
			);
		}
		return (
			<Link className={buttonClassName} href={seeMoreUrl || "#"}>
				{seeMoreText}
				<SeeMoreIcon />
			</Link>
		);
	};

	const defaultPreviewRenderer = (
		item: CollapsiblePreviewItem,
		_index: number,
	) => (
		<div className="flex flex-col items-center" key={item.id}>
			<div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-lg border border-border">
				<div className="absolute top-0 right-0 left-0 z-10 flex h-6 items-center bg-muted px-2">
					<div className="flex space-x-1.5">
						<div className="h-2 w-2 rounded-full bg-red-400" />
						<div className="h-2 w-2 rounded-full bg-yellow-400" />
						<div className="h-2 w-2 rounded-full bg-green-400" />
					</div>
				</div>

				<div className="absolute inset-0 pt-6">
					<div className="relative h-full w-full">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							alt={item.title}
							className="h-full w-full object-cover opacity-70"
							src={item.image || "/placeholder.svg"}
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/40" />
					</div>
				</div>
			</div>
			<span className="text-muted-foreground text-sm">{item.title}</span>
		</div>
	);

	return (
		<div className={`relative ${className}`}>
			<div
				className="grid grid-cols-1 gap-6 overflow-hidden md:grid-cols-2 lg:grid-cols-3 "
				style={{ maxHeight: previewHeight }}
			>
				{previewItems.map((item, index) =>
					renderPreview
						? renderPreview(item, index)
						: defaultPreviewRenderer(item, index),
				)}
			</div>

			<div className={gradientClassName}>
				{renderButton
					? renderButton({ isExpanded, toggleExpand, seeMoreText, seeMoreUrl })
					: defaultButtonRenderer()}
			</div>
		</div>
	);
}

type CollapsiblePreviewLessProps = {
	className?: string;
	buttonClassName?: string;
	buttonText?: string;
	renderButton?: (props: { toggleExpand: () => void }) => React.ReactNode;
};

export function CollapsiblePreviewLess({
	className = "flex justify-center mt-6",
	buttonClassName = "gap-2 inline-flex justify-center rounded-full px-4 py-2 text-sm font-semibold border-border hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
	buttonText = "See less",
	renderButton,
}: CollapsiblePreviewLessProps) {
	const { isExpanded, toggleExpand, isExpandable, hasMoreItems } =
		useCollapsiblePreview();

	if (!(isExpanded && isExpandable && hasMoreItems)) {
		return null;
	}

	return (
		<div className={className}>
			{renderButton ? (
				renderButton({ toggleExpand })
			) : (
				<Button
					className={buttonClassName}
					onClick={toggleExpand}
					size="sm"
					variant="outline"
				>
					{buttonText}
				</Button>
			)}
		</div>
	);
}

export { useCollapsiblePreview };
