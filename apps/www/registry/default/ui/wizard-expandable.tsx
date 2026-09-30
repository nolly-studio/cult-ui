"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react"
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
} from "motion/react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

/** SKILL-DESIGN: standard 3-layer surface + transition-shadow */
const toolbarShellClass = cn(
  "bg-background transition-shadow duration-200",
  "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)]",
  "dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.06),0px_1px_2px_-1px_rgba(255,255,255,0.03),0px_2px_4px_0px_rgba(0,0,0,0.2)]"
)

/** SKILL-DESIGN: lighter 2-layer for nested well */
const toolbarInnerWellClass = cn(
  "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.05)]",
  "dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.08),0px_1px_2px_-1px_rgba(255,255,255,0.04)]"
)

const springTransition = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.25,
}

function scheduleAfterLayout(fn: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn)
  })
}

export interface WizardStep {
  id: string
  title: string
  description: string
  icon:
    | React.ComponentType<{ className?: string }>
    | React.ReactElement<{ className?: string }>
  content: React.ReactNode
}

export interface WizardNavigateContext {
  fromStepId: string | null
  toStepId: string
  fromIndex: number
  toIndex: number
}

type StepNavigationResult =
  | { ok: true }
  | { ok: false; context: WizardNavigateContext }

function evaluateStepNavigation({
  steps,
  fromId,
  toId,
  canNavigateToStep,
  skipValidationForBackward,
}: {
  steps: WizardStep[]
  fromId: string | null
  toId: string
  canNavigateToStep: ((context: WizardNavigateContext) => boolean) | undefined
  skipValidationForBackward: boolean
}): StepNavigationResult {
  if (!fromId || fromId === toId) {
    return { ok: true }
  }

  const toIndex = steps.findIndex((s) => s.id === toId)
  const fromIndex = steps.findIndex((s) => s.id === fromId)
  if (toIndex < 0 || fromIndex < 0) {
    return { ok: true }
  }

  if (!canNavigateToStep) {
    return { ok: true }
  }

  const goingBackward = toIndex < fromIndex
  if (skipValidationForBackward && goingBackward) {
    return { ok: true }
  }

  const context: WizardNavigateContext = {
    fromStepId: fromId,
    toStepId: toId,
    fromIndex,
    toIndex,
  }

  if (!canNavigateToStep(context)) {
    return { ok: false, context }
  }

  return { ok: true }
}

export interface WizardExpandableContextValue {
  activeStepId: string | null
  activeIndex: number
  totalSteps: number
  isLastStep: boolean
  canGoBack: boolean
  /** False when forward navigation / complete is blocked by validation or flags. */
  canGoNext: boolean
  goNext: () => void
  goBack: () => void
  complete: () => void
}

const WizardExpandableContext =
  createContext<WizardExpandableContextValue | null>(null)

export function useWizardExpandable(): WizardExpandableContextValue {
  const ctx = useContext(WizardExpandableContext)
  if (!ctx) {
    throw new Error("useWizardExpandable must be used within WizardExpandable")
  }
  return ctx
}

export interface WizardExpandableProps {
  steps: WizardStep[]
  badgeText?: string

  className?: string
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  activeStep?: string | null
  onActiveStepChange?: (stepId: string | null) => void

  /**
   * Return false to block moving from the current step to `toStepId`.
   * Not called when opening the first step (`fromStepId` is null), closing the wizard,
   * or when `skipValidationForBackward` is true and the target step is before the current one.
   */
  canNavigateToStep?: (context: WizardNavigateContext) => boolean
  /**
   * When true, navigating to an earlier step does not call `canNavigateToStep`.
   * @default true
   */
  skipValidationForBackward?: boolean
  /** Called when navigation was blocked by `canNavigateToStep` returning false. */
  onNavigateBlocked?: (context: WizardNavigateContext) => void

