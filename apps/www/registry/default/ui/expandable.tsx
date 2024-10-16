"use client"

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion"
import useMeasure from "react-use-measure"

import { cn } from "@/lib/utils"

const springConfig = { stiffness: 200, damping: 20, bounce: 0.2 }

interface ExpandableContextType {
  isExpanded: boolean // Indicates whether the component is expanded
  toggleExpand: () => void // Function to toggle the expanded state
  expandDirection: "vertical" | "horizontal" | "both" // Direction of expansion
  expandBehavior: "replace" | "push" // How the expansion affects surrounding content
  transitionDuration: number // Duration of the expansion/collapse animation
  easeType: string // Easing function for the animation
  initialDelay: number // Delay before the animation starts
  onExpandEnd?: () => void // Callback function when expansion ends
  onCollapseEnd?: () => void // Callback function when collapse ends
}

// Create a context with default values
const ExpandableContext = createContext<ExpandableContextType>({
  isExpanded: false,
  toggleExpand: () => {},
  expandDirection: "vertical", // 'vertical' | 'horizontal' | 'both' // Direction of expansion
  expandBehavior: "replace", // How the expansion affects surrounding content
  transitionDuration: 0.3, // Duration of the expansion/collapse animation
  easeType: "easeInOut", // Easing function for the animation
  initialDelay: 0,
})

// Custom hook to use the ExpandableContext
const useExpandable = () => useContext(ExpandableContext)

type ExpandablePropsBase = Omit<HTMLMotionProps<"div">, "children">

interface ExpandableProps extends ExpandablePropsBase {
  children: ReactNode | ((props: { isExpanded: boolean }) => ReactNode)
  expanded?: boolean
  onToggle?: () => void
  transitionDuration?: number
  easeType?: string
  expandDirection?: "vertical" | "horizontal" | "both"
  expandBehavior?: "replace" | "push"
  initialDelay?: number
  onExpandStart?: () => void
  onExpandEnd?: () => void
  onCollapseStart?: () => void
  onCollapseEnd?: () => void
}
// ROOT Expand component
const Expandable = React.forwardRef<HTMLDivElement, ExpandableProps>(
  (
    {
      children,
      expanded,
      onToggle,
      transitionDuration = 0.3,
      easeType = "easeInOut",
      expandDirection = "vertical",
      expandBehavior = "replace",
      initialDelay = 0,
      onExpandStart,
      onExpandEnd,
      onCollapseStart,
      onCollapseEnd,
      ...props
    },
    ref
  ) => {
    // Internal state for expansion when the component is uncontrolled
    const [isExpandedInternal, setIsExpandedInternal] = useState(false)

    // Use the provided expanded prop if available, otherwise use internal state
    const isExpanded = expanded !== undefined ? expanded : isExpandedInternal

    // Use the provided onToggle function if available, otherwise use internal toggle function
    const toggleExpand =
      onToggle || (() => setIsExpandedInternal((prev) => !prev))

    // Effect to call onExpandStart or onCollapseStart when isExpanded changes
    useEffect(() => {
      if (isExpanded) {
        onExpandStart?.()
      } else {
        onCollapseStart?.()
      }
    }, [isExpanded, onExpandStart, onCollapseStart])

    // Create the context value to be provided to child components
    const contextValue: ExpandableContextType = {
      isExpanded,
      toggleExpand,
      expandDirection,
      expandBehavior,
      transitionDuration,
      easeType,
      initialDelay,
      onExpandEnd,
      onCollapseEnd,
    }

    return (
      <ExpandableContext.Provider value={contextValue}>
        <motion.div
          ref={ref}
          initial={false}
          animate={{
            transition: {
              duration: transitionDuration,
              ease: easeType,
              delay: initialDelay,
            },
          }}
          {...props}
        >
          {/* Render children as a function if provided, otherwise render as is */}
          {typeof children === "function" ? children({ isExpanded }) : children}
        </motion.div>
      </ExpandableContext.Provider>
    )
  }
)

