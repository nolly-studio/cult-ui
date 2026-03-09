"use client"

import type * as React from "react"
import {
  Children,
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  type PropsWithChildren,
} from "react"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const stepIndicatorVariants = cva("flex items-center justify-center gap-2", {
  variants: {
    variant: {
      dots: "",
      pills: "",
    },
  },
  defaultVariants: {
    variant: "dots",
  },
})

const stepDotVariants = cva("rounded-full transition-all duration-200", {
  variants: {
    variant: {
      dots: "size-2 data-[state=active]:size-2.5 data-[state=active]:bg-foreground data-[state=completed]:bg-foreground/60 data-[state=inactive]:bg-muted-foreground/30",
      pills:
        "h-1 max-w-8 flex-1 rounded-full data-[state=active]:bg-foreground data-[state=completed]:bg-foreground/60 data-[state=inactive]:bg-muted-foreground/30",
    },
  },
  defaultVariants: {
    variant: "dots",
  },
})

export interface StepIndicatorProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof stepIndicatorVariants>,
    VariantProps<typeof stepDotVariants> {
  /** Current step index (1-based) */
  currentStep: number
  /** Total number of steps */
  totalSteps: number
  /** Optional className for each step dot */
  dotClassName?: string
}

/**
 * Headless step indicator primitive.
 * Renders a list of step dots with proper ARIA for progress indication.
 * No visual styling—consumer provides via className.
 */
export function StepIndicator({
  currentStep,
  totalSteps,
  variant = "dots",
  className,
  dotClassName,
  ...props
}: StepIndicatorProps) {
  return (
    <div
      aria-label={`Step ${currentStep} of ${totalSteps}`}
      aria-valuemax={totalSteps}
      aria-valuemin={1}
      aria-valuenow={currentStep}
      className={cn(stepIndicatorVariants({ variant }), className)}
      data-slot="onboarding-step-indicator"
      role="progressbar"
      {...props}
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNumber = i + 1
        const isActive = currentStep === stepNumber
        const isCompleted = currentStep > stepNumber
        let stepState: "active" | "completed" | "inactive" = "inactive"
        if (isActive) {
          stepState = "active"
        } else if (isCompleted) {
          stepState = "completed"
        }
        return (
          <div
            aria-current={isActive ? "step" : undefined}
            className={cn(stepDotVariants({ variant }), dotClassName)}
            data-slot="onboarding-step-dot"
            data-state={stepState}
            key={stepNumber}
          />
        )
      })}
    </div>
  )
}

// ============================================================================
// Types
// ============================================================================

export interface OnboardingContextValue {
  /** Current step index (1-based) */
  currentStep: number
  /** Total number of steps */
  totalSteps: number
  /** Sub-step value (e.g. feature carousel index within step 1) */
  stepValue: number
  /** Set current step */
  setStep: (step: number | ((prev: number) => number)) => void
  /** Set step value (sub-step) */
  setStepValue: (value: number | ((prev: number) => number)) => void
  /** Max step value for current step (e.g. feature count - 1) */
  maxStepValue: number
  /** Whether user can proceed to next */
  canGoNext: boolean
  /** Whether user can go back */
  canGoBack: boolean
  /** Navigate to previous step */
  handleBack: () => void
  /** Navigate to next step or advance sub-step */
  handleNext: () => void
  /** Complete onboarding */
  handleComplete: () => void
  /** Callback when onboarding is completed */
  onComplete?: () => void
}

// ============================================================================
// Context
// ============================================================================

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) {
    throw new Error("Onboarding components must be used within Onboarding.Root")
  }
  return ctx
}

// ============================================================================
// Root
// ============================================================================

