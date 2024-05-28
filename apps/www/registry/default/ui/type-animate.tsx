"use client"

import { useEffect, useState } from "react"
import { animate, motion, useMotionValue, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

export function AnimatedContainer() {
  return (
    <motion.div className="flex w-full select-none items-center bg-black rounded-full h-[53px] md:h-[80px] justify-center">
      <motion.div
        variants={containerVariants}
        animate="visible"
        initial="hidden"
        className={cn(
          "relative h-[53px] md:h-[68px] py-3 px-2 md:py-5 w-[34rem] md:w-[53rem]",
          "before:absolute before:-inset-1 before:rounded-[9991px] before:border before:border-neutral-100/20 before:opacity-0 before:ring-2 before:ring-neutral-100/40 before:transition",
          "dark:before:border-orange-400/40 dark:before:ring-2 dark:before:ring-orange-900/40",
          "input-shadow-glow after:pointer-events-none after:absolute after:inset-px after:rounded-[9987px] after:shadow-white/5 after:transition",
          "focus-within:before:opacity-100 focus-within:after:shadow-orange-100/20 dark:after:shadow-white/5 dark:focus-within:after:shadow-orange-500/30"
        )}
      >
        <motion.span
          variants={itemVariants}
          className={cn(
            "w-full text-sm md:text-xl",
            "dark:border dark:border-black/40",
            "input-shadow rounded-[9988px] !outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50 sm:leading-6",
            "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-900 dark:focus:ring-orange-900",
            "relative border border-black/5 bg-black/90 pl-3 py-5 md:pl-8 md:pr-7 shadow-black/5 placeholder:text-stone-400 focus:bg-black",
            "text-white font-bold bg-black dark:text-neutral-100 dark:shadow-black/10 dark:placeholder:text-stone-500",
            "dark:focus:bg-neutral-900"
          )}
        >
          <TextAnimation delay={1} />
        </motion.span>
      </motion.div>
    </motion.div>
  )
}

export interface ITextAnimationProps {
  delay: number
}

function TextAnimation({ delay }: ITextAnimationProps) {
  const [animationComplete, setAnimationComplete] = useState(false)
  const baseText = "Create a "
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  )

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      delay,
      duration: 1,
      ease: "easeInOut",
      onComplete: () => setAnimationComplete(true),
    })
    return controls.stop
  }, [count, baseText.length, delay])

  return (
    <span>
      <motion.span>{displayText}</motion.span>
      {animationComplete && <RepeatedTextAnimation delay={delay + 1} />}
      <BlinkingCursor />
    </span>
  )
}

export interface IRepeatedTextAnimationProps {
  delay: number
}

function RepeatedTextAnimation({ delay }: IRepeatedTextAnimationProps) {
  const textIndex = useMotionValue(0)
  const texts = [
    "quiz page with questions and answers",
    "blog Article Details Page Layout",
    "ecommerce dashboard with a sidebar navigation and a table of recent orders.",
    "ui like platform.openai.com....",
    "buttttton",
    "fully detailed landing page for an application that tracks non-standard split sleep cycles",
    "transparent card to showcase achievements of a user",
    "list of product categories with image, name and description.",
    "landing page hero section with a heading, leading text and an opt-in form.",
    "contact form with first name, last name, email, and message fields.",
  ]

  const baseText = useTransform(textIndex, (latest) => texts[latest] || "")
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest)
  )
  const updatedThisRound = useMotionValue(true)

  useEffect(() => {
    const animation = animate(count, 60, {
      type: "tween",
      delay,
      duration: 1,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1,
      onUpdate(latest) {
        if (updatedThisRound.get() && latest > 0) {
          updatedThisRound.set(false)
        } else if (!updatedThisRound.get() && latest === 0) {
          textIndex.set((textIndex.get() + 1) % texts.length)
          updatedThisRound.set(true)
        }
      },
    })
    return () => animation.stop()
  }, [count, delay, textIndex, texts, updatedThisRound])

  return <motion.span className="inline">{displayText}</motion.span>
}

const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1],
    },
  },
}

function BlinkingCursor() {
  return (
    <motion.div
      variants={cursorVariants}
      animate="blinking"
      className="inline-block h-5 w-[1px] translate-y-1 bg-neutral-900"
    />
  )
}
