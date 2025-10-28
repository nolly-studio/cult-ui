"use client"

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { AnimatePresence, motion, MotionConfig } from "motion/react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const transition = {
  type: "spring" as const,
  bounce: 0.1,
  duration: 0.25,
}

interface DynamicStep {
  id: string
  title: string
  description: string
  icon:
    | React.ComponentType<{ className?: string }>
    | React.ReactElement<{ className?: string }>
  content: React.ReactNode
}

interface DynamicToolbarExpandableProps {
  steps: DynamicStep[]
  badgeText?: string

  className?: string
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  activeStep?: string | null
  onActiveStepChange?: (stepId: string | null) => void
}

const DynamicToolbarExpandable = React.memo<DynamicToolbarExpandableProps>(
  function DynamicToolbarExpandable({
    steps,
    badgeText,

    className,
    expanded: controlledExpanded,
    onExpandedChange,
    activeStep: controlledActiveStep,
    onActiveStepChange,
  }) {
    const [internalActive, setInternalActive] = useState<string | null>(null)
    const [internalIsOpen, setInternalIsOpen] = useState(false)

    const active =
      controlledActiveStep !== undefined ? controlledActiveStep : internalActive
    const isOpen =
      controlledExpanded !== undefined ? controlledExpanded : internalIsOpen

    const setActive = useCallback(
      (value: string | null) => {
        if (onActiveStepChange) {
          onActiveStepChange(value)
        } else {
          setInternalActive(value)
        }
      },
      [onActiveStepChange]
    )

    const setIsOpen = useCallback(
      (value: boolean) => {
        if (onExpandedChange) {
          onExpandedChange(value)
        } else {
          setInternalIsOpen(value)
        }
      },
      [onExpandedChange]
    )

    const [previousIndex, setPreviousIndex] = useState<number | null>(null)
    const [contentRef, contentBounds] = useMeasure()
    const [menuRef, menuBounds] = useMeasure()
    const menuContainerRef = useRef<any>(null)
    const ref = useRef<HTMLDivElement>(null)
    const [maxWidth, setMaxWidth] = useState(0)

    const heightContent = contentBounds.height
    const widthContainer = menuBounds.width

    const handleClickOutside = useCallback(() => {
      setIsOpen(false)
      setActive(null)
    }, [setIsOpen, setActive])

    useClickOutside(ref, handleClickOutside)

    useEffect(() => {
      if (!widthContainer || maxWidth > 0) return
      setMaxWidth(widthContainer)
    }, [widthContainer, maxWidth])

    const scrollButtonIntoView = useCallback(
      (currentIndex: number, previousIndex: number | null) => {
        if (!menuContainerRef.current) return

        const isMovingForward =
          previousIndex !== null && currentIndex > previousIndex
        const isMovingBackward =
          previousIndex !== null && currentIndex < previousIndex

        let targetIndex = currentIndex

        if (isMovingForward) {
          const nextIndex = currentIndex + 1
          if (nextIndex < steps.length) {
            targetIndex = nextIndex
          }
        } else if (isMovingBackward) {
          const prevIndex = currentIndex - 1
          if (prevIndex >= 0) {
            targetIndex = prevIndex
          }
        }

        const targetButton = menuContainerRef.current.querySelector(
          `[data-step-index="${targetIndex}"]`
        ) as HTMLElement

        if (targetButton) {
          targetButton.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          })
        }
      },
      [steps.length]
    )

    const handleNavClick = useCallback(
      (item: string) => {
        if (active === item && isOpen) {
          setIsOpen(false)
          setActive(null)
          return
        }

        const currentIndex = steps.findIndex((step) => step.id === item)
        setActive(item)
        setIsOpen(true)

        if (currentIndex >= 0) {
          setTimeout(() => {
            scrollButtonIntoView(currentIndex, previousIndex)
          }, 100)

          setPreviousIndex(currentIndex)
        }
      },
      [
        active,
        isOpen,
        steps,
        scrollButtonIntoView,
        previousIndex,
        setActive,
        setIsOpen,
      ]
    )

    const renderContent = useCallback(() => {
      if (!active) return null

      const step = steps.find((s) => s.id === active)
      if (!step) return null

      return (
        <div className="space-y-4 pb-3">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground">
              {step.title}
            </h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
          {step.content}
        </div>
      )
    }, [active, steps])

    const activeTitle = useMemo(() => {
      if (!active) return ""
      const step = steps.find((s) => s.id === active)
      return step?.title || ""
    }, [active, steps])

    const navigationButtons = useMemo(
      () =>
        steps.map((step, index) => ({
          id: step.id,
          label: step.title,
          step: (index + 1).toString(),
          onClick: () => handleNavClick(step.id),
          isActive: active === step.id,
          isFirst: index === 0,
          isLast: index === steps.length - 1,
        })),
      [steps, active, handleNavClick]
    )

    return (
      <div
        className={cn(
          "space-y-2 w-full max-w-sm sm:max-w-lg mx-auto px-2 sm:px-0",
          className
        )}
      >
        {badgeText && (
          <Badge
            variant="outline"
            className="bg-muted border-border text-muted-foreground"
          >
            {badgeText}
          </Badge>
        )}

        <MotionConfig transition={transition}>
          <div
            className="w-full rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_2px_2px_rgba(0,0,0,0.04),0px_8px_16px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_0_0_1px_rgba(255,252,240,0.08),0px_2px_2px_rgba(0,0,0,0.2),0px_8px_16px_-4px_rgba(0,0,0,0.3)] bg-background overflow-hidden"
            ref={ref}
          >
            <div className="rounded-2xl">
              <div className="overflow-hidden">
                <AnimatePresence initial={false} mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="expanded-content"
                      initial={{ height: 0 }}
                      animate={{ height: heightContent || 0 }}
                      exit={{ height: 0 }}
                      className=""
                    >
                      <div ref={contentRef} className="pt-2 px-2 sm:px-2">
                        <h4 className="text-sm font-medium text-foreground px-2">
                          {activeTitle}
                        </h4>

                        <div className="pb-1">
                          <div className="shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)] dark:shadow-[0px_1px_1px_0px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(255,255,255,0.05)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.05)_inset,0px_0px_1px_0px_rgba(0,0,0,0.8)] bg-muted/50 rounded-[0.8rem] px-3 py-4 mt-3 mb-2">
                            {renderContent()}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Navigation bar */}
              <div className="relative z-10">
                <ScrollArea
                  className="w-full"
                  viewportClassName="scrollbar-hide"
                  maskHeight={16}
                  ref={(element) => {
                    if (element) {
                      menuContainerRef.current = element
                      menuRef(element)
                    }
                  }}
                >
                  <div className="flex items-center p-[1px] w-max min-w-full">
                    {navigationButtons.map((button, index) => (
                      <button
                        key={button.id}
                        data-step-index={index}
                        onClick={button.onClick}
                        className={cn(
                          "text-sm text-muted-foreground transition-colors py-3 px-3 sm:py-4 sm:px-4 whitespace-nowrap shrink-0 flex items-center gap-2 min-h-[44px] sm:min-h-0",
                          button.isActive
                            ? "text-foreground font-medium bg-muted/50"
                            : "hover:bg-muted/60 active:bg-muted/70"
                        )}
                      >
                        <div className="text-[10px] w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center shadow-[0px_1px_1px_0px_hsla(0,0%,0%,0.02)_inset,0px_1px_1px_0px_hsla(0,0%,0%,0.02)_inset,0px_0px_0px_1px_rgba(255,255,255,0.25)] dark:shadow-[0px_1px_1px_0px_hsla(0,0%,100%,0.02)_inset,0px_1px_1px_0px_rgba(255,255,255,0.05)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.05)_inset,0px_0px_1px_0px_rgba(0,0,0,0.25)] font-bold rounded-md transition-all duration-300">
                          <span
                            className={cn(
                              "w-full rounded-md",
                              button.isActive
                                ? "bg-blue-300/20 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400"
                                : "bg-muted/50 text-muted-foreground"
                            )}
                          >
                            {button.step}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-foreground">
                          {button.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </MotionConfig>
      </div>
    )
  }
)

DynamicToolbarExpandable.displayName = "DynamicToolbarExpandable"

// ________________________ HOOKS ________________________
interface Bounds {
  left: number
  top: number
  width: number
  height: number
}

function useMeasure(): [
  (node: HTMLElement | null) => void,
  Bounds,
  () => void,
] {
  const [bounds, setBounds] = useState<Bounds>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })

  const [node, setNode] = useState<HTMLElement | null>(null)
  const observer = useRef<ResizeObserver | null>(null)

  const disconnect = useCallback(() => {
    if (observer.current) {
      observer.current.disconnect()
    }
  }, [])

  const ref = useCallback((node: HTMLElement | null) => {
    setNode(node)
  }, [])

  useEffect(() => {
    if (!node) return

    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new ResizeObserver(([entry]) => {
      if (entry && entry.contentRect) {
        const { left, top, width, height } = entry.contentRect
        setBounds({ left, top, width, height })
      }
    })

    observer.current.observe(node)

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [node])

  return [ref, bounds, disconnect]
}

