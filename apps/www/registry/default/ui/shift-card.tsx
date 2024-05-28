"use client"

import * as React from "react"
import { AnimatePresence, MotionProps, motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface ShiftCardProps
  extends Omit<MotionProps, "onAnimationStart" | "onAnimationComplete"> {
  className?: string
  topContent?: React.ReactNode
  middleContent?: React.ReactNode
  topAnimateContent?: React.ReactNode
  bottomContent?: React.ReactNode
}

const ShiftCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
))
ShiftCardHeader.displayName = "ShiftCardHeader"

interface ShiftCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  isHovered: boolean
}
const ShiftCardContent = React.forwardRef<
  HTMLDivElement,
  ShiftCardContentProps
>(({ isHovered, children, ...divProps }, ref) => {
  // Explicitly define motion props to avoid passing incompatible HTML attributes
  const motionProps: MotionProps = {
    initial: { opacity: 0, height: 0 },
    animate: isHovered
      ? { opacity: 1, height: 194 }
      : { opacity: 1, height: 38 },
    transition: { duration: 0.3, delay: 0.1, ease: "circIn" },
  }

  return (
    <motion.div
      key="shift-card-content"
      ref={ref}
      {...motionProps}
      className={divProps.className}
    >
      {children}
    </motion.div>
  )
})
ShiftCardContent.displayName = "ShiftCardContent"

const ShiftCard = React.forwardRef<HTMLDivElement, ShiftCardProps>(
  (
    {
      className,
      topContent,
      topAnimateContent,
      middleContent,
      bottomContent,
      ...props
    },
    ref
  ) => {
    const [isHovered, setHovered] = React.useState(false)
    const handleMouseEnter = () => setHovered(true)
    const handleMouseLeave = () => setHovered(false)
    const handleTapStart = () => setHovered(true)
    const handleTapCancel = () => setHovered(false)
    const handleTap = () => setHovered(false)

    return (
      <motion.div
        ref={ref}
        className={cn(
          "min-h-[240px] w-[280px] md:min-h-[300px] md:w-[300px]",
          " group relative flex flex-col items-center justify-between overflow-hidden rounded-xl  p-3 text-sm ",
          " hover:cursor-pointer bg-card  ",
          "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
          /* 
          Applies a multi-layer shadow effect in dark mode:
          1. Two subtle white inset shadows: one horizontal at 1px height, and one around the entire border at 1px width, both with a very light opacity of 0.03, creating a slight inner glow.
          2. A series of black shadows:
              - A basic 1px black border shadow with 10% opacity to subtly outline the element.
              - Three progressively larger diffuse shadows at 2px, 4px, and 8px, each with 10% opacity, creating a depth effect that enhances the element's visual separation from the background.
          */
          "dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]",
          className
        )}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.02 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTapStart={handleTapStart}
        onTapCancel={handleTapCancel}
        onTap={handleTap}
        {...props}
      >
        <ShiftCardHeader className="flex h-[46px] w-full flex-col relative text-primary-foreground ">
          <div className=" w-full">
            {topContent}

            <AnimatePresence>
              {isHovered ? <>{topAnimateContent}</> : null}
            </AnimatePresence>
          </div>
        </ShiftCardHeader>

        <div className="pb-12 ">
          <AnimatePresence>
            {!isHovered ? <>{middleContent}</> : null}
          </AnimatePresence>
        </div>

        <ShiftCardContent
          isHovered={isHovered}
          className="absolute bottom-0 left-0 right-0 flex  flex-col gap-4  rounded-xl  "
        >
          <motion.div className="flex w-full flex-col gap-1  ">
            {bottomContent}
          </motion.div>
        </ShiftCardContent>
      </motion.div>
    )
  }
)

ShiftCard.displayName = "ShiftCard"

export { ShiftCard, ShiftCardHeader, ShiftCardContent }
export default ShiftCard
