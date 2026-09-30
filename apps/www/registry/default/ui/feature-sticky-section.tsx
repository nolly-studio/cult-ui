"use client"

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  type ReactNode,
} from "react"
import NextImage from "next/image"
import { Slot } from "@radix-ui/react-slot"
import { useControllableState } from "@radix-ui/react-use-controllable-state"

import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------
 * Context
 * ----------------------------------------------------------------------- */

interface StickySectionContextValue {
  activeIndex: number
  registerPanel: (index: number, el: HTMLElement | null) => void
  unregisterPanel: (index: number) => void
  scrollToPanel: (index: number) => void
}

const StickySectionContext = createContext<StickySectionContextValue | null>(
  null
)

function useStickySection() {
  const ctx = useContext(StickySectionContext)
  if (!ctx) {
    throw new Error(
      "StickySection components must be used within StickySection.Root"
    )
  }
  return ctx
}

/* -------------------------------------------------------------------------
 * Root
 * ----------------------------------------------------------------------- */

export interface StickySectionRootProps
  extends Omit<ComponentPropsWithoutRef<"div">, "defaultValue" | "onChange"> {
  /** Controlled active index */
  value?: number
  /** Uncontrolled default active index */
  defaultValue?: number
  /** Callback when active index changes */
  onValueChange?: (value: number) => void
  /** Merge props onto child element instead of rendering a div */
  asChild?: boolean
}

const Root = ({
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  asChild = false,
  children,
  ...props
}: StickySectionRootProps) => {
  const [activeIndex, setActiveIndex] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  const panelRefs = useRef<Map<number, HTMLElement>>(new Map())
  const isClickScrolling = useRef(false)
  const ratioMap = useRef<Map<number, number>>(new Map())

  const registerPanel = useCallback((index: number, el: HTMLElement | null) => {
    if (el) {
      panelRefs.current.set(index, el)
    } else {
      panelRefs.current.delete(index)
    }
  }, [])

  const unregisterPanel = useCallback((index: number) => {
    panelRefs.current.delete(index)
  }, [])

  const scrollToPanel = useCallback(
    (index: number) => {
      setActiveIndex(index)
      isClickScrolling.current = true
      const target = panelRefs.current.get(index)
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
        setTimeout(() => {
          isClickScrolling.current = false
        }, 800)
      }
    },
    [setActiveIndex]
  )

  useEffect(() => {
    const refs = Array.from(panelRefs.current.entries())
      .sort(([a], [b]) => a - b)
      .map(([, el]) => el)
      .filter(Boolean)

    if (refs.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) {
          return
        }

        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.index)
          if (!Number.isNaN(index)) {
            ratioMap.current.set(index, entry.intersectionRatio)
          }
        }

        let bestIndex = 0
        let bestRatio = -1
        for (const [idx, ratio] of ratioMap.current) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestIndex = idx
          }
        }

        if (bestRatio > 0) {
          setActiveIndex(bestIndex)
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    )

    for (const ref of refs) {
      observer.observe(ref)
    }
    return () => observer.disconnect()
  }, [setActiveIndex])

  const contextValue: StickySectionContextValue = {
    activeIndex,
    registerPanel,
    unregisterPanel,
    scrollToPanel,
  }

  const Comp = asChild ? Slot : "div"

  return (
    <StickySectionContext.Provider value={contextValue}>
      <Comp data-slot="sticky-section-root" {...props}>
        {children}
      </Comp>
    </StickySectionContext.Provider>
  )
}

/* -------------------------------------------------------------------------
 * List
 * ----------------------------------------------------------------------- */

export interface StickySectionListProps extends ComponentPropsWithoutRef<"ul"> {
  asChild?: boolean
}

const List = ({
  asChild = false,
  children,
  ...props
}: StickySectionListProps) => {
  const Comp = asChild ? Slot : "ul"
  return (
    <Comp data-slot="sticky-section-list" {...props}>
      {children}
    </Comp>
  )
}

/* -------------------------------------------------------------------------
 * Item
 * ----------------------------------------------------------------------- */

