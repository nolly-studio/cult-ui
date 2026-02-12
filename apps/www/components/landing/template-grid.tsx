"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, IceCream } from "lucide-react";
import cultDirectoryHomeDark from "@/components/landing/assets/cult-directory-dark-home.png";
import cultLogoGPTHome from "@/components/landing/assets/cult-logo-gpt.png";
import cultSeoOg from "@/components/landing/assets/cult-seo-og.png";
import manifestBottomLeft from "@/components/landing/assets/manifest-library.png";
import runeHero from "@/components/landing/assets/rune-hero.png";
import travelStash4 from "@/components/landing/assets/travel-stash.png";

export function TemplateGrid() {
	return (
		<section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
			{/* Section Header */}
			<div className="mb-12 text-center">
				{/* Index marker */}
				<div className="mx-auto mb-6 flex max-w-2xl items-center justify-center gap-4">
					<div className="h-px flex-1 bg-border" />
					<div className="flex items-center gap-2 border border-border bg-background px-3 py-1.5">
						<IceCream className="size-4 text-muted-foreground" />
						<span className="font-mono text-[11px] uppercase tracking-wider">
							TEMPLATES
						</span>
					</div>
					<div className="h-px flex-1 bg-border" />
				</div>

				<h2 className="mx-auto mb-4 max-w-3xl font-medium text-3xl tracking-tight md:text-4xl lg:text-5xl">
					{TEMPLATES_GRID.length} Starter Templates
				</h2>

				<p className="mx-auto max-w-2xl font-light text-base text-foreground/70 leading-relaxed md:text-lg">
					Full-stack Next.js templates with AI integrations, authentication, and
					modern tooling. Download and ship.
				</p>
			</div>

			{/* Templates Grid */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{TEMPLATES_GRID.map((card) => (
					<ProTemplateCard key={card.slug} card={card} />
				))}
			</div>
		</section>
	);
}

function ProTemplateCard({ card }: { card: (typeof TEMPLATES_GRID)[number] }) {
	const [imgError, setImgError] = useState(false);
	const previewImage = card.images?.[0];

	return (
		<a
			target="_blank"
			rel="noopener noreferrer"
			href={card.slug}
			className="group relative flex flex-col overflow-hidden border border-border bg-background transition-all duration-150 hover:border-foreground/40 hover:shadow-lg hover:shadow-primary/5"
		>
			{/* Corner accents */}
			<div className="-top-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
			<div className="-top-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-r-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
			<div className="-bottom-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-b-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
			<div className="-bottom-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-r-2 border-b-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />

			{/* Image Preview */}
			<div className="relative aspect-[16/10] w-full overflow-hidden border-border border-b bg-muted/20">
				{imgError || !previewImage ? (
					<div className="flex h-full items-center justify-center font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
						<span>Template Preview</span>
					</div>
				) : (
					<Image
						alt={`${card.name} preview`}
						className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
						fill
						onError={() => setImgError(true)}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						src={previewImage}
					/>
				)}

				{/* NEW badge */}
				{/* {card.new && (
          <div className="absolute top-0 left-0 border-border border-r border-b bg-primary px-2 py-1">
            <span className="font-medium font-mono text-[10px] text-primary-foreground uppercase tracking-wider">
              New
            </span>
          </div>
        )} */}
			</div>

			{/* Content */}
			<div className="flex flex-1 flex-col p-4">
				{/* Title */}
				<h3 className="mb-2 line-clamp-1 font-medium text-base leading-tight tracking-tight">
					{card.name}
				</h3>

				{/* Description */}
				<p className="mb-4 line-clamp-2 flex-1 font-light text-muted-foreground text-sm leading-relaxed">
					{card.description}
				</p>

				{/* Tech Stack */}
				<div className="mb-3 flex flex-wrap gap-1.5">
					{card.stack.slice(0, 4).map((tech) => (
						<span
							className="border border-border bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground lowercase transition-colors group-hover:border-foreground/20"
							key={tech}
						>
							{tech}
						</span>
					))}
					{card.stack.length > 4 && (
						<span className="px-1 font-mono text-[10px] text-muted-foreground/60">
							+{card.stack.length - 4}
						</span>
					)}
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between border-border border-t pt-3">
					<span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
						Full-Stack Template
					</span>

					<span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground uppercase tracking-wider transition-colors group-hover:text-primary">
						View
						<ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
					</span>
				</div>
			</div>
		</a>
	);
}

export const TEMPLATES_GRID = [
	{
		name: "Logo GPT",
		slug: "https://pro.cult-ui.com/templates/logo-gpt-template",
		new: true,
		downloadUrl: "cult-logo-gpt-template.zip",
		liveUrl: "https://cult-logo.vercel.app", // replace with the actual live URL
		meta: "fullstack",
		description:
			"AI-powered logo generation platform with Dalle integration, token-based currency system, and secure image storage using Supabase.",
		features: [
			{
				name: "Dalle 2 + 3 Image Generation",
				description:
					"Generate high-quality images using the latest Dalle 2 and Dalle 3 models. Customize images to suit your brand's needs effortlessly.",
				icon: "ai",
			},

			{
				name: "Image Storage",
				description:
					"Efficiently store and manage your generated images with Supabase's integrated storage solutions, ensuring your assets are always available and secure.",
				icon: "ai",
			},
			{
				name: "Token-Based Currency",
				description:
					"Implement a token-based currency system to manage credits for generating images, offering a flexible and scalable solution for your users.",
				icon: "supabase",
			},
		],
		type: "template",
		stack: ["nextjs", "tailwind", "openai", "supabase"],
		gradient: "bg-gradient-to-b to-[#DB4EDF] from-[#F8F7F8] via-white",
		gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExajljemljODZlencyYnUzZnlsc2FtZmprbmFvNnlueDhwenp1NXdxdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AdRaGoL5xT1SdI6J5v/giphy.gif",
		images: [cultLogoGPTHome],
	},
	{
		name: "Directory",
		slug: "https://pro.cult-ui.com/templates/cult-directory-template",
		new: true,
		downloadUrl: "cult-directory.zip",
		liveUrl: "https://nextjs.design", // replace with the actual live URL
		meta: "fullstack",
		description:
			"Automated directory platform with AI enrichment, and web scraping pipeline for rapid deployment of SEO-optimized listings.",
		features: [
			{
				name: "Scraping",
				description:
					"Provide an array of urls you want to add to your directory. Run pnpm run enrich-seed. Voila - your directory is filled with as many urls as you want 🤌.",
				icon: "scrape",
			},
			{
				name: "Authentication",
				description:
					"Dead simple auth via supabase. Password reset flows. PW encryption and all. No need to pay for clerk or auth0.",
				icon: "auth",
			},
			{
				name: "AI Enrichment",
				description:
					"Not only are there batch AI enrichment jobs but you can also run AI enrichment on user submitted content. Save time and let your directory run itself.",
				icon: "ai",
			},
			{
				name: "Supabase storage",
				description:
					"Supabase wraps s3 perfectly. No need to buy a third party storage integration or subscription 😤 service. Just use supabase to store images.",
				icon: "supabase",
			},
		],
		type: "template",
		stack: ["nextjs", "tailwind", "claudeAI", "supabase", "web-scrapers"],
		gradient: "bg-gradient-to-b to-yellow-300 from-[#F8F7F8] via-white",
		gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExam4xMmVqZGVuaG05cDhxaWM2bDlwaWJ2OXVrN3E2aG54bDdjam1hZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7bzrBMHEsgPb20T3C5/giphy.gif", // replace with the actual gif URL
		images: [cultDirectoryHomeDark],
	},
	{
		name: "Travel Stash",
		slug: "https://pro.cult-ui.com/templates/cult-offline-travel-stash",
		new: false,
		downloadUrl: "cult-offline-travel-stash.zip",
		liveUrl: "https://dub.sh/travl", // replace with the actual live URL
		meta: "fullstack",
		description:
			"Progressive web app for travel planning with offline capabilities, Claude AI integration, and real-time data synchronization across devices.",
		features: [
			{
				name: "Offline Capabilities",
				description:
					"Access and interact with the app even without an internet connection, ensuring reliability anywhere.",
				icon: "layers",
			},
			{
				name: "Real-time Sync",
				description:
					"Automatic data synchronization when online, keeping your travel plans up-to-date across all devices.",
				icon: "server",
			},
			{
				name: "PWA Support",
				description:
					"Installable on any device, providing a native app-like experience with smooth interactions.",
				icon: "shieldCheck",
			},
		],
		type: "template",
		stack: ["nextjs", "tailwind", "claudeAI", "pwa"],
		gradient: "bg-gradient-to-b to-[#2CCFFF] from-[#F8F7F8] via-white",
		gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3YzOTc1NDgxcHhib2o1ZWhpcWVsdDRqOW9hMng3ZnA0bmxzYjZwbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XJjAk4IB8Tgudo0Tqz/giphy.gif", // replace with the actual gif URL

		images: [travelStash4],
	},

	{
		name: "Landing Page",
		new: false,
		meta: "marketing",
		downloadUrl: "cult-landing-page.zip",
		liveUrl: "https://dub.sh/rune",
		gradient: "bg-gradient-to-b from-white/10 to-[#FF9150] via-[#FFD0B7]/30",
		slug: "https://pro.cult-ui.com/templates/cult-landing-page",
		description:
			"Modern landing page template featuring Framer Motion animations, custom navigation components, and responsive design optimized for conversions.",
		features: [
			{
				name: "Animation",
				description: "A landing page that stands out.",
				icon: "paint",
			},
			{
				name: "Unique navigation",
				description: "The newcult.co nav bar animation.",
				icon: "layers",
			},
		],
		type: "template",
		stack: ["nextjs", "tailwind"],
		images: [runeHero],
		gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGV2MWMzY2I4eW45NThuMWJ0enpsY2tyenZkNTJtNjk4am5hb2FmMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lmXonZXi4HBJldN0rt/giphy-downsized-large.gif",
	},

	{
		name: "Cult SEO",
		slug: "https://pro.cult-ui.com/templates/cult-seo",
		new: false,
		downloadUrl: "cult-seo.zip",
		liveUrl: "https://cleanmyseo.com",
		meta: "fullstack",
		description:
			"Comprehensive SEO analysis tool with web crawling, performance testing, and AI-powered optimization recs for website improvement.",
		features: [
			{
				name: "RSC Web Scraping",
				description: "Lightning fast web scraping via rsc.",
				icon: "chat",
			},
			{
				name: "Web Vitals",
				description: "Google CRUX API adapters for web vitals.",
				icon: "barChart",
			},
			{
				name: "Structured AI output",
				description: "Vercel ai sdk with claude, zod, ai object.",
				icon: "ai",
			},
		],
		type: "template",
		stack: ["nextjs", "tailwind", "claudeAI", "web-scrapers"],

		gradient: "bg-gradient-to-b from-white to-[#2770EB] via-[#FF7102]/20",
		gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmthd283MHdqYTAzNjFzZXptbGg2MGIzY3RudzBsdDdveGsxdG9haCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/w1LYqDDIpDaLKj6N5t/giphy.gif",
		// images: [cultSeoScore, cultSeoVitals, cultSeoOg, cultSeoHome],
		images: [cultSeoOg],
	},

	{
		name: "Manifest",
		slug: "https://pro.cult-ui.com/templates/manifest",
		meta: "fullstack",
		liveUrl: "https://dub.sh/vector",
		downloadUrl: "cult-manifest-v1.2.zip",
		// gradient: "bg-gradient-to-b from-green-50 to-green-400 via-black/10",
		gradient: "bg-gradient-to-b from-white/10 to-green-400 via-green-50",
		new: false,
		description:
			"Vector embedding solution for building Perplexity-style AI applications with RAG retrieval, real-time source citations, and pgvector search functionality.",
		features: [
			{
				name: "Vector embeddings",
				description:
					"Efficient storage and retrieval of vector embeddings using supabase vector",
				icon: "ai",
			},
			{
				name: "RAG retrieval",
				description:
					"Perplexity style AI RAG retrieval with sources streamed and cited.",
				icon: "chat",
			},
			{
				name: "Supabase",
				description: "Robust database management with Supabase.",
				icon: "supabase",
			},
		],
		type: "template",
		stack: ["nextjs", "tailwind", "supabase", "openai"],
		// images: [manifestBottomLeft, manifestCenter, manifestRight],
		images: [manifestBottomLeft],
		gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWVwNXVkdXM3aWM4NXM2a2s2czFhd283NHdrbWFsdm43bGdsMXp4MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SM08k77xWhQtQDDluI/giphy.gif",
	},
];