export interface OnboardingRootProps
  extends PropsWithChildren,
    Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  /** Controlled step index (1-based) */
  value?: number
  /** Default step index (uncontrolled) */
  defaultValue?: number
  /** Callback when step changes */
  onValueChange?: (step: number) => void
  /** Controlled sub-step value */
  stepValue?: number
  /** Default sub-step value (uncontrolled) */
  defaultStepValue?: number
  /** Callback when sub-step value changes */
  onStepValueChange?: (value: number) => void
  /** Total number of steps */
  totalSteps: number
  /** Max sub-step value for step 1 (e.g. feature count - 1). Default 0 = no sub-steps */
  maxStepValue?: number
  /** Callback when onboarding is completed */
  onComplete?: () => void
  /** Custom logic for whether user can proceed. Receives (step, stepValue). Default: true */
  canGoNext?: (step: number, stepValue: number) => boolean
}

function OnboardingRoot({
  value: controlledValue,
  defaultValue = 1,
  onValueChange,
  stepValue: controlledStepValue,
  defaultStepValue = 0,
  onStepValueChange,
  totalSteps,
  maxStepValue: controlledMaxStepValue = 0,
  onComplete,
  canGoNext: canGoNextFn,
  children,
  className,
  ...props
}: OnboardingRootProps) {
  const [currentStep, setCurrentStep] = useControllableState({
    prop: controlledValue,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  const [stepValue, setStepValueState] = useControllableState({
    prop: controlledStepValue,
    defaultProp: defaultStepValue,
    onChange: onStepValueChange,
  })

  const maxStepValue = controlledMaxStepValue ?? 0

  const canGoNext = canGoNextFn ? canGoNextFn(currentStep, stepValue) : true

  const canGoBack = currentStep > 1 || stepValue > 0

  const handleNext = useCallback(() => {
    if (currentStep === 1 && stepValue < maxStepValue) {
      setStepValueState((prev) => prev + 1)
    } else if (currentStep < totalSteps) {
      setStepValueState(0)
      setCurrentStep((prev) => prev + 1)
    }
  }, [
    currentStep,
    stepValue,
    maxStepValue,
    totalSteps,
    setStepValueState,
    setCurrentStep,
  ])

  const handleBack = useCallback(() => {
    if (currentStep === 1 && stepValue > 0) {
      setStepValueState((prev) => prev - 1)
    } else if (currentStep === 2) {
      setCurrentStep(1)
      setStepValueState(maxStepValue)
    } else if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep, stepValue, maxStepValue, setStepValueState, setCurrentStep])

  const handleComplete = useCallback(() => {
    onComplete?.()
  }, [onComplete])

  const contextValue = useMemo<OnboardingContextValue>(
    () => ({
      currentStep,
      totalSteps,
      stepValue,
      setStep: setCurrentStep,
      setStepValue: setStepValueState,
      maxStepValue,
      canGoNext,
      canGoBack,
      handleBack,
      handleNext,
      handleComplete,
      onComplete,
    }),
    [
      currentStep,
      totalSteps,
      stepValue,
      setCurrentStep,
      setStepValueState,
      maxStepValue,
      canGoNext,
      canGoBack,
      handleBack,
      handleNext,
      handleComplete,
      onComplete,
    ]
  )

  return (
    <OnboardingContext.Provider value={contextValue}>
      <div
        className={cn(
          "flex flex-col rounded-xl border bg-background p-6 shadow-sm",
          className
        )}
        data-slot="onboarding"
        data-state={`step-${currentStep}`}
        {...props}
      >
        {children}
      </div>
    </OnboardingContext.Provider>
  )
}

// ============================================================================
// Step
// ============================================================================

export interface OnboardingStepProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /** Step index (1-based) - content renders when currentStep matches */
  step: number
}

function OnboardingStep({
  step,
  children,
  className,
  ...props
}: OnboardingStepProps) {
  const { currentStep } = useOnboarding()
  const isActive = currentStep === step

  if (!isActive) {
    return null
  }

  return (
    <div
      className={cn(className)}
      data-slot="onboarding-step"
      data-state="active"
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// StepIndicator
// ============================================================================

export interface OnboardingStepIndicatorProps
  extends Omit<
    React.ComponentProps<typeof StepIndicator>,
    "currentStep" | "totalSteps"
  > {}

function OnboardingStepIndicator(props: OnboardingStepIndicatorProps) {
  const { currentStep, totalSteps } = useOnboarding()
  return (
    <StepIndicator
      currentStep={currentStep}
      totalSteps={totalSteps}
      {...props}
    />
  )
}

// ============================================================================
// Header
// ============================================================================

export interface OnboardingHeaderProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /** Step title (optional when using children) */
  title?: string
  /** Step description */
  description?: string
  /** Custom header content (overrides title/description) */
  children?: React.ReactNode
}

function OnboardingHeader({
  title,
  description,
  children,
  className,
  ...props
}: OnboardingHeaderProps) {
  if (children) {
    return (
      <div
        className={cn("text-center", className)}
        data-slot="onboarding-header"
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-1 text-center",
        "[&_[data-slot=onboarding-title]]:font-normal [&_[data-slot=onboarding-title]]:font-serif [&_[data-slot=onboarding-title]]:text-3xl [&_[data-slot=onboarding-title]]:text-foreground",
        "[&_[data-slot=onboarding-description]]:text-base [&_[data-slot=onboarding-description]]:text-muted-foreground",
        className
      )}
      data-slot="onboarding-header"
      {...props}
    >
      {title != null && <h2 data-slot="onboarding-title">{title}</h2>}
      {description && <p data-slot="onboarding-description">{description}</p>}
    </div>
  )
}

// ============================================================================
// Navigation
// ============================================================================

export interface OnboardingNavigationProps
  extends React.ComponentPropsWithoutRef<"fieldset"> {
  /** Back button label */
  backLabel?: string
  /** Next button label */
  nextLabel?: string
  /** Complete button label */
  completeLabel?: string
  /** Override can go next (when not using Root's canGoNext) */
  canGoNext?: boolean
  /** Custom navigation content (use with asChild for full control) */
  children?: React.ReactNode
}

function OnboardingNavigation({
  backLabel = "Back",
  nextLabel = "Next",
  completeLabel = "Start Creating",
  canGoNext: canGoNextOverride,
  children,
  className,
  ...props
}: OnboardingNavigationProps) {
  const {
    currentStep,
    totalSteps,
    canGoNext: contextCanGoNext,
    canGoBack,
    handleBack,
    handleNext,
    handleComplete,
  } = useOnboarding()

  const canGoNext = canGoNextOverride ?? contextCanGoNext
  const isLastStep = currentStep === totalSteps

  if (children) {
    return (
      <fieldset
        className={cn("flex gap-3", className)}
        data-slot="onboarding-navigation"
        {...props}
      >
        {children}
      </fieldset>
    )
  }

  return (
    <fieldset
      aria-label="Onboarding navigation"
      className={cn("flex gap-3", className)}
      data-slot="onboarding-navigation"
      {...props}
    >
      <Button
        aria-label={backLabel}
        className="flex-1 rounded-xl py-5"
        data-slot="onboarding-back"
        disabled={!canGoBack}
        onClick={handleBack}
        variant="outline"
      >
        {backLabel}
      </Button>
      {isLastStep ? (
        <Button
          aria-label={completeLabel}
          className="flex-1 rounded-xl bg-foreground py-5 text-background hover:bg-foreground/90"
          data-slot="onboarding-complete"
          onClick={handleComplete}
        >
          {completeLabel}
        </Button>
      ) : (
        <Button
          aria-label={nextLabel}
          className="flex-1 rounded-xl bg-foreground py-5 text-background hover:bg-foreground/90"
          data-slot="onboarding-next"
          disabled={!canGoNext}
          onClick={handleNext}
        >
          {nextLabel}
        </Button>
      )}
    </fieldset>
  )
}

// ============================================================================
// Types
// ============================================================================

type Orientation = "horizontal" | "vertical" | "grid"

interface ChoiceGroupContextValue {
  value: string | null
  setValue: (value: string) => void
  name: string
  orientation: Orientation
}

// ============================================================================
// Context
// ============================================================================

const ChoiceGroupContext = createContext<ChoiceGroupContextValue | null>(null)

function useChoiceGroup() {
  const ctx = useContext(ChoiceGroupContext)
  if (!ctx) {
    throw new Error("ChoiceGroup.Item must be used within ChoiceGroup")
  }
  return ctx
}

// ============================================================================
// Root
// ============================================================================

export interface ChoiceGroupProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "defaultValue"> {
  /** Controlled selected value */
  value?: string | null
  /** Default selected value (uncontrolled) */
  defaultValue?: string | null
  /** Callback when selection changes */
  onValueChange?: (value: string) => void
  /** Name for radio group semantics (required for accessibility) */
  name: string
  /** Layout orientation */
  orientation?: Orientation
}

function ChoiceGroupRoot({
  value: controlledValue,
  defaultValue = null,
  onValueChange,
  name,
  orientation = "grid",
  children,
  className,
  ...props
}: ChoiceGroupProps) {
  const [value, setValueState] = useControllableState({
    prop: controlledValue ?? undefined,
    defaultProp: defaultValue ?? null,
    onChange: (v) => v !== null && onValueChange?.(v),
  })

  const setValue = useCallback(
    (v: string) => {
      setValueState(v)
    },
    [setValueState]
  )

  const contextValue = useMemo<ChoiceGroupContextValue>(
    () => ({
      value,
      setValue,
      name,
      orientation,
    }),
    [value, setValue, name, orientation]
  )

  return (
    <ChoiceGroupContext.Provider value={contextValue}>
      <div
        aria-label={name}
        className={cn(className)}
        data-orientation={orientation}
        data-slot="choice-group"
        role="radiogroup"
        {...props}
      >
        {children}
      </div>
    </ChoiceGroupContext.Provider>
  )
}

// ============================================================================
// Item
// ============================================================================

export interface ChoiceGroupItemProps
  extends React.ComponentPropsWithoutRef<"label"> {
  /** Value when this item is selected */
  value: string
}

function ChoiceGroupItemComponent({
  value: itemValue,
  children,
  className,
  ...props
}: ChoiceGroupItemProps) {
  const { value, setValue, name } = useChoiceGroup()
  const isSelected = value === itemValue

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.checked) {
        setValue(itemValue)
      }
    },
    [itemValue, setValue]
  )

  return (
    <label
      className={cn(className)}
      data-slot="choice-group-item"
      data-state={isSelected ? "selected" : "unselected"}
      {...props}
    >
      <input
        checked={isSelected}
        className="sr-only"
        name={name}
        onChange={handleChange}
        type="radio"
        value={itemValue}
      />
      {children}
    </label>
  )
}