export interface StickySectionItemProps extends ComponentPropsWithoutRef<"li"> {
  /** Index of the panel this item corresponds to */
  index: number
  asChild?: boolean
}

const Item = ({
  index,
  asChild = false,
  children,
  ...props
}: StickySectionItemProps) => {
  const { activeIndex } = useStickySection()
  const Comp = asChild ? Slot : "li"

  return (
    <Comp
      data-slot="sticky-section-item"
      data-state={activeIndex === index ? "active" : "inactive"}
      {...props}
    >
      {children}
    </Comp>
  )
}

/* -------------------------------------------------------------------------
 * Trigger
 * ----------------------------------------------------------------------- */

export interface StickySectionTriggerProps
  extends ComponentPropsWithoutRef<"button"> {
  /** Index of the panel to scroll to when clicked */
  index: number
  asChild?: boolean
}

const Trigger = (
  {
    index,
    asChild = false,
    onClick,
    children,
    ...props
  }: StickySectionTriggerProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const { activeIndex, scrollToPanel } = useStickySection()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    scrollToPanel(index)
    onClick?.(e)
  }

  const triggerProps = {
    "data-slot": "sticky-section-trigger",
    "data-state": activeIndex === index ? "active" : "inactive",
    "aria-current": activeIndex === index ? ("true" as const) : undefined,
    type: "button" as const,
    onClick: handleClick,
  }

  if (asChild) {
    return (
      <Slot ref={ref} {...triggerProps} {...props}>
        {children}
      </Slot>
    )
  }

  return (
    <button ref={ref} {...triggerProps} {...props}>
      {children}
    </button>
  )
}

const TriggerWithRef = forwardRef(Trigger)

/* -------------------------------------------------------------------------
 * Content
 * ----------------------------------------------------------------------- */

export interface StickySectionContentProps
  extends ComponentPropsWithoutRef<"div"> {
  asChild?: boolean
}

const Content = ({
  asChild = false,
  children,
  ...props
}: StickySectionContentProps) => {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp data-slot="sticky-section-content" {...props}>
      {children}
    </Comp>
  )
}

/* -------------------------------------------------------------------------
 * Panel
 * ----------------------------------------------------------------------- */

export interface StickySectionPanelProps
  extends ComponentPropsWithoutRef<"div"> {
  /** Index of this panel for intersection tracking */
  index: number
  asChild?: boolean
}

const Panel = (
  { index, asChild = false, children, ...props }: StickySectionPanelProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
) => {
  const { registerPanel, unregisterPanel } = useStickySection()

  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      registerPanel(index, el)
      if (typeof forwardedRef === "function") {
        forwardedRef(el)
      } else if (forwardedRef) {
        forwardedRef.current = el
      }
    },
    [index, registerPanel, forwardedRef]
  )

  useEffect(() => {
    return () => unregisterPanel(index)
  }, [index, unregisterPanel])

  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-index={index}
      data-slot="sticky-section-panel"
      ref={setRef}
      {...props}
    >
      {children}
    </Comp>
  )
}

const PanelWithRef = forwardRef(Panel)

/* -------------------------------------------------------------------------
 * Wrapper
 * ----------------------------------------------------------------------- */

export interface StickySectionWrapperProps
  extends ComponentPropsWithoutRef<"div"> {}

const Wrapper = ({
  className,
  children,
  ...props
}: StickySectionWrapperProps) => (
  <div
    className={cn(
      "relative mx-auto max-w-[calc(-2rem+100vw)] overflow-x-clip border-border border-x",
      className
    )}
    {...props}
  >
    {children}
  </div>
)

/* -------------------------------------------------------------------------
 * Namespace export
 * ----------------------------------------------------------------------- */

export const StickySection = {
  Root,
  List,
  Item,
  Trigger: TriggerWithRef,
  Content,
  Panel: PanelWithRef,
  Wrapper,
}

/* -------------------------------------------------------------------------
 * OSSSection - Styled composition example
 * ----------------------------------------------------------------------- */

