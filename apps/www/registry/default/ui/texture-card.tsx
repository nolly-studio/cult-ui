import * as React from "react"

import { cn } from "@/lib/utils"

const TextureCardStyled = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[24px] border border-white/60 dark:border-stone-950/60",
      "bg-gradient-to-b dark:from-neutral-800 dark:to-neutral-900 from-neutral-100 to-white/70",
      className
    )}
    {...props}
  >
    {/* Nested structure for aesthetic borders */}
    <div className="rounded-[23px] border  dark:border-neutral-900/80 border-black/10 ">
      <div className="rounded-[22px] border  dark:border-neutral-950 border-white/50">
        <div className="rounded-[21px] border  dark:border-neutral-900/70  border-neutral-950/20">
          {/* Inner content wrapper */}
          <div className=" w-full border border-white/50 dark:border-neutral-700/50 rounded-[20px] text-neutral-500 ">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
))

// Allows for global css overrides and theme support - similar to shad cn
const TextureCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-white/60 dark:border-border/30",
        "rounded-[calc(var(--radius))]", // Base radius with fallback
        className
      )}
      {...props}
    >
      <div className="border dark:border-neutral-900/80 border-black/10 rounded-[calc(var(--radius)-1px)]">
        <div className="border dark:border-neutral-950 border-white/50 rounded-[calc(var(--radius)-2px)]">
          <div className="border dark:border-neutral-900/70 border-neutral-950/20 rounded-[calc(var(--radius)-3px)]">
            <div className=" w-full border border-white/50 dark:border-neutral-700/50 text-neutral-500 bg-gradient-to-b from-card/70 to-secondary/50 rounded-[calc(var(--radius)-4px)] ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

TextureCard.displayName = "TextureCard"

const TextureCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "first:pt-6 last:pb-6 ", // Adjust padding for first and last child
      className
    )}
    {...props}
  />
))
TextureCardHeader.displayName = "TextureCardHeader"

const TextureCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-tight text-neutral-900 dark:text-neutral-100 pl-2",
      className
    )}
    {...props}
  />
))
TextureCardTitle.displayName = "TextureCardTitle"

const TextureCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-neutral-600 dark:text-neutral-400 pl-2",
      className
    )}
    {...props}
  />
))
TextureCardDescription.displayName = "TextureCardDescription"

const TextureCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 py-4", className)} {...props} />
))
TextureCardContent.displayName = "TextureCardContent"

const TextureCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between px-6 py-4  gap-2",

      className
    )}
    {...props}
  />
))
TextureCardFooter.displayName = "TextureCardFooter"

const TextureSeparator = () => {
  return (
    <div className="border border-t-neutral-50 border-b-neutral-300/50 dark:border-t-neutral-950 dark:border-b-neutral-700/50 border-l-transparent border-r-transparent" />
  )
}

export {
  TextureCard,
  TextureCardHeader,
  TextureCardStyled,
  TextureCardFooter,
  TextureCardTitle,
  TextureSeparator,
  TextureCardDescription,
  TextureCardContent,
}

export default TextureCard
