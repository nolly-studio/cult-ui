"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"

const timerVariants = cva(
  [
    "inline-flex items-center gap-2 font-medium rounded-full transition-all duration-200",
    "",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-background text-foreground border border-border shadow-[0_2px_4px_rgba(0,0,0,0.02),_0px_1px_2px_rgba(0,0,0,0.04)] shadow-[inset_0px_-2.10843px_0px_0px_hsl(var(--muted)),_0px_1.20482px_6.3253px_0px_hsl(var(--muted))]",
        outline:
          "border border-input bg-background text-foreground  shadow-[0px_1px_0px_0px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_rgba(255,_255,_255,_0.25)]",
        ghost: "bg-transparent text-foreground ",
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/20",
      },
      size: {
        sm: "text-xs px-2 py-1 h-6 gap-1.5",
        md: "text-sm px-2.5 py-1.5 h-7 gap-2",
        lg: "text-base px-3 py-2 h-8 gap-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const timerIconVariants = cva("transition-transform duration-[2000ms]", {
  variants: {
    size: {
      sm: "w-3 h-3",
      md: "w-3.5 h-3.5",
      lg: "w-4 h-4",
    },
    loading: {
      true: "animate-spin",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    loading: false,
  },
})

const timerDisplayVariants = cva("font-mono tabular-nums tracking-tight", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type TimerRootProps = {
  /** Whether the timer is in loading/running state */
  loading?: boolean
} & VariantProps<typeof timerVariants> &
  React.HTMLAttributes<HTMLDivElement>

export type TimerIconProps = {
  /** Custom icon to display instead of default Clock */
  icon?: React.ComponentType<{ className?: string }>
} & VariantProps<typeof timerIconVariants> &
  React.HTMLAttributes<HTMLDivElement>

export type TimerDisplayProps = {
  /** Time value to display */
  time: string
  /** Optional label for accessibility */
  label?: string
} & VariantProps<typeof timerDisplayVariants> &
  React.HTMLAttributes<HTMLDivElement>

export type UseTimerOptions = {
  /** Whether the timer should be running */
  loading?: boolean
  /** Callback fired on each tick with elapsed time */
  onTick?: (seconds: number, milliseconds: number) => void
  /** Whether to reset timer when loading state changes */
  resetOnLoadingChange?: boolean
  /** Time format to use */
  format?: "SS.MS" | "MM:SS" | "HH:MM:SS"
}

export type UseTimerReturn = {
  /** Total elapsed seconds */
  elapsedTime: number
  /** Current milliseconds (0-999) */
  milliseconds: number
  /** Formatted time strings */
  formattedTime: {
    seconds: string
    milliseconds: string
    display: string
  }
  /** Whether timer is currently running */
  isRunning: boolean
  /** Reset timer to 0 */
  reset: () => void
  /** Start the timer */
  start: () => void
  /** Stop the timer */
  stop: () => void
}

/**
 * Root container for timer components
 */
export const TimerRoot = React.forwardRef<HTMLDivElement, TimerRootProps>(
  ({ variant, size, loading, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(timerVariants({ variant, size }), className)}
        role="timer"
        aria-live="polite"
        aria-atomic="true"
        {...props}
      >
        {children}
      </div>
    )
  }
)
TimerRoot.displayName = "TimerRoot"

/**
 * Icon component for timer with loading animation
 */
export const TimerIcon = React.forwardRef<HTMLDivElement, TimerIconProps>(
  ({ size, loading, icon: Icon = Clock, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(timerIconVariants({ size, loading }), className)}
        {...props}
      >
        <Icon className="w-full h-full" />
      </div>
    )
  }
)
TimerIcon.displayName = "TimerIcon"

/**
 * Display component for formatted time
 */
export const TimerDisplay = React.forwardRef<HTMLDivElement, TimerDisplayProps>(
  ({ size, time, label, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(timerDisplayVariants({ size }), className)}
        aria-label={label || `Timer: ${time}`}
        {...props}
      >
        {time}
      </div>
    )
  }
)
TimerDisplay.displayName = "TimerDisplay"