export interface OSSProject {
  id: string
  name: string
  tagline: string
  description: string
  stars: string
  contributors: string
  exploreUrl: string
  image: string
  icon: ReactNode
}

export interface OSSSectionProps {
  /** Project items to display. Defaults to Vite, Vitest, Rolldown, Oxc. */
  projects?: OSSProject[]
}

function ViteIcon({ className }: { className?: string }) {
  const baseId = useId().replaceAll(":", "")
  const gradientAId = `${baseId}-vite-a`
  const gradientBId = `${baseId}-vite-b`

  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 24 24">
      <title>Vite</title>
      <path
        d="M21.805 2.472L12.36 21.1a.4.4 0 01-.72.002L2.197 2.474a.4.4 0 01.44-.575l9.28 1.8a.4.4 0 00.153 0l9.293-1.8a.4.4 0 01.442.573z"
        fill={`url(#${gradientAId})`}
      />
      <path
        d="M16.326.06L9.3 1.43a.2.2 0 00-.16.186l-.895 9.94a.2.2 0 00.243.213l2.73-.595a.2.2 0 01.24.246l-.81 3.97a.2.2 0 00.248.24l1.687-.435a.2.2 0 01.248.24l-1.29 6.3c-.046.222.249.334.37.14L12.148 22l5.98-12.12a.2.2 0 00-.214-.283l-2.8.55a.2.2 0 01-.233-.258l1.68-7.6a.2.2 0 00-.234-.258z"
        fill={`url(#${gradientBId})`}
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={gradientAId}
          x1="1.646"
          x2="13.337"
          y1="1.384"
          y2="18.28"
        >
          <stop stopColor="#41D1FF" />
          <stop offset="1" stopColor="#BD34FE" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={gradientBId}
          x1="10.146"
          x2="13.146"
          y1="0"
          y2="15.18"
        >
          <stop stopColor="#FFBD4F" />
          <stop offset="1" stopColor="#FF9922" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function VitestIcon({ className }: { className?: string }) {
  const baseId = useId().replaceAll(":", "")
  const gradientAId = `${baseId}-vitest-a`

  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 24 24">
      <title>Vitest</title>
      <path d="M5.4 18.6L12 22.8l6.6-4.2L12 3 5.4 18.6z" fill="#FCC72B" />
      <path
        d="M12 3l6.6 15.6L12 22.8 5.4 18.6 12 3z"
        fill={`url(#${gradientAId})`}
      />
      <path d="M6 17.4l4.2-8.1 3 5.1-1.5 2.1L6 17.4z" fill="#22c55e" />
      <path
        d="M18 17.4l-4.2-8.1-3 5.1 1.5 2.1L18 17.4z"
        fill="#22c55e"
        opacity="0.7"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={gradientAId}
          x1="5.4"
          x2="18.6"
          y1="3"
          y2="22.8"
        >
          <stop stopColor="#41D1FF" />
          <stop offset="1" stopColor="#22c55e" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function RolldownIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 24 24">
      <title>Rolldown</title>
      <circle cx="12" cy="12" fill="#f59e0b" r="10" />
      <path
        d="M8 8h8v2H8V8zm0 3h8v2H8v-2zm0 3h5v2H8v-2z"
        fill="#1a1a1a"
        opacity="0.8"
      />
    </svg>
  )
}

function OxcIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="none" viewBox="0 0 24 24">
      <title>Oxc</title>
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#32f3e9" />
      <path
        d="M12 4.5L5.5 8v8l6.5 3.5L18.5 16V8L12 4.5z"
        fill="#1a1a1a"
        opacity="0.3"
      />
    </svg>
  )
}

