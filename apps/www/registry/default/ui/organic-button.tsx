import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

/** Shared fill for all organic SVG paths — driven by `--organic-surface` on the button root. */
const fillOrganic = "fill-[var(--organic-surface)]"

const organicButtonVariants = cva("flex w-fit flex-col", {
  variants: {
    variantColor: {
      primary:
        "text-[var(--organic-fg)] [--organic-fg:theme(colors.white)] [--organic-surface:theme(colors.neutral.950)]",
      secondary:
        "text-[var(--organic-fg)] [--organic-fg:var(--secondary-foreground)] [--organic-surface:var(--secondary)]",
      /** Plum surface + cream label — matches dither hero (colors only; same motion as primary) */
      dither:
        "text-[var(--organic-fg)] [--organic-fg:#f4f8e8] [--organic-surface:#301c2a]",
      /** Light surface for inactive toggle chips (quick toggles, etc.) */
      toggleOff:
        "text-[var(--organic-fg)] [--organic-fg:#404040] [--organic-surface:#ffffff] dark:[--organic-fg:#a3a3a3] dark:[--organic-surface:#262626]",
    },
    size: {
      sm: "h-9 min-h-9 [&_.organic-icon]:size-3.5 [&_.organic-label]:text-sm",
      md: "h-11 min-h-11 [&_.organic-icon]:size-4 [&_.organic-label]:text-base",
      lg: "h-14 min-h-14 [&_.organic-icon]:size-5 [&_.organic-label]:text-lg",
    },
    animationSpeed: {
      slow: "[--organic-duration:500ms]",
      normal: "[--organic-duration:400ms]",
      fast: "[--organic-duration:300ms]",
    },
  },
  defaultVariants: {
    size: "md",
    variantColor: "primary",
    animationSpeed: "normal",
  },
})

interface OrganicShapeButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof organicButtonVariants> {
  asChild?: boolean
  label: string
  icon?: ReactNode
  animationSpeed?: "slow" | "normal" | "fast"
}

const svgShapeAttrs = {
  preserveAspectRatio: "xMidYMid meet" as const,
}

function isExternalHref(href: string | undefined): boolean {
  if (!href) {
    return false
  }
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//")
  )
}

export const OrganicButton = forwardRef<
  HTMLAnchorElement,
  OrganicShapeButtonProps
>(
  (
    {
      asChild,
      label,
      className,
      icon = (
        <ArrowUpRight className="organic-icon stroke-current transition-transform duration-100 group-hover/organic:rotate-45 group-hover/organic:scale-110" />
      ),
      size = "md",
      variantColor = "primary",
      animationSpeed = "normal",
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "a"

    const minWBySize = {
      sm: "min-w-[9rem]",
      md: "min-w-[10.5rem]",
      lg: "min-w-[12rem]",
    } as const
    const minW = minWBySize[size ?? "md"]

    const resolvedTarget = target ?? (isExternalHref(href) ? "_blank" : "_self")
    const resolvedRel =
      rel ?? (isExternalHref(href) ? "noopener noreferrer" : undefined)

    return (
      <div
        className={cn(
          organicButtonVariants({
            variantColor,
            size,
            animationSpeed,
          })
        )}
      >
        <Comp
          className={cn(
            "group/organic inline-flex h-full min-h-0 w-full min-w-0 max-w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.96] active:transition-transform disabled:cursor-not-allowed",
            minW,
            className
          )}
          href={href}
          ref={ref}
          rel={resolvedRel}
          target={resolvedTarget}
          {...props}
        >
          <div className="flex h-full min-h-0 min-w-0 flex-1 flex-row items-stretch">
            <div className="flex h-full min-h-0 min-w-0 flex-1 items-stretch">
              <RoundedFlatRight />

              <div
                className={cn(
                  "flex h-full min-h-0 min-w-0 flex-1 items-center justify-start overflow-visible whitespace-nowrap bg-[var(--organic-surface)] pr-2 text-[var(--organic-fg)]"
                )}
              >
                <span className="flex items-center justify-start pl-2 transition-[padding] duration-[var(--organic-duration,400ms)] ease-in-out">
                  <span className="organic-label shrink-0 font-brand font-semibold leading-none">
                    {label}
                  </span>
                </span>
              </div>

              <DescendingWall />
            </div>

            <div className="-ml-px flex h-full min-h-0 w-max shrink-0 items-stretch">
              <AscendingWall />
              <div
                className={cn(
                  "flex h-full shrink-0 items-center justify-center overflow-visible whitespace-nowrap bg-[var(--organic-surface)] text-[var(--organic-fg)]"
                )}
              >
                <span className="flex items-center px-0 transition-[padding] duration-[var(--organic-duration,400ms)] ease-in-out group-hover/organic:px-2">
                  {icon}
                </span>
              </div>

              <FlatRoundedRight />
            </div>
          </div>
        </Comp>
      </div>
    )
  }
)

OrganicButton.displayName = "OrganicButton"

function AscendingWall() {
  return (
    <svg
      aria-hidden="true"
      className="-mr-px h-full w-auto shrink-0"
      fill="none"
      viewBox="0 0 18 40"
      xmlns="http://www.w3.org/2000/svg"
      {...svgShapeAttrs}
    >
      <path
        className={fillOrganic}
        d="M7.101 40H18V0H16C13.594 0 11.4403 1.49249 10.5955 3.74532L0.546698 30.5421C-1.1694 35.1184 2.21356 40 7.101 40Z"
      />
    </svg>
  )
}

function FlatRoundedRight() {
  return (
    <svg
      aria-hidden="true"
      className="-ml-px h-full w-auto shrink-0"
      fill="none"
      viewBox="0 0 10 40"
      xmlns="http://www.w3.org/2000/svg"
      {...svgShapeAttrs}
    >
      <path
        className={fillOrganic}
        d="M0 40V0H4C7.31371 0 10 2.68629 10 6V34C10 37.3137 7.31371 40 4 40H0Z"
      />
    </svg>
  )
}

function DescendingWall() {
  return (
    <svg
      aria-hidden="true"
      className="-ml-px h-full w-auto shrink-0"
      fill="none"
      viewBox="0 0 18 40"
      xmlns="http://www.w3.org/2000/svg"
      {...svgShapeAttrs}
    >
      <path
        className={fillOrganic}
        d="M10.899 0H0V40H2C4.40603 40 6.55968 38.5075 7.4045 36.2547L17.4533 9.45786C19.1694 4.88161 15.7864 0 10.899 0Z"
      />
    </svg>
  )
}

function RoundedFlatRight() {
  return (
    <svg
      aria-hidden="true"
      className="-mr-px h-full w-auto shrink-0"
      fill="none"
      viewBox="0 0 10 40"
      xmlns="http://www.w3.org/2000/svg"
      {...svgShapeAttrs}
    >
      <path
        className={fillOrganic}
        d="M10 40V0H6C2.68629 0 0 2.68629 0 6V34C0 37.3137 2.68629 40 6 40H10Z"
      />
    </svg>
  )
}
