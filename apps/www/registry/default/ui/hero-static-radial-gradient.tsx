"use client"

import * as React from "react"
import type { SVGProps } from "react"
import { StaticRadialGradient } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const MemoizedStaticRadialGradient = React.memo(StaticRadialGradient)

type StaticRadialGradientProps = React.ComponentProps<
  typeof StaticRadialGradient
>
type StaticRadialGradientIcon = React.ComponentType<SVGProps<SVGSVGElement>>

export interface HeroStaticRadialGradientTechItem {
  name: string
  version?: string
  icon?: StaticRadialGradientIcon
}

export interface HeroStaticRadialGradientCTAProps {
  label: React.ReactNode
  href: string
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  className?: string
  buttonClassName?: string
}

export interface HeroStaticRadialGradientRootProps
  extends Omit<React.ComponentPropsWithoutRef<"section">, "title"> {
  srTitle?: string
  title?: React.ReactNode
  subtitle?: React.ReactNode
  description?: React.ReactNode
  showCta?: boolean
  ctaProps?: Partial<HeroStaticRadialGradientCTAProps>
  renderCta?: (defaultCta: React.ReactNode) => React.ReactNode
  showBadges?: boolean
  techStack?: HeroStaticRadialGradientTechItem[]
  renderBadge?: (
    tech: HeroStaticRadialGradientTechItem,
    index: number,
    defaultBadge: React.ReactNode
  ) => React.ReactNode
  desktopShaderProps?: Partial<StaticRadialGradientProps>
  mobileShaderProps?: Partial<StaticRadialGradientProps>
}

export interface HeroStaticRadialGradientHeadingProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  headingClassName?: string
}

export interface HeroStaticRadialGradientDescriptionProps
  extends React.ComponentPropsWithoutRef<"div"> {
  description?: React.ReactNode
  descriptionClassName?: string
}

export interface HeroStaticRadialGradientActionsProps
  extends React.ComponentPropsWithoutRef<"div"> {
  showCta?: boolean
  ctaProps?: Partial<HeroStaticRadialGradientCTAProps>
  renderCta?: (defaultCta: React.ReactNode) => React.ReactNode
}

export interface HeroStaticRadialGradientBadgesProps
  extends React.ComponentPropsWithoutRef<"div"> {
  showBadges?: boolean
  techStack?: HeroStaticRadialGradientTechItem[]
  renderBadge?: (
    tech: HeroStaticRadialGradientTechItem,
    index: number,
    defaultBadge: React.ReactNode
  ) => React.ReactNode
}

export interface HeroStaticRadialGradientVisualProps
  extends React.ComponentPropsWithoutRef<"div"> {
  desktopShaderProps?: Partial<StaticRadialGradientProps>
  desktopClassName?: string
}

export interface HeroStaticRadialGradientMobileVisualProps
  extends React.ComponentPropsWithoutRef<"div"> {
  mobileShaderProps?: Partial<StaticRadialGradientProps>
}

export interface HeroStaticRadialGradientProps
  extends HeroStaticRadialGradientRootProps {
  containerClassName?: string
  contentClassName?: string
  headingWrapClassName?: string
  headingClassName?: string
  descriptionWrapClassName?: string
  descriptionClassName?: string
  ctaWrapClassName?: string
  badgesWrapClassName?: string
  visualClassName?: string
  mobileVisualClassName?: string
}

interface HeroStaticRadialGradientContextValue {
  srTitle: string
  title: React.ReactNode
  subtitle: React.ReactNode
  description: React.ReactNode
  showCta: boolean
  mergedCtaProps: HeroStaticRadialGradientCTAProps
  renderCta?: (defaultCta: React.ReactNode) => React.ReactNode
  showBadges: boolean
  techStack: HeroStaticRadialGradientTechItem[]
  renderBadge?: HeroStaticRadialGradientBadgesProps["renderBadge"]
  mergedDesktopShaderProps: Partial<StaticRadialGradientProps>
  mergedMobileShaderProps: Partial<StaticRadialGradientProps>
}

