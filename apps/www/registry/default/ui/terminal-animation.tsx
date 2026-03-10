"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { Slot } from "@radix-ui/react-slot"
import { useControllableState } from "@radix-ui/react-use-controllable-state"

import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TerminalLine {
  text: string
  color?: string
  delay?: number
}

export interface TabContent {
  label: string
  command: string
  lines: TerminalLine[]
}

export type TerminalAnimationRootProps = React.ComponentProps<"div"> & {
  /** Tab content for each command */
  tabs: TabContent[]
  /** Initial active tab index (uncontrolled) */
  defaultActiveTab?: number
  /** Active tab index (controlled) */
  activeTab?: number
  /** Callback when active tab changes */
  onActiveTabChange?: (index: number) => void
  /** Optional background image URL; renders a full-bleed layer when provided */
  backgroundImage?: string
  /** Force dark mode for the terminal regardless of page theme */
  alwaysDark?: boolean
  /** Hide cursor after output completes */
  hideCursorOnComplete?: boolean
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface TerminalAnimationContextValue {
  activeTab: number
  setActiveTab: (index: number) => void
  commandTyped: string
  isTypingCommand: boolean
  showCursor: boolean
  visibleLines: number
  currentTab: TabContent
  tabs: TabContent[]
}

const TerminalAnimationContext = createContext<
  TerminalAnimationContextValue | undefined
>(undefined)

function useTerminalAnimationContext() {
  const ctx = useContext(TerminalAnimationContext)
  if (!ctx) {
    throw new Error(
      "TerminalAnimation components must be used within TerminalAnimationRoot"
    )
  }
  return ctx
}

// ---------------------------------------------------------------------------
// Default tabs data (for demo)
// ---------------------------------------------------------------------------

export const defaultTerminalTabs: TabContent[] = [
  {
    label: "new",
    command: "vite new my-app",
    lines: [
      { text: "", delay: 80 },
      {
        text: "  Scaffolding project in ./my-app...",
        color: "text-[#b39aff]",
        delay: 400,
      },
      { text: "", delay: 80 },
      { text: "  Select a framework:", color: "text-neutral-400", delay: 200 },
      { text: "    Vanilla", color: "text-neutral-500", delay: 80 },
      { text: "    Vue", color: "text-neutral-500", delay: 80 },
      { text: "  > React", color: "text-[#32f3e9]", delay: 80 },
      { text: "    Preact", color: "text-neutral-500", delay: 80 },
      { text: "    Svelte", color: "text-neutral-500", delay: 80 },
      { text: "", delay: 200 },
      { text: "  Select a variant:", color: "text-neutral-400", delay: 200 },
      { text: "  > TypeScript", color: "text-[#32f3e9]", delay: 80 },
      { text: "", delay: 200 },
      { text: "  Done. Now run:", color: "text-neutral-400", delay: 300 },
      { text: "", delay: 50 },
      { text: "    cd my-app", color: "text-neutral-300", delay: 100 },
      { text: "    vite dev", color: "text-neutral-300", delay: 100 },
    ],
  },
  {
    label: "dev",
    command: "vite dev",
    lines: [
      { text: "", delay: 80 },
      {
        text: "  VITE v6.3.0  ready in 124 ms",
        color: "text-[#b39aff]",
        delay: 400,
      },
      { text: "", delay: 80 },
      {
        text: "  >  Local:   http://localhost:5173/",
        color: "text-[#32f3e9]",
        delay: 200,
      },
      {
        text: "  >  Network: http://192.168.1.42:5173/",
        color: "text-neutral-500",
        delay: 100,
      },
      {
        text: "  >  press h + enter to show help",
        color: "text-neutral-600",
        delay: 100,
      },
      { text: "", delay: 300 },
      {
        text: "  hmr update /src/App.tsx 2ms",
        color: "text-neutral-500",
        delay: 600,
      },
      {
        text: "  hmr update /src/App.tsx 1ms",
        color: "text-neutral-500",
        delay: 400,
      },
    ],
  },
  {
    label: "lint",
    command: "vite lint ./src",
    lines: [
      { text: "", delay: 80 },
      {
        text: "  Checked 42 files in 8ms",
        color: "text-neutral-400",
        delay: 300,
      },
      { text: "", delay: 80 },
      { text: "  src/App.tsx:14:5", color: "text-neutral-500", delay: 150 },
      {
        text: "    warning  Unexpected console statement       no-console",
        color: "text-yellow-400",
        delay: 100,
      },
      { text: "", delay: 80 },
      { text: "  src/utils.ts:31:1", color: "text-neutral-500", delay: 150 },
      {
        text: "    warning  Missing return type on function    return-type",
        color: "text-yellow-400",
        delay: 100,
      },
      { text: "", delay: 80 },
      {
        text: "  src/api/client.ts:7:10",
        color: "text-neutral-500",
        delay: 150,
      },
      {
        text: "    error    Unused variable 'baseUrl'          no-unused",
        color: "text-red-400",
        delay: 100,
      },
      { text: "", delay: 80 },
      {
        text: "  3 problems (1 error, 2 warnings)  [8ms]",
        color: "text-neutral-300",
        delay: 300,
      },
    ],
  },
  {
    label: "fmt",
    command: "vite fmt ./src",
    lines: [
      { text: "", delay: 80 },
      {
        text: "  Checked 42 files in 4ms",
        color: "text-neutral-400",
        delay: 200,
      },
      { text: "", delay: 80 },
      { text: "  Fixed  src/App.tsx", color: "text-[#22ff73]", delay: 150 },
      {
        text: "  Fixed  src/components/Header.tsx",
        color: "text-[#22ff73]",
        delay: 100,
      },
      {
        text: "  Fixed  src/utils/format.ts",
        color: "text-[#22ff73]",
        delay: 100,
      },
      { text: "", delay: 80 },
      { text: "  3 files formatted", color: "text-neutral-300", delay: 200 },
      { text: "  39 files unchanged", color: "text-neutral-500", delay: 100 },
      { text: "", delay: 80 },
      { text: "  Done in 4ms", color: "text-neutral-400", delay: 200 },
    ],
  },
  {
    label: "test",
    command: "vite test",
    lines: [
      { text: "", delay: 80 },
      { text: "  RUN  v6.3.0", color: "text-[#b39aff]", delay: 300 },
      { text: "", delay: 80 },
      { text: "  src/utils.test.ts", color: "text-neutral-400", delay: 200 },
      {
        text: "    ✓ formats currency correctly",
        color: "text-[#22ff73]",
        delay: 150,
      },
      {
        text: "    ✓ parses date strings",
        color: "text-[#22ff73]",
        delay: 100,
      },
      {
        text: "    ✓ handles edge cases",
        color: "text-[#22ff73]",
        delay: 100,
      },
      { text: "  src/App.test.tsx", color: "text-neutral-400", delay: 200 },
      {
        text: "    ✓ renders heading",
        color: "text-[#22ff73]",
        delay: 100,
      },
      {
        text: "    ✓ handles click events",
        color: "text-[#22ff73]",
        delay: 100,
      },
      { text: "", delay: 80 },
      { text: "  Tests  5 passed (5)", color: "text-[#22ff73]", delay: 200 },
      { text: "  Time   38ms", color: "text-neutral-500", delay: 100 },
    ],
  },
  {
    label: "build",
    command: "vite build",
    lines: [
      { text: "", delay: 80 },
      {
        text: "  vite v6.3.0 building for production...",
        color: "text-[#b39aff]",
        delay: 400,
      },
      { text: "", delay: 80 },
      { text: "  transforming...", color: "text-neutral-500", delay: 300 },
      {
        text: "  ✓ 42 modules transformed.",
        color: "text-[#22ff73]",
        delay: 300,
      },
      { text: "", delay: 80 },
      { text: "  rendering chunks...", color: "text-neutral-500", delay: 200 },
      {
        text: "  computing gzip size...",
        color: "text-neutral-500",
        delay: 200,
      },
      { text: "", delay: 80 },
      {
        text: "  dist/index.html                 0.46 kB  |  gzip:  0.30 kB",
        color: "text-neutral-400",
        delay: 100,
      },
      {
        text: "  dist/assets/index-Dk2a9f.css    1.28 kB  |  gzip:  0.65 kB",
        color: "text-neutral-400",
        delay: 80,
      },
      {
        text: "  dist/assets/index-Ba3x7q.js   143.36 kB  |  gzip: 46.12 kB",
        color: "text-neutral-400",
        delay: 80,
      },
      { text: "", delay: 80 },
      { text: "  ✓ built in 218ms", color: "text-[#22ff73]", delay: 300 },
    ],
  },
]

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

export function TerminalAnimationRoot({
  tabs,
  defaultActiveTab = 0,
  activeTab: activeTabProp,
  onActiveTabChange,
  backgroundImage,
  alwaysDark = false,
  hideCursorOnComplete = true,
  className,
  children,
  ...props
}: TerminalAnimationRootProps) {
  const [activeTab, setActiveTab] = useControllableState({
    prop: activeTabProp,
    defaultProp: defaultActiveTab,
    onChange: onActiveTabChange,
  })

  const [visibleLines, setVisibleLines] = useState(0)
  const [commandTyped, setCommandTyped] = useState("")
  const [isTypingCommand, setIsTypingCommand] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimeouts = useCallback(() => {
    timeoutRef.current.forEach(clearTimeout)
    timeoutRef.current = []
  }, [])

  const animateTab = useCallback(
    (tabIndex: number) => {
      clearTimeouts()
      setVisibleLines(0)
      setCommandTyped("")
      setIsTypingCommand(true)
      setShowCursor(true)

      const tab = tabs[tabIndex]
      if (!tab) {
        return
      }

      const command = tab.command
      let charIndex = 0

      const typeCommand = () => {
        if (charIndex <= command.length) {
          setCommandTyped(command.slice(0, charIndex))
          charIndex++
          const t = setTimeout(typeCommand, 25 + Math.random() * 35)
          timeoutRef.current.push(t)
        } else {
          const t = setTimeout(() => {
            setIsTypingCommand(false)
            showLines(0)
          }, 250)
          timeoutRef.current.push(t)
        }
      }

      const showLines = (lineIndex: number) => {
        if (lineIndex <= tab.lines.length) {
          setVisibleLines(lineIndex)
          if (lineIndex < tab.lines.length) {
            const delay = tab.lines[lineIndex].delay ?? 100
            const t = setTimeout(() => showLines(lineIndex + 1), delay)
            timeoutRef.current.push(t)
          } else if (hideCursorOnComplete) {
            const t = setTimeout(() => setShowCursor(false), 600)
            timeoutRef.current.push(t)
          }
        }
      }

      const t = setTimeout(typeCommand, 300)
      timeoutRef.current.push(t)
    },
    [clearTimeouts, hideCursorOnComplete, tabs]
  )

  useEffect(() => {
    animateTab(activeTab)
    return clearTimeouts
  }, [activeTab, animateTab, clearTimeouts])

  const currentTab = tabs[activeTab] ?? tabs[0]
  const safeActiveTab = Math.min(activeTab, tabs.length - 1)

  const value: TerminalAnimationContextValue = {
    activeTab: safeActiveTab,
    setActiveTab,
    commandTyped,
    isTypingCommand,
    showCursor,
    visibleLines,
    currentTab,
    tabs,
  }

  return (
    <TerminalAnimationContext.Provider value={value}>
      <div
        className={cn(alwaysDark && "dark", className)}
        data-slot="terminal-animation-root"
        {...props}
      >
        {backgroundImage && (
          <div
            aria-hidden
            className="absolute inset-0 bg-center bg-cover"
            data-slot="terminal-animation-background"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        {children}
      </div>
    </TerminalAnimationContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// BackgroundGradient
// ---------------------------------------------------------------------------

export type TerminalAnimationBackgroundGradientProps =
  React.ComponentProps<"div">

const backgroundGradientClasses =
  "absolute inset-0 bg-gradient-to-br from-violet-600/40 via-fuchsia-600/30 to-indigo-950"

export function TerminalAnimationBackgroundGradient({
  className,
  ...props
}: TerminalAnimationBackgroundGradientProps) {
  return (
    <div
      aria-hidden
      className={cn(backgroundGradientClasses, className)}
      data-slot="terminal-animation-background-gradient"
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Container
// ---------------------------------------------------------------------------

export type TerminalAnimationContainerProps = React.ComponentProps<"div">

const containerClasses =
  "relative w-full max-w-[62rem] px-3 pt-10 pb-0 md:px-0 md:pt-28"

export function TerminalAnimationContainer({
  className,
  ...props
}: TerminalAnimationContainerProps) {
  return (
    <div
      className={cn(containerClasses, className)}
      data-slot="terminal-animation-container"
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Window
// ---------------------------------------------------------------------------

export type TerminalAnimationWindowProps = React.ComponentProps<"div"> & {
  /** Terminal window background color; defaults to bg-card when unset */
  backgroundColor?: string
  /** Minimum height of the terminal window */
  minHeight?: string
  /** Animate slide-up when element enters viewport */
  animateOnVisible?: boolean
}

const windowClasses = "relative flex flex-col overflow-hidden rounded-t-xl"

export function TerminalAnimationWindow({
  className,
  backgroundColor,
  minHeight = "28rem",
  animateOnVisible = true,
  style,
  ...props
}: TerminalAnimationWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!(animateOnVisible && windowRef.current)) {
      return
    }
    const el = windowRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animateOnVisible])

  return (
    <div
      className={cn(
        windowClasses,
        !backgroundColor && "bg-card",
        animateOnVisible &&
          "transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
        animateOnVisible && !hasAnimated && "translate-y-64",
        animateOnVisible && hasAnimated && "translate-y-0",
        className
      )}
      data-slot="terminal-animation-window"
      ref={windowRef}
      style={
        backgroundColor
          ? { backgroundColor, minHeight, ...style }
          : { minHeight, ...style }
      }
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export type TerminalAnimationContentProps = React.ComponentProps<"div">

const contentClasses = "flex-1 px-6 py-6 sm:px-10 sm:py-8"

export function TerminalAnimationContent({
  className,
  ...props
}: TerminalAnimationContentProps) {
  return (
    <div
      className={cn(contentClasses, className)}
      data-slot="terminal-animation-content"
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// BlinkingCursor
// ---------------------------------------------------------------------------

export type TerminalAnimationBlinkingCursorProps = React.ComponentProps<"span">

export function TerminalAnimationBlinkingCursor({
  className,
  ...props
}: TerminalAnimationBlinkingCursorProps) {
  // Requires `animate-caret-blink` utility in global CSS for downstream installs.
  return (
    <span
      aria-hidden
      className={cn(
        "ml-0.5 inline-block h-[18px] w-[7px] translate-y-[3px] animate-caret-blink bg-muted-foreground duration-1000",
        className
      )}
      data-slot="terminal-animation-blinking-cursor"
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// CommandBar
// ---------------------------------------------------------------------------

export type TerminalAnimationCommandBarProps = React.ComponentProps<"div"> & {
  /** Custom cursor element when typing; defaults to unstyled block cursor */
  cursor?: ReactNode
}

export function TerminalAnimationCommandBar({
  className,
  cursor,
  ...props
}: TerminalAnimationCommandBarProps) {
  const { commandTyped, isTypingCommand, showCursor } =
    useTerminalAnimationContext()

  const defaultCursor = <span aria-hidden="true">▌</span>

  return (
    <div
      className={className}
      data-slot="terminal-animation-command"
      {...props}
    >
      {commandTyped}
      {isTypingCommand && showCursor && (cursor ?? defaultCursor)}
    </div>
  )
}

// ---------------------------------------------------------------------------
// OutputLine
// ---------------------------------------------------------------------------

export type TerminalAnimationOutputLineProps = React.ComponentProps<"div"> & {
  line: TerminalLine
  visible: boolean
}

export function TerminalAnimationOutputLine({
  line,
  visible,
  className,
  ...props
}: TerminalAnimationOutputLineProps) {
  if (!visible) {
    return null
  }
  return (
    <div
      className={className}
      data-slot="terminal-animation-output-line"
      {...props}
    >
      <span data-line-color={line.color}>{line.text || "\u00A0"}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

export type TerminalAnimationOutputProps = React.ComponentProps<"div"> & {
  /** Custom renderer for each line; receives line, index, and visibility */
  renderLine?: (
    line: TerminalLine,
    index: number,
    visible: boolean
  ) => ReactNode
}

export function TerminalAnimationOutput({
  className,
  renderLine,
  ...props
}: TerminalAnimationOutputProps) {
  const { isTypingCommand, visibleLines, currentTab, activeTab } =
    useTerminalAnimationContext()

  if (isTypingCommand) {
    return null
  }

  return (
    <div
      aria-atomic="false"
      aria-live="polite"
      className={className}
      data-slot="terminal-animation-output"
      role="log"
      {...props}
    >
      {currentTab.lines.map((line, i) => {
        const visible = i < visibleLines
        const key = `${activeTab}-${i}`
        if (renderLine) {
          const content = renderLine(line, i, visible)
          if (!(visible || content)) {
            return null
          }
          return <div key={key}>{content}</div>
        }
        return (
          <TerminalAnimationOutputLine
            key={key}
            line={line}
            visible={visible}
          />
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// TrailingPrompt
// ---------------------------------------------------------------------------

export type TerminalAnimationTrailingPromptProps = React.ComponentProps<"div">

export function TerminalAnimationTrailingPrompt({
  className,
  children,
  ...props
}: TerminalAnimationTrailingPromptProps) {
  const { isTypingCommand, showCursor, visibleLines, currentTab } =
    useTerminalAnimationContext()

  const show =
    !isTypingCommand && showCursor && visibleLines >= currentTab.lines.length

  if (!show) {
    return null
  }

  return (
    <div
      className={className}
      data-slot="terminal-animation-trailing-prompt"
      {...props}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// TabList
// ---------------------------------------------------------------------------

export type TerminalAnimationTabListProps = React.ComponentProps<"div">

export function TerminalAnimationTabList({
  className,
  ...props
}: TerminalAnimationTabListProps) {
  return (
    <div
      aria-label="Terminal commands"
      className={className}
      data-slot="terminal-animation-tab-list"
      role="tablist"
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// TabTrigger
// ---------------------------------------------------------------------------

export type TerminalAnimationTabTriggerProps =
  React.ComponentPropsWithoutRef<"button"> & {
    /** Tab index to activate when clicked */
    index: number
    /** Merge props onto child element instead of rendering a button */
    asChild?: boolean
  }

export function TerminalAnimationTabTrigger({
  index,
  asChild = false,
  className,
  children,
  ...props
}: TerminalAnimationTabTriggerProps) {
  const { activeTab, setActiveTab } = useTerminalAnimationContext()
  const isActive = activeTab === index

  const triggerProps = {
    role: "tab" as const,
    "aria-selected": isActive,
    "data-state": isActive ? "active" : "inactive",
    onClick: () => setActiveTab(index),
    children,
  }

  if (asChild) {
    return <Slot {...triggerProps} {...props} className={className} />
  }

  return (
    <button
      data-slot="terminal-animation-tab-trigger"
      type="button"
      {...triggerProps}
      className={className}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useTerminalAnimation() {
  return useTerminalAnimationContext()
}
