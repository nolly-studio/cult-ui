"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariantsOuter = cva("", {
  variants: {
    variant: {
      primary:
        "w-full border border-[1px] border-black/10 bg-gradient-to-b from-black/70 to-black p-[1px] transition duration-300 ease-in-out dark:border-[2px] dark:border-black dark:from-white dark:to-white/80",
      accent:
        "w-full border-[1px] border-black/10 bg-gradient-to-b from-indigo-300/90 to-indigo-500 p-[1px] transition duration-300 ease-in-out dark:border-[2px] dark:border-neutral-950 dark:from-indigo-200/70 dark:to-indigo-500",
      destructive:
        "w-full border-[1px] border-black/10 bg-gradient-to-b from-red-300/90 to-red-500 p-[1px] transition duration-300 ease-in-out dark:border-[2px] dark:border-neutral-950 dark:from-red-300/90 dark:to-red-500",
      secondary:
        "w-full border-[1px] border-black/20 bg-white/50 p-[1px] transition duration-300 ease-in-out dark:border-[2px] dark:border-neutral-950 dark:bg-neutral-600/50",
      minimal:
        "group/texture-button w-full border-[1px] border-black/20 bg-white/50 to-white p-[1px] hover:bg-gradient-to-t hover:from-neutral-100 active:bg-neutral-200 dark:border-[2px] dark:border-neutral-950 dark:bg-neutral-600/80 dark:hover:from-neutral-600/50 dark:hover:to-neutral-600/70 dark:active:bg-neutral-800",
      icon: "group/texture-button rounded-full border border-black/10 bg-white/50 to-white p-[1px] hover:bg-gradient-to-t hover:from-neutral-100 active:bg-neutral-200 dark:border-neutral-950 dark:bg-neutral-600/50 dark:hover:from-neutral-700 dark:hover:to-neutral-600 dark:active:bg-neutral-800",
    },
    size: {
      sm: "rounded-[6px]",
      default: "rounded-[12px]",
      lg: "rounded-[12px]",
      icon: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

const innerDivVariants = cva(
  "text-muted-foreground flex h-full w-full items-center justify-center",
  {
    variants: {
      variant: {
        primary:
          "gap-2 bg-gradient-to-b from-neutral-800 to-black text-sm text-white/90 transition duration-300 ease-in-out hover:from-stone-800 hover:to-neutral-800/70 active:bg-gradient-to-b active:from-black active:to-black dark:from-neutral-200 dark:to-neutral-50 dark:text-black/80 dark:hover:from-stone-200 dark:hover:to-neutral-200 dark:active:from-stone-300 dark:active:to-neutral-300",
        accent:
          "gap-2 bg-gradient-to-b from-indigo-400 to-indigo-600 text-sm text-white/90 transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-indigo-400/70 hover:to-indigo-600/70 active:bg-gradient-to-b active:from-indigo-400/80 active:to-indigo-600/80 dark:hover:from-indigo-400/70 dark:hover:to-indigo-600/70 dark:active:from-indigo-400 dark:active:to-indigo-600",
        destructive:
          "gap-2 bg-gradient-to-b from-red-400/60 to-red-500/60 text-sm text-white/90 transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-red-400/70 hover:to-red-600/70 active:bg-gradient-to-b active:from-red-400/80 active:to-red-600/80 dark:hover:from-red-400/70 dark:hover:to-red-500/80 dark:active:from-red-400 dark:active:to-red-500",
        secondary:
          "bg-gradient-to-b from-neutral-100/80 to-neutral-200/50 text-sm transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-neutral-200/40 hover:to-neutral-300/60 active:bg-gradient-to-b active:from-neutral-200/60 active:to-neutral-300/70 dark:from-neutral-800 dark:to-neutral-700/50 dark:hover:from-neutral-700 dark:hover:to-neutral-700/60 dark:active:from-neutral-800 dark:active:to-neutral-700",
        minimal:
          "bg-gradient-to-b from-white to-neutral-50/50 text-sm transition duration-300 ease-in-out group-hover/texture-button:bg-gradient-to-b group-hover/texture-button:from-neutral-50/50 group-hover/texture-button:to-neutral-100/60 group-active/texture-button:bg-gradient-to-b group-active/texture-button:from-neutral-100/60 group-active/texture-button:to-neutral-100/90 dark:from-neutral-800 dark:to-neutral-700/50 dark:group-hover/texture-button:from-neutral-700 dark:group-hover/texture-button:to-neutral-700/60 dark:group-active/texture-button:from-neutral-800 dark:group-active/texture-button:to-neutral-700",
        icon: "rounded-full bg-gradient-to-b from-white to-neutral-50/50 group-active/texture-button:bg-neutral-200 dark:from-neutral-800 dark:to-neutral-700/50 dark:group-active/texture-button:bg-neutral-800",
      },
      size: {
        sm: "rounded-[4px] px-4 py-1 text-xs",
        default: "rounded-[10px] px-4 py-2 text-sm",
        lg: "rounded-[10px] px-4 py-2 text-base",
        icon: "rounded-full p-1",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface UnifiedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "destructive"
    | "minimal"
    | "icon";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const TextureButton = React.forwardRef<HTMLButtonElement, UnifiedButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "default",
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariantsOuter({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        <div className={cn(innerDivVariants({ variant, size }))}>
          {children}
        </div>
      </Comp>
    );
  }
);

TextureButton.displayName = "TextureButton";

export { TextureButton };

// export default TextureButton