const defaultDesktopShaderProps: Partial<StaticRadialGradientProps> = {
  width: 1280,
  height: 720,
  colors: ["#ed40b3", "#adfa1e", "#6ef7cc"],
  colorBack: "#ffffff00",
  radius: 0.98,
  focalDistance: 0,
  focalAngle: 0,
  falloff: 0.9,
  mixing: 0.7,
  distortion: 0,
  distortionShift: 0,
  distortionFreq: 12,
  grainMixer: 1,
  grainOverlay: 0.5,
}

const defaultMobileShaderProps: Partial<StaticRadialGradientProps> = {
  colors: ["#ed40b3", "#adfa1e", "#6ef7cc"],
  colorBack: "#ffffff00",
  radius: 0.98,
  focalDistance: 0,
  focalAngle: 0,
  falloff: 0.9,
  mixing: 0.7,
  distortion: 0,
  distortionShift: 0,
  distortionFreq: 12,
  grainMixer: 1,
  grainOverlay: 0.5,
  style: { height: "100%", width: "100%" },
}

const defaultCtaProps: HeroStaticRadialGradientCTAProps = {
  label: "Check it out today ",
  href: "https://aisdkagents.com",
  target: "_blank",
  rel: "noopener noreferrer",
}

const defaultDescription = (
  <>
    Full-stack vercel ai sdk patterns for workflows, tool calling, and agent
    orchestration. Built with{" "}
    <span className="font-medium tracking-tight">ai sdk v6</span> and{" "}
    <span className="font-medium tracking-tight">shadcn/ui</span>.
    <span className="hidden sm:inline"> Headless, themable, practical.</span>
  </>
)

const defaultTechStack: HeroStaticRadialGradientTechItem[] = [
  {
    name: "Next.js",
    version: "v16",
    icon: NextjsIcon,
  },
  {
    name: "AI SDK",
    version: "v6",
    icon: AISDKIcon,
  },
]

const HeroStaticRadialGradientContext = React.createContext<
  HeroStaticRadialGradientContextValue | undefined
>(undefined)

function useHeroStaticRadialGradientContext() {
  const context = React.useContext(HeroStaticRadialGradientContext)
  if (!context) {
    throw new Error(
      "HeroStaticRadialGradient components must be used within HeroStaticRadialGradientRoot"
    )
  }
  return context
}

export function useHeroStaticRadialGradient() {
  return useHeroStaticRadialGradientContext()
}

export const HeroStaticRadialGradientRoot = React.forwardRef<
  HTMLElement,
  HeroStaticRadialGradientRootProps
>(({ className, children, srTitle = "AI SDK Agents", title = <span className="">
      AI SDK Agents
    </span>, subtitle = "Copy and Paste", description = defaultDescription, showCta = true, ctaProps, renderCta, showBadges = true, techStack = defaultTechStack, renderBadge, desktopShaderProps, mobileShaderProps, ...props }, ref) => {
  const mergedCtaProps = React.useMemo(
    () => ({
      ...defaultCtaProps,
      ...ctaProps,
    }),
    [ctaProps]
  )

  const mergedDesktopShaderProps = React.useMemo(
    () => ({
      ...defaultDesktopShaderProps,
      ...desktopShaderProps,
    }),
    [desktopShaderProps]
  )

  const mergedMobileShaderProps = React.useMemo(
    () => ({
      ...defaultMobileShaderProps,
      ...mobileShaderProps,
      style: {
        ...(defaultMobileShaderProps.style as React.CSSProperties),
        ...(mobileShaderProps?.style as React.CSSProperties | undefined),
      },
    }),
    [mobileShaderProps]
  )

  const contextValue = React.useMemo<HeroStaticRadialGradientContextValue>(
    () => ({
      srTitle,
      title,
      subtitle,
      description,
      showCta,
      mergedCtaProps,
      renderCta,
      showBadges,
      techStack,
      renderBadge,
      mergedDesktopShaderProps,
      mergedMobileShaderProps,
    }),
    [
      srTitle,
      title,
      subtitle,
      description,
      showCta,
      mergedCtaProps,
      renderCta,
      showBadges,
      techStack,
      renderBadge,
      mergedDesktopShaderProps,
      mergedMobileShaderProps,
    ]
  )

  return (
    <HeroStaticRadialGradientContext.Provider value={contextValue}>
      <section
        className={cn("relative h-full w-full overflow-hidden", className)}
        data-slot="hero-static-radial-gradient-root"
        ref={ref}
        {...props}
      >
        <h1 className="sr-only">{srTitle}</h1>
        {children}
      </section>
    </HeroStaticRadialGradientContext.Provider>
  )
})
HeroStaticRadialGradientRoot.displayName = "HeroStaticRadialGradientRoot"

export function HeroStaticRadialGradientContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "container relative z-10 grid gap-6 pb-16 sm:gap-8 sm:pb-20 lg:grid-cols-[1fr_minmax(300px,500px)] lg:items-center lg:gap-12 lg:pb-24 xl:grid-cols-[1fr_1fr]",
        className
      )}
      data-slot="hero-static-radial-gradient-container"
      {...props}
    />
  )
}

export function HeroStaticRadialGradientContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-4 text-balance sm:gap-5 sm:px-4 md:px-8 lg:gap-6 lg:pr-0 lg:pl-4 xl:pl-8 2xl:pl-0",
        className
      )}
      data-slot="hero-static-radial-gradient-content"
      {...props}
    />
  )
}

export function HeroStaticRadialGradientHeading({
  className,
  title,
  subtitle,
  headingClassName,
  children,
  ...props
}: HeroStaticRadialGradientHeadingProps) {
  const context = useHeroStaticRadialGradientContext()
  const resolvedTitle = title ?? context.title
  const resolvedSubtitle = subtitle ?? context.subtitle

  return (
    <div
      className={cn("pt-4 text-center sm:pt-6 lg:pt-0 lg:text-left", className)}
      data-slot="hero-static-radial-gradient-heading-wrap"
      {...props}
    >
      {children ?? (
        <div className="relative">
          <h2
            className={cn(
              "relative mb-0 text-balance font-medium text-3xl tracking-[-0.04em] sm:text-4xl md:text-5xl lg:tracking-[-0.06em] xl:text-6xl 2xl:text-7xl",
              headingClassName
            )}
            data-slot="hero-static-radial-gradient-heading"
          >
            {resolvedTitle} <br />
            {resolvedSubtitle}
          </h2>
        </div>
      )}
    </div>
  )
}

export function HeroStaticRadialGradientDescription({
  className,
  description,
  descriptionClassName,
  children,
  ...props
}: HeroStaticRadialGradientDescriptionProps) {
  const context = useHeroStaticRadialGradientContext()
  const resolvedDescription = description ?? context.description

  return (
    <div
      className={cn(
        "mx-auto max-w-xl pb-2 text-center sm:pb-4 lg:mx-0 lg:max-w-none lg:pb-0 lg:text-left",
        className
      )}
      data-slot="hero-static-radial-gradient-description-wrap"
      {...props}
    >
      {children ?? (
        <p
          className={cn(
            "mt-0 mb-0 font-sans text-foreground/70 text-sm sm:text-base md:text-foreground/80 lg:text-lg xl:text-xl",
            descriptionClassName
          )}
          data-slot="hero-static-radial-gradient-description"
        >
          {resolvedDescription}
        </p>
      )}
    </div>
  )
}

export function HeroStaticRadialGradientActions({
  className,
  showCta,
  ctaProps,
  renderCta,
  children,
  ...props
}: HeroStaticRadialGradientActionsProps) {
  const context = useHeroStaticRadialGradientContext()
  const shouldShowCta = showCta ?? context.showCta
  const resolvedCtaProps = { ...context.mergedCtaProps, ...ctaProps }
  const resolvedRenderCta = renderCta ?? context.renderCta

  if (!shouldShowCta) {
    return null
  }

  const defaultCta = <HeroStaticRadialGradientCTA {...resolvedCtaProps} />

  return (
    <div
      className={cn("flex justify-center lg:justify-start", className)}
      data-slot="hero-static-radial-gradient-cta-wrap"
      {...props}
    >
      {children ??
        (resolvedRenderCta ? resolvedRenderCta(defaultCta) : defaultCta)}
    </div>
  )
}

