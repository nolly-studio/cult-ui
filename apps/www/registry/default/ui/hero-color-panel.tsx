"use client"

import * as React from "react"
import type { SVGProps } from "react"
import { ColorPanels } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const MemoizedColorPanels = React.memo(ColorPanels)

type ColorPanelsProps = React.ComponentProps<typeof ColorPanels>
type ColorPanelsIcon = React.ComponentType<SVGProps<SVGSVGElement>>

export interface HeroColorPanelsTechItem {
  name: string
  version?: string
  icon?: ColorPanelsIcon
}

export interface HeroColorPanelsCTAProps {
  label: React.ReactNode
  href: string
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  className?: string
  buttonClassName?: string
}

export interface HeroColorPanelsRootProps
  extends Omit<React.ComponentPropsWithoutRef<"section">, "title"> {
  srTitle?: string
  title?: React.ReactNode
  subtitle?: React.ReactNode
  description?: React.ReactNode
  showCta?: boolean
  ctaProps?: Partial<HeroColorPanelsCTAProps>
  renderCta?: (defaultCta: React.ReactNode) => React.ReactNode
  showBadges?: boolean
  techStack?: HeroColorPanelsTechItem[]
  renderBadge?: (
    tech: HeroColorPanelsTechItem,
    index: number,
    defaultBadge: React.ReactNode
  ) => React.ReactNode
  desktopShaderProps?: Partial<ColorPanelsProps>
  mobileShaderProps?: Partial<ColorPanelsProps>
}

export interface HeroColorPanelsHeadingProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  headingClassName?: string
}

export interface HeroColorPanelsDescriptionProps
  extends React.ComponentPropsWithoutRef<"div"> {
  description?: React.ReactNode
  descriptionClassName?: string
}

export interface HeroColorPanelsActionsProps
  extends React.ComponentPropsWithoutRef<"div"> {
  showCta?: boolean
  ctaProps?: Partial<HeroColorPanelsCTAProps>
  renderCta?: (defaultCta: React.ReactNode) => React.ReactNode
}

export interface HeroColorPanelsBadgesProps
  extends React.ComponentPropsWithoutRef<"div"> {
  showBadges?: boolean
  techStack?: HeroColorPanelsTechItem[]
  renderBadge?: (
    tech: HeroColorPanelsTechItem,
    index: number,
    defaultBadge: React.ReactNode
  ) => React.ReactNode
}

export interface HeroColorPanelsVisualProps
  extends React.ComponentPropsWithoutRef<"div"> {
  desktopShaderProps?: Partial<ColorPanelsProps>
  desktopClassName?: string
}

export interface HeroColorPanelsMobileVisualProps
  extends React.ComponentPropsWithoutRef<"div"> {
  mobileShaderProps?: Partial<ColorPanelsProps>
}