export const defaultOSSSectionProjects: OSSProject[] = [
  {
    id: "vite",
    name: "Vite",
    tagline: "The build tool for the web",
    description:
      "Vite is the default choice for single-page web applications and the foundation for fullstack frameworks like TanStack Start, Nuxt, SvelteKit and more.",
    stars: "78.3k",
    contributors: "1,235",
    exploreUrl: "https://vite.dev",
    image: "/images/vite-terminal.jpg",
    icon: <ViteIcon className="size-6" />,
  },
  {
    id: "vitest",
    name: "Vitest",
    tagline: "The next-generation test runner",
    description:
      "Vitest is a feature-rich test runner that understands your Vite config, is Jest-compatible, and works out-of-the-box with TypeScript & ESM.",
    stars: "16.0k",
    contributors: "713",
    exploreUrl: "https://vitest.dev",
    image: "/images/vitest-terminal.jpg",
    icon: <VitestIcon className="size-6" />,
  },
  {
    id: "rolldown",
    name: "Rolldown",
    tagline: "The blazing fast JavaScript bundler",
    description:
      "Rolldown is a Rust-based bundler with Rollup-compatible API, and esbuild-equivalent performance & feature set. It also powers Vite version 8 and above.",
    stars: "12.9k",
    contributors: "152",
    exploreUrl: "https://rolldown.rs",
    image: "/images/rolldown-terminal.jpg",
    icon: <RolldownIcon className="size-6" />,
  },
  {
    id: "oxc",
    name: "Oxc",
    tagline: "The fastest JavaScript language toolchain",
    description:
      "Oxc is the foundation of our unified toolchain. It includes linter (oxlint), formatter (oxfmt), parser, resolver, transformer, and minifier, all with state-of-the-art performance.",
    stars: "19.1k",
    contributors: "314",
    exploreUrl: "https://oxc.rs",
    image: "/images/oxc-terminal.jpg",
    icon: <OxcIcon className="size-6" />,
  },
]

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <title>GitHub</title>
      <path
        clipRule="evenodd"
        d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.165 20 14.418 20 10c0-5.523-4.477-10-10-10z"
        fillRule="evenodd"
      />
    </svg>
  )
}

export interface OSSSectionContainerProps
  extends ComponentPropsWithoutRef<"section"> {}

function OSSSectionContainer({
  className,
  children,
  ...props
}: OSSSectionContainerProps) {
  return (
    <section
      data-slot="oss-section-container"
      className={cn("flex border-border/50 border-t", className)}
      {...props}
    >
      {children}
    </section>
  )
}

export interface OSSSectionSidebarProps
  extends ComponentPropsWithoutRef<"div"> {}

