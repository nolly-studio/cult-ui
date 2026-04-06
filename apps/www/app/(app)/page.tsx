import Link from "next/link";

import { GitHubButton } from "@/components/github-link";
import { Icons, ReactIcon, TailwindCSSIcon } from "@/components/icons";
import {
	HomeBelowHeroLayoutAlternate,
	HomeBelowHeroLayoutDefault,
} from "@/components/landing/home-below-hero-layouts";
import { ui } from "@/registry/ui";
import { PixelHeading } from "@/components/landing/pixel-heading-character";

import { PixelParagraphInverse } from "@/components/landing/pixel-paragraph-words-inverse";
import { Footer } from "@/components/landing/footer";

export default function IndexPage() {
	const componentCount = ui.length;
	return (
		<div className="isolate min-h-screen overflow-hidden pb-8 sm:pb-12 md:pb-0">
			<div className=" relative py-12 md:pt-0">
				{/* ─── Hero ─── */}
				<section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-14">
					{/* Index marker */}
					<div className="mx-auto mb-1 flex max-w-2xl items-center justify-center gap-4">
						{/* <div className="h-px flex-1 bg-border" />
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
						<div className="h-px flex-1 bg-border" /> */}
					</div>

					{/* Hero Title */}
					<PixelHeading
						as="h1"
						prefix="Shadcn,"
						// isolate={{ x: "mono", c: "mono" }}
						prefixFont="line"
						mode="wave"
						autoPlay
						cycleInterval={200}
						staggerDelay={0}
						className="text-center text-4xl  leading-tight tracking-tight md:text-4xl lg:text-8xl lg:leading-[1.1]"
					>
						expanded
					</PixelHeading>

					{/* Hero Description */}
					{/* <PixelParagraph
						text={`${componentCount}+ animated components and effects.\nFree, open source, built to drop into any shadcn/ui project.`}
						pixelWords={["animated", "shadcn/ui"]}
						initialFont="grid"
						hoverFont="circle"
						className="mx-auto max-w-2xl whitespace-pre-line text-center leading-relaxed md:text-2xl"
					/> */}

					<PixelParagraphInverse
						text={`${componentCount}+ animated components and effects. Free, open source, built to drop into any shadcn/ui project.`}
						plainWords={["and ", "to", "any"]}
						initialPlainFont="mono"
						pixelFont="square"
						className="mx-auto max-w-2xl text-sm whitespace-pre-line text-center md:leading-snug md:text-2xl"
					/>

					{/* CTA Buttons */}
					<div className="flex w-full items-center justify-center gap-4 py-6">
						<Link
							href="/docs/components/hero-color-panels"
							className="rounded-md border border-foreground bg-foreground px-6 py-3 text-sm uppercase tracking-wider text-white transition-all hover:bg-foreground/90"
						>
							<PixelParagraphInverse
								text={`Browse ${componentCount} Components`}
							/>
						</Link>

						<GitHubButton />
					</div>

					{/* Tech Stack Pills */}
					<div className="flex flex-wrap items-center justify-center gap-2">
						<div className="flex items-center gap-1.5 rounded-md border border-border px-2 py-0.5">
							<ReactIcon
								className="size-3.5 text-[#61DAFB]"
								aria-hidden="true"
							/>
							<span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
								React
							</span>
						</div>
						<div className="flex items-center gap-1.5 rounded-md border border-border px-2 py-0.5">
							<Icons.logo className="size-3" />
							<span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
								Shadcn/ui
							</span>
						</div>
						<div className="flex items-center gap-1.5 rounded-md border border-border px-2 py-0.5">
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

				{/* <HomeBelowHeroLayoutDefault /> */}
				<HomeBelowHeroLayoutAlternate />
				<Footer />
			</div>
		</div>
	);
}
IndexPage.theme = "light";