export type TimerProps = TimerRootProps &
  UseTimerOptions & {
    /** Time format to display */
    format?: "SS.MS" | "MM:SS" | "HH:MM:SS"
  } & React.HTMLAttributes<HTMLDivElement>

export const Timer = React.forwardRef<HTMLDivElement, TimerProps>(
  (
    {
      loading = false,
      onTick,
      resetOnLoadingChange = true,
      format = "SS.MS",
      variant,
      size,
      className,
      ...props
    },
    ref
  ) => {
    const { formattedTime } = useTimer({
      loading,
      onTick,
      resetOnLoadingChange,
      format,
    })

    return (
      <TimerRoot
        ref={ref}
        variant={variant}
        size={size}
        loading={loading}
        className={className}
        {...props}
      >
        <TimerIcon size={size} loading={loading} />
        <TimerDisplay size={size} time={formattedTime.display} />
      </TimerRoot>
    )
  }
)
Timer.displayName = "Timer"

/**
 * Hook for managing timer state and formatting
 */
export function useTimer({
  loading = false,
  onTick,
  resetOnLoadingChange = true,
  format = "SS.MS",
}: UseTimerOptions = {}): UseTimerReturn {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [milliseconds, setMilliseconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const startTimeRef = useRef<number>(0)
  const rafRef = useRef<number | null>(null)

  const reset = useCallback(() => {
    setElapsedTime(0)
    setMilliseconds(0)
    startTimeRef.current = 0
  }, [])

  const start = useCallback(() => {
    setIsRunning(true)
    startTimeRef.current = performance.now()
  }, [])

  const stop = useCallback(() => {
    setIsRunning(false)
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isRunning) return

    const updateTimer = () => {
      const now = performance.now()
      const elapsed = now - startTimeRef.current

      const newElapsedTime = Math.floor(elapsed / 1000)
      const newMilliseconds = Math.floor(elapsed % 1000)

      setElapsedTime(newElapsedTime)
      setMilliseconds(newMilliseconds)

      rafRef.current = requestAnimationFrame(updateTimer)
    }

    rafRef.current = requestAnimationFrame(updateTimer)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isRunning])

  useEffect(() => {
    if (loading) {
      if (resetOnLoadingChange) {
        reset()
      }
      start()
    } else {
      stop()
    }
  }, [loading, resetOnLoadingChange, reset, start, stop])

  useEffect(() => {
    if (onTick) {
      onTick(elapsedTime, milliseconds)
    }
  }, [elapsedTime, milliseconds, onTick])

  const formatTime = useCallback(
    (totalSeconds: number, ms: number) => {
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      switch (format) {
        case "HH:MM:SS":
          return {
            seconds: seconds.toString().padStart(2, "0"),
            milliseconds: Math.floor(ms / 10)
              .toString()
              .padStart(2, "0"),
            display: `${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
          }
        case "MM:SS":
          const totalMinutes = Math.floor(totalSeconds / 60)
          const remainingSeconds = totalSeconds % 60
          return {
            seconds: remainingSeconds.toString().padStart(2, "0"),
            milliseconds: Math.floor(ms / 10)
              .toString()
              .padStart(2, "0"),
            display: `${totalMinutes
              .toString()
              .padStart(2, "0")}:${remainingSeconds
              .toString()
              .padStart(2, "0")}`,
          }
        case "SS.MS":
        default:
          return {
            seconds: totalSeconds.toString().padStart(2, "0"),
            milliseconds: Math.floor(ms / 10)
              .toString()
              .padStart(2, "0"),
            display: `${totalSeconds.toString().padStart(2, "0")}.${Math.floor(
              ms / 10
            )
              .toString()
              .padStart(2, "0")}`,
          }
      }
    },
    [format]
  )

  const formattedTime = formatTime(elapsedTime, milliseconds)

  return {
    elapsedTime,
    milliseconds,
    formattedTime,
    isRunning,
    reset,
    start,
    stop,
  }
}