export function HeroStaticRadialGradientCTA({
  label,
  href,
  target,
  rel,
  onClick,
  className,
  buttonClassName,
}: HeroStaticRadialGradientCTAProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 pb-4 md:pb-0",
        className
      )}
      data-slot="hero-static-radial-gradient-cta"
    >
      <Button asChild className={cn(buttonClassName)} size="lg">
        <a href={href} onClick={onClick} rel={rel} target={target}>
          {label}
        </a>
      </Button>
    </div>
  )
}

export function HeroStaticRadialGradientBadges({
  className,
  showBadges,
  techStack,
  renderBadge,
  ...props
}: HeroStaticRadialGradientBadgesProps) {
  const context = useHeroStaticRadialGradientContext()
  const shouldShowBadges = showBadges ?? context.showBadges
  const resolvedTechStack = techStack ?? context.techStack
  const resolvedRenderBadge = renderBadge ?? context.renderBadge

  if (!shouldShowBadges) {
    return null
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2.5",
        className
      )}
      data-slot="hero-static-radial-gradient-badges"
      {...props}
    >
      {resolvedTechStack.map((tech, index) => {
        const Icon = tech.icon
        const defaultBadge = (
          <Badge
            className={cn(
              "group relative px-3.5 py-1.5 font-medium transition-all duration-150",
              "border border-border/50 bg-card text-card-foreground",
              "shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]",
              "hover:-translate-y-px hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
            )}
            data-slot="hero-static-radial-gradient-badge"
            key={tech.name}
            variant="outline"
          >
            {Icon ? <Icon className="size-3.5 opacity-80 mr-1" /> : null}
            <span className="font-semibold tracking-tight">{tech.name}</span>
            {tech.version ? (
              <span className="font-mono text-xs opacity-50">
                {tech.version}
              </span>
            ) : null}
          </Badge>
        )

        if (resolvedRenderBadge) {
          return (
            <React.Fragment key={tech.name}>
              {resolvedRenderBadge(tech, index, defaultBadge)}
            </React.Fragment>
          )
        }

        return defaultBadge
      })}
    </div>
  )
}

export function HeroStaticRadialGradientVisual({
  className,
  desktopClassName,
  desktopShaderProps,
  ...props
}: HeroStaticRadialGradientVisualProps) {
  const context = useHeroStaticRadialGradientContext()
  const resolvedDesktopShaderProps = {
    ...context.mergedDesktopShaderProps,
    ...desktopShaderProps,
  }

  return (
    <div
      className={cn(
        "relative hidden h-[350px] lg:block lg:h-[400px] xl:h-[500px]",
        className
      )}
      data-slot="hero-static-radial-gradient-visual"
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center overflow-hidden rounded-full",
          desktopClassName
        )}
        data-slot="hero-static-radial-gradient-desktop"
      >
        <MemoizedStaticRadialGradient {...resolvedDesktopShaderProps} />
      </div>
    </div>
  )
}

export function HeroStaticRadialGradientMobileVisual({
  className,
  mobileShaderProps,
  ...props
}: HeroStaticRadialGradientMobileVisualProps) {
  const context = useHeroStaticRadialGradientContext()
  const resolvedMobileShaderProps = {
    ...context.mergedMobileShaderProps,
    ...mobileShaderProps,
    style: {
      ...(context.mergedMobileShaderProps.style as React.CSSProperties),
      ...(mobileShaderProps?.style as React.CSSProperties | undefined),
    },
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 -bottom-20 -z-10 h-[380px] overflow-hidden lg:hidden",
        className
      )}
      data-slot="hero-static-radial-gradient-mobile"
      {...props}
    >
      <div className="absolute inset-x-0 top-0 z-10 h-44 bg-gradient-to-b from-background via-background/90 to-transparent" />
      <MemoizedStaticRadialGradient {...resolvedMobileShaderProps} />
    </div>
  )
}

