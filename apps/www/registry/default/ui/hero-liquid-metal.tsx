"use client"

import * as React from "react"
import type { SVGProps } from "react"
import { LiquidMetal } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const MemoizedLiquidMetal = React.memo(LiquidMetal)

type LiquidMetalProps = React.ComponentProps<typeof LiquidMetal>
type LiquidMetalIcon = React.ComponentType<SVGProps<SVGSVGElement>>

export interface HeroLiquidMetalTechItem {
  name: string
  version?: string
  icon?: LiquidMetalIcon
}

export interface HeroLiquidMetalCTAProps {
  label: React.ReactNode
  href: string
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  className?: string
  buttonClassName?: string
}

/** LiquidMetal shader props that can be passed at the root for convenience */
export type HeroLiquidMetalShaderOverrides = Partial<
  Pick<
    LiquidMetalProps,
    | "width"
    | "height"
    | "image"
    | "colorBack"
    | "colorTint"
    | "shape"
    | "repetition"
    | "softness"
    | "shiftRed"
    | "shiftBlue"
    | "distortion"
    | "contour"
    | "angle"
    | "speed"
    | "frame"
    | "scale"
    | "rotation"
    | "offsetX"
    | "offsetY"
    | "fit"
    | "originX"
    | "originY"
    | "minPixelRatio"
    | "maxPixelCount"
  >
>

export interface HeroLiquidMetalRootProps
  extends Omit<React.ComponentPropsWithoutRef<"section">, "title">,
    HeroLiquidMetalShaderOverrides {
  srTitle?: string
  title?: React.ReactNode
  subtitle?: React.ReactNode
  description?: React.ReactNode
  showCta?: boolean
  ctaProps?: Partial<HeroLiquidMetalCTAProps>
  renderCta?: (defaultCta: React.ReactNode) => React.ReactNode
  showBadges?: boolean
  techStack?: HeroLiquidMetalTechItem[]
  renderBadge?: (
    tech: HeroLiquidMetalTechItem,
    index: number,
    defaultBadge: React.ReactNode
  ) => React.ReactNode
  desktopShaderProps?: Partial<LiquidMetalProps>
  mobileShaderProps?: Partial<LiquidMetalProps>
}

export interface HeroLiquidMetalHeadingProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  headingClassName?: string
}

export interface HeroLiquidMetalDescriptionProps
  extends React.ComponentPropsWithoutRef<"div"> {
  description?: React.ReactNode
  descriptionClassName?: string
}

export interface HeroLiquidMetalActionsProps
  extends React.ComponentPropsWithoutRef<"div"> {
  showCta?: boolean
  ctaProps?: Partial<HeroLiquidMetalCTAProps>
  renderCta?: (defaultCta: React.ReactNode) => React.ReactNode
}

export interface HeroLiquidMetalBadgesProps
  extends React.ComponentPropsWithoutRef<"div"> {
  showBadges?: boolean
  techStack?: HeroLiquidMetalTechItem[]
  renderBadge?: (
    tech: HeroLiquidMetalTechItem,
    index: number,
    defaultBadge: React.ReactNode
  ) => React.ReactNode
}

export interface HeroLiquidMetalVisualProps
  extends React.ComponentPropsWithoutRef<"div"> {
  desktopShaderProps?: Partial<LiquidMetalProps>
  desktopClassName?: string
}

export interface HeroLiquidMetalMobileVisualProps
  extends React.ComponentPropsWithoutRef<"div"> {
  mobileShaderProps?: Partial<LiquidMetalProps>
}