function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current
      if (!el || el.contains((event?.target as Node) || null)) {
        return
      }

      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}

function useTouchPrimary() {
  const [isTouchPrimary, setIsTouchPrimary] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const controller = new AbortController()
    const { signal } = controller

    const handleTouch = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
      const prefersTouch = window.matchMedia("(pointer: coarse)").matches
      setIsTouchPrimary(hasTouch && prefersTouch)
    }

    const mq = window.matchMedia("(pointer: coarse)")
    mq.addEventListener("change", handleTouch, { signal })
    window.addEventListener("pointerdown", handleTouch, { signal })

    handleTouch()

    return () => controller.abort()
  }, [])

  return isTouchPrimary
}

// ________________________ MODIFIED SCROLL AREA ________________________
// https://lina.sameer.sh/

const ScrollAreaContext = React.createContext<boolean>(false)
type Mask = {
  top: boolean
  bottom: boolean
  left: boolean
  right: boolean
}

const ScrollArea = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    viewportClassName?: string
    /**
     * `maskHeight` is the height of the mask in pixels.
     * pass `0` to disable the mask
     * @default 30
     */
    maskHeight?: number
    maskClassName?: string
  }
>(
  (
    {
      className,
      children,
      scrollHideDelay = 0,
      viewportClassName,
      maskClassName,
      maskHeight = 30,
      ...props
    },
    ref
  ) => {
    const [showMask, setShowMask] = React.useState<Mask>({
      top: false,
      bottom: false,
      left: false,
      right: false,
    })
    const viewportRef = React.useRef<HTMLDivElement>(null)
    const isTouch = useTouchPrimary()

    const checkScrollability = React.useCallback(() => {
      const element = viewportRef.current
      if (!element) return

      const {
        scrollTop,
        scrollLeft,
        scrollWidth,
        clientWidth,
        scrollHeight,
        clientHeight,
      } = element
      setShowMask((prev) => ({
        ...prev,
        top: scrollTop > 0,
        bottom: scrollTop + clientHeight < scrollHeight - 1,
        left: scrollLeft > 0,
        right: scrollLeft + clientWidth < scrollWidth - 1,
      }))
    }, [])

    React.useEffect(() => {
      if (typeof window === "undefined") return

      const element = viewportRef.current
      if (!element) return

      const controller = new AbortController()
      const { signal } = controller

      const resizeObserver = new ResizeObserver(checkScrollability)
      resizeObserver.observe(element)

      element.addEventListener("scroll", checkScrollability, { signal })
      window.addEventListener("resize", checkScrollability, { signal })

      checkScrollability()

      return () => {
        controller.abort()
        resizeObserver.disconnect()
      }
    }, [checkScrollability, isTouch])

    return (
      <ScrollAreaContext.Provider value={isTouch}>
        {isTouch ? (
          <div
            ref={ref}
            role="group"
            data-slot="scroll-area"
            aria-roledescription="scroll area"
            className={cn("relative overflow-hidden", className)}
            {...props}
          >
            <div
              ref={viewportRef}
              data-slot="scroll-area-viewport"
              className={cn(
                "size-full overflow-auto rounded-[inherit]",
                viewportClassName
              )}
              tabIndex={0}
            >
              {children}
            </div>

            {maskHeight > 0 && (
              <ScrollMask
                showMask={showMask}
                className={maskClassName}
                maskHeight={maskHeight}
              />
            )}
          </div>
        ) : (
          <ScrollAreaPrimitive.Root
            ref={ref}
            data-slot="scroll-area"
            scrollHideDelay={scrollHideDelay}
            className={cn("relative overflow-hidden", className)}
            {...props}
          >
            <ScrollAreaPrimitive.Viewport
              ref={viewportRef}
              data-slot="scroll-area-viewport"
              className={cn("size-full rounded-[inherit]", viewportClassName)}
            >
              {children}
            </ScrollAreaPrimitive.Viewport>

            {maskHeight > 0 && (
              <ScrollMask
                showMask={showMask}
                className={maskClassName}
                maskHeight={maskHeight}
              />
            )}
            <ScrollBar />
            <ScrollAreaPrimitive.Corner />
          </ScrollAreaPrimitive.Root>
        )}
      </ScrollAreaContext.Provider>
    )
  }
)

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => {
  const isTouch = React.useContext(ScrollAreaContext)

  if (isTouch) return null

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      data-slot="scroll-area-scrollbar"
      className={cn(
        "hover:bg-muted dark:hover:bg-muted/50 data-[state=visible]:fade-in-0 data-[state=hidden]:fade-out-0 data-[state=visible]:animate-in data-[state=hidden]:animate-out flex touch-none p-px transition-[colors] duration-150 select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent px-1 pr-1.25",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className={cn(
          "bg-border relative flex-1 origin-center rounded-full transition-[scale]",
          orientation === "vertical" && "my-1 active:scale-y-95",
          orientation === "horizontal" && "active:scale-x-98"
        )}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
})

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

const ScrollMask = ({
  showMask,
  maskHeight,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  showMask: Mask
  maskHeight: number
}) => {
  return (
    <>
      <div
        {...props}
        aria-hidden="true"
        style={
          {
            "--top-fade-height": showMask.top ? `${maskHeight}px` : "0px",
            "--bottom-fade-height": showMask.bottom ? `${maskHeight}px` : "0px",
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0 z-10",
          "before:absolute before:inset-x-0 before:top-0 before:transition-[height,opacity] before:duration-300 before:content-['']",
          "after:absolute after:inset-x-0 after:bottom-0 after:transition-[height,opacity] after:duration-300 after:content-['']",
          "before:h-(--top-fade-height) after:h-(--bottom-fade-height)",
          showMask.top ? "before:opacity-100" : "before:opacity-0",
          showMask.bottom ? "after:opacity-100" : "after:opacity-0",
          "before:from-background before:bg-gradient-to-b before:to-transparent",
          "after:from-background after:bg-gradient-to-t after:to-transparent",
          className
        )}
      />
      <div
        {...props}
        aria-hidden="true"
        style={
          {
            "--left-fade-width": showMask.left ? `${maskHeight}px` : "0px",
            "--right-fade-width": showMask.right ? `${maskHeight}px` : "0px",
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0 z-10",
          "before:absolute before:inset-y-0 before:left-0 before:transition-[width,opacity] before:duration-300 before:content-['']",
          "after:absolute after:inset-y-0 after:right-0 after:transition-[width,opacity] after:duration-300 after:content-['']",
          "before:w-(--left-fade-width) after:w-(--right-fade-width)",
          showMask.left ? "before:opacity-100" : "before:opacity-0",
          showMask.right ? "after:opacity-100" : "after:opacity-0",
          "before:from-background before:bg-gradient-to-r before:to-transparent",
          "after:from-background after:bg-gradient-to-l after:to-transparent",
          className
        )}
      />
    </>
  )
}

export default function ToolbarExpandable(
  props: DynamicToolbarExpandableProps
) {
  return <DynamicToolbarExpandable {...props} />
}
