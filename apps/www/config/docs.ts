import type { MainNavItem, SidebarNavItem } from "types/nav";

interface DocsConfig {
	mainNav: MainNavItem[];
	sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
	mainNav: [
		{
			title: "Components",
			href: "/docs/components/dynamic-island",
		},
		{
			title: "Themes",
			href: "/themes",
		},
	],
	sidebarNav: [
		{
			title: "Getting Started",
			items: [
				{
					title: "Introduction",
					href: "/docs",
					items: [],
				},
				{
					title: "Installation",
					href: "/docs/installation",
					items: [],
				},
				{
					title: "MCP Server",
					href: "/docs/mcp-server",
					items: [],
				},
				{
					title: "Changelog",
					href: "/docs/changelog",
					items: [],
				},
			],
		},
		{
			title: "Components",
			items: [
				{
					title: "Marketing & Landing",
					items: [
						{
							title: "Hero Dithering",
							href: "/docs/components/hero-dithering",
							items: [],
							label: "new",
						},
						{
							title: "Hero Color Panels",
							href: "/docs/components/hero-color-panels",
							items: [],
							label: "new",
						},
						{
							title: "Hero Heatmap",
							href: "/docs/components/hero-heatmap",
							items: [],
							label: "new",
						},
						{
							title: "Hero Liquid Metal",
							href: "/docs/components/hero-liquid-metal",
							items: [],
							label: "new",
						},
						{
							title: "Hero Static Radial Gradient",
							href: "/docs/components/hero-static-radial-gradient",
							items: [],
							label: "new",
						},
						{
							title: "Bg Media Hero",
							href: "/docs/components/bg-media",
							items: [],
						},
						{
							title: "Logo Carousel",
							href: "/docs/components/logo-carousel",
							items: [],
						},
						{
							title: "Tweet Grid",
							href: "/docs/components/tweet-grid",
							items: [],
						},
						{
							title: "Gradient Heading",
							href: "/docs/components/gradient-heading",
							items: [],
						},
					],
				},
				{
					title: "Guided Experiences",
					items: [
						{
							title: "Onboarding",
							href: "/docs/components/onboarding",
							items: [],
							label: "new",
						},
						{
							title: "Feature Carousel",
							href: "/docs/components/feature-carousel",
							items: [],
						},
						{
							title: "Intro Disclosure",
							href: "/docs/components/intro-disclosure",
							label: "updated",
							items: [],
						},
						{
							title: "Loading Carousel",
							href: "/docs/components/loading-carousel",
							items: [],
						},
					],
				},
				{
					title: "Buttons & Controls",
					items: [
						{
							title: "Neumorph Button",
							href: "/docs/components/neumorph-button",
							items: [],
						},
						{
							title: "Family Button",
							href: "/docs/components/family-button",
							items: [],
						},
						{
							title: "Texture Button",
							href: "/docs/components/texture-button",
							label: "updated",
							items: [],
						},
						{
							title: "Bg Animate Button",
							href: "/docs/components/bg-animate-button",
							items: [],
						},
						{
							title: "Cosmic Button",
							href: "/docs/components/cosmic-button",
							label: "new",
							items: [],
						},
						{
							title: "Gradient Button Group",
							href: "/docs/components/gradient-button-group",
							items: [],
							label: "new",
						},
					],
				},
				{
					title: "Cards & Containers",
					items: [
						{
							title: "Expandable Screen",
							href: "/docs/components/expandable-screen",
							items: [],
						},
						{
							title: "Expandable Card",
							href: "/docs/components/expandable",
							items: [],
						},
						{
							title: "Minimal Card",
							href: "/docs/components/minimal-card",
							items: [],
						},
						{
							title: "Neumorph Eyebrow",
							href: "/docs/components/neumorph-eyebrow",
							items: [],
						},
						{
							title: "Texture Card",
							href: "/docs/components/texture-card",
							items: [],
						},
						{
							title: "Shift Card",
							href: "/docs/components/shift-card",
							label: "updated",
							items: [],
						},
						{
							title: "Browser Window",
							href: "/docs/components/mock-browser-window",
							items: [],
						},
						{
							title: "Texture Overlay",
							href: "/docs/components/texture-overlay",
							items: [],
						},
						{
							title: "Distorted Glass",
							href: "/docs/components/distorted-glass",
							items: [],
						},
						{
							title: "Background Texture",
							href: "/docs/components/bg-image-texture",
							items: [],
						},
					],
				},

				{
					title: "Layout & Forms",
					items: [
						{
							title: "Morph Surface",
							href: "/docs/components/morph-surface",
							items: [],
							label: "updated",
						},
						{
							title: "Direction Aware Tabs",
							href: "/docs/components/direction-aware-tabs",
							items: [],
						},
						{
							title: "Side Panel",
							href: "/docs/components/side-panel",
							items: [],
						},
						{
							title: "Floating Panel",
							href: "/docs/components/floating-panel",
							items: [],
						},
						{
							title: "Popover",
							href: "/docs/components/popover",
							items: [],
						},
						{
							title: "Popover Form",
							href: "/docs/components/popover-form",
							items: [],
						},
						{
							title: "Sortable List",
							href: "/docs/components/sortable-list",
							items: [],
						},
						{
							title: "Toolbar Expandable",
							href: "/docs/components/toolbar-expandable",
							items: [],
							label: "recent",
						},
						{
							title: "Code Block",
							href: "/docs/components/code-block",
							items: [],
						},
						{
							title: "Family Drawer",
							href: "/docs/components/family-drawer",
							items: [],
						},
					],
				},

				{
					title: "Interactive Elements",
					items: [
						{
							title: "Dynamic Island",
							href: "/docs/components/dynamic-island",
							items: [],
						},
						{
							title: "Color Picker",
							href: "/docs/components/color-picker",
							items: [],
						},
						{
							title: "Choice Poll",
							href: "/docs/components/choice-poll",
							items: [],
							label: "updated",
						},
						{
							title: "Vote Tally",
							href: "/docs/components/vote-tally",
							items: [],
							label: "recent",
						},
						{
							title: "Poll Widget",
							href: "/docs/components/poll-widget",
							items: [],
							label: "recent",
						},
						{
							title: "Prompt Library",
							href: "/docs/components/prompt-library",
							items: [],
						},
						{
							title: "AI Instructions",
							href: "/docs/components/ai-instructions",
							items: [],
						},
						{
							title: "Timer",
							href: "/docs/components/timer",
							items: [],
						},
						{
							title: "MacOS Dock",
							href: "/docs/components/dock",
							items: [],
						},
						{
							title: "Terminal Animation",
							href: "/docs/components/terminal-animation",
							items: [],
							label: "new",
						},
						{
							title: "Squiggle Arrow",
							href: "/docs/components/squiggle-arrow",
							items: [],
						},
					],
				},
				{
					title: "Media",
					items: [
						{
							title: "3D Carousel",
							href: "/docs/components/three-d-carousel",
							items: [],
						},
						{
							title: "Hover Video Player",
							href: "/docs/components/hover-video-player",
							items: [],
						},
						{
							title: "YouTube Video Player",
							href: "/docs/components/youtube-video-player",
							items: [],
						},
					],
				},
				{
					title: "Typography & Text",
					items: [
						{
							title: "Pixel Heading (Char)",
							href: "/docs/components/pixel-heading-character",
							items: [],
							label: "recent",
						},
						{
							title: "Pixel Heading (Word)",
							href: "/docs/components/pixel-heading-word",
							items: [],
							label: "recent",
						},
						{
							title: "Pixel Paragraph",
							href: "/docs/components/pixel-paragraph-words",
							items: [],
							label: "recent",
						},
						{
							title: "Pixel Paragraph Inv",
							href: "/docs/components/pixel-paragraph-words-inverse",
							items: [],
							label: "recent",
						},
						{
							title: "Text Gif",
							href: "/docs/components/text-gif",
							items: [],
						},
						{
							title: "Text Animate",
							href: "/docs/components/text-animate",
							items: [],
						},
						{
							title: "Typewriter",
							href: "/docs/components/typewriter",
							items: [],
						},
						{
							title: "Animated Number",
							href: "/docs/components/animated-number",
							items: [],
						},
					],
				},
				{
					title: "Visual Effects",
					items: [
						{
							title: "LightBoard",
							href: "/docs/components/lightboard",
							items: [],
						},
						{
							title: "Fractal Grid",
							href: "/docs/components/bg-animated-fractal-grid",
							items: [],
						},
						{
							title: "Canvas Fractal Grid",
							href: "/docs/components/canvas-fractal-grid",
							items: [],
						},
						{
							title: "Shader Lens Blur",
							href: "/docs/components/shader-lens-blur",
							label: "updated",
							items: [],
						},
						{
							title: "Stripe Bg Guides",
							href: "/docs/components/stripe-bg-guides",
							items: [],
						},
					],
				},
			],
		},
	],
};
