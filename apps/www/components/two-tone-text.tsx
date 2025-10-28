import type { HTMLAttributes } from "react"
import Link from "next/link"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const gradientVariants = cva("bg-clip-text tracking-tight text-transparent", {
  variants: {
    variant: {
      default:
        "bg-gradient-to-t from-primary to-primary/90 dark:from-primary-foreground dark:to-primary-foreground/90",
      helper:
        // "bg-gradient-to-t from-muted-foreground via-[#8C8C8C] to-[#B4B4B8] dark:from-muted-foreground dark:to-[#D6D6D6]",
        "bg-gradient-to-t from-muted-foreground to-muted-foreground/80 dark:from-muted-foreground dark:to-muted-foreground/70",
      accent:
        "bg-gradient-to-t from-accent to-accent/80 dark:from-accent dark:to-accent/90",
      pink: "bg-gradient-to-t from-[#fb21ff] to-[#fd67ff] dark:from-[#fb21ff] dark:to-[#fd67ff]",
      blue: "bg-gradient-to-t from-[hsl(var(--chart-5))] to-[hsl(var(--chart-5))/80] dark:from-[hsl(var(--chart-5))] dark:to-[hsl(var(--chart-5))/90]",
      light:
        "bg-gradient-to-t from-neutral-200 to-neutral-300 dark:from-neutral-300 dark:to-neutral-400",
      secondary:
        "bg-gradient-to-t from-secondary-foreground to-muted-foreground",
      none: "", // No gradient, use text color instead
    },
    weight: {
      default: "font-bold",
      thin: "font-thin",
      base: "font-normal",
      semi: "font-semibold",
      bold: "font-bold",
      black: "font-black",
    },
  },
  defaultVariants: {
    variant: "none",
    weight: "default",
  },
})

export type GradientVariant =
  | "default"
  | "helper"
  | "accent"
  | "pink"
  | "blue"
  | "light"
  | "secondary"
  | "none"
export type FontWeight = "default" | "thin" | "base" | "semi" | "bold" | "black"

// Interface for link data
export interface TextLink {
  text: string
  href: string
}

export interface TwoToneTextProps extends HTMLAttributes<HTMLHeadingElement> {
  primaryText: string
  secondaryText: string
  size?: "xs" | "ssm" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl"
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"
  /**
   * Controls whether the primary and secondary text appear on the same line
   * @default false - secondary text appears on a new line
   */
  allowWrap?: boolean
  /**
   * Controls the text alignment
   * @default "left"
   */
  align?: "left" | "center" | "right"
  /**
   * Gradient variant for primary text
   * @default "none" - uses text color instead of gradient
   */
  primaryGradient?: GradientVariant
  /**
   * Gradient variant for secondary text
   * @default "none" - uses text color instead of gradient
   */
  secondaryGradient?: GradientVariant
  /**
   * Font weight for primary text
   * @default "bold"
   */
  primaryWeight?: FontWeight
  /**
   * Font weight for secondary text
   * @default "bold"
   */
  secondaryWeight?: FontWeight
  /**
   * Links to be rendered within the primary text
   */
  primaryLinks?: TextLink[]
  /**
   * Links to be rendered within the secondary text
   */
  secondaryLinks?: TextLink[]
}

export function TwoToneText({
  primaryText,
  secondaryText,
  size = "md",
  as: Component = "h2",
  allowWrap = false,
  align = "left",
  primaryGradient = "default",
  secondaryGradient = "helper",
  primaryWeight = "semi",
  secondaryWeight = "semi",
  primaryLinks = [],
  secondaryLinks = [],
  className,
  ...props
}: TwoToneTextProps) {
  const sizeClasses = {
    xs: "text-base leading-[1.2] tracking-tight",
    ssm: "text-base  md:text-lg leading-[1.2] tracking-tight",
    sm: "text-xl md:text-2xl leading-[1.2] tracking-tight",
    md: "text-[20px] md:text-[32px] leading-[1.05] tracking-tight",
    lg: "text-2xl md:text-[32px] leading-[1.125] tracking-tight",
    // lg: "text-2xl md:text-5xl leading-[1.1] tracking-tight",
    xl: "text-4xl md:text-6xl leading-[1.1] tracking-tight",
    xxl: "text-6xl md:text-7xl leading-[1.1] tracking-tight",
    xxxl: "text-7xl md:text-8xl leading-[1.1] tracking-tight",
  }

  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  // Function to render text with links
  const renderTextWithLinks = (
    text: string,
    links: TextLink[],
    gradientVariant: GradientVariant,
    weight: FontWeight
  ) => {
    if (!links.length) {
      return text
    }

    // Create a map of link positions
    const linkMap = new Map<number, TextLink & { endIndex: number }>()

    links.forEach((link) => {
      const startIndex = text.indexOf(link.text)
      if (startIndex !== -1) {
        linkMap.set(startIndex, {
          ...link,
          endIndex: startIndex + link.text.length,
        })
      }
    })

    // Sort link positions
    const positions = Array.from(linkMap.keys()).sort((a, b) => a - b)

    if (!positions.length) {
      return text
    }

    // Build the result
    const result = []
    let lastIndex = 0

    positions.forEach((position) => {
      const link = linkMap.get(position)!

      // Add text before the link
      if (position > lastIndex) {
        result.push(text.substring(lastIndex, position))
      }

      // Add the link with proper styling
      result.push(
        <Link
          key={position}
          href={link.href}
          className={cn(
            // Inherit the font weight
            gradientVariants({ weight, variant: "none" }),
            // Apply appropriate text color instead of transparent
            gradientVariant === "none"
              ? "text-black dark:text-white"
              : gradientVariant === "helper"
                ? "text-muted-foreground hover:text-muted-foreground/90"
                : "text-primary hover:text-primary/90",
            "relative inline-block transition-all duration-200",
            "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300",
            "hover:after:origin-left hover:after:scale-x-100"
          )}
        >
          {link.text}
        </Link>
      )

      lastIndex = link.endIndex
    })

    // Add any remaining text
    if (lastIndex < text.length) {
      result.push(text.substring(lastIndex))
    }

    return result
  }

  return (
    <Component
      className={cn(sizeClasses[size], alignmentClasses[align], className)}
      {...props}
    >
      <span
        className={cn(
          primaryGradient === "none" ? "text-black dark:text-white" : "",
          gradientVariants({ variant: primaryGradient, weight: primaryWeight })
        )}
      >
        {renderTextWithLinks(
          primaryText,
          primaryLinks,
          primaryGradient,
          primaryWeight
        )}
      </span>
      {allowWrap && <span className="inline-block"> </span>}
      {!allowWrap && (
        <span
          className={cn(
            "mt-1 block",
            sizeClasses[size] === "sm" ? "mt-0.5" : "mt-1"
          )}
        ></span>
      )}
      <span
        className={cn(
          secondaryGradient === "none"
            ? "text-[#86868b] dark:text-[#86868b]"
            : "",
          gradientVariants({
            variant: secondaryGradient,
            weight: secondaryWeight,
          })
        )}
      >
        {renderTextWithLinks(
          secondaryText,
          secondaryLinks,
          secondaryGradient,
          secondaryWeight
        )}
      </span>
    </Component>
  )
}