export interface HeroColorPanelsProps extends HeroColorPanelsRootProps {
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

interface HeroColorPanelsContextValue {
  srTitle: string
  title: React.ReactNode
  subtitle: React.ReactNode
  description: React.ReactNode
  showCta: boolean
  mergedCtaProps: HeroColorPanelsCTAProps
  renderCta?: (defaultCta: React.ReactNode) => React.ReactNode
  showBadges: boolean
  techStack: HeroColorPanelsTechItem[]
  renderBadge?: HeroColorPanelsBadgesProps["renderBadge"]
  mergedDesktopShaderProps: Partial<ColorPanelsProps>
  mergedMobileShaderProps: Partial<ColorPanelsProps>
}

const defaultDesktopShaderProps: Partial<ColorPanelsProps> = {
  width: 1280,
  height: 720,
  colors: ["#ed40b3", "#6ef7cc", "#adfa1e", "#b054de"],
  colorBack: "#ffffff00",
  density: 5.03,
  angle1: 0.68,
  angle2: 0.28,
  length: 1.13,
  edges: true,
  blur: 0.25,
  fadeIn: 0.85,
  fadeOut: 0.3,
  gradient: 0.56,
  speed: 4,
  scale: 0.96,
  rotation: 180,
}

const defaultMobileShaderProps: Partial<ColorPanelsProps> = {
  colors: ["#ed40b3", "#6ef7cc", "#adfa1e", "#b054de"],
  colorBack: "#ffffff00",
  density: 5.03,
  angle1: 0.68,
  angle2: 0.28,
  length: 1.13,
  edges: true,
  blur: 0.25,
  fadeIn: 0.85,
  fadeOut: 0.3,
  gradient: 0.56,
  speed: 4,
  scale: 0.96,
  rotation: 180,
  style: { height: "100%", width: "100%" },
}

const defaultCtaProps: HeroColorPanelsCTAProps = {
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

const defaultTechStack: HeroColorPanelsTechItem[] = [
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

const HeroColorPanelsContext = React.createContext<
  HeroColorPanelsContextValue | undefined
>(undefined)

function useHeroColorPanelsContext() {
  const context = React.useContext(HeroColorPanelsContext)
  if (!context) {
    throw new Error(
      "HeroColorPanels components must be used within HeroColorPanelsRoot"
    )
  }
  return context
}

export function useHeroColorPanels() {
  return useHeroColorPanelsContext()
}

export const HeroColorPanelsRoot = React.forwardRef<
  HTMLElement,
  HeroColorPanelsRootProps
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

  const contextValue = React.useMemo<HeroColorPanelsContextValue>(
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
    <HeroColorPanelsContext.Provider value={contextValue}>
      <section
        className={cn("relative h-full w-full overflow-hidden", className)}
        data-slot="hero-colorpanels-root"
        ref={ref}
        {...props}
      >
        <h1 className="sr-only">{srTitle}</h1>
        {children}
      </section>
    </HeroColorPanelsContext.Provider>
  )
})
HeroColorPanelsRoot.displayName = "HeroColorPanelsRoot"

export function HeroColorPanelsContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "container relative z-10 grid gap-6 pb-16 sm:gap-8 sm:pb-20 lg:grid-cols-[1fr_minmax(300px,500px)] lg:items-center lg:gap-12 lg:pb-24 xl:grid-cols-[1fr_1fr]",
        className
      )}
      data-slot="hero-colorpanels-container"
      {...props}
    />
  )
}

export function HeroColorPanelsContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-4 text-balance sm:gap-5 sm:px-4 md:px-8 lg:gap-6 lg:pr-0 lg:pl-4 xl:pl-8 2xl:pl-0",
        className
      )}
      data-slot="hero-colorpanels-content"
      {...props}
    />
  )
}

export function HeroColorPanelsHeading({
  className,
  title,
  subtitle,
  headingClassName,
  children,
  ...props
}: HeroColorPanelsHeadingProps) {
  const context = useHeroColorPanelsContext()
  const resolvedTitle = title ?? context.title
  const resolvedSubtitle = subtitle ?? context.subtitle

  return (
    <div
      className={cn("pt-4 text-center sm:pt-6 lg:pt-0 lg:text-left", className)}
      data-slot="hero-colorpanels-heading-wrap"
      {...props}
    >
      {children ?? (
        <div className="relative">
          <h2
            className={cn(
              "relative mb-0 text-balance font-medium text-3xl tracking-[-0.04em] sm:text-4xl md:text-5xl lg:tracking-[-0.06em] xl:text-6xl 2xl:text-7xl",
              headingClassName
            )}
            data-slot="hero-colorpanels-heading"
          >
            {resolvedTitle} <br />
            {resolvedSubtitle}
          </h2>
        </div>
      )}
    </div>
  )
}

export function HeroColorPanelsDescription({
  className,
  description,
  descriptionClassName,
  children,
  ...props
}: HeroColorPanelsDescriptionProps) {
  const context = useHeroColorPanelsContext()
  const resolvedDescription = description ?? context.description

  return (
    <div
      className={cn(
        "mx-auto max-w-xl pb-2 text-center sm:pb-4 lg:mx-0 lg:max-w-none lg:pb-0 lg:text-left",
        className
      )}
      data-slot="hero-colorpanels-description-wrap"
      {...props}
    >
      {children ?? (
        <p
          className={cn(
            "mt-0 mb-0 font-sans text-foreground/70 text-sm sm:text-base md:text-foreground/80 lg:text-lg xl:text-xl",
            descriptionClassName
          )}
          data-slot="hero-colorpanels-description"
        >
          {resolvedDescription}
        </p>
      )}
    </div>
  )
}