export interface HeroLiquidMetalProps extends HeroLiquidMetalRootProps {
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

interface HeroLiquidMetalContextValue {
  srTitle: string
  title: React.ReactNode
  subtitle: React.ReactNode
  description: React.ReactNode
  showCta: boolean
  mergedCtaProps: HeroLiquidMetalCTAProps
  renderCta?: (defaultCta: React.ReactNode) => React.ReactNode
  showBadges: boolean
  techStack: HeroLiquidMetalTechItem[]
  renderBadge?: HeroLiquidMetalBadgesProps["renderBadge"]
  mergedDesktopShaderProps: Partial<LiquidMetalProps>
  mergedMobileShaderProps: Partial<LiquidMetalProps>
}

const defaultDesktopShaderProps: Partial<LiquidMetalProps> = {
  width: 1280,
  height: 720,
  image: "/cult-icon.svg",
  colorBack: "#ffffff00",
  colorTint: "#2c5d72",
  shape: undefined,
  repetition: 6,
  softness: 0.8,
  shiftRed: 1,
  shiftBlue: -1,
  distortion: 0.4,
  contour: 0.4,
  angle: 0,
  speed: 1,
  scale: 0.6,
  fit: "contain",
}

const defaultMobileShaderProps: Partial<LiquidMetalProps> = {
  image: "/cult-icon.svg",
  colorBack: "#ffffff00",
  colorTint: "#2c5d72",
  shape: undefined,
  repetition: 6,
  softness: 0.8,
  shiftRed: 1,
  shiftBlue: -1,
  distortion: 0.4,
  contour: 0.4,
  angle: 0,
  speed: 1,
  scale: 0.68,
  fit: "contain",
  style: { height: "100%", width: "100%" },
}

const defaultCtaProps: HeroLiquidMetalCTAProps = {
  label: "Check it out today",
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

const defaultTechStack: HeroLiquidMetalTechItem[] = [
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

const HeroLiquidMetalContext = React.createContext<
  HeroLiquidMetalContextValue | undefined
>(undefined)

function useHeroLiquidMetalContext() {
  const context = React.useContext(HeroLiquidMetalContext)
  if (!context) {
    throw new Error(
      "HeroLiquidMetal components must be used within HeroLiquidMetalRoot"
    )
  }
  return context
}

export function useHeroLiquidMetal() {
  return useHeroLiquidMetalContext()
}

export const HeroLiquidMetalRoot = React.forwardRef<
  HTMLElement,
  HeroLiquidMetalRootProps
>(({ className, children, srTitle = "AI SDK Agents", title = <span className="">
      AI SDK Agents
    </span>, subtitle = "Copy and Paste", description = defaultDescription, showCta = true, ctaProps, renderCta, showBadges = true, techStack = defaultTechStack, renderBadge, desktopShaderProps, mobileShaderProps, width, height, image, colorBack, colorTint, shape, repetition, softness, shiftRed, shiftBlue, distortion, contour, angle, speed, frame, scale, rotation, offsetX, offsetY, fit, originX, originY, minPixelRatio, maxPixelCount, ...props }, ref) => {
  const mergedCtaProps = React.useMemo(
    () => ({
      ...defaultCtaProps,
      ...ctaProps,
    }),
    [ctaProps]
  )

  const shaderOverrides = React.useMemo((): Partial<LiquidMetalProps> => {
    const overrides: Partial<LiquidMetalProps> = {}
    if (width !== undefined) overrides.width = width
    if (height !== undefined) overrides.height = height
    if (image !== undefined) overrides.image = image
    if (colorBack !== undefined) overrides.colorBack = colorBack
    if (colorTint !== undefined) overrides.colorTint = colorTint
    if (shape !== undefined) overrides.shape = shape
    if (repetition !== undefined) overrides.repetition = repetition
    if (softness !== undefined) overrides.softness = softness
    if (shiftRed !== undefined) overrides.shiftRed = shiftRed
    if (shiftBlue !== undefined) overrides.shiftBlue = shiftBlue
    if (distortion !== undefined) overrides.distortion = distortion
    if (contour !== undefined) overrides.contour = contour
    if (angle !== undefined) overrides.angle = angle
    if (speed !== undefined) overrides.speed = speed
    if (frame !== undefined) overrides.frame = frame
    if (scale !== undefined) overrides.scale = scale
    if (rotation !== undefined) overrides.rotation = rotation
    if (offsetX !== undefined) overrides.offsetX = offsetX
    if (offsetY !== undefined) overrides.offsetY = offsetY
    if (fit !== undefined) overrides.fit = fit
    if (originX !== undefined) overrides.originX = originX
    if (originY !== undefined) overrides.originY = originY
    if (minPixelRatio !== undefined) overrides.minPixelRatio = minPixelRatio
    if (maxPixelCount !== undefined) overrides.maxPixelCount = maxPixelCount
    return overrides
  }, [
    width,
    height,
    image,
    colorBack,
    colorTint,
    shape,
    repetition,
    softness,
    shiftRed,
    shiftBlue,
    distortion,
    contour,
    angle,
    speed,
    frame,
    scale,
    rotation,
    offsetX,
    offsetY,
    fit,
    originX,
    originY,
    minPixelRatio,
    maxPixelCount,
  ])

  const mergedDesktopShaderProps = React.useMemo(
    () => ({
      ...defaultDesktopShaderProps,
      ...shaderOverrides,
      ...desktopShaderProps,
    }),
    [shaderOverrides, desktopShaderProps]
  )

  const mergedMobileShaderProps = React.useMemo(
    () => ({
      ...defaultMobileShaderProps,
      ...shaderOverrides,
      ...mobileShaderProps,
      style: {
        ...(defaultMobileShaderProps.style as React.CSSProperties),
        ...(mobileShaderProps?.style as React.CSSProperties | undefined),
      },
    }),
    [shaderOverrides, mobileShaderProps]
  )

  const contextValue = React.useMemo<HeroLiquidMetalContextValue>(
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
    <HeroLiquidMetalContext.Provider value={contextValue}>
      <section
        className={cn("relative h-full w-full overflow-hidden", className)}
        data-slot="hero-liquid-metal-root"
        ref={ref}
        {...props}
      >
        <h1 className="sr-only">{srTitle}</h1>
        {children}
      </section>
    </HeroLiquidMetalContext.Provider>
  )
})
HeroLiquidMetalRoot.displayName = "HeroLiquidMetalRoot"

export function HeroLiquidMetalContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "container relative z-10 grid gap-6 pb-16 sm:gap-8 sm:pb-20 lg:grid-cols-[1fr_minmax(300px,500px)] lg:items-center lg:gap-12 lg:pb-24 xl:grid-cols-[1fr_1fr]",
        className
      )}
      data-slot="hero-liquid-metal-container"
      {...props}
    />
  )
}

