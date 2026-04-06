import type { ReactNode } from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

import { CultProComponentsGrid } from "@/components/landing/cult-pro-components-grid";
import { CultProSectionsGrid } from "@/components/landing/cult-pro-sections-grid";
import { LatestComponentVertical } from "@/components/landing/featured-component";
import { PlugCardGrid } from "@/components/landing/plug-grid";
import { TemplateGrid } from "@/components/landing/template-grid";
import { WhatsIncluded } from "@/components/landing/ai-sdk-agents-patterns";
import { BackgroundImageTexture } from "@/components/landing/bg-image-texture";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

const SURFACE_SHADOW =
	"shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)]";
const SURFACE_SHADOW_DARK =
	"dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.06),0px_1px_2px_-1px_rgba(255,255,255,0.03),0px_2px_4px_0px_rgba(0,0,0,0.2)]";

function CatalogOutboundChip({
	href,
	label,
	tone = "default",
}: {
	href: string;
	label: string;
	tone?: "default" | "ai" | "pro";
}) {
	return (
		<a
			className={cn(
				"inline-flex w-fit items-center gap-2 rounded-md border bg-background px-3 py-2 font-mono text-[10px] uppercase tracking-widest antialiased transition-colors duration-200",
				tone === "ai" &&
					"border-[#006BFF]/45 bg-[#006BFF]/10 text-[#0b2f6d] hover:border-[#006BFF]/65 hover:text-[#052764] dark:text-[#d9e8ff]",
				tone === "pro" &&
					"border-[#FF6BFF]/45 bg-[#FF6BFF]/12 text-[#7a257a] hover:border-[#FF6BFF]/65 hover:text-[#671f67] dark:text-[#ffd9ff]",
				tone === "default" &&
					"border-border text-foreground/80 hover:border-foreground/30 hover:text-foreground",
				SURFACE_SHADOW,
				SURFACE_SHADOW_DARK,
			)}
			href={href}
			rel="noopener noreferrer"
			target="_blank"
		>
			{label}
			<HugeiconsIcon
				aria-hidden
				className="size-3.5 opacity-70"
				icon={ArrowRight02Icon}
			/>
		</a>
	);
}

function ProductCatalogRegion({
	product,
	children,
}: {
	product: "aisdkagents" | "cult-pro";
	children: ReactNode;
}) {
	const isAi = product === "aisdkagents";
	const titleId = isAi ? "catalog-rail-aisdk" : "catalog-rail-cult-pro";

	return (
		<section
			aria-labelledby={titleId}
			className={cn(
				"w-full border-t",
				isAi ? "border-[#006BFF]/80" : "border-[#FF6BFF]/75 ",
			)}
		>
			<header
				className={cn(
					"border-b",
					isAi
						? "border-[#006BFF]/80 bg-[radial-gradient(120%_100%_at_50%_45%,rgba(0,107,255,0.75)_0%,rgba(0,107,255,0.45)_32%,rgba(0,107,255,0.15)_60%,rgba(255,255,255,0.96)_100%)] dark:bg-[radial-gradient(120%_100%_at_50%_45%,rgba(0,107,255,0.95)_0%,rgba(0,107,255,0.58)_32%,rgba(0,107,255,0.22)_60%,rgba(5,12,28,0.98)_100%)]"
						: "border-[#FF6BFF]/75 bg-[radial-gradient(120%_100%_at_50%_45%,rgba(255,107,255,0.72)_0%,rgba(255,107,255,0.4)_32%,rgba(255,107,255,0.14)_60%,rgba(255,255,255,0.96)_100%)] dark:bg-[radial-gradient(120%_100%_at_50%_45%,rgba(255,107,255,0.9)_0%,rgba(255,107,255,0.52)_32%,rgba(255,107,255,0.22)_60%,rgba(24,9,26,0.98)_100%)]",
					SURFACE_SHADOW,
					SURFACE_SHADOW_DARK,
				)}
			>
				<div className="mx-auto max-w-6xl px-4 py-5 md:px-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
						<div className="flex gap-4">
							<div
								className={cn(
									"flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background",
									isAi &&
										"border-[#006BFF]/55 bg-[#006BFF]/18 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)]",
									!isAi &&
										"border-[#FF6BFF]/55 bg-[#FF6BFF]/18 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)]",
								)}
							>
								{isAi ? (
									<Icons.aisdkAgentsLogo
										aria-hidden
										className="size-6 fill-[#919191]"
									/>
								) : (
									<Icons.cultLogoBasic
										aria-hidden
										className="size-6 fill-black/55 dark:fill-white/75"
									/>
								)}
							</div>
							<div className="min-w-0 space-y-1">
								<p
									className={cn(
										"font-mono text-[10px] uppercase tracking-[0.2em]",
										isAi
											? "text-white dark:text-[#d9e8ff]"
											: "text-[#7a257a] dark:text-[#ffd9ff]",
									)}
								>
									{isAi ? "FULL STACK AI PATTERNS" : "PREMIUM MARKETING BLOCKS"}
								</p>
								<h2
									className={cn(
										"text-balance text-base font-medium tracking-tight md:text-lg",
										isAi && "font-pixel-square text-white",
										!isAi && "font-mono text-[#FF6BFF]",
									)}
									id={titleId}
								>
									{isAi ? "AI SDK Agents" : "Cult Pro"}
								</h2>
								{/* <p
									className={cn(
										"max-w-xl text-pretty text-sm leading-relaxed",
										isAi
											? "text-[#123b85] dark:text-[#e0ecff]"
											: "text-[#7a257a] dark:text-[#ffd9ff]",
									)}
								>
									{isAi ? (
										<>
											Interactive patterns and templates are served from{" "}
											<strong className="font-medium text-foreground">
												aisdkagents.com
											</strong>{" "}
											.
										</>
									) : (
										<>
											Sections, components, and starter templates below are part
											of{" "}
											<strong className="font-medium text-foreground">
												Cult Pro
											</strong>{" "}
											on{" "}
											<strong className="font-medium text-foreground">
												pro.cult-ui.com
											</strong>
											.
										</>
									)}
								</p> */}
							</div>
						</div>

						<div className="flex flex-row items-center gap-3 md:flex-col md:items-end md:pt-1">
							<CatalogOutboundChip
								href={
									isAi ? "https://aisdkagents.com" : "https://pro.cult-ui.com"
								}
								label={isAi ? "aisdkagents.com" : "pro.cult-ui.com"}
								tone={isAi ? "ai" : "pro"}
							/>
							{/* <p
								className={cn(
									"font-mono text-[10px] uppercase tracking-wider",
									isAi
										? "text-[#0b2f6d] dark:text-[#d9e8ff]"
										: "text-[#7a257a] dark:text-[#ffd9ff]",
								)}
							>
								{isAi ? "external" : "paid product"}
							</p> */}
						</div>
					</div>
				</div>
			</header>

			{children}
		</section>
	);
}