ChoiceGroupItemComponent.displayName = "ChoiceGroupItem"

// ============================================================================
// Export
// ============================================================================

export const ChoiceGroup = Object.assign(ChoiceGroupRoot, {
  Item: ChoiceGroupItemComponent,
})

// ============================================================================
// Types
// ============================================================================

interface FeatureCarouselContextValue {
  value: number
  setValue: (value: number | ((prev: number) => number)) => void
  totalItems: number
  isActive: (index: number) => boolean
}

// ============================================================================
// Context
// ============================================================================

const FeatureCarouselContext =
  createContext<FeatureCarouselContextValue | null>(null)

function useFeatureCarousel() {
  const ctx = useContext(FeatureCarouselContext)
  if (!ctx) {
    throw new Error("FeatureCarousel.Item must be used within FeatureCarousel")
  }
  return ctx
}

// ============================================================================
// Root
// ============================================================================

export interface FeatureCarouselProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /** Controlled active index */
  value?: number
  /** Default active index (uncontrolled) */
  defaultValue?: number
  /** Callback when active index changes */
  onValueChange?: (index: number) => void
  /** Total number of items (derived from children if not provided) */
  totalItems?: number
}

function FeatureCarouselRoot({
  value: controlledValue,
  defaultValue = 0,
  onValueChange,
  totalItems: totalItemsProp,
  children,
  className,
  ...props
}: FeatureCarouselProps) {
  const [value, setValue] = useControllableState({
    prop: controlledValue,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  const totalItems = totalItemsProp ?? Children.count(children)

  const isActive = useCallback((index: number) => value === index, [value])

  const contextValue = useMemo<FeatureCarouselContextValue>(
    () => ({
      value,
      setValue,
      totalItems,
      isActive,
    }),
    [value, setValue, totalItems, isActive]
  )

  return (
    <FeatureCarouselContext.Provider value={contextValue}>
      <div
        aria-label="Features"
        className={cn(className)}
        data-slot="feature-carousel"
        role="tablist"
        {...props}
      >
        {children}
      </div>
    </FeatureCarouselContext.Provider>
  )
}

// ============================================================================
// Item
// ============================================================================

export interface FeatureCarouselItemProps
  extends React.ComponentPropsWithoutRef<"button"> {
  /** Index of this item (0-based) */
  index: number
}

function FeatureCarouselItemComponent({
  index,
  children,
  className,
  onClick,
  ...props
}: FeatureCarouselItemProps) {
  const { setValue, isActive, totalItems } = useFeatureCarousel()
  const active = isActive(index)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setValue(index)
      onClick?.(e)
    },
    [index, setValue, onClick]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (totalItems <= 1) {
        return
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        setValue((prev) => Math.min(prev + 1, totalItems - 1))
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        setValue((prev) => Math.max(prev - 1, 0))
      }
    },
    [totalItems, setValue]
  )

  return (
    <button
      aria-selected={active}
      className={cn(className)}
      data-slot="feature-carousel-item"
      data-state={active ? "active" : "inactive"}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="tab"
      tabIndex={active ? 0 : -1}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

FeatureCarouselItemComponent.displayName = "FeatureCarouselItem"

// ============================================================================
// Export
// ============================================================================

export const FeatureCarousel = Object.assign(FeatureCarouselRoot, {
  Item: FeatureCarouselItemComponent,
})

// ============================================================================
// TipsList
// ============================================================================

export interface TipsListProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Optional title/label for the list */
  title?: string
}