  /**
   * When `false`, disables Next and the Complete action. When `undefined`, only
   * `canNavigateToStep` gates forward moves (and Complete stays enabled unless you set this).
   */
  canGoNext?: boolean
  /** @default true */
  showNavigation?: boolean
  backLabel?: string
  nextLabel?: string
  completeLabel?: string
  /** Called when the user activates Complete on the last step. */
  onComplete?: () => void
}

const WizardExpandableInner = React.memo<WizardExpandableProps>(
  function WizardExpandableInner({
    steps,
    badgeText,

    className,
    expanded: controlledExpanded,
    onExpandedChange,
    activeStep: controlledActiveStep,
    onActiveStepChange,
    canNavigateToStep,
    skipValidationForBackward = true,
    onNavigateBlocked,
    canGoNext: canGoNextProp,
    showNavigation = true,
    backLabel = "Back",
    nextLabel = "Next",
    completeLabel = "Finish",
    onComplete,
  }) {
    const reduceMotion = useReducedMotion()
    const baseId = useId()
    const panelId = `${baseId}-panel`
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

    const [active, setActive] = useControllableState<string | null>({
      prop: controlledActiveStep,
      defaultProp: null,
      onChange: onActiveStepChange,
    })

    const [isOpen, setIsOpen] = useControllableState({
      prop: controlledExpanded,
      defaultProp: false,
      onChange: onExpandedChange,
    })

    const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null)

    const [previousIndex, setPreviousIndex] = useState<number | null>(null)
    const [contentRef, contentBounds] = useMeasure()
    const [menuRef, menuBounds] = useMeasure()
    const menuContainerRef = useRef<HTMLElement | null>(null)
    const ref = useRef<HTMLDivElement>(null)
    const [maxWidth, setMaxWidth] = useState(0)

    const heightContent = contentBounds.height
    const widthContainer = menuBounds.width

    const scrollBehavior: ScrollBehavior = reduceMotion ? "auto" : "smooth"

    const motionTransition = useMemo(
      () => (reduceMotion ? { duration: 0.01 } : springTransition),
      [reduceMotion]
    )

    const handleClickOutside = useCallback(() => {
      setIsOpen(false)
      setActive(null)
    }, [setIsOpen, setActive])

    useClickOutside(ref, handleClickOutside)

    useEffect(() => {
      if (!widthContainer || maxWidth > 0) {
        return
      }
      setMaxWidth(widthContainer)
    }, [widthContainer, maxWidth])

    const scrollButtonIntoView = useCallback(
      (
        currentIndex: number,
        priorIndex: number | null,
        behavior: ScrollBehavior
      ) => {
        if (!menuContainerRef.current) {
          return
        }

        const isMovingForward = priorIndex !== null && currentIndex > priorIndex
        const isMovingBackward =
          priorIndex !== null && currentIndex < priorIndex

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

        const viewport = menuContainerRef.current.querySelector(
          '[data-slot="scroll-area-viewport"]'
        ) as HTMLElement | null

        const targetButton = menuContainerRef.current.querySelector(
          `[data-step-index="${targetIndex}"]`
        ) as HTMLElement | null

        if (viewport && targetButton) {
          scrollElementToCenterInViewport(viewport, targetButton, behavior)
        }
      },
      [steps.length]
    )

    const openStep = useCallback(
      (item: string, priorIndex: number | null) => {
        const currentIndex = steps.findIndex((step) => step.id === item)
        setActive(item)
        setIsOpen(true)

        if (currentIndex >= 0) {
          scheduleAfterLayout(() => {
            scrollButtonIntoView(currentIndex, priorIndex, scrollBehavior)
          })
          setPreviousIndex(currentIndex)
        }
      },
      [steps, setActive, setIsOpen, scrollButtonIntoView, scrollBehavior]
    )

    const tryNavigateToStep = useCallback(
      (item: string, priorIndex: number | null): boolean => {
        const result = evaluateStepNavigation({
          steps,
          fromId: active,
          toId: item,
          canNavigateToStep,
          skipValidationForBackward,
        })
        if (result.ok === false) {
          onNavigateBlocked?.(result.context)
          return false
        }
        openStep(item, priorIndex)
        return true
      },
      [
        active,
        canNavigateToStep,
        onNavigateBlocked,
        openStep,
        skipValidationForBackward,
        steps,
      ]
    )

    const activeIndex = useMemo(
      () => (active ? steps.findIndex((s) => s.id === active) : -1),
      [active, steps]
    )

    const isLastStep = activeIndex >= 0 && activeIndex === steps.length - 1
    const nextStepId =
      activeIndex >= 0 && activeIndex < steps.length - 1
        ? steps[activeIndex + 1]?.id
        : undefined
    const prevStepId = activeIndex > 0 ? steps[activeIndex - 1]?.id : undefined

    const forwardNavOk = useMemo(() => {
      if (!nextStepId || active === null) {
        return true
      }
      return evaluateStepNavigation({
        steps,
        fromId: active,
        toId: nextStepId,
        canNavigateToStep,
        skipValidationForBackward,
      }).ok
    }, [
      active,
      canNavigateToStep,
      nextStepId,
      skipValidationForBackward,
      steps,
    ])

    const nextDisabled = !forwardNavOk || canGoNextProp === false
    const completeDisabled = canGoNextProp === false
    const canGoBack = isOpen && active !== null && activeIndex > 0

    const effectiveCanGoNext = isLastStep
      ? canGoNextProp !== false
      : forwardNavOk && canGoNextProp !== false

    const handleWizardBack = useCallback(() => {
      if (!prevStepId) {
        return
      }
      const moved = tryNavigateToStep(prevStepId, previousIndex)
      if (moved) {
        queueMicrotask(() => tabRefs.current[activeIndex - 1]?.focus())
      }
    }, [activeIndex, previousIndex, prevStepId, tryNavigateToStep])

    const handleWizardNext = useCallback(() => {
      if (!nextStepId || isLastStep) {
        return
      }
      const moved = tryNavigateToStep(nextStepId, previousIndex)
      if (moved) {
        queueMicrotask(() => tabRefs.current[activeIndex + 1]?.focus())
      }
    }, [activeIndex, isLastStep, nextStepId, previousIndex, tryNavigateToStep])

    const handleWizardComplete = useCallback(() => {
      if (completeDisabled) {
        return
      }
      onComplete?.()
    }, [completeDisabled, onComplete])

    const handleNavClick = useCallback(
      (item: string) => {
        if (active === item && isOpen) {
          setIsOpen(false)
          setActive(null)
          return
        }

        tryNavigateToStep(item, previousIndex)
      },
      [active, isOpen, previousIndex, setActive, setIsOpen, tryNavigateToStep]
    )

    useEffect(() => {
      if (!isOpen) {
        return
      }

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Escape") {
          return
        }
        const root = ref.current
        if (!root?.contains(document.activeElement)) {
          return
        }
        event.preventDefault()
        setIsOpen(false)
        setActive(null)
        tabRefs.current[0]?.focus()
      }

      document.addEventListener("keydown", onKeyDown)
      return () => document.removeEventListener("keydown", onKeyDown)
    }, [isOpen, setActive, setIsOpen])

    const handleTabKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
        const { key } = event
        let nextIndex: number | undefined

        if (key === "ArrowRight" || key === "ArrowLeft") {
          event.preventDefault()
          const delta = key === "ArrowRight" ? 1 : -1
          nextIndex = (index + delta + steps.length) % steps.length
        } else if (key === "Home") {
          event.preventDefault()
          nextIndex = 0
        } else if (key === "End") {
          event.preventDefault()
          nextIndex = steps.length - 1
        }

        if (nextIndex === undefined) {
          return
        }

        const nextId = steps[nextIndex]?.id
        if (!nextId) {
          return
        }

        const moved = tryNavigateToStep(nextId, previousIndex)
        if (!moved) {
          return
        }

        if (key === "ArrowRight" || key === "ArrowLeft") {
          queueMicrotask(() => tabRefs.current[nextIndex]?.focus())
        } else {
          tabRefs.current[nextIndex]?.focus()
        }
      },
      [previousIndex, steps, tryNavigateToStep]
    )

    const renderContent = useCallback(() => {
      if (!active) {
        return null
      }

      const step = steps.find((s) => s.id === active)
      if (!step) {
        return null
      }

      const titleId = `${baseId}-title-${step.id}`
      const listVariants = {
        initial: {},
        animate: {
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.06,
            delayChildren: reduceMotion ? 0 : 0.02,
          },
        },
        exit: {
          transition: { staggerChildren: 0.03, staggerDirection: -1 as const },
        },
      }

      const itemVariants = {
        initial: reduceMotion
          ? { opacity: 0.001 }
          : { opacity: 0, y: 8, filter: "blur(4px)" },
        animate: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: reduceMotion ? 0.01 : 0.22,
            ease: [0.23, 1, 0.32, 1] as const,
          },
        },
        exit: reduceMotion
          ? {
              opacity: 0,
              transition: { duration: 0.1, ease: [0.23, 1, 0.32, 1] as const },
            }
          : {
              opacity: 0,
              y: -10,
              filter: "blur(4px)",
              transition: { duration: 0.16, ease: [0.4, 0, 1, 1] as const },
            },
      }

      return (
        <motion.div
          animate="animate"
          aria-labelledby={`${baseId}-tab-${step.id}`}
          className="space-y-4 pb-2"
          exit="exit"
          id={panelId}
          initial="initial"
          key={step.id}
          role="tabpanel"
          variants={listVariants}
        >
          <div className="space-y-2">
            <motion.h3
              className="text-balance font-medium text-foreground text-lg"
              id={titleId}
              variants={itemVariants}
            >
              {step.title}
            </motion.h3>
            <motion.p
              className="text-pretty text-muted-foreground text-sm"
              variants={itemVariants}
            >
              {step.description}
            </motion.p>
          </div>
          <motion.div variants={itemVariants}>{step.content}</motion.div>
          {showNavigation ? (
            <motion.div className="pt-1" variants={itemVariants}>
              <fieldset
                aria-label="Wizard navigation"
                className="flex min-w-0 gap-2 sm:gap-3"
              >
                <Button
                  className="min-h-11 flex-1 sm:min-h-10"
                  disabled={!canGoBack}
                  onClick={handleWizardBack}
                  type="button"
                  variant="outline"
                >
                  {backLabel}
                </Button>
                {isLastStep ? (
                  <Button
                    className="min-h-11 flex-1 sm:min-h-10"
                    disabled={completeDisabled}
                    onClick={handleWizardComplete}
                    type="button"
                  >
                    {completeLabel}
                  </Button>
                ) : (
                  <Button
                    className="min-h-11 flex-1 sm:min-h-10"
                    disabled={nextDisabled}
                    onClick={handleWizardNext}
                    type="button"
                  >
                    {nextLabel}
                  </Button>
                )}
              </fieldset>
            </motion.div>
          ) : null}
        </motion.div>
      )
    }, [
      active,
      backLabel,
      baseId,
      canGoBack,
      completeDisabled,
      completeLabel,
      handleWizardBack,
      handleWizardComplete,
      handleWizardNext,
      isLastStep,
      nextDisabled,
      nextLabel,
      panelId,
      reduceMotion,
      showNavigation,
      steps,
    ])

    const wizardContextValue = useMemo<WizardExpandableContextValue>(
      () => ({
        activeStepId: active,
        activeIndex,
        totalSteps: steps.length,
        isLastStep,
        canGoBack,
        canGoNext: effectiveCanGoNext,
        goNext: handleWizardNext,
        goBack: handleWizardBack,
        complete: handleWizardComplete,
      }),
      [
        active,
        activeIndex,
        canGoBack,
        effectiveCanGoNext,
        handleWizardBack,
        handleWizardComplete,
        handleWizardNext,
        isLastStep,
        steps.length,
      ]
    )

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
      <WizardExpandableContext.Provider value={wizardContextValue}>
        <div
          className={cn(
            "mx-auto w-full max-w-sm space-y-2 px-2 sm:max-w-lg sm:px-0",
            className
          )}
        >
          {badgeText && (
            <Badge
              className="border-border bg-muted text-muted-foreground"
              variant="outline"
            >
              {badgeText}
            </Badge>
          )}

          <MotionConfig transition={motionTransition}>
            <div
              className={cn(
                "w-full overflow-hidden rounded-[calc(var(--radius)+var(--toolbar-gutter))] antialiased",
                toolbarShellClass
              )}
              ref={ref}
              style={{ "--toolbar-gutter": "0.5rem" } as React.CSSProperties}
            >
              <div className="min-w-0">
                <div
                  className={cn(
                    "relative z-10",
                    isOpen ? "border-border/60 border-b" : ""
                  )}
                >
                  <ScrollArea
                    className="w-full"
                    maskHeight={16}
                    ref={(element) => {
                      if (element) {
                        menuContainerRef.current = element
                        menuRef(element)
                      }
                    }}
                    viewportClassName="scrollbar-hide"
                  >
                    <div
                      aria-label="Wizard steps"
                      className="flex w-max min-w-full touch-pan-x items-center p-px"
                      role="tablist"
                    >
                      {navigationButtons.map((button, index) => {
                        const tabFocusIndex =
                          active === null ? index === 0 : button.isActive

                        const isImmediatelyRightOfActive =
                          index > 0 &&
                          active !== null &&
                          steps[index - 1]?.id === active

                        const isImmediatelyLeftOfActive =
                          index < steps.length - 1 &&
                          active !== null &&
                          steps[index + 1]?.id === active

                        const activeTabFlushLeftWithHoveredNeighbor =
                          button.isActive &&
                          index > 0 &&
                          hoveredTabIndex === index - 1

                        const activeTabFlushRightWithHoveredNeighbor =
                          button.isActive &&
                          index < steps.length - 1 &&
                          hoveredTabIndex === index + 1

                        return (
                          <button
                            aria-controls={panelId}
                            aria-selected={button.isActive}
                            className={cn(
                              "flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3 py-3 text-muted-foreground text-sm outline-none transition-[color,background-color,transform] duration-150 ease-out sm:min-h-0 sm:px-4 sm:py-4",
                              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                              "active:scale-[0.98]",
                              button.isFirst &&
                                "rounded-tl-none rounded-bl-none",
                              button.isLast &&
                                "rounded-tr-none rounded-br-none",
                              isImmediatelyRightOfActive && "rounded-l-none",
                              isImmediatelyLeftOfActive && "rounded-r-none",
                              activeTabFlushLeftWithHoveredNeighbor &&
                                "rounded-l-none",
                              activeTabFlushRightWithHoveredNeighbor &&
                                "rounded-r-none",
                              button.isActive
                                ? "rounded-b-none bg-muted/50 font-medium text-foreground"
                                : "hover:bg-muted/60 active:bg-muted/70"
                            )}
                            data-step-index={index}
                            id={`${baseId}-tab-${button.id}`}
                            key={button.id}
                            onClick={button.onClick}
                            onKeyDown={(e) => handleTabKeyDown(e, index)}
                            onMouseEnter={() => setHoveredTabIndex(index)}
                            onMouseLeave={() => setHoveredTabIndex(null)}
                            ref={(el) => {
                              tabRefs.current[index] = el
                            }}
                            role="tab"
                            tabIndex={tabFocusIndex ? 0 : -1}
                            type="button"
                          >
                            <div
                              className={cn(
                                "flex size-5 shrink-0 items-center justify-center rounded-full font-bold text-[10px] tabular-nums leading-none shadow-[0px_1px_1px_0px_hsla(0,0%,0%,0.02)_inset,0px_1px_1px_0px_hsla(0,0%,0%,0.02)_inset,0px_0px_0px_1px_rgba(255,255,255,0.25)] transition-colors duration-200 ease-out sm:size-5 dark:shadow-[0px_1px_1px_0px_hsla(0,0%,100%,0.02)_inset,0px_1px_1px_0px_rgba(255,255,255,0.05)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.05)_inset,0px_0px_1px_0px_rgba(0,0,0,0.25)]",
                                button.isActive
                                  ? "bg-primary/15 text-primary ring-1 ring-primary/25"
                                  : "bg-muted/50 text-muted-foreground"
                              )}
                            >
                              {button.step}
                            </div>
                            <span className="font-medium text-foreground text-xs sm:text-sm">
                              {button.label}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </div>

                <div className="overflow-hidden">
                  <AnimatePresence initial={false} mode="wait">
                    {isOpen && active ? (
                      <motion.div
                        animate={{ height: heightContent || 0 }}
                        exit={{ height: 0 }}
                        initial={{ height: 0 }}
                        key="expanded-content"
                        transition={motionTransition}
                      >
                        <div
                          className="px-(--toolbar-gutter) pt-0 pb-2"
                          ref={contentRef}
                        >
                          <div
                            className={cn(
                              "rounded-t-none rounded-b-(--radius) bg-muted/50 px-3 pt-4 pb-1",
                              toolbarInnerWellClass
                            )}
                          >
                            <AnimatePresence initial={false} mode="wait">
                              {renderContent()}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </MotionConfig>
        </div>
      </WizardExpandableContext.Provider>
    )
  }
)

WizardExpandableInner.displayName = "WizardExpandableInner"

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
    if (!node) {
      return
    }

    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new ResizeObserver(([entry]) => {
      if (!entry) {
        return
      }
      const borderBox = entry.borderBoxSize?.[0]
      if (borderBox) {
        setBounds({
          left: 0,
          top: 0,
          width: borderBox.inlineSize,
          height: borderBox.blockSize,
        })
        return
      }
      const rect = entry.contentRect
      if (!rect) {
        return
      }
      const { left, top, width, height } = rect
      setBounds({ left, top, width, height })
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

function scrollElementToCenterInViewport(
  viewport: HTMLElement,
  target: HTMLElement,
  behavior: ScrollBehavior = "smooth"
) {
  const viewportRect = viewport.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  const targetCenter = targetRect.left + targetRect.width / 2
  const viewportCenter = viewportRect.left + viewportRect.width / 2
  const delta = targetCenter - viewportCenter
  const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth)
  const nextLeft = Math.max(0, Math.min(maxScroll, viewport.scrollLeft + delta))
  viewport.scrollTo({ left: nextLeft, behavior })
}

function useTouchPrimary() {
  const [isTouchPrimary, setIsTouchPrimary] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

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

interface ScrollFadeMask {
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
      viewportClassName,
      maskClassName,
      maskHeight = 30,
      ...props
    },
    ref
  ) => {
    const [showMask, setShowMask] = React.useState<ScrollFadeMask>({
      top: false,
      bottom: false,
      left: false,
      right: false,
    })
    const viewportRef = React.useRef<HTMLDivElement>(null)
    const isTouch = useTouchPrimary()

    const checkScrollability = React.useCallback(() => {
      const element = viewportRef.current
      if (!element) {
        return
      }

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
      if (typeof window === "undefined") {
        return
      }

      const element = viewportRef.current
      if (!element) {
        return
      }

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
    }, [checkScrollability])

    return (
      <ScrollAreaContext.Provider value={isTouch}>
        {isTouch ? (
          <section
            aria-label="Scrollable area"
            aria-roledescription="scroll area"
            className={cn("relative overflow-hidden", className)}
            data-slot="scroll-area"
            ref={ref}
            {...(props as React.HTMLAttributes<HTMLElement>)}
          >
            <div
              className={cn(
                "size-full overflow-auto overscroll-x-contain rounded-[inherit]",
                viewportClassName
              )}
              data-slot="scroll-area-viewport"
              ref={viewportRef}
            >
              {children}
            </div>

            {maskHeight > 0 && (
              <ScrollMask
                className={maskClassName}
                maskHeight={maskHeight}
                showMask={showMask}
              />
            )}
          </section>
        ) : (
          <ScrollAreaPrimitive.Root
            className={cn("relative overflow-hidden", className)}
            data-slot="scroll-area"
            ref={ref}
            {...props}
          >
            <ScrollAreaPrimitive.Viewport
              className={cn(
                "size-full overscroll-x-contain rounded-[inherit]",
                viewportClassName
              )}
              data-slot="scroll-area-viewport"
              ref={viewportRef}
            >
              {children}
            </ScrollAreaPrimitive.Viewport>

            {maskHeight > 0 && (
              <ScrollMask
                className={maskClassName}
                maskHeight={maskHeight}
                showMask={showMask}
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
  React.ComponentRef<typeof ScrollAreaPrimitive.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => {
  const isTouch = React.useContext(ScrollAreaContext)

  if (isTouch) {
    return null
  }

  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        "data-[state=visible]:fade-in-0 data-[state=hidden]:fade-out-0 flex touch-none select-none p-px transition-[colors] duration-150 hover:bg-muted data-[state=hidden]:animate-out data-[state=visible]:animate-in dark:hover:bg-muted/50",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent px-1 pr-1.25",
        className
      )}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      ref={ref}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        className={cn(
          "relative flex-1 origin-center rounded-full bg-border transition-[scale]",
          orientation === "vertical" && "my-1 active:scale-y-95",
          orientation === "horizontal" && "active:scale-x-98"
        )}
        data-slot="scroll-area-thumb"
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
})

ScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName

const ScrollMask = ({
  showMask,
  maskHeight,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  showMask: ScrollFadeMask
  maskHeight: number
}) => {
  return (
    <>
      <div
        {...props}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-10",
          "before:absolute before:inset-x-0 before:top-0 before:transition-[height,opacity] before:duration-300 before:content-['']",
          "after:absolute after:inset-x-0 after:bottom-0 after:transition-[height,opacity] after:duration-300 after:content-['']",
          "before:h-(--top-fade-height) after:h-(--bottom-fade-height)",
          showMask.top ? "before:opacity-100" : "before:opacity-0",
          showMask.bottom ? "after:opacity-100" : "after:opacity-0",
          "before:bg-linear-to-b before:from-background before:to-transparent",
          "after:bg-linear-to-t after:from-background after:to-transparent",
          className
        )}
        style={
          {
            "--top-fade-height": showMask.top ? `${maskHeight}px` : "0px",
            "--bottom-fade-height": showMask.bottom ? `${maskHeight}px` : "0px",
          } as React.CSSProperties
        }
      />
      <div
        {...props}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-10",
          "before:absolute before:inset-y-0 before:left-0 before:transition-[width,opacity] before:duration-300 before:content-['']",
          "after:absolute after:inset-y-0 after:right-0 after:transition-[width,opacity] after:duration-300 after:content-['']",
          "before:w-(--left-fade-width) after:w-(--right-fade-width)",
          showMask.left ? "before:opacity-100" : "before:opacity-0",
          showMask.right ? "after:opacity-100" : "after:opacity-0",
          "before:bg-linear-to-r before:from-background before:to-transparent",
          "after:bg-linear-to-l after:from-background after:to-transparent",
          className
        )}
        style={
          {
            "--left-fade-width": showMask.left ? `${maskHeight}px` : "0px",
            "--right-fade-width": showMask.right ? `${maskHeight}px` : "0px",
          } as React.CSSProperties
        }
      />
    </>
  )
}

export default function WizardExpandable(props: WizardExpandableProps) {
  return <WizardExpandableInner {...props} />
}
