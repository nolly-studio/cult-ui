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
          "section-title mb-5 text-4xl leading-[1.1] font-medium tracking-tight text-black md:text-5xl lg:text-6xl dark:text-white",
          "[text-shadow:0_4px_24px_rgb(0_0_0_/_0.15)] dark:[text-shadow:0_4px_28px_rgb(255_255_255_/_0.12)]",
          className
        )}
      >
        {children}
        {showAccent && <span className={accentColor}>.</span>}
      </h1>
      <div
        aria-hidden="true"
        className={cn(
          "section-title absolute inset-0 mb-5 text-4xl leading-[1.1] font-medium tracking-tight text-black md:text-5xl lg:text-6xl dark:text-white",
          "pointer-events-none animate-pulse blur-[4px]",
          "text-foreground/50 dark:text-foreground/60",
          className
        )}
      >
        {children}
        {showAccent && <span className={accentColor}>.</span>}
      </div>
    </div>
  );
}