export function HeroStaticRadialGradient({
  containerClassName,
  contentClassName,
  headingWrapClassName,
  headingClassName,
  descriptionWrapClassName,
  descriptionClassName,
  ctaWrapClassName,
  badgesWrapClassName,
  visualClassName,
  mobileVisualClassName,
  ...props
}: HeroStaticRadialGradientProps) {
  return (
    <HeroStaticRadialGradientRoot {...props}>
      <HeroStaticRadialGradientContainer className={containerClassName}>
        <HeroStaticRadialGradientContent className={contentClassName}>
          <HeroStaticRadialGradientHeading
            className={headingWrapClassName}
            headingClassName={headingClassName}
          />
          <HeroStaticRadialGradientDescription
            className={descriptionWrapClassName}
            descriptionClassName={descriptionClassName}
          />
          <HeroStaticRadialGradientActions className={ctaWrapClassName} />
          <div
            className={cn(
              "flex justify-center lg:justify-start",
              badgesWrapClassName
            )}
            data-slot="hero-static-radial-gradient-badges-wrap"
          >
            <HeroStaticRadialGradientBadges />
          </div>
        </HeroStaticRadialGradientContent>
        <HeroStaticRadialGradientVisual className={visualClassName} />
      </HeroStaticRadialGradientContainer>
      <HeroStaticRadialGradientMobileVisual className={mobileVisualClassName} />
    </HeroStaticRadialGradientRoot>
  )
}

export function AISDKIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      color="currentcolor"
      data-testid="geist-icon"
      height="1em"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width="1em"
      {...props}
    >
      <title>AI SDK</title>
      <path
        d="M2.5.5V0h1v.5a2 2 0 002 2H6v1h-.5a2 2 0 00-2 2V6h-1v-.5a2 2 0 00-2-2H0v-1h.5a2 2 0 002-2zM14.5 4.5V5h-1v-.5a1 1 0 00-1-1H12v-1h.5a1 1 0 001-1V1h1v.5a1 1 0 001 1h.5v1h-.5a1 1 0 00-1 1zM8.407 4.93L8.5 4h1l.093.93a5 5 0 004.478 4.477L15 9.5v1l-.93.093a5 5 0 00-4.477 4.478L9.5 16h-1l-.093-.93a5 5 0 00-4.478-4.477L3 10.5v-1l.93-.093A5 5 0 008.406 4.93z"
        fill="currentColor"
      />
    </svg>
  )
}

export function NextjsIcon(props: SVGProps<SVGSVGElement>) {
  const id = React.useId()
  const maskId = `${id}-mask`
  const paint0Id = `${id}-paint0`
  const paint1Id = `${id}-paint1`

  return (
    <svg
      fill="none"
      height="1em"
      viewBox="0 0 180 180"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Next.js</title>
      <mask
        height={180}
        id={maskId}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "alpha",
        }}
        width={180}
        x={0}
        y={0}
      >
        <circle cx={90} cy={90} fill="black" r={90} />
      </mask>
      <g mask={`url(#${maskId})`}>
        <circle
          cx={90}
          cy={90}
          fill="black"
          r={87}
          stroke="white"
          strokeWidth={6}
        />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill={`url(#${paint0Id})`}
        />
        <rect
          fill={`url(#${paint1Id})`}
          height={72}
          width={12}
          x={115}
          y={54}
        />
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={paint0Id}
          x1={109}
          x2={144.5}
          y1={116.5}
          y2={160.5}
        >
          <stop stopColor="white" />
          <stop offset={1} stopColor="white" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={paint1Id}
          x1={121}
          x2={120.799}
          y1={54}
          y2={106.875}
        >
          <stop stopColor="white" />
          <stop offset={1} stopColor="white" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default HeroStaticRadialGradient
