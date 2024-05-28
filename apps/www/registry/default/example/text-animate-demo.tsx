"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

import { FadeIn } from "@/components/fade-in"

import TextAnimate from "../ui/text-animate"

// @ts-ignore
const AnimationDemo = ({ type, children }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col relative" ref={ref}>
      <div className="mt-8">
        <FadeIn key={count}>{children}</FadeIn>
      </div>
      <div className="absolute top-0 -right-5 md:right-5">
        <Refresh onClick={() => setCount(count + 1)} />
      </div>
      <div className="absolute bottom-0 -left-5 md:hidden">
        <Refresh onClick={() => setCount(count + 1)} />
      </div>
    </div>
  )
}

const button = {
  rest: { scale: 1 },
  hover: { scale: 1.1 },
  pressed: { scale: 0.95 },
}
const arrow = {
  rest: { rotate: 0 },
  hover: { rotate: 360, transition: { duration: 0.4 } },
}

// @ts-ignore
const Refresh = ({ onClick }) => {
  return (
    <motion.div
      className="p-1 border border-dotted rounded w-7 h-7  flex justify-center items-center cursor-pointer"
      onClick={onClick}
      variants={button}
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
    >
      <motion.svg
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        variants={arrow}
      >
        <path
          d="M12.8 5.1541V2.5a.7.7 0 0 1 1.4 0v5a.7.7 0 0 1-.7.7h-5a.7.7 0 0 1 0-1.4h3.573c-.7005-1.8367-2.4886-3.1-4.5308-3.1C4.8665 3.7 2.7 5.85 2.7 8.5s2.1665 4.8 4.8422 4.8c1.3035 0 2.523-.512 3.426-1.4079a.7.7 0 0 1 .986.9938C10.7915 14.0396 9.2186 14.7 7.5422 14.7 4.0957 14.7 1.3 11.9257 1.3 8.5s2.7957-6.2 6.2422-6.2c2.1801 0 4.137 1.1192 5.2578 2.8541z"
          className="fill-black dark:fill-white"
          fillRule="nonzero"
        />
      </motion.svg>
    </motion.div>
  )
}

export default function TextAnimationDemo() {
  return (
    <AnimationDemo type="TextAnimate">
      <div>
        <div className="flex flex-col">
          <div className="flex flex-col py-4">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold">Roll In</p>
                <div className="md:mt-12">
                  <TextAnimate text="Roll In" type="rollIn" />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold">Whip In</p>
                <div className="md:mt-12">
                  <TextAnimate
                    text="Whip In"
                    type="whipIn"
                    className="text-lg"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">fade In</p>
                <div className="md:mt-12">
                  <TextAnimate text="Fade In" type="fadeIn" />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold">Pop In</p>
                <div className="md:mt-12">
                  <TextAnimate text="Pop In" type="popIn" />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold">Fade In Up</p>
                <div className="md:mt-12">
                  <TextAnimate text="Fade In Up" type="fadeInUp" />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold">Shift In Up</p>
                <div className="md:mt-12">
                  <TextAnimate text="Shift In Up" type="shiftInUp" />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold">Whip In Up</p>
                <div className="md:mt-12">
                  <TextAnimate text="Whip In Up" type="whipInUp" />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold">Calm In Up</p>
                <div className="md:mt-12">
                  <TextAnimate text="Calm In Up" type="calmInUp" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationDemo>
  )
}
