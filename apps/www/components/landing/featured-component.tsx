import Link from "next/link";
import { ArrowRight, SparklesIcon } from "lucide-react";

import { ContactFormExample } from "@/registry/default/example/popover-form-demo";
import { GradientHeading } from "@/registry/default/ui/gradient-heading";
import { LightBoard } from "@/registry/default/ui/lightboard";

import { Badge } from "../ui/badge";
import DynamicToolbarExpandable, {
	deploymentSteps,
} from "./toolbar-expandable";

export function FeaturedComponent() {
	return (
		<div className="relative flex w-full flex-col  p-2  md:flex-row md:items-center md:gap-24 md:p-6">
			<Badge
				variant="outline"
				className="absolute left-4 top-6 rounded-[14px] border border-black/10 text-base md:left-6"
			>
				<SparklesIcon className="  fill-[#EEBDE0] stroke-1 text-neutral-800" />{" "}
				Featured
			</Badge>
			<div className="flex flex-col justify-center pb-2 pl-2 pt-16 md:items-center">
				<div className="flex  gap-2">
					<div>
						<GradientHeading>LightBoard</GradientHeading>
						<Link
							href="/docs/components/lightboard"
							className="flex items-center gap-1 "
						>
							A retro light board marquee that you can draw on
							<ArrowRight className="hidden size-4 md:block" />
						</Link>
					</div>
				</div>
			</div>

			<div className="mt-4 flex max-w-xl grow flex-col items-center justify-center space-y-0 rounded-[14px] bg-black p-4 md:mt-0 md:rounded-md">
				{/* Matrix Style */}
				<div className="w-full">
					<LightBoard
						rows={16}
						lightSize={3}
						gap={1}
						disableDrawing={false}
						text="THE MATRIX HAS YOU"
						font="default"
						updateInterval={10}
						colors={{
							background: "#001a00",
							textDim: "#006600",
							drawLine: "#00b300",
							textBright: "#00ff00",
						}}
					/>
				</div>

				<div className="w-full">
					<LightBoard
						rows={15}
						lightSize={2}
						gap={1}
						text="Welcome to the cult"
						font="default"
						disableDrawing={false}
						updateInterval={50}
						colors={{
							background: "#1a1a1a",
							textDim: "#ff9999",
							drawLine: "#ffff99",
							textBright: "#6CF2E8",
						}}
					/>
				</div>

				{/* Interactive Neon Board */}
				<div className="w-full">
					<LightBoard
						rows={32}
						lightSize={2}
						gap={1}
						disableDrawing={false}
						text="NEON DREAMS"
						font="default"
						updateInterval={10}
						colors={{
							background: "#0a0a0a",
							textDim: "#ff00ff33",
							drawLine: "#ff00ff66",
							textBright: "#EBB7DD",
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export function LatestComponent() {
	return (
		// <div className=" relative flex w-full flex-col rounded-[24px] border border-black/5 bg-neutral-800/10 p-2 shadow-sm md:flex-row md:items-center md:gap-24 md:rounded-t-[40px] md:p-2 mx-auto">
		<div className=" relative mx-auto flex w-full flex-col rounded-[24px] border border-black/5 bg-neutral-800/5 p-2 shadow-sm md:flex-row md:items-center md:gap-24 md:rounded-b-[20px] md:rounded-t-[40px] md:p-2">
			<Badge
				variant="outline"
				className="absolute left-4 top-6 rounded-[14px] border border-black/10 text-base md:left-6"
			>
				<SparklesIcon className="  fill-[#EEBDE0] stroke-1 text-neutral-800" />{" "}
				Latest component
			</Badge>
			<div className="flex flex-col justify-center pb-2 pl-2 pt-16 md:items-center">
				<div className="flex  gap-2">
					<div>
						<GradientHeading>Popover Form</GradientHeading>
						<Link
							href="/docs/components/popover-form"
							className="flex items-center gap-1 "
						>
							Headless popover form animation. <br /> Inspired by @emilkowalski_
							<ArrowRight className="hidden size-4 md:block" />
						</Link>
					</div>
				</div>
			</div>

			<div className="ml-auto mt-4 flex max-w-xl grow flex-col items-center justify-center space-y-0 rounded-[14px] border border-dashed border-black/10  bg-neutral-300/20 p-4 md:mt-0 md:rounded-md md:rounded-br-[20px] md:rounded-tr-[35px]">
				<ContactFormExample />
			</div>
		</div>
	);
}

export function LatestComponentVertical() {
	return (
		<div className="group relative mx-auto flex w-full flex-col border border-border bg-background transition-all duration-150 hover:border-foreground/10 ">
			{/* Corner accents */}
			{/* <div className="-top-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
			<div className="-top-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-r-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
			<div className="-bottom-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-b-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
			<div className="-bottom-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-r-2 border-b-2 opacity-0 transition-all duration-200 group-hover:opacity-100" /> */}

			{/* Header */}
			<div className="flex flex-col items-center border-border border-b px-4 pb-4 pt-5 text-center">
				<div className="mb-3 border border-border bg-background px-2 py-1">
					<span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						Highlighted Component
					</span>
				</div>
				<h3 className="mb-1.5 font-medium text-lg leading-tight tracking-tight">
					Toolbar Expandable
				</h3>
				<p className="max-w-md font-light text-muted-foreground text-sm leading-relaxed">
					Step-based expandable toolbar with smooth animations.
				</p>
			</div>

			{/* Demo */}
			<div className="mx-auto w-full bg-muted/20">
				<div className="mx-auto flex w-full flex-col items-center py-8 sm:max-w-screen-lg lg:pb-8 lg:pt-6">
					<section className="max-w-xs sm:max-w-none">
						<DynamicToolbarExpandable steps={deploymentSteps} />
					</section>
				</div>
			</div>

			{/* Footer */}
			<div className="flex items-center justify-center border-border border-t px-4 py-3">
				<Link
					href="/docs/components/toolbar-expandable"
					className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
				>
					View Component
					<ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
				</Link>
			</div>
		</div>
	);
}
