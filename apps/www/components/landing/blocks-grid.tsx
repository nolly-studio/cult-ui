import { SVGProps } from "react";
import { ArrowRight, Shapes } from "lucide-react";
import { PixelHeading } from "./pixel-heading-word";

export function MiniBlocksGrid() {
	return (
		<section className="mx-auto max-w-6xl md:px-4 py-16 md:py-12">
			{/* Section Header */}
			<div className="mb-12 text-center">
				{/* Section divider */}
				<div className="mx-auto mb-8 flex max-w-2xl items-center justify-center gap-4">
					<div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
					<div className="flex items-center gap-2 border border-border bg-background px-4 py-2">
						<Shapes className="size-3.5 md:size-4 fill-pink-400/50" />
						<span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
							CULT PRO
						</span>
					</div>
					<div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
				</div>

				<PixelHeading
					as="h2"
					className="mx-auto mb-4 max-w-3xl font-medium text-3xl tracking-tight md:text-4xl lg:text-5xl"
					initialFont="square"
					disableCycling
					disableHover
				>
					Premium Cult Blocks
				</PixelHeading>

				<p className="mx-auto max-w-md  font-light text-base text-foreground/70 leading-relaxed md:text-lg">
					Rad full-stack blocks and marketing patterns. <br /> Copy and paste
					into your project.
				</p>
			</div>

			{/* Blocks Grid */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{BLOCK_PREVIEW_DATA.slice(0, 6)
					.sort((a, b) => {
						if (a.isNew && !b.isNew) return -1;
						if (!a.isNew && b.isNew) return 1;
						return 0;
					})
					.sort((a, b) => {
						const dateA = new Date(a.dateReleased || 0);
						const dateB = new Date(b.dateReleased || 0);
						return dateB.getTime() - dateA.getTime();
					})
					.map((block) => (
						<a
							key={block.name}
							href={`https://pro.cult-ui.com/blocks/${block.name}`}
							target="_blank"
							rel="noopener noreferrer"
							className="group relative flex flex-col border border-border bg-background transition-all duration-150 hover:border-foreground/10 hover:shadow-lg hover:shadow-primary/5"
						>
							{/* Corner accents */}
							<div className="-top-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
							<div className="-top-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-r-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
							<div className="-bottom-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-b-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
							<div className="-bottom-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-r-2 border-b-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />

							{/* Content */}
							<div className="flex flex-1 flex-col p-4">
								<h3 className="mb-2 line-clamp-1 font-medium text-sm leading-tight tracking-tight">
									{block.title}
								</h3>

								{block.meta.problemSolved && (
									<p className="mb-4 line-clamp-3 flex-1 font-light text-muted-foreground text-xs leading-relaxed">
										{block.description}
									</p>
								)}

								{/* Footer */}
								<div className="flex items-center justify-between border-border border-t pt-3">
									<div className="flex items-center gap-0.5">
										{(() => {
											const allDependencies = Array.from(
												new Set([
													...block.dependencies,
													...(block.meta.externalServices || []),
												]),
											);

											const seenIcons = new Set();
											const uniqueIcons = allDependencies
												.reduce<Array<{ dep: string; icon: any }>>(
													(acc, dep) => {
														const depLower = dep.toLowerCase();
														const matchingIcon = Object.entries(
															DEPENDENCY_ICONS,
														).find(([key, icon]) =>
															icon.match.some((pattern) =>
																depLower.includes(pattern.toLowerCase()),
															),
														);

														if (
															matchingIcon &&
															!seenIcons.has(matchingIcon[0])
														) {
															seenIcons.add(matchingIcon[0]);
															acc.push({
																dep,
																icon: matchingIcon[1].icon,
															});
														}
														return acc;
													},
													[],
												)
												.slice(0, 4);

											return uniqueIcons.map(({ dep, icon: Icon }) => (
												<div
													key={dep}
													className="flex size-5 items-center justify-center border border-transparent text-muted-foreground transition-all hover:border-border hover:text-foreground"
													title={dep}
												>
													<Icon className="size-3" />
												</div>
											));
										})()}
									</div>

									<span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground uppercase tracking-wider transition-colors group-hover:text-primary">
										Preview
										<ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
									</span>
								</div>
							</div>
						</a>
					))}
			</div>

			{BLOCK_PREVIEW_DATA.length === 0 && (
				<div className="text-center text-sm text-muted-foreground">
					No free preview blocks found
				</div>
			)}
		</section>
	);
}

const BLOCK_PREVIEW_DATA = [
	{
		name: "ai-chat-agent-routing-pattern",
		title: "Agent - Routing Pattern",
		description:
			"Routes user requests to specialized AI agents. Uses AI SDK v5 streaming to classify requests and send them to the right agent for customer support.",
		tags: [
			"ai",
			"routing",
			"ai-agents",
			"streaming",
			"chat-pattern",
			"ai-sdk-v5",
			"customer-support",
		],
		dependencies: [
			"ai",
			"zod",
			"@upstash/ratelimit",
			"@upstash/redis",
			"sonner",
			"lucide-react",
		],
		externalServices: ["openai"],
		apisUsed: ["openai"],
		isNew: true,
		dateReleased: "2025-09-08",
		meta: {
			tags: [
				"ai",
				"routing",
				"ai-agents",
				"streaming",
				"chat-pattern",
				"ai-sdk-v5",
				"customer-support",
			],
			externalServices: ["openai"],
			apisUsed: ["openai"],
			problemSolved: [
				"Intelligent request routing to specialized AI agents",
				"Stage-based streaming with custom data parts",
				"Real-time classification and agent selection",
				"Customer support request automation",
				"AI SDK v5 streaming pattern implementation",
				"Multi-agent chat system architecture",
			],
		},
	},
	{
		name: "ai-sdk-gemini-flash-text",
		description:
			"Generates text and analyzes market research using Google's Gemini 2.5 Flash. Includes interactive charts and data visualization.",
		title: "Gemini Flash Text",
		tags: [
			"ai",
			"text-generation",
			"market-research",
			"google",
			"gemini",
			"vercel-ai-sdk",
			"rate-limiting",
			"data-visualization",
			"charts",
			"interactive",
		],
		dependencies: [
			"@ai-sdk/google",
			"ai",
			"zod",
			"lucide-react",
			"@upstash/ratelimit",
			"@upstash/redis",
			"recharts",
			"motion",
		],
		externalServices: ["google-ai", "upstash"],
		apisUsed: ["google-ai", "upstash"],
		isNew: true,
		dateReleased: "2025-09-03",
		meta: {
			tags: [
				"ai",
				"text-generation",
				"market-research",
				"google",
				"gemini",
				"vercel-ai-sdk",
				"rate-limiting",
				"data-visualization",
				"charts",
				"interactive",
			],
			externalServices: ["google-ai", "upstash"],
			apisUsed: ["google-ai", "upstash"],
			problemSolved: [
				"AI-powered text generation and analysis",
				"Comprehensive market research with web search",
				"Interactive data visualization and charts",
				"Time-series data analysis and trends",
				"Key metrics and KPI identification",
				"Source attribution and research validation",
				"Rate limiting to prevent API abuse",
				"Professional market research reports",
			],
		},
	},
	{
		name: "ai-sdk-gemini-flash-image",
		description:
			"Generates images using Google's Gemini 2.5 Flash. Includes rate limiting and error handling.",
		title: "Gemini Flash Image Generator",
		tags: [
			"ai",
			"image-generation",
			"google",
			"gemini",
			"vercel-ai-sdk",
			"rate-limiting",
		],
		dependencies: [
			"ai",
			"lucide-react",
			"@upstash/ratelimit",
			"@upstash/redis",
		],
		// externalServices: ["google-ai", "upstash"],
		// apisUsed: ["google-ai", "upstash"],
		isNew: true,
		dateReleased: "2025-09-03",
		meta: {
			tags: [
				"ai",
				"image-generation",
				"google",
				"gemini",
				"vercel-ai-sdk",
				"rate-limiting",
			],
			externalServices: ["google-ai", "upstash"],
			apisUsed: ["google-ai", "upstash"],
			problemSolved: [
				"AI-powered image generation using text prompts",
				"Rate limiting to prevent API abuse",
				"Comprehensive error handling with user feedback",
			],
		},
	},
	{
		title: "Gemini Flash Image Editor",
		name: "ai-sdk-gemini-flash-image-edit",
		description:
			"Generate and edit images using Google's Gemini 2.5 Flash. Create new images from text or edit existing ones with natural language. Includes version history and image comparison.",
		tags: [
			"ai",
			"image-generation",
			"image-editing",
			"google",
			"gemini",
			"vercel-ai-sdk",
			"rate-limiting",
			"performance",
			"useReducer",
			"version-history",
			"image-comparison",
			"custom-hooks",
		],
		dependencies: [
			"ai",
			"lucide-react",
			"@upstash/ratelimit",
			"@upstash/redis",
		],
		externalServices: ["google-ai", "upstash"],
		apisUsed: ["google-ai", "upstash"],
		isNew: true,
		dateReleased: "2025-09-13",
		meta: {
			tags: [
				"ai",
				"image-generation",
				"image-editing",
				"google",
				"gemini",
				"vercel-ai-sdk",
				"rate-limiting",
				"performance",
				"useReducer",
				"version-history",
				"image-comparison",
				"custom-hooks",
			],
			externalServices: ["google-ai", "upstash"],
			apisUsed: ["google-ai", "upstash"],
			problemSolved: [
				"AI-powered image generation using text prompts",
				"AI-powered image editing with natural language",
				"Peak React performance with useReducer state management",
				"Version history and image comparison functionality",
				"Rate limiting to prevent API abuse",
				"Comprehensive error handling with user feedback",
				"Interactive editing workflow with undo/reset functionality",
				"Custom hooks for maintainable state management",
				"O(1) version lookups with refs for optimal performance",
			],
		},
	},
	{
		name: "ai-chat-agent-multi-step-tool-pattern",
		title: "Agent - Multi-Step Tool Pattern",
		description:
			"AI agent that uses multiple tools in sequence. Includes web search, news search, analysis, and decision making with type safety.",
		tags: [
			"ai",
			"agents",
			"tools",
			"multi-step",
			"web-search",
			"news",
			"analysis",
			"ai-sdk-v5",
			"strongly-typed",
			"streaming",
		],
		dependencies: [
			"@ai-sdk/react",
			"ai",
			"@ai-sdk/openai",
			"zod",
			"@upstash/ratelimit",
			"@upstash/redis",
			"sonner",
			"lucide-react",
		],
		externalServices: ["perplexity", "openai", "hackernews"],
		apisUsed: ["perplexity", "openai", "hackernews"],
		isNew: true,
		dateReleased: "2025-09-12",
		meta: {
			tags: [
				"ai",
				"agents",
				"tools",
				"multi-step",
				"web-search",
				"news",
				"analysis",
				"ai-sdk-v5",
				"strongly-typed",
				"streaming",
			],
			externalServices: ["perplexity", "openai", "hackernews"],
			apisUsed: ["perplexity", "openai", "hackernews"],
			problemSolved: [
				"Complex problem solving with multi-step reasoning using AI SDK v5",
				"Real-time web search and news integration with strongly typed tools",
				"Iterative AI agent workflows with Experimental_Agent",
				"Tool-based AI agent patterns with full type safety",
				"Research and analysis automation with streaming support",
				"Modern AI agent development with UIToolInvocation pattern",
			],
		},
	},
	{
		name: "ai-chat-agent-orchestrater-pattern",
		title: "Agent - Orchestrator Pattern",
		description:
			"AI agent that manages complex projects by coordinating specialized workers. Handles task assignment and tracks deliverables.",
		tags: [
			"ai",
			"agents",
			"orchestrator",
			"worker",
			"project-management",
			"coordination",
			"ai-sdk-v5",
			"strongly-typed",
			"streaming",
			"deliverables",
		],
		dependencies: [
			"@ai-sdk/react",
			"ai",
			"zod",
			"@upstash/ratelimit",
			"@upstash/redis",
			"sonner",
			"lucide-react",
		],
		externalServices: ["openai"],
		apisUsed: ["openai"],
		isNew: true,
		dateReleased: "2025-09-10",
		meta: {
			tags: [
				"ai",
				"agents",
				"orchestrator",
				"worker",
				"project-management",
				"coordination",
				"ai-sdk-v5",
				"strongly-typed",
				"streaming",
				"deliverables",
			],
			externalServices: ["openai"],
			apisUsed: ["openai"],
			problemSolved: [
				"Complex project coordination through specialized workers using AI SDK v5",
				"Automated project planning and task assignment with strongly typed tools",
				"Real-time progress tracking and issue resolution with Experimental_Agent",
				"Orchestrator-Worker pattern implementation with full type safety",
				"Project lifecycle management with deliverable tracking",
				"Modern AI agent coordination patterns with UIToolInvocation",
			],
		},
	},
	{
		name: "ai-chat-agent-evaluator-optimizer-pattern",
		title: "Agent - Evaluator-Optimizer",
		description:
			"AI agent that improves content quality through evaluation and optimization. Uses specialized tools to assess quality and fix issues automatically.",
		tags: [
			"ai",
			"agents",
			"orchestrator",
			"evaluator",
			"optimizer",
			"quality-assurance",
			"content-optimization",
			"ai-sdk-v5",
			"streaming",
			"error-recovery",
			"tool-coordination",
		],
		dependencies: [
			"@ai-sdk/react",
			"ai",
			"@ai-sdk/openai",
			"zod",
			"@upstash/ratelimit",
			"@upstash/redis",
			"sonner",
			"lucide-react",
		],
		externalServices: ["openai"],
		apisUsed: ["openai"],
		isNew: true,
		dateReleased: "2025-09-11",
		meta: {
			tags: [
				"ai",
				"agents",
				"orchestrator",
				"evaluator",
				"optimizer",
				"quality-assurance",
				"content-optimization",
				"ai-sdk-v5",
				"streaming",
				"error-recovery",
				"tool-coordination",
			],
			externalServices: ["openai"],
			apisUsed: ["openai"],
			problemSolved: [
				"Quality assurance through systematic evaluation and optimization using AI SDK v5",
				"Single orchestrator agent coordinating specialized evaluator and optimizer tools",
				"Automated content quality assessment with strongly typed tools",
				"Iterative content improvement based on evaluation feedback",
				"Error recovery and self-improvement capabilities with Experimental_Agent",
				"Quality threshold management and optimization strategies",
				"Modern AI agent quality control patterns with UIToolInvocation",
			],
		},
	},
];

function SupabaseIcon(props: any) {
	return (
		<svg
			viewBox="0 0 109 113"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			// width="1em"
			// height="1em"
			width="256"
			height="222"
			{...props}
		>
			<path
				d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
				fill="url(#paint0_linear)"
			/>
			<path
				d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
				fill="url(#paint1_linear)"
				fillOpacity={0.2}
			/>
			<path
				d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z"
				fill="#3ECF8E"
			/>
			<defs>
				<linearGradient
					id="paint0_linear"
					x1={53.9738}
					y1={54.974}
					x2={94.1635}
					y2={71.8295}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#249361" />
					<stop offset={1} stopColor="#3ECF8E" />
				</linearGradient>
				<linearGradient
					id="paint1_linear"
					x1={36.1558}
					y1={30.578}
					x2={54.4844}
					y2={65.0806}
					gradientUnits="userSpaceOnUse"
				>
					<stop />
					<stop offset={1} stopOpacity={0} />
				</linearGradient>
			</defs>
		</svg>
	);
}

const OpenAIIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		preserveAspectRatio="xMidYMid"
		viewBox="0 0 256 260"
		{...props}
	>
		<path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" />
	</svg>
);

function AISDKIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			data-testid="geist-icon"
			height={16}
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width={16}
			// className="stroke-black"
			color="currentcolor"
			{...props}
		>
			<path
				d="M2.5.5V0h1v.5a2 2 0 002 2H6v1h-.5a2 2 0 00-2 2V6h-1v-.5a2 2 0 00-2-2H0v-1h.5a2 2 0 002-2zM14.5 4.5V5h-1v-.5a1 1 0 00-1-1H12v-1h.5a1 1 0 001-1V1h1v.5a1 1 0 001 1h.5v1h-.5a1 1 0 00-1 1zM8.407 4.93L8.5 4h1l.093.93a5 5 0 004.478 4.477L15 9.5v1l-.93.093a5 5 0 00-4.477 4.478L9.5 16h-1l-.093-.93a5 5 0 00-4.478-4.477L3 10.5v-1l.93-.093A5 5 0 008.406 4.93z"
				fill="black"
			/>
		</svg>
	);
}

function UpstashIcon(props: any) {
	return (
		<svg
			{...props}
			viewBox="0 0 256 341"
			xmlns="http://www.w3.org/2000/svg"
			width="256"
			height="341"
			preserveAspectRatio="xMidYMid"
		>
			<path
				fill="#00C98D"
				d="M0 298.417c56.554 56.553 148.247 56.553 204.801 0 56.554-56.554 56.554-148.247 0-204.801l-25.6 25.6c42.415 42.416 42.415 111.185 0 153.6-42.416 42.416-111.185 42.416-153.601 0L0 298.416Z"
			/>
			<path
				fill="#00C98D"
				d="M51.2 247.216c28.277 28.277 74.123 28.277 102.4 0 28.277-28.276 28.277-74.123 0-102.4l-25.6 25.6c14.14 14.138 14.14 37.061 0 51.2-14.138 14.139-37.061 14.139-51.2 0l-25.6 25.6ZM256 42.415c-56.554-56.553-148.247-56.553-204.8 0-56.555 56.555-56.555 148.247 0 204.801l25.599-25.6c-42.415-42.415-42.415-111.185 0-153.6 42.416-42.416 111.185-42.416 153.6 0L256 42.416Z"
			/>
			<path
				fill="#00C98D"
				d="M204.8 93.616c-28.276-28.277-74.124-28.277-102.4 0-28.278 28.277-28.278 74.123 0 102.4l25.6-25.6c-14.14-14.138-14.14-37.061 0-51.2 14.138-14.139 37.06-14.139 51.2 0l25.6-25.6Z"
			/>
			<path
				fill="#FFF"
				fillOpacity=".4"
				d="M256 42.415c-56.554-56.553-148.247-56.553-204.8 0-56.555 56.555-56.555 148.247 0 204.801l25.599-25.6c-42.415-42.415-42.415-111.185 0-153.6 42.416-42.416 111.185-42.416 153.6 0L256 42.416Z"
			/>
			<path
				fill="#FFF"
				fillOpacity=".4"
				d="M204.8 93.616c-28.276-28.277-74.124-28.277-102.4 0-28.278 28.277-28.278 74.123 0 102.4l25.6-25.6c-14.14-14.138-14.14-37.061 0-51.2 14.138-14.139 37.06-14.139 51.2 0l25.6-25.6Z"
			/>
		</svg>
	);
}

const ClaudeAIIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		preserveAspectRatio="xMidYMid"
		viewBox="0 0 256 257"
		{...props}
	>
		<path
			fill="#D97757"
			d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z"
		/>
	</svg>
);
const StripeIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 512 214"
		{...props}
	>
		<path
			fill="#635BFF"
			d="M512 110.08c0-36.409-17.636-65.138-51.342-65.138c-33.85 0-54.33 28.73-54.33 64.854c0 42.808 24.179 64.426 58.88 64.426c16.925 0 29.725-3.84 39.396-9.244v-28.445c-9.67 4.836-20.764 7.823-34.844 7.823c-13.796 0-26.027-4.836-27.591-21.618h69.547c0-1.85.284-9.245.284-12.658m-70.258-13.511c0-16.071 9.814-22.756 18.774-22.756c8.675 0 17.92 6.685 17.92 22.756zm-90.31-51.627c-13.939 0-22.899 6.542-27.876 11.094l-1.85-8.818h-31.288v165.83l35.555-7.537l.143-40.249c5.12 3.698 12.657 8.96 25.173 8.96c25.458 0 48.64-20.48 48.64-65.564c-.142-41.245-23.609-63.716-48.498-63.716m-8.534 97.991c-8.391 0-13.37-2.986-16.782-6.684l-.143-52.765c3.698-4.124 8.818-6.968 16.925-6.968c12.942 0 21.902 14.506 21.902 33.137c0 19.058-8.818 33.28-21.902 33.28M241.493 36.551l35.698-7.68V0l-35.698 7.538zm0 10.809h35.698v124.444h-35.698zm-38.257 10.524L200.96 47.36h-30.72v124.444h35.556V87.467c8.39-10.951 22.613-8.96 27.022-7.396V47.36c-4.551-1.707-21.191-4.836-29.582 10.524m-71.112-41.386l-34.702 7.395l-.142 113.92c0 21.05 15.787 36.551 36.836 36.551c11.662 0 20.195-2.133 24.888-4.693V140.8c-4.55 1.849-27.022 8.391-27.022-12.658V77.653h27.022V47.36h-27.022zM35.982 83.484c0-5.546 4.551-7.68 12.09-7.68c10.808 0 24.461 3.272 35.27 9.103V51.484c-11.804-4.693-23.466-6.542-35.27-6.542C19.2 44.942 0 60.018 0 85.192c0 39.252 54.044 32.995 54.044 49.92c0 6.541-5.688 8.675-13.653 8.675c-11.804 0-26.88-4.836-38.827-11.378v33.849c13.227 5.689 26.596 8.106 38.827 8.106c29.582 0 49.92-14.648 49.92-40.106c-.142-42.382-54.329-34.845-54.329-50.774"
		/>
	</svg>
);

const NextjsIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 180 180"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<mask
			id="mask0_408_139"
			style={{
				maskType: "alpha",
			}}
			maskUnits="userSpaceOnUse"
			x={0}
			y={0}
			width={180}
			height={180}
		>
			<circle cx={90} cy={90} r={90} fill="black" />
		</mask>
		<g mask="url(#mask0_408_139)">
			<circle
				cx={90}
				cy={90}
				r={87}
				fill="black"
				stroke="white"
				strokeWidth={6}
			/>
			<path
				d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
				fill="url(#paint0_linear_408_139)"
			/>
			<rect
				x={115}
				y={54}
				width={12}
				height={72}
				fill="url(#paint1_linear_408_139)"
			/>
		</g>
		<defs>
			<linearGradient
				id="paint0_linear_408_139"
				x1={109}
				y1={116.5}
				x2={144.5}
				y2={160.5}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="white" />
				<stop offset={1} stopColor="white" stopOpacity={0} />
			</linearGradient>
			<linearGradient
				id="paint1_linear_408_139"
				x1={121}
				y1={54}
				x2={120.799}
				y2={106.875}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="white" />
				<stop offset={1} stopColor="white" stopOpacity={0} />
			</linearGradient>
		</defs>
	</svg>
);

const PerplexityAIIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 48 48"
		{...props}
	>
		<path
			fill="none"
			stroke="#20808d"
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M24 4.5v39M13.73 16.573v-9.99L24 16.573m0 14.5L13.73 41.417V27.01L24 16.573m0 0l10.27-9.99v9.99"
		/>
		<path
			fill="none"
			stroke="#20808d"
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M13.73 31.396H9.44V16.573h29.12v14.823h-4.29"
		/>
		<path
			fill="none"
			stroke="#20808d"
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M24 16.573L34.27 27.01v14.407L24 31.073"
		/>
	</svg>
);

const GeminiIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		preserveAspectRatio="xMidYMid"
		viewBox="0 0 256 258"
		{...props}
	>
		<defs>
			<radialGradient
				id="a"
				cx="78.302%"
				cy="55.52%"
				r="78.115%"
				fx="78.302%"
				fy="55.52%"
				gradientTransform="scale(.99947 1) rotate(78.858 .783 .555)"
			>
				<stop offset="0%" stopColor="#1BA1E3" />
				<stop offset=".01%" stopColor="#1BA1E3" />
				<stop offset="30.022%" stopColor="#5489D6" />
				<stop offset="54.552%" stopColor="#9B72CB" />
				<stop offset="82.537%" stopColor="#D96570" />
				<stop offset="100%" stopColor="#F49C46" />
			</radialGradient>
			<radialGradient
				id="b"
				cx="-3.409%"
				cy="-54.219%"
				r="169.363%"
				fx="-3.409%"
				fy="-54.219%"
				gradientTransform="scale(.99946 1) rotate(78.858 -.034 -.542)"
			>
				<stop offset="0%" stopColor="#1BA1E3" />
				<stop offset=".01%" stopColor="#1BA1E3" />
				<stop offset="30.022%" stopColor="#5489D6" />
				<stop offset="54.552%" stopColor="#9B72CB" />
				<stop offset="82.537%" stopColor="#D96570" />
				<stop offset="100%" stopColor="#F49C46" />
			</radialGradient>
		</defs>
		<path
			fill="url(#a)"
			d="m122.062 172.77-10.27 23.52c-3.947 9.042-16.459 9.042-20.406 0l-10.27-23.52c-9.14-20.933-25.59-37.595-46.108-46.703L6.74 113.52c-8.987-3.99-8.987-17.064 0-21.053l27.385-12.156C55.172 70.97 71.917 53.69 80.9 32.043L91.303 6.977c3.86-9.303 16.712-9.303 20.573 0l10.403 25.066c8.983 21.646 25.728 38.926 46.775 48.268l27.384 12.156c8.987 3.99 8.987 17.063 0 21.053l-28.267 12.547c-20.52 9.108-36.97 25.77-46.109 46.703Z"
		/>
		<path
			fill="url(#b)"
			d="m217.5 246.937-2.888 6.62c-2.114 4.845-8.824 4.845-10.937 0l-2.889-6.62c-5.148-11.803-14.42-21.2-25.992-26.34l-8.898-3.954c-4.811-2.137-4.811-9.131 0-11.269l8.4-3.733c11.87-5.273 21.308-15.017 26.368-27.22l2.966-7.154c2.067-4.985 8.96-4.985 11.027 0l2.966 7.153c5.06 12.204 14.499 21.948 26.368 27.221l8.4 3.733c4.812 2.138 4.812 9.132 0 11.27l-8.898 3.953c-11.571 5.14-20.844 14.537-25.992 26.34Z"
		/>
	</svg>
);

function PolarIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			fill="none"
			viewBox="0 0 300 300"
			{...props}
		>
			<g clipPath="url(#a)">
				<path
					fill="#0062FF"
					fillRule="evenodd"
					d="M66.428 274.26c68.448 46.333 161.497 28.406 207.83-40.041 46.335-68.448 28.408-161.497-40.04-207.83C165.77-19.946 72.721-2.019 26.388 66.428-19.948 134.878-2.02 227.928 66.427 274.26ZM47.956 116.67c-17.119 52.593-11.412 105.223 11.29 139.703C18.04 217.361 7.275 150.307 36.943 92.318c18.971-37.082 50.623-62.924 85.556-73.97-31.909 18.363-59.945 53.466-74.544 98.322Zm127.391 166.467c36.03-10.531 68.864-36.752 88.338-74.815 29.416-57.497 19.083-123.905-21.258-163.055 21.793 34.496 27.046 86.275 10.204 138.02-15.016 46.134-44.246 81.952-77.284 99.85Zm8.28-16.908c24.318-20.811 44.389-55.625 53.309-97.439 14.097-66.097-4.385-127.592-41.824-148.113 19.858 26.718 29.91 78.613 23.712 136.656-4.739 44.391-18.01 83.26-35.197 108.896ZM63.717 131.844c-14.201 66.586 4.66 128.501 42.657 148.561-20.378-26.396-30.777-78.891-24.498-137.694 4.661-43.657 17.574-81.974 34.349-107.614-23.957 20.886-43.687 55.392-52.507 96.747Zm136.117 17.717c1.074 67.912-20.244 123.317-47.612 123.748-27.369.433-50.425-54.27-51.498-122.182-1.073-67.913 20.244-123.318 47.613-123.75 27.368-.432 50.425 54.271 51.497 122.184Z"
					clipRule="evenodd"
				/>
			</g>
			<defs>
				<clipPath id="a">
					<path fill="#fff" d="M0 0h300v300H0z" />
				</clipPath>
			</defs>
		</svg>
	);
}

