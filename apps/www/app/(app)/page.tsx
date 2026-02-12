import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Icons, ReactIcon, TailwindCSSIcon } from "@/components/icons";
import { MiniBlocksGrid } from "@/components/landing/blocks-grid";
import { LatestComponentVertical } from "@/components/landing/featured-component";
import { PlugCardGrid } from "@/components/landing/plug-grid";
import { TemplateGrid } from "@/components/landing/template-grid";
import { WhatsIncluded } from "@/components/landing/ai-sdk-agents-patterns";
import { ui } from "@/registry/ui";

export default function IndexPage() {
	const componentCount = ui.length;
	return (
		<div className="isolate min-h-screen overflow-hidden pb-8 sm:pb-12 md:pb-0">
			<div className="container relative py-12 md:pt-0">
				{/* ─── Hero ─── */}
				<section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-14">
					{/* Index marker */}
					<div className="mx-auto mb-6 flex max-w-2xl items-center justify-center gap-4">
						<div className="h-px flex-1 bg-border" />
						<Link
							href="https://aisdkagents.com"
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-2 border border-border bg-background px-3 py-1.5 transition-colors hover:border-foreground/40"
						>
							<span className="font-mono text-[11px] uppercase tracking-wider">
								New! AI SDK Agent Patterns
							</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={12}
								height={12}
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
								className="text-muted-foreground"
							>
								<title>External link</title>
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
								<polyline points="15 3 21 3 21 9" />
								<line x1="10" y1="14" x2="21" y2="3" />
							</svg>
						</Link>
						<div className="h-px flex-1 bg-border" />
					</div>

					{/* Hero Title */}
					<h1 className="mb-4 text-center text-3xl font-medium leading-tight tracking-tight md:text-4xl lg:text-7xl lg:leading-[1.1]">
						Shadcn, expanded
					</h1>

					{/* Hero Description */}
					<p className="mx-auto max-w-2xl text-center font-light text-base text-foreground/70 leading-relaxed md:text-lg">
						{componentCount}+ animated components and effects. <br /> Free, open
						source, and built to drop into any shadcn/ui project.
					</p>

					{/* CTA Buttons */}
					<div className="flex w-full items-center justify-center gap-4 py-6">
						<Link
							href="/docs/components/toolbar-expandable"
							className="border border-foreground bg-foreground px-6 py-3 font-mono text-sm uppercase tracking-wider text-white transition-all hover:bg-foreground/90"
						>
							Browse {componentCount} Components
						</Link>
						<Link
							target="_blank"
							rel="noreferrer"
							href={siteConfig.links.github}
							className="md:flex hidden items-center gap-2 border border-border bg-background px-6 py-3 font-mono text-sm uppercase tracking-wider transition-all hover:border-foreground/40 hover:bg-foreground hover:text-background"
						>
							<Icons.gitHub className="size-4" />
							GitHub
						</Link>
					</div>

					{/* Tech Stack Pills */}
					<div className="flex flex-wrap items-center justify-center gap-2">
						<div className="flex items-center gap-1.5 border border-border px-2 py-0.5">
							<ReactIcon
								className="size-3.5 text-[#61DAFB]"
								aria-hidden="true"
							/>
							<span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
								React
							</span>
						</div>
						<div className="flex items-center gap-1.5 border border-border px-2 py-0.5">
							<Icons.logo className="size-3" />
							<span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
								Shadcn/ui
							</span>
						</div>
						<div className="flex items-center gap-1.5 border border-border px-2 py-0.5">
							<TailwindCSSIcon
								className="size-3.5 text-[#06B6D4]"
								aria-hidden="true"
							/>
							<span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
								Tailwind CSS
							</span>
						</div>
					</div>
				</section>

				<section className="w-full space-y-4 md:block">
					<div className="mx-auto w-full max-w-4xl">
						<LatestComponentVertical />
					</div>

					<div className="mx-auto max-w-4xl">
						<WhatsIncluded />
					</div>

					{/* Divider between AI SDK Agents and Cult Pro */}
					<div className="mx-auto max-w-4xl py-12">
						<div className="mx-auto flex max-w-2xl items-center justify-center gap-4">
							<div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
							<div className="flex items-center gap-2 border border-border bg-background px-4 py-2">
								<span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
									CULT PRO
								</span>
							</div>
							<div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
						</div>
					</div>

					<div className="mx-auto max-w-4xl">
						<MiniBlocksGrid />
					</div>

					<div className="mx-auto max-w-4xl">
						<TemplateGrid />
					</div>

					<div className="mx-auto max-w-4xl">
						<PlugCardGrid />
					</div>
				</section>
			</div>
		</div>
	);
}
IndexPage.theme = "light";