/**
 * Main homepage content below the hero (featured + commercial grids + plugs).
 * Swap `HomeBelowHeroLayoutAlternate` in `app/(app)/page.tsx` to compare.
 */
export function HomeBelowHeroLayoutDefault() {
	return (
		<section className="w-full space-y-4 md:block">
			<div className="mx-auto w-full max-w-4xl">
				<LatestComponentVertical />
			</div>

			<ProductCatalogRegion product="aisdkagents">
				<WhatsIncluded />
			</ProductCatalogRegion>

			<ProductCatalogRegion product="cult-pro">
				<CultProSectionsGrid />
				<CultProComponentsGrid />
				<TemplateGrid />
			</ProductCatalogRegion>

			<div className="mx-auto max-w-4xl">
				<PlugCardGrid />
			</div>
		</section>
	);
}

function ProductPromoCard({
	badge,
	description,
	primaryHref,
	primaryLabel,
	secondaryHref,
	secondaryLabel,
	variant,
}: {
	badge: ReactNode;
	description: string;
	primaryHref: string;
	primaryLabel: string;
	secondaryHref: string;
	secondaryLabel: string;
	variant: "aisdk" | "cult-pro";
}) {
	const isAi = variant === "aisdk";

	return (
		<BackgroundImageTexture
			className="h-full overflow-hidden rounded-xl shadow-elevation-light max-w-sm"
			opacity={isAi ? 0.99 : 0.29}
			variant={isAi ? "debut-light" : "inflicted"}
		>
			<article
				className={cn(
					"group relative flex h-full flex-col rounded-xl max-w-sm  p-6  transition-all duration-200 md:p-8",
					isAi
						? "border-[#006BFF]/30 bg-background/10"
						: "border-[#FF6BFF]/35 bg-background/10",
					SURFACE_SHADOW,
					SURFACE_SHADOW_DARK,
				)}
			>
				<div className="mb-5 w-fit">{badge}</div>
				<p className="mb-8 flex-1 text-pretty text-sm text-foreground/75 leading-relaxed md:text-base">
					{description}
				</p>
				<div className="mt-auto flex flex-col gap-3">
					<a
						className={cn(
							"inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 font-mono text-xs text-background uppercase tracking-[0.14em] transition-colors duration-200 md:w-auto md:self-start",
							isAi
								? "border border-[#0058d4] bg-[#006BFF] hover:bg-[#0058d4]"
								: "border border-[#d94fd9] bg-[#FF6BFF] text-black hover:bg-[#f056f0]",
						)}
						href={primaryHref}
						rel="noopener noreferrer"
						target="_blank"
					>
						{primaryLabel}
						<HugeiconsIcon className="size-3.5" icon={ArrowRight02Icon} />
					</a>
					{/* <a
						className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider underline-offset-4 transition-colors hover:text-foreground hover:underline"
						href={secondaryHref}
						rel="noopener noreferrer"
						target="_blank"
					>
						{secondaryLabel}
					</a> */}
				</div>
			</article>
		</BackgroundImageTexture>
	);
}

