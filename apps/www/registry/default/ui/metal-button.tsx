"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { MetalFx, type MetalFxProps, type MetalFxVariant } from "metal-fx";
/**
 * `metal-fx` around `Button` — liquid metal ring for controls.
 * `className` styles the button; `metalFxClassName` styles the MetalFx wrapper.
 *
 * With `normalizeHostStyles` (default), variant fills live on the MetalFx wrapper
 * and the button stays transparent so the shader ring stays visible. Pass
 * `normalizeHostStyles={false}` to keep all shadcn chrome on the button (filled
 * variants will cover most of the metal).
 */
import type { ComponentProps, CSSProperties } from "react";
import { forwardRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const metalSurfaceVariants = cva("transition-colors", {
  variants: {
    variant: {
      default: "bg-primary! text-primary-foreground! hover:bg-primary/80!",
      outline:
        "bg-background! text-foreground! hover:bg-input/50! dark:bg-input/30!",
      secondary:
        "bg-secondary! text-secondary-foreground! hover:bg-secondary/80!",
      ghost:
        "text-foreground! hover:bg-muted/50! dark:hover:bg-muted/50! bg-transparent!",
      destructive:
        "bg-destructive/10! text-destructive! hover:bg-destructive/20! dark:bg-destructive/20! dark:hover:bg-destructive/30!",
      link: "text-primary! bg-transparent!",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/** Strip outer chrome on the host; MetalFx punches the ring around the interior. */
const metalHostChromeReset =
  "border-0! bg-transparent! shadow-none! hover:bg-transparent! aria-expanded:bg-transparent!";

/** Keep a stable edge above the animated shader so bright frames cannot erase it. */
const metalStableEdge =
  "relative isolate before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:ring-1 before:ring-border/70 before:ring-inset dark:before:ring-border/80";

type MetalSurfaceVariant = NonNullable<
  VariantProps<typeof metalSurfaceVariants>["variant"]
>;

type MetalShellProps = Pick<
  MetalFxProps,
  | "preset"
  | "theme"
  | "strength"
  | "paused"
  | "borderRadius"
  | "disableGlow"
  | "reflectionTargets"
  | "shaderScale"
  | "ringCssPx"
  | "scale"
  | "normalizeHostStyles"
> & {
  metalVariant?: MetalFxVariant;
  metalFxClassName?: string;
  metalFxStyle?: CSSProperties;
};

export type MetalButtonProps = ComponentProps<typeof Button> & MetalShellProps;

export type MetalIconButtonProps = MetalButtonProps;

export const MetalButton = forwardRef<HTMLDivElement, MetalButtonProps>(
  function MetalButton(
    {
      metalVariant = "button",
      metalFxClassName,
      metalFxStyle,
      preset = "chromatic",
      theme = "auto",
      strength = 0.9,
      paused,
      borderRadius,
      disableGlow,
      reflectionTargets,
      shaderScale,
      ringCssPx,
      scale,
      normalizeHostStyles = true,
      variant = "default",
      className,
      ...buttonProps
    },
    ref
  ) {
    const surfaceVariant = variant as MetalSurfaceVariant;

    return (
      <MetalFx
        borderRadius={borderRadius}
        className={cn(
          "inline-flex w-fit min-w-0 flex-col items-stretch overflow-visible! leading-none",
          metalStableEdge,
          normalizeHostStyles &&
            metalSurfaceVariants({ variant: surfaceVariant }),
          metalFxClassName
        )}
        disableGlow={disableGlow}
        normalizeHostStyles={normalizeHostStyles}
        paused={paused}
        preset={preset}
        ref={ref}
        reflectionTargets={reflectionTargets}
        ringCssPx={ringCssPx}
        scale={scale}
        shaderScale={shaderScale}
        strength={strength}
        style={metalFxStyle}
        theme={theme}
        variant={metalVariant}
      >
        <Button
          className={cn(normalizeHostStyles && metalHostChromeReset, className)}
          variant={variant}
          {...buttonProps}
        />
      </MetalFx>
    );
  }
);

MetalButton.displayName = "MetalButton";

export const MetalIconButton = forwardRef<HTMLDivElement, MetalIconButtonProps>(
  function MetalIconButton(
    { size = "icon-sm", metalVariant = "circle", className, ...props },
    ref
  ) {
    return (
      <MetalButton
        className={cn(
          "leading-none! [&_svg]:block [&_svg]:shrink-0",
          className
        )}
        metalVariant={metalVariant}
        ref={ref}
        size={size}
        {...props}
      />
    );
  }
);

MetalIconButton.displayName = "MetalIconButton";