// Predefined animation presets
const ANIMATION_PRESETS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3 },
  },
  "slide-down": {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },
  "slide-left": {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.3 },
  },
  "slide-right": {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3 },
  },
  rotate: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: -10 },
    transition: { duration: 0.3 },
  },
  "blur-sm": {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" },
    transition: { duration: 0.3 },
  },
  "blur-md": {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(8px)" },
    transition: { duration: 0.3 },
  },
  "blur-lg": {
    initial: { opacity: 0, filter: "blur(16px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(16px)" },
    transition: { duration: 0.3 },
  },
}

// Props for defining custom animations
interface AnimationProps {
  initial?: object // Initial state of the animation
  animate?: object // Final state of the animation
  exit?: object // State when component is removed
  transition?: object // Transition properties
}

// Wrap this around items in the card that you want to be hidden then animated in on expansion
const ExpandableContent = React.forwardRef<
  HTMLDivElement,
  Omit<HTMLMotionProps<"div">, "ref"> & {
    preset?: keyof typeof ANIMATION_PRESETS
    animateIn?: AnimationProps
    animateOut?: AnimationProps
    stagger?: boolean
    staggerChildren?: number
    keepMounted?: boolean
  }
>(
  (
    {
      children,
      preset,
      animateIn,
      animateOut,
      stagger = false,
      staggerChildren = 0.1,
      keepMounted = false,
      ...props
    },
    ref
  ) => {
    const { isExpanded, transitionDuration, easeType } = useExpandable()
    // useMeasure is used to measure the height of the content
    const [measureRef, { height: measuredHeight }] = useMeasure()
    // useMotionValue creates a value that can be animated smoothly
    const animatedHeight = useMotionValue(0)
    // useSpring applies a spring animation to the height value
    const smoothHeight = useSpring(animatedHeight, springConfig)

    useEffect(() => {
      // Animate the height based on whether the content is expanded or collapsed
      if (isExpanded) {
        animatedHeight.set(measuredHeight)
      } else {
        animatedHeight.set(0)
      }
    }, [isExpanded, measuredHeight, animatedHeight])

    const presetAnimation = preset ? ANIMATION_PRESETS[preset] : {}
    const combinedAnimateIn = {
      ...presetAnimation,
      ...animateIn,
    }
    const combinedAnimateOut = animateOut || combinedAnimateIn

    return (
      // This motion.div animates the height of the content
      <motion.div
        ref={ref}
        style={{
          height: smoothHeight,
          overflow: "hidden",
        }}
        transition={{ duration: transitionDuration, ease: easeType }}
        {...props}
      >
        {/* AnimatePresence handles the entering and exiting of components */}
        <AnimatePresence initial={false}>
          {(isExpanded || keepMounted) && (
            // This motion.div handles the animation of the content itself
            <motion.div
              ref={measureRef}
              initial={combinedAnimateIn.initial}
              animate={combinedAnimateIn.animate}
              exit={combinedAnimateOut.exit}
              transition={{ duration: transitionDuration, ease: easeType }}
            >
              {stagger ? (
                // If stagger is true, we apply a staggered animation to the children
                <motion.div
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: staggerChildren,
                      },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {React.Children.map(
                    children as React.ReactNode,
                    (child, index) => (
                      <motion.div
                        key={index}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        {child}
                      </motion.div>
                    )
                  )}
                </motion.div>
              ) : (
                children
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }
)

interface ExpandableCardProps {
  children: ReactNode
  className?: string
  collapsedSize?: { width?: number; height?: number } // Size when collapsed
  expandedSize?: { width?: number; height?: number } // Size when expanded
  hoverToExpand?: boolean // Whether to expand on hover
  expandDelay?: number // Delay before expanding
  collapseDelay?: number // Delay before collapsing
}

const ExpandableCard = React.forwardRef<HTMLDivElement, ExpandableCardProps>(
  (
    {
      children,
      className = "",
      collapsedSize = { width: 320, height: 211 },
      expandedSize = { width: 480, height: undefined },
      hoverToExpand = false,
      expandDelay = 0,
      collapseDelay = 0,
      ...props
    },
    ref
  ) => {
    // Get the expansion state and toggle function from the ExpandableContext
    const { isExpanded, toggleExpand, expandDirection } = useExpandable()

    // Use useMeasure hook to get the dimensions of the content
    const [measureRef, { width, height }] = useMeasure()

    // Create motion values for width and height
    const animatedWidth = useMotionValue(collapsedSize.width || 0)
    const animatedHeight = useMotionValue(collapsedSize.height || 0)

    // Apply spring animation to the motion values
    const smoothWidth = useSpring(animatedWidth, springConfig)
    const smoothHeight = useSpring(animatedHeight, springConfig)

    // Effect to update the animated dimensions when expansion state changes
    useEffect(() => {
      if (isExpanded) {
        animatedWidth.set(expandedSize.width || width)
        animatedHeight.set(expandedSize.height || height)
      } else {
        animatedWidth.set(collapsedSize.width || width)
        animatedHeight.set(collapsedSize.height || height)
      }
    }, [
      isExpanded,
      collapsedSize,
      expandedSize,
      width,
      height,
      animatedWidth,
      animatedHeight,
    ])

    // Handler for hover start event
    const handleHover = () => {
      if (hoverToExpand && !isExpanded) {
        setTimeout(toggleExpand, expandDelay)
      }
    }

    // Handler for hover end event
    const handleHoverEnd = () => {
      if (hoverToExpand && isExpanded) {
        setTimeout(toggleExpand, collapseDelay)
      }
    }

    return (
      <motion.div
        ref={ref}
        className={cn("cursor-pointer", className)}
        style={{
          // Set width and height based on expansion direction
          width:
            expandDirection === "vertical" ? collapsedSize.width : smoothWidth,
          height:
            expandDirection === "horizontal"
              ? collapsedSize.height
              : smoothHeight,
        }}
        transition={springConfig}
        onHoverStart={handleHover}
        onHoverEnd={handleHoverEnd}
        {...props}
      >
        <div
          className={cn(
            "grid grid-cols-1 rounded-lg sm:rounded-xl md:rounded-[2rem]",
            "shadow-[inset_0_0_1px_1px_#ffffff4d] sm:shadow-[inset_0_0_2px_1px_#ffffff4d]",
            "ring-1 ring-black/5",
            "max-w-[calc(100%-1rem)] sm:max-w-[calc(100%-2rem)] md:max-w-[calc(100%-4rem)]",
            "mx-auto w-full",
            "transition-all duration-300 ease-in-out"
          )}
        >
          {/* Nested divs purely for styling and layout (the shadow ring around the card) */}
          <div className="grid grid-cols-1 rounded-lg sm:rounded-xl md:rounded-[2rem] p-1 sm:p-1.5 md:p-2 shadow-md shadow-black/5">
            <div className="rounded-md sm:rounded-lg md:rounded-3xl bg-white p-2 sm:p-3 md:p-4 shadow-xl ring-1 ring-black/5">
              <div className="w-full h-full overflow-hidden">
                {/* Ref for measuring content dimensions (so we can let framer know to animate into the dimensions) */}
                <div ref={measureRef} className="flex flex-col h-full">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }
)

ExpandableCard.displayName = "ExpandableCard"

// I'm telling you we just have to expand 🤌💵
const ExpandableTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const { toggleExpand } = useExpandable()
  return (
    <div ref={ref} onClick={toggleExpand} className="cursor-pointer" {...props}>
      {children}
    </div>
  )
})

ExpandableTrigger.displayName = "ExpandableTrigger"

const ExpandableCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  >
    <motion.div layout className="flex justify-between items-start">
      {children}
    </motion.div>
  </div>
))

ExpandableCardHeader.displayName = "ExpandableCardHeader"

const ExpandableCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0 px-4 overflow-hidden flex-grow", className)}
    {...props}
  >
    <motion.div layout>{children}</motion.div>
  </div>
))
ExpandableCardContent.displayName = "ExpandableCardContent"

const ExpandableCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 pt-0", className)}
    {...props}
  />
))
ExpandableCardFooter.displayName = "ExpandableCardFooter"

export {
  Expandable,
  useExpandable,
  ExpandableCard,
  ExpandableContent,
  ExpandableContext,
  ExpandableTrigger,
  ExpandableCardHeader,
  ExpandableCardContent,
  ExpandableCardFooter,
}