function OSSSectionSidebar({
  className,
  children,
  ...props
}: OSSSectionSidebarProps) {
  return (
    <div
      data-slot="oss-section-sidebar"
      className={cn(
        "sticky top-0 hidden w-72 shrink-0 flex-col self-start p-10 md:flex",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface OSSSectionSidebarListProps
  extends ComponentPropsWithoutRef<"ul"> {}

function OSSSectionSidebarList({
  className,
  children,
  ...props
}: OSSSectionSidebarListProps) {
  return (
    <ul
      data-slot="oss-section-sidebar-list"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {children}
    </ul>
  )
}

export interface OSSSectionSidebarItemProps
  extends ComponentPropsWithoutRef<"li"> {}

function OSSSectionSidebarItem({
  className,
  children,
  ...props
}: OSSSectionSidebarItemProps) {
  return (
    <li
      data-slot="oss-section-sidebar-item"
      className={cn(
        "transition-all duration-500 ease-out data-[state=active]:opacity-100 data-[state=inactive]:opacity-40 data-[state=inactive]:grayscale",
        className
      )}
      {...props}
    >
      {children}
    </li>
  )
}

export interface OSSSectionPanelsProps
  extends ComponentPropsWithoutRef<"div"> {}

function OSSSectionPanels({
  className,
  children,
  ...props
}: OSSSectionPanelsProps) {
  return (
    <div
      data-slot="oss-section-panels"
      className={cn("w-full border-border/50 md:border-l", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface OSSSectionPanelGridProps
  extends ComponentPropsWithoutRef<"div"> {
  withBottomBorder?: boolean
}

function OSSSectionPanelGrid({
  className,
  withBottomBorder = false,
  children,
  ...props
}: OSSSectionPanelGridProps) {
  return (
    <div
      data-slot="oss-section-panel-grid"
      className={cn(
        "grid w-full lg:grid-cols-2",
        withBottomBorder && "border-border/50 border-b",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface OSSSectionPanelContentProps
  extends ComponentPropsWithoutRef<"div"> {}

function OSSSectionPanelContent({
  className,
  children,
  ...props
}: OSSSectionPanelContentProps) {
  return (
    <div
      data-slot="oss-section-panel-content"
      className={cn(
        "flex flex-col justify-between gap-10 p-8 lg:gap-20 lg:p-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface OSSSectionPanelImageProps
  extends Omit<ComponentPropsWithoutRef<typeof NextImage>, "alt" | "src"> {
  src: string
  alt: string
}

function OSSSectionPanelImage({
  className,
  src,
  alt,
  ...props
}: OSSSectionPanelImageProps) {
  return (
    <div
      data-slot="oss-section-panel-image-wrap"
      className="relative overflow-hidden border-border/50 border-t lg:border-t-0 lg:border-l"
    >
      <NextImage
        alt={alt}
        className={cn("h-full w-full object-cover", className)}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        src={src}
        {...props}
      />
    </div>
  )
}

export function OSSSection({
  projects = defaultOSSSectionProjects,
}: OSSSectionProps) {
  return (
    <StickySection.Root>
      <OSSSectionContainer>
        <OSSSectionSidebar>
          <StickySection.List asChild>
            <OSSSectionSidebarList>
              {projects.map((project, i) => (
                <StickySection.Item asChild index={i} key={project.id}>
                  <OSSSectionSidebarItem>
                    <StickySection.Trigger
                      className="flex cursor-pointer items-center gap-4 border-none bg-transparent p-0 text-base text-foreground"
                      index={i}
                    >
                      {project.icon}
                      {project.name}
                    </StickySection.Trigger>
                  </OSSSectionSidebarItem>
                </StickySection.Item>
              ))}
            </OSSSectionSidebarList>
          </StickySection.List>
        </OSSSectionSidebar>

        <StickySection.Content asChild>
          <OSSSectionPanels>
            {projects.map((project, i) => (
              <StickySection.Panel asChild index={i} key={project.id}>
                <OSSSectionPanelGrid withBottomBorder={i < projects.length - 1}>
                  <OSSSectionPanelContent>
                    <div className="flex max-w-80 flex-col gap-5">
                      <span className="font-mono text-grey text-xs uppercase tracking-wide">
                        {project.name}
                      </span>
                      <h4 className="text-pretty font-semibold text-2xl text-foreground lg:text-3xl">
                        {project.tagline}
                      </h4>
                      <p className="max-w-100 text-base text-foreground/70 leading-relaxed">
                        {project.description}
                      </p>
                      <a
                        className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg border border-border/80 bg-transparent px-5 py-2.5 font-medium text-foreground text-sm transition-colors hover:bg-foreground/5"
                        href={project.exploreUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Explore {project.name}
                      </a>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <GithubIcon className="size-5 text-grey" />
                        <span className="font-semibold text-foreground">
                          {project.stars}
                        </span>
                        <span className="text-grey">stars</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">
                          {project.contributors}
                        </span>
                        <span className="text-grey">contributors</span>
                      </div>
                    </div>
                  </OSSSectionPanelContent>

                  <OSSSectionPanelImage
                    alt={`${project.name} terminal output`}
                    src={project.image}
                  />
                </OSSSectionPanelGrid>
              </StickySection.Panel>
            ))}
          </OSSSectionPanels>
        </StickySection.Content>
      </OSSSectionContainer>
    </StickySection.Root>
  )
}

export const OSSSectionComponents = {
  Container: OSSSectionContainer,
  Sidebar: OSSSectionSidebar,
  SidebarList: OSSSectionSidebarList,
  SidebarItem: OSSSectionSidebarItem,
  Panels: OSSSectionPanels,
  PanelGrid: OSSSectionPanelGrid,
  PanelContent: OSSSectionPanelContent,
  PanelImage: OSSSectionPanelImage,
}