/**
 * Headless tips list primitive.
 * Renders an ordered list with optional title.
 * No visual styling—consumer provides via className.
 */
function TipsListRoot({ title, children, className, ...props }: TipsListProps) {
  const titleId = useId()
  return (
    <div className={cn(className)} data-slot="tips-list" {...props}>
      {title && (
        <p className="sr-only" data-slot="tips-list-title" id={titleId}>
          {title}
        </p>
      )}
      <ol
        aria-label={title ? undefined : "Tips"}
        aria-labelledby={title ? titleId : undefined}
        data-slot="tips-list-items"
      >
        {children}
      </ol>
    </div>
  )
}

// ============================================================================
// Item
// ============================================================================

export interface TipsListItemProps
  extends React.ComponentPropsWithoutRef<"li"> {
  /** Optional number to display (for custom styling) */
  number?: number
}

function TipsListItemComponent({
  number,
  children,
  className,
  ...props
}: TipsListItemProps) {
  return (
    <li
      className={cn(className)}
      data-number={number}
      data-slot="tips-list-item"
      {...props}
    >
      {number != null && (
        <span aria-hidden data-slot="tips-list-item-number">
          {number}
        </span>
      )}
      {children}
    </li>
  )
}

// ============================================================================
// Export
// ============================================================================

export const TipsList = Object.assign(TipsListRoot, {
  Item: TipsListItemComponent,
})

// ============================================================================
// Export
// ============================================================================

export const Onboarding = Object.assign(OnboardingRoot, {
  Step: OnboardingStep,
  StepIndicator: OnboardingStepIndicator,
  Header: OnboardingHeader,
  Navigation: OnboardingNavigation,
})

export { useOnboarding }
