"use client"

import { useId, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

const PATH_IDLE =
  "M670 0H0V91C0 102.046 8.9543 111 20 111H518.641C526.216 111 533.14 106.721 536.529 99.9469L570.988 31.0531C574.377 24.2789 581.301 20 588.875 20H650C661.046 20 670 11.0457 670 0Z"
const PATH_HOVER =
  "M670 0H0V91C0 102.046 8.9543 111 20 111H518.641C526.216 111 533.14 111 536.529 111L570.988 111C574.377 111 581.301 111 588.875 111H650C661.046 111 670 102.046 670 91Z"

const SURFACE = "#f0eee9"

/** drop-shadow follows painted alpha (organic cutout); box-shadow only follows the border box. */
const SILHOUETTE_SHADOW =
  "drop-shadow(0px 0px 0px rgba(0,0,0,0.06)) drop-shadow(0px 1px 2px -1px rgba(0,0,0,0.06)) drop-shadow(0px 2px 4px 0px rgba(0,0,0,0.04))"
const SILHOUETTE_SHADOW_HOVER =
  "drop-shadow(0px 0px 0px rgba(0,0,0,0.08)) drop-shadow(0px 2px 4px -1px rgba(0,0,0,0.08)) drop-shadow(0px 4px 8px 0px rgba(0,0,0,0.06))"

interface OrganicCardSmallProps {
  image: string
  imageAlt?: string
  category: string
  date: string
  title: string
  href?: string
  className?: string
  /** Card body + band fill (defaults to stone) */
  surfaceColor?: string
}

export function OrganicCardSmall({
  image,
  imageAlt = "Card image",
  category,
  date,
  title,
  href = "#",
  className,
  surfaceColor = SURFACE,
}: OrganicCardSmallProps) {
  const reduceMotion = useReducedMotion()
  const cutoutTitleId = useId()
  const [pointerOver, setPointerOver] = useState(false)
  const [focused, setFocused] = useState(false)
  /** Cutout + arrow read as “active” for pointer hover or keyboard focus (not only one). */
  const interactiveActive = pointerOver || focused

  const pathTransition = reduceMotion
    ? { duration: 0.12, ease: [0.23, 1, 0.32, 1] as const }
    : { type: "spring" as const, duration: 0.38, bounce: 0 }

  return (
    <motion.a
      aria-labelledby={cutoutTitleId}
      className={cn(
        "group/calloutCard relative flex h-full w-full max-w-[617px] flex-col rounded-2xl",
        "cursor-pointer outline-none",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        className
      )}
      data-state={interactiveActive ? "active" : "idle"}
      href={href}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      onMouseEnter={() => setPointerOver(true)}
      onMouseLeave={() => setPointerOver(false)}
      transition={{ type: "spring", duration: 0.28, bounce: 0 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
    >
      {/* Shadow on this shell only — filter drop-shadow follows opaque pixels (incl. cutout curve), not a rounded rect */}
      <div
        className={cn(
          "isolate w-full transition-[filter] duration-200 ease-out",
          reduceMotion && "transition-none"
        )}
        style={{
          filter: interactiveActive
            ? SILHOUETTE_SHADOW_HOVER
            : SILHOUETTE_SHADOW,
        }}
      >
        <div
          className="flex w-full flex-1 flex-col justify-between rounded-t-2xl p-4 text-stone-900"
          style={{ backgroundColor: SURFACE }}
        >
          <div>
            <div className="relative mb-5 overflow-hidden rounded-lg">
              <Image
                alt={imageAlt}
                className={cn(
                  "h-[138px] w-full origin-center object-cover sm:h-[168px]",
                  "[outline-offset:-1px] [outline:1px_solid_rgba(0,0,0,0.08)]",
                  "transition-transform duration-[220ms] ease-out",
                  "motion-reduce:scale-100 motion-reduce:transition-none",
                  "[@media(hover:hover)]:group-data-[state=active]/calloutCard:scale-[1.02]"
                )}
                height={208}
                src={image}
                width={670}
              />
            </div>
            <p className="mb-5 font-medium text-stone-600 text-xs uppercase tracking-wider">
              <span className="text-pretty">
                {category}
                {" — "}
                <time className="tabular-nums">{date}</time>
              </span>
            </p>
            <h3
              className="mb-2 text-balance font-normal text-xl lg:text-2xl"
              id={cutoutTitleId}
            >
              {title}
            </h3>
          </div>
        </div>

        <svg
          aria-hidden
          className="-mt-px -mr-px h-[80px] w-full shrink-0 sm:h-[111px]"
          preserveAspectRatio="none"
          viewBox="0 0 670 111"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Card footer cutout background</title>
          <motion.path
            animate={{ d: interactiveActive ? PATH_HOVER : PATH_IDLE }}
            fill={surfaceColor}
            initial={false}
            transition={pathTransition}
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-4 md:bottom-4">
        <p className="text-base text-stone-900 lg:text-lg">Read more</p>
      </div>

      <div className="pointer-events-none absolute right-4 bottom-4">
        <motion.span
          animate={
            reduceMotion
              ? { x: 0, opacity: 1 }
              : { x: interactiveActive ? 4 : 0, opacity: 1 }
          }
          className="inline-flex"
          transition={
            reduceMotion
              ? { duration: 0.12 }
              : { type: "spring", duration: 0.32, bounce: 0 }
          }
        >
          <ArrowRight
            aria-hidden
            className="h-5 w-5 text-stone-900"
            strokeWidth={2}
          />
        </motion.span>
      </div>
    </motion.a>
  )
}