/**
 * Featured component, then a support-OSS + two-product band (primary + secondary
 * CTAs per product), then the same grids as the default layout.
 */
export function HomeBelowHeroLayoutAlternate() {
	return (
		<section className="w-full  md:block">
			<div className="mx-auto w-full max-w-4xl px-4 pt-4 md:pt-2 pb-8">
				<LatestComponentVertical />
			</div>

			<BackgroundImageTexture
				className="overflow-hidden "
				opacity={0.19}
				variant="groovepaper"
			>
				<div className="border-border/50 border-t bg-muted/10 py-10 md:py-12">
					<div className="mx-auto max-w-6xl px-4 md:px-6">
						<div
							className={cn(
								" p-8 antialiased md:p-10 lg:p-12",
								// SURFACE_SHADOW,
								// SURFACE_SHADOW_DARK,
							)}
						>
							<div className="mb-10 text-center md:mb-12">
								<div className="mx-auto mb-8 flex max-w-2xl items-center justify-center gap-4">
									<div className="h-px flex-1 bg-linear-to-r from-transparent to-border" />
									<span className="shrink-0 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
										Commercial products
									</span>
									<div className="h-px flex-1 bg-linear-to-l from-transparent to-border" />
								</div>
								<h2 className="mx-auto mb-4 font-pixel-square max-w-2xl text-balance font-medium text-2xl tracking-tight md:text-3xl">
									Support Cult UI open source
								</h2>
								<p className="mx-auto max-w-lg font-pixel-square text-pretty text-base text-foreground/70 leading-relaxed md:max-w-xl md:text-lg">
									Our library stays MIT-licensed. Buying{" "}
									<strong className="font-medium text-foreground">
										AI SDK Agents
									</strong>{" "}
									or{" "}
									<strong className="font-medium text-foreground">
										Cult Pro
									</strong>{" "}
									directly supports maintaining and growing Cult UI.
								</p>
							</div>

							<div className="flex flex-col gap-5 md:flex-row items-center justify-center">
								<ProductPromoCard
									badge={
										<div
											className={cn(
												"flex items-center gap-2 rounded-md  bg-background/10 px-3 py-2",
												SURFACE_SHADOW,
												SURFACE_SHADOW_DARK,
											)}
										>
											<Icons.aisdkAgentsLogo className="size-4 fill-[#919191]" />
											<span className="font-pixel-square text-[11px] font-bold text-[#006BFF] uppercase">
												AI SDK Agents
											</span>
										</div>
									}
									description="Production-ready AI patterns, full-stack templates, and starters for teams shipping on the Vercel AI SDK."
									primaryHref="https://aisdkagents.com/patterns"
									primaryLabel="Browse patterns"
									secondaryHref="https://aisdkagents.com/templates"
									secondaryLabel="Full-stack templates →"
									variant="aisdk"
								/>
								<ProductPromoCard
									badge={
										<div
											className={cn(
												"flex items-center gap-2 rounded-md  bg-background/20 px-3 py-2",
												SURFACE_SHADOW,
												SURFACE_SHADOW_DARK,
											)}
										>
											<Icons.cultLogoBasic className="size-4 fill-black dark:fill-white/70" />
											<span className="font-pixel-square text-[11px] font-bold text-[#FF6BFF] uppercase">
												Cult Pro
											</span>
										</div>
									}
									description="Premium marketing sections and components for landing pages built to pair with Cult UI & Shadcn."
									primaryHref="https://pro.cult-ui.com"
									primaryLabel="Explore Cult Pro"
									secondaryHref="https://pro.cult-ui.com/docs/components"
									secondaryLabel="Component docs →"
									variant="cult-pro"
								/>
							</div>
						</div>
					</div>
				</div>
			</BackgroundImageTexture>

			<BackgroundImageTexture
				className="overflow-hidden "
				opacity={0.99}
				variant="debut-light"
			>
				<ProductCatalogRegion product="aisdkagents">
					<WhatsIncluded />
				</ProductCatalogRegion>
			</BackgroundImageTexture>

			<BackgroundImageTexture
				className="overflow-hidden "
				opacity={0.11}
				variant="inflicted"
			>
				<ProductCatalogRegion product="cult-pro">
					<CultProSectionsGrid />
					<CultProComponentsGrid />
					<TemplateGrid />
				</ProductCatalogRegion>
			</BackgroundImageTexture>

			<div className="bg-muted/40 border-t border-border/50 border-b">
				<div className="mx-auto px-2  max-w-4xl ">
					<PlugCardGrid />
				</div>
			</div>
		</section>
	);
}