export function HeroLiquidMetalContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-4 text-balance sm:gap-5 sm:px-4 md:px-8 lg:gap-6 lg:pr-0 lg:pl-4 xl:pl-8 2xl:pl-0",
        className
      )}
      data-slot="hero-liquid-metal-content"
      {...props}
    />
  )
}

export function HeroLiquidMetalHeading({
  className,
  title,
  subtitle,
  headingClassName,
  children,
  ...props
}: HeroLiquidMetalHeadingProps) {
  const context = useHeroLiquidMetalContext()
  const resolvedTitle = title ?? context.title
  const resolvedSubtitle = subtitle ?? context.subtitle

  return (
    <div
      className={cn("pt-4 text-center sm:pt-6 lg:pt-0 lg:text-left", className)}
      data-slot="hero-liquid-metal-heading-wrap"
      {...props}
    >
      {children ?? (
        <div className="relative">
          <h2
            className={cn(
              "relative mb-0 text-balance font-medium  text-3xl tracking-[-0.04em] sm:text-4xl md:text-5xl lg:tracking-[-0.06em] xl:text-6xl 2xl:text-7xl",
              headingClassName
            )}
            data-slot="hero-liquid-metal-heading"
          >
            {resolvedTitle} <br />
            {resolvedSubtitle}
          </h2>
        </div>
      )}
    </div>
  )
}

export function HeroLiquidMetalDescription({
  className,
  description,
  descriptionClassName,
  children,
  ...props
}: HeroLiquidMetalDescriptionProps) {
  const context = useHeroLiquidMetalContext()
  const resolvedDescription = description ?? context.description

  return (
    <div
      className={cn(
        "mx-auto max-w-xl pb-2 text-center sm:pb-4 lg:mx-0 lg:max-w-none lg:pb-0 lg:text-left",
        className
      )}
      data-slot="hero-liquid-metal-description-wrap"
      {...props}
    >
      {children ?? (
        <p
          className={cn(
            "mt-0 mb-0 font-sans text-foreground/70 text-sm sm:text-base md:text-foreground/80 lg:text-lg xl:text-xl",
            descriptionClassName
          )}
          data-slot="hero-liquid-metal-description"
        >
          {resolvedDescription}
        </p>
      )}
    </div>
  )
}