export function HeroColorPanelsActions({
  className,
  showCta,
  ctaProps,
  renderCta,
  children,
  ...props
}: HeroColorPanelsActionsProps) {
  const context = useHeroColorPanelsContext()
  const shouldShowCta = showCta ?? context.showCta
  const resolvedCtaProps = { ...context.mergedCtaProps, ...ctaProps }
  const resolvedRenderCta = renderCta ?? context.renderCta

  if (!shouldShowCta) {
    return null
  }

  const defaultCta = <HeroColorPanelsCTA {...resolvedCtaProps} />

  return (
    <div
      className={cn("flex justify-center lg:justify-start", className)}
      data-slot="hero-colorpanels-cta-wrap"
      {...props}
    >
      {children ??
        (resolvedRenderCta ? resolvedRenderCta(defaultCta) : defaultCta)}
    </div>
  )
}

export function HeroColorPanelsCTA({
  label,
  href,
  target,
  rel,
  onClick,
  className,
  buttonClassName,
}: HeroColorPanelsCTAProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 pb-4 md:pb-0",
        className
      )}
      data-slot="hero-colorpanels-cta"
    >
      <Button asChild className={cn(buttonClassName)} size="lg">
        <a href={href} onClick={onClick} rel={rel} target={target}>
          {label}
        </a>
      </Button>
    </div>
  )
}

export function HeroColorPanelsBadges({
  className,
  showBadges,
  techStack,
  renderBadge,
  ...props
}: HeroColorPanelsBadgesProps) {
  const context = useHeroColorPanelsContext()
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
      data-slot="hero-colorpanels-badges"
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
            data-slot="hero-colorpanels-badge"
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

export function HeroColorPanelsVisual({
  className,
  desktopClassName,
  desktopShaderProps,
  ...props
}: HeroColorPanelsVisualProps) {
  const context = useHeroColorPanelsContext()
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
      data-slot="hero-colorpanels-visual"
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center overflow-hidden rounded-full",
          desktopClassName
        )}
        data-slot="hero-colorpanels-desktop"
      >
        <MemoizedColorPanels {...resolvedDesktopShaderProps} />
      </div>
    </div>
  )
}

export function HeroColorPanelsMobileVisual({
  className,
  mobileShaderProps,
  ...props
}: HeroColorPanelsMobileVisualProps) {
  const context = useHeroColorPanelsContext()
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
      data-slot="hero-colorpanels-mobile"
      {...props}
    >
      <div className="absolute inset-x-0 top-0 z-10 h-44 bg-gradient-to-b from-background via-background/90 to-transparent" />
      <MemoizedColorPanels {...resolvedMobileShaderProps} />
    </div>
  )
}

export function HeroColorPanels({
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
}: HeroColorPanelsProps) {
  return (
    <HeroColorPanelsRoot {...props}>
      <HeroColorPanelsContainer className={containerClassName}>
        <HeroColorPanelsContent className={contentClassName}>
          <HeroColorPanelsHeading
            className={headingWrapClassName}
            headingClassName={headingClassName}
          />
          <HeroColorPanelsDescription
            className={descriptionWrapClassName}
            descriptionClassName={descriptionClassName}
          />
          <HeroColorPanelsActions className={ctaWrapClassName} />
          <div
            className={cn(
              "flex justify-center lg:justify-start",
              badgesWrapClassName
            )}
            data-slot="hero-colorpanels-badges-wrap"
          >
            <HeroColorPanelsBadges />
          </div>
        </HeroColorPanelsContent>
        <HeroColorPanelsVisual className={visualClassName} />
      </HeroColorPanelsContainer>
      <HeroColorPanelsMobileVisual className={mobileVisualClassName} />
    </HeroColorPanelsRoot>
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

export default HeroColorPanels
