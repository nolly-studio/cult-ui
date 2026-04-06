import { cn } from "@/lib/utils";

interface GlowHeadingProps {
	children: React.ReactNode;
	className?: string;
	accentColor?: string;
	showAccent?: boolean;
}

export function GlowHeading({
	children,
	className,
	accentColor = "text-primary",
	showAccent = true,
}: GlowHeadingProps) {
	return (
		<div className="relative">
			<h1
				className={cn(
					"text-4xl md:text-5xl lg:text-6xl font-medium mb-5 leading-[1.1] tracking-tight text-black dark:text-white section-title",
					"[text-shadow:0_4px_24px_rgb(0_0_0_/_0.15)] dark:[text-shadow:0_4px_28px_rgb(255_255_255_/_0.12)]",
					className,
				)}
			>
				{children}
				{showAccent && <span className={accentColor}>.</span>}
			</h1>
			<div
				aria-hidden="true"
				className={cn(
					"absolute inset-0 text-4xl md:text-5xl lg:text-6xl font-medium mb-5 leading-[1.1] tracking-tight text-black dark:text-white section-title",
					"blur-[4px] animate-pulse pointer-events-none",
					"text-foreground/50 dark:text-foreground/60",
					className,
				)}
			>
				{children}
				{showAccent && <span className={accentColor}>.</span>}
			</div>
		</div>
	);
}
