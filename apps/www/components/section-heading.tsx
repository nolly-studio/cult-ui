import type * as React from "react";

import { cn } from "@/lib/utils";

export type SectionTitleProps = React.ComponentProps<"h2"> & {
  as?: "h1" | "h2" | "h3";
  /** `lg` is the hero size. @default "default" */
  size?: "default" | "lg";
};

export function SectionTitle({
  as: Element = "h2",
  size = "default",
  className,
  ...props
}: SectionTitleProps) {
  return (
    <Element
      data-slot="section-title"
      className={cn(
        "leading-none font-[450] tracking-[-0.06em] text-balance",
        size === "lg"
          ? "text-4xl lg:text-[3.5rem] xl:text-[4rem]"
          : "text-2xl md:text-4xl lg:text-5xl",
        className
      )}
      {...props}
    />
  );
}

/** The one pixel-type moment a section may have when it is a kicker. */
export function PixelKicker({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="pixel-kicker"
      className={cn(
        "font-pixel-square text-muted-foreground text-xs tracking-widest uppercase",
        className
      )}
      {...props}
    />
  );
}

/** Inline pixel phrase inside a `SectionTitle`. Four words at most. */
export function PixelPhrase({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="pixel-phrase"
      className={cn("font-pixel-square tracking-[-0.02em]", className)}
      {...props}
    />
  );
}
