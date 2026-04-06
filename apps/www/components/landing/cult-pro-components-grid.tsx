"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
	ArrowRight02Icon,
	ShapeCollectionIcon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
	CollapsiblePreview,
	CollapsiblePreviewGrid,
	CollapsiblePreviewLess,
	CollapsiblePreviewMore,
} from "@/components/collapsible-preview";
import cultProComponentDemosLanding from "@/lib/cult-pro-component-demos-landing.json";
import { PixelHeading } from "./pixel-heading-word";
import { Icons } from "../icons";

type LandingComponentDemo = (typeof cultProComponentDemosLanding)[number];

const PRO_DOCS_COMPONENTS = "https://pro.cult-ui.com/docs/components";

function ComponentDemoCard({
	demoName,
	title,
	href,
}: {
	demoName: string;
	title: string;
	href: string;
}) {
	const [imgError, setImgError] = useState(false);

	return (
		<a
			className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-all duration-150 "
			href={href}
			rel="noopener noreferrer"
			target="_blank"
		>
			<div className="relative aspect-[16/10] w-full overflow-hidden  bg-muted/20">
				{imgError ? (
					<div className="flex h-full items-center justify-center font-pixel-square text-[10px] text-muted-foreground uppercase tracking-wider">
						<span>Preview</span>
					</div>
				) : (
					<>
						<Image
							alt={`${title} component preview`}
							className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.01] dark:hidden"
							fill
							loading="lazy"
							onError={() => setImgError(true)}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							src={`/cult-pro-component-images/${demoName}-light.png`}
						/>
						<Image
							alt={`${title} component preview`}
							className="hidden object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] dark:block"
							fill
							loading="lazy"
							onError={() => setImgError(true)}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							src={`/cult-pro-component-images/${demoName}-dark.png`}
						/>
					</>
				)}
			</div>

			<div className="flex flex-1 flex-col p-3">
				<div className="mt-auto flex items-center justify-between  pt-2.5">
					<h3 className="mb-1.5 line-clamp-1 font-medium text-sm capitalize leading-tight tracking-tight">
						{title}
					</h3>
					<span className="flex items-center gap-1 font-pixel-square text-[10px] text-muted-foreground uppercase tracking-wider transition-colors group-hover:text-primary">
						View
						<HugeiconsIcon
							className="size-3 transition-transform group-hover:translate-x-0.5"
							icon={ArrowRight02Icon}
						/>
					</span>
				</div>
			</div>
		</a>
	);
}

function renderDemoCard(item: LandingComponentDemo) {
	const href = `${PRO_DOCS_COMPONENTS}/${item.primarySlug}`;
	return (
		<ComponentDemoCard
			demoName={item.demoName}
			href={href}
			key={item.demoName}
			title={item.title}
		/>
	);
}

const expandMoreButtonClass =
	"group pointer-events-auto inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-6 py-3 font-pixel-square text-sm uppercase tracking-wider transition-all hover:border-foreground/40 hover:bg-foreground hover:text-background";

const seeLessButtonClass =
	"group inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-6 py-3 font-pixel-square text-sm uppercase tracking-wider transition-all hover:border-foreground/40 hover:bg-muted";

export function CultProComponentsGrid({
	isDefaultExpanded = false,
}: {
	isDefaultExpanded?: boolean;
}) {
	const items = useMemo(() => {
		const sorted = [...cultProComponentDemosLanding].sort((a, b) =>
			a.title.localeCompare(b.title),
		);
		return sorted.map((row) => ({
			...row,
			id: row.demoName,
			title: row.title,
			image: `/cult-pro-component-images/${row.demoName}-light.png`,
			href: `${PRO_DOCS_COMPONENTS}/${row.primarySlug}`,
		}));
	}, []);

	return (
		<section className="mx-auto max-w-6xl py-16 md:px-4 md:py-24">
			<div className="mb-12 text-center">
				<div className="mx-auto mb-8 flex max-w-2xl items-center justify-center gap-4">
					<div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
					<div className="flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2">
						<Icons.cultLogoBasic className="size-3.5 md:size-4 fill-black/50" />
						<span className="font-pixel-square text-[11px] font-bold text-[#FF6BFF] uppercase">
							CULT PRO
						</span>
					</div>
					<div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
				</div>

				<PixelHeading
					as="h2"
					className="mx-auto mb-4 max-w-3xl font-medium text-3xl tracking-tight md:text-4xl lg:text-5xl"
					disableCycling
					disableHover
					hoverFont="line"
					initialFont="square"
				>
					Premium Components
				</PixelHeading>

				<p className="mx-auto max-w-2xl px-4 font-light text-base text-foreground/70 leading-relaxed md:px-0 md:text-lg">
					Premium marketing components for landing pages and marketing sites.
				</p>
			</div>

			<div className="m-2 sm:m-0">
				<CollapsiblePreview
					initialVisibleCount={9}
					isDefaultExpanded={isDefaultExpanded}
					items={items}
				>
					<CollapsiblePreviewGrid
						columns={{ default: 1, sm: 2, lg: 3 }}
						gap="gap-4"
					>
						{(item) => renderDemoCard(item as LandingComponentDemo)}
					</CollapsiblePreviewGrid>
					<CollapsiblePreviewMore
						previewHeight="180px"
						renderButton={({ toggleExpand, seeMoreText }) => (
							<button
								className={expandMoreButtonClass}
								onClick={toggleExpand}
								type="button"
							>
								<span>{seeMoreText}</span>
								<HugeiconsIcon
									className="size-4 transition-transform group-hover:translate-x-1"
									icon={ArrowRight02Icon}
								/>
							</button>
						)}
						renderPreview={(item) =>
							renderDemoCard(item as LandingComponentDemo)
						}
					/>
					<CollapsiblePreviewLess
						renderButton={({ toggleExpand }) => (
							<button
								className={seeLessButtonClass}
								onClick={toggleExpand}
								type="button"
							>
								See less
							</button>
						)}
					/>
				</CollapsiblePreview>
			</div>

			{items.length === 0 && (
				<div className="text-center text-sm text-muted-foreground">
					No component demos available
				</div>
			)}
		</section>
	);
}