export function HeroLiquidMetalActions({
  className,
  showCta,
  ctaProps,
  renderCta,
  children,
  ...props
}: HeroLiquidMetalActionsProps) {
  const context = useHeroLiquidMetalContext()
  const shouldShowCta = showCta ?? context.showCta
  const resolvedCtaProps = { ...context.mergedCtaProps, ...ctaProps }
  const resolvedRenderCta = renderCta ?? context.renderCta

  if (!shouldShowCta) {
    return null
  }

  const defaultCta = <HeroLiquidMetalCTA {...resolvedCtaProps} />

  return (
    <div
      className={cn("flex justify-center lg:justify-start", className)}
      data-slot="hero-liquid-metal-cta-wrap"
      {...props}
    >
      {children ??
        (resolvedRenderCta ? resolvedRenderCta(defaultCta) : defaultCta)}
    </div>
  )
}

export function HeroLiquidMetalCTA({
  label,
  href,
  target,
  rel,
  onClick,
  className,
  buttonClassName,
}: HeroLiquidMetalCTAProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 pb-4 md:pb-0",
        className
      )}
      data-slot="hero-liquid-metal-cta"
    >
      <Button asChild className={cn("", buttonClassName)} size="lg">
        <a href={href} onClick={onClick} rel={rel} target={target}>
          {label}
        </a>
      </Button>
    </div>
  )
}

export function HeroLiquidMetalBadges({
  className,
  showBadges,
  techStack,
  renderBadge,
  ...props
}: HeroLiquidMetalBadgesProps) {
  const context = useHeroLiquidMetalContext()
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
      data-slot="hero-liquid-metal-badges"
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
            data-slot="hero-liquid-metal-badge"
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

export function HeroLiquidMetalVisual({
  className,
  desktopClassName,
  desktopShaderProps,
  ...props
}: HeroLiquidMetalVisualProps) {
  const context = useHeroLiquidMetalContext()
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
      data-slot="hero-liquid-metal-visual"
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center overflow-hidden rounded-full",
          desktopClassName
        )}
        data-slot="hero-liquid-metal-desktop"
      >
        <MemoizedLiquidMetal
          {...resolvedDesktopShaderProps}
          image={
            resolvedDesktopShaderProps.image ??
            (defaultDesktopShaderProps.image as string)
          }
        />
      </div>
    </div>
  )
}

export function HeroLiquidMetalMobileVisual({
  className,
  mobileShaderProps,
  ...props
}: HeroLiquidMetalMobileVisualProps) {
  const context = useHeroLiquidMetalContext()
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
        "pointer-events-none absolute inset-x-0 -bottom-24 -z-10 h-[360px] overflow-hidden lg:hidden",
        className
      )}
      data-slot="hero-liquid-metal-mobile"
      {...props}
    >
      <div className="absolute inset-x-0 top-0 z-10 h-56 bg-gradient-to-b from-background via-background/95 to-transparent" />
      <MemoizedLiquidMetal
        {...resolvedMobileShaderProps}
        image={
          resolvedMobileShaderProps.image ??
          (defaultMobileShaderProps.image as string)
        }
      />
    </div>
  )
}

export function HeroLiquidMetal({
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
}: HeroLiquidMetalProps) {
  return (
    <HeroLiquidMetalRoot {...props}>
      <HeroLiquidMetalContainer className={containerClassName}>
        <HeroLiquidMetalContent className={contentClassName}>
          <HeroLiquidMetalHeading
            className={headingWrapClassName}
            headingClassName={headingClassName}
          />
          <HeroLiquidMetalDescription
            className={descriptionWrapClassName}
            descriptionClassName={descriptionClassName}
          />
          <HeroLiquidMetalActions className={ctaWrapClassName} />
          <div
            className={cn(
              "hidden lg:flex justify-center lg:justify-start",
              badgesWrapClassName
            )}
            data-slot="hero-liquid-metal-badges-wrap"
          >
            <HeroLiquidMetalBadges />
          </div>
        </HeroLiquidMetalContent>
        <HeroLiquidMetalVisual className={visualClassName} />
      </HeroLiquidMetalContainer>
      <HeroLiquidMetalMobileVisual className={mobileVisualClassName} />
    </HeroLiquidMetalRoot>
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

export default HeroLiquidMetal