export function VercelIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 256 222"
			width="256"
			height="222"
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMidYMid"
			{...props}
		>
			<path fill="currentColor" d="m128 0 128 221.705H0z" />
		</svg>
	);
}

const MotionIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1103 386"
		width="1em"
		height="1em"
		{...props}
	>
		<path
			fill="#0F1115"
			d="M416.473 0 198.54 385.66H0L170.17 84.522C196.549 37.842 262.377 0 317.203 0Zm486.875 96.415c0-53.249 44.444-96.415 99.27-96.415 54.826 0 99.27 43.166 99.27 96.415 0 53.248-44.444 96.415-99.27 96.415-54.826 0-99.27-43.167-99.27-96.415ZM453.699 0h198.54L434.306 385.66h-198.54Zm234.492 0h198.542L716.56 301.138c-26.378 46.68-92.207 84.522-147.032 84.522h-99.27Z"
		/>
	</svg>
);

const TailwindCSSIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 54 33"
		{...props}
	>
		<g clipPath="url(#prefix__clip0)">
			<path
				fill="#38bdf8"
				fillRule="evenodd"
				d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
				clipRule="evenodd"
			/>
		</g>
		<defs>
			<clipPath id="prefix__clip0">
				<path fill="#fff" d="M0 0h54v32.4H0z" />
			</clipPath>
		</defs>
	</svg>
);

function TriggerDevIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width={109}
			height={95}
			viewBox="0 0 109 95"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M32.569 38.191L54.53.158l54.426 94.26H.104l21.961-38.035L37.6 65.352l-6.425 11.127h46.71L54.53 36.034l-6.425 11.128-15.536-8.97z"
				fill="url(#paint0_linear_173_9378)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_173_9378"
					x1={88.2367}
					y1={94.4175}
					x2={87.2207}
					y2={27.8737}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#41FF54" />
					<stop offset={1} stopColor="#E7FF52" />
				</linearGradient>
			</defs>
		</svg>
	);
}

const ShadCnIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
		<rect width="256" height="256" fill="none" />
		<line
			x1="208"
			y1="128"
			x2="128"
			y2="208"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="16"
		/>
		<line
			x1="192"
			y1="40"
			x2="40"
			y2="192"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="16"
		/>
	</svg>
);

const DEPENDENCY_ICONS = {
	supabase: {
		name: "Supabase",
		icon: SupabaseIcon,
		match: ["@supabase", "supabase"],
	},
	openai: {
		name: "OpenAI",
		icon: OpenAIIcon,
		match: ["openai", "@openai"],
	},
	ai: {
		name: "AISDK",
		icon: AISDKIcon,
		match: ["@ai-sdk/openai", "@ai-sdk/react"],
	},
	upstash: {
		name: "Upstash",
		icon: UpstashIcon,
		match: ["@upstash"],
	},
	claude: {
		name: "Claude",
		icon: ClaudeAIIcon,
		match: ["@anthropic"],
	},
	perplexity: {
		name: "Perplexity",
		icon: PerplexityAIIcon,
		match: ["@perplexity"],
	},
	gemini: {
		name: "Gemini",
		icon: GeminiIcon,
		match: ["@ai-sdk/google", "google", "gemini"],
	},
	stripe: {
		name: "Stripe",
		icon: StripeIcon,
		match: ["stripe", "@stripe"],
	},
	polar: {
		name: "Polar",
		icon: PolarIcon,
		match: ["polar", "@polar-sh/sdk"],
	},
	vercel: {
		name: "Vercel",
		icon: VercelIcon,
		match: ["@vercel"],
	},
	motion: {
		name: "Motion One",
		icon: MotionIcon,
		match: ["motion/react", "@motion"],
	},

	nextjs: {
		name: "Next.js",
		icon: NextjsIcon,
		match: ["next", "@types/next"],
	},
	tailwind: {
		name: "Tailwind CSS",
		icon: TailwindCSSIcon,
		match: ["tailwindcss", "@tailwind"],
	},
	// typescript: {
	//   name: "TypeScript",
	//   icon: TypeScriptIcon,
	//   match: ["typescript", "@types"],
	// },
	shadcn: {
		name: "shadcn/ui",
		icon: ShadCnIcon,
		match: ["@shadcn", "shadcn"],
	},
	triggerdev: {
		name: "Trigger.dev",
		icon: TriggerDevIcon,
		match: ["trigger.dev", "@trigger.dev", "@trigger.dev/sdk@^3.0.0"],
	},
	// zod: {
	//   name: "Zod",
	//   icon: ZodIcon,
	//   match: ["zod", "@zod"],
	// },
} as const;
