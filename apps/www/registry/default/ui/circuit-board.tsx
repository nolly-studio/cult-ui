"use client"

import { useId } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, type Variants } from "motion/react"

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

const cardStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const cardFadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: spring,
  },
}

export function CircuitBoard() {
  const id = useId()

  return (
    <div className="flex flex-col items-center justify-center">
      <style>{`
        @keyframes pulse-glow {
          0%, 65%, 100% { opacity: 0; }
          12%, 28% { opacity: 1; }
        }
      `}</style>
      <div className="relative w-full max-w-[891px]">
        <svg
          aria-label="Circuit lines connecting to a CPU chip labeled Powered By"
          className="h-auto w-full overflow-visible"
          fill="none"
          height="264"
          role="img"
          viewBox="0 0 891 264"
          width="891"
        >
          <defs>
            {/* Orange Pulse Gradients */}
            <linearGradient
              id={`${id}-orange-pulse-1`}
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(255, 135, 0, 0)" />
              <stop offset="50%" stopColor="rgba(255, 135, 0, 1)" />
              <stop offset="100%" stopColor="rgba(255, 135, 0, 0)" />
              <animateTransform
                attributeName="gradientTransform"
                dur="2s"
                from="-1 0"
                repeatCount="indefinite"
                to="1 0"
                type="translate"
              />
            </linearGradient>

            <linearGradient
              id={`${id}-orange-pulse-2`}
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(255, 135, 0, 0)" />
              <stop offset="50%" stopColor="rgba(255, 135, 0, 1)" />
              <stop offset="100%" stopColor="rgba(255, 135, 0, 0)" />
              <animateTransform
                attributeName="gradientTransform"
                dur="2.5s"
                from="-1 0"
                repeatCount="indefinite"
                to="1 0"
                type="translate"
              />
            </linearGradient>

            {/* Blue Pulse Gradients */}
            <linearGradient
              id={`${id}-blue-pulse-1`}
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(0, 180, 216, 0)" />
              <stop offset="50%" stopColor="rgba(0, 180, 216, 1)" />
              <stop offset="100%" stopColor="rgba(0, 180, 216, 0)" />
              <animateTransform
                attributeName="gradientTransform"
                dur="2s"
                from="-1 0"
                repeatCount="indefinite"
                to="1 0"
                type="translate"
              />
            </linearGradient>

            <linearGradient
              id={`${id}-blue-pulse-2`}
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(0, 180, 216, 0)" />
              <stop offset="50%" stopColor="rgba(0, 180, 216, 1)" />
              <stop offset="100%" stopColor="rgba(0, 180, 216, 0)" />
              <animateTransform
                attributeName="gradientTransform"
                dur="1.8s"
                from="-1 0"
                repeatCount="indefinite"
                to="1 0"
                type="translate"
              />
            </linearGradient>

            {/* Pink Pulse Gradient */}
            <linearGradient
              id={`${id}-pink-pulse`}
              x1="0%"
              x2="0%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(255, 0, 128, 0)" />
              <stop offset="50%" stopColor="rgba(255, 0, 128, 1)" />
              <stop offset="100%" stopColor="rgba(255, 0, 128, 0)" />
              <animateTransform
                attributeName="gradientTransform"
                dur="2s"
                from="0 -1"
                repeatCount="indefinite"
                to="0 1"
                type="translate"
              />
            </linearGradient>

            {/* Connector pulse gradients (vertical direction) */}
            <linearGradient
              id={`${id}-blue-conn`}
              x1="0%"
              x2="0%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(0, 180, 216, 0)" />
              <stop offset="50%" stopColor="rgba(0, 180, 216, 0.8)" />
              <stop offset="100%" stopColor="rgba(0, 180, 216, 0)" />
              <animateTransform
                attributeName="gradientTransform"
                dur="2s"
                from="0 -1"
                repeatCount="indefinite"
                to="0 1"
                type="translate"
              />
            </linearGradient>
            <linearGradient
              id={`${id}-orange-conn`}
              x1="0%"
              x2="0%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(255, 135, 0, 0)" />
              <stop offset="50%" stopColor="rgba(255, 135, 0, 0.8)" />
              <stop offset="100%" stopColor="rgba(255, 135, 0, 0)" />
              <animateTransform
                attributeName="gradientTransform"
                dur="2s"
                from="0 -1"
                repeatCount="indefinite"
                to="0 1"
                type="translate"
              />
            </linearGradient>
            <linearGradient
              id={`${id}-mixed-conn`}
              x1="0%"
              x2="0%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(180, 120, 255, 0)" />
              <stop offset="50%" stopColor="rgba(180, 120, 255, 0.6)" />
              <stop offset="100%" stopColor="rgba(180, 120, 255, 0)" />
              <animateTransform
                attributeName="gradientTransform"
                dur="2.2s"
                from="0 -1"
                repeatCount="indefinite"
                to="0 1"
                type="translate"
              />
            </linearGradient>

            {/* Chip ambient halo */}
            <radialGradient id={`${id}-halo`}>
              <stop offset="0%" stopColor="rgba(255, 135, 0, 0.05)" />
              <stop offset="40%" stopColor="rgba(0, 180, 216, 0.025)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Static background lines */}
          <g
            className="stroke-black/[0.1] dark:stroke-white/[0.1]"
            strokeLinecap="round"
          >
            <path d="M388 96L388 68C388 65.7909 386.209 64 384 64L310 64" />
            <path d="M349 150L73 150C70.7909 150 69 151.791 69 154L69 174" />
            <path d="M574 96L574 4C574 1.79086 575.791 0 578 0L751 0" />
            <path d="M506 96L506 62C506 59.7909 507.791 58 510 58L579 58" />
            <path d="M388 96L388 44C388 41.7909 389.791 40 392 40L509 40C511.209 40 513 38.2091 513 36L513 0" />
            <path d="M547 110L822 110C824.209 110 826 108.209 826 106L826 0" />
            <path d="M349 110L67 110C64.7909 110 63 108.209 63 106L63 0" />
            <path d="M547 150L697 150C699.209 150 701 148.209 701 146L701 0" />
            <path d="M349 150L199 150C196.791 150 195 148.209 195 146L195 0" />
          </g>

          {/* Endpoint dots on visible static path terminals */}
          <g className="fill-black/[0.12] dark:fill-white/[0.15]">
            <circle cx="310" cy="64" r="2.5" />
            <circle cx="69" cy="174" r="2.5" />
            <circle cx="579" cy="58" r="2.5" />
          </g>

          {/* Orange animated line - right side */}
          <g>
            <path
              className="stroke-black/[0.1] dark:stroke-white/[0.1]"
              d="M547 130L822 130C824.209 130 826 131.791 826 134L826 264"
              strokeLinecap="round"
            />
            <path
              d="M547 130L822 130C824.209 130 826 131.791 826 134L826 264"
              opacity="0.3"
              stroke={`url(#${id}-orange-pulse-1)`}
              strokeWidth="6"
            />
            <path
              d="M547 130L822 130C824.209 130 826 131.791 826 134L826 264"
              stroke={`url(#${id}-orange-pulse-1)`}
              strokeWidth="2"
            />
            <circle fill="#ff8700" r="2.5">
              <animateMotion
                dur="3s"
                path="M547 130L822 130C824.209 130 826 131.791 826 134L826 264"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                dur="3s"
                keyTimes="0;0.1;0.9;1"
                repeatCount="indefinite"
                values="0;0.9;0.9;0"
              />
            </circle>
          </g>

          {/* Blue animated line - left side */}
          <g>
            <path
              className="stroke-black/[0.1] dark:stroke-white/[0.1]"
              d="M349 130L5.00002 130C2.79088 130 1.00001 131.791 1.00001 134L1.00001 264"
              strokeLinecap="round"
            />
            <path
              d="M349 130L5.00002 130C2.79088 130 1.00001 131.791 1.00001 134L1.00001 264"
              opacity="0.3"
              stroke={`url(#${id}-blue-pulse-1)`}
              strokeLinecap="round"
              strokeWidth="6"
            />
            <path
              d="M349 130L5.00002 130C2.79088 130 1.00001 131.791 1.00001 134L1.00001 264"
              stroke={`url(#${id}-blue-pulse-1)`}
              strokeLinecap="round"
              strokeWidth="2"
            />
            <circle fill="#00b4d8" r="2.5">
              <animateMotion
                dur="3.5s"
                path="M349 130L5.00002 130C2.79088 130 1.00001 131.791 1.00001 134L1.00001 264"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                dur="3.5s"
                keyTimes="0;0.1;0.9;1"
                repeatCount="indefinite"
                values="0;0.9;0.9;0"
              />
            </circle>
          </g>

          {/* Orange animated line - center right */}
          <g>
            <path
              className="stroke-black/[0.1] dark:stroke-white/[0.1]"
              d="M547 150L633 150C635.209 150 637 151.791 637 154L637 236C637 238.209 635.209 240 633 240L488 240C485.791 240 484 241.791 484 244L484 264"
              strokeLinecap="round"
            />
            <path
              d="M547 150L633 150C635.209 150 637 151.791 637 154L637 236C637 238.209 635.209 240 633 240L488 240C485.791 240 484 241.791 484 244L484 264"
              opacity="0.3"
              stroke={`url(#${id}-orange-pulse-2)`}
              strokeWidth="6"
            />
            <path
              d="M547 150L633 150C635.209 150 637 151.791 637 154L637 236C637 238.209 635.209 240 633 240L488 240C485.791 240 484 241.791 484 244L484 264"
              stroke={`url(#${id}-orange-pulse-2)`}
              strokeWidth="2"
            />
          </g>

          {/* Blue animated line - center left */}
          <g>
            <path
              className="stroke-black/[0.1] dark:stroke-white/[0.1]"
              d="M349 150L261 150C258.791 150 257 151.791 257 154L257 236C257 238.209 258.791 240 261 240L406 240C408.209 240 410 241.791 410 244L410 264"
              strokeLinecap="round"
            />
            <path
              d="M349 150L261 150C258.791 150 257 151.791 257 154L257 236C257 238.209 258.791 240 261 240L406 240C408.209 240 410 241.791 410 244L410 264"
              opacity="0.3"
              stroke={`url(#${id}-blue-pulse-2)`}
              strokeLinecap="round"
              strokeWidth="6"
            />
            <path
              d="M349 150L261 150C258.791 150 257 151.791 257 154L257 236C257 238.209 258.791 240 261 240L406 240C408.209 240 410 241.791 410 244L410 264"
              stroke={`url(#${id}-blue-pulse-2)`}
              strokeLinecap="round"
              strokeWidth="2"
            />
          </g>

          {/* Pink animated line - top */}
          <g>
            <path
              className="stroke-black/[0.1] dark:stroke-white/[0.1]"
              d="M506 96L506 0"
              strokeLinecap="round"
            />
            <path
              d="M506 96L506 0"
              opacity="0.3"
              stroke={`url(#${id}-pink-pulse)`}
              strokeLinecap="round"
              strokeWidth="6"
            />
            <path
              d="M506 96L506 0"
              stroke={`url(#${id}-pink-pulse)`}
              strokeLinecap="round"
              strokeWidth="2"
            />
            <circle fill="#ff0080" r="2">
              <animateMotion
                dur="2.5s"
                path="M506 96L506 0"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                dur="2.5s"
                keyTimes="0;0.1;0.9;1"
                repeatCount="indefinite"
                values="0;0.9;0.9;0"
              />
            </circle>
          </g>

          {/* Chip ambient halo */}
          <ellipse
            cx="448"
            cy="136"
            fill={`url(#${id}-halo)`}
            rx="180"
            ry="90"
          />

          {/* Junction nodes at chip connection points */}
          <g>
            <circle className="fill-orange-500/60" cx="547" cy="130" r="2.5">
              <animate
                attributeName="opacity"
                dur="2s"
                repeatCount="indefinite"
                values="0.4;1;0.4"
              />
            </circle>
            <circle className="fill-sky-500/60" cx="349" cy="130" r="2.5">
              <animate
                attributeName="opacity"
                dur="2.2s"
                repeatCount="indefinite"
                values="0.4;1;0.4"
              />
            </circle>
            <circle className="fill-orange-500/40" cx="547" cy="150" r="2">
              <animate
                attributeName="opacity"
                dur="2.5s"
                repeatCount="indefinite"
                values="0.3;0.8;0.3"
              />
            </circle>
            <circle className="fill-sky-500/40" cx="349" cy="150" r="2">
              <animate
                attributeName="opacity"
                dur="2.3s"
                repeatCount="indefinite"
                values="0.3;0.8;0.3"
              />
            </circle>
            <circle className="fill-pink-500/60" cx="506" cy="96" r="2.5">
              <animate
                attributeName="opacity"
                dur="2s"
                repeatCount="indefinite"
                values="0.4;1;0.4"
              />
            </circle>
          </g>

          {/* Connector paths: traces -> card columns */}
          {/* Blue left -> Card 1 (React) */}
          <g>
            <path
              className="stroke-black/[0.1] dark:stroke-white/[0.1]"
              d="M1 264 C1 290 60 320 148 320"
              strokeLinecap="round"
            />
            <path
              d="M1 264 C1 290 60 320 148 320"
              opacity="0.2"
              stroke={`url(#${id}-blue-conn)`}
              strokeLinecap="round"
              strokeWidth="5"
            />
            <path
              d="M1 264 C1 290 60 320 148 320"
              stroke={`url(#${id}-blue-conn)`}
              strokeLinecap="round"
              strokeWidth="1.5"
            />
            <circle
              className="fill-black/[0.12] dark:fill-white/[0.15]"
              cx="148"
              cy="320"
              r="2.5"
            />
          </g>

          {/* Blue center-left -> Card 2 (Turbopack) */}
          <g>
            <path
              className="stroke-black/[0.1] dark:stroke-white/[0.1]"
              d="M410 264 C410 290 430 320 445 320"
              strokeLinecap="round"
            />
            <path
              d="M410 264 C410 290 430 320 445 320"
              opacity="0.2"
              stroke={`url(#${id}-mixed-conn)`}
              strokeLinecap="round"
              strokeWidth="5"
            />
            <path
              d="M410 264 C410 290 430 320 445 320"
              stroke={`url(#${id}-mixed-conn)`}
              strokeLinecap="round"
              strokeWidth="1.5"
            />
          </g>

          {/* Orange center-right -> Card 2 (Turbopack) */}
          <g>
            <path
              className="stroke-black/[0.1] dark:stroke-white/[0.1]"
              d="M484 264 C484 290 462 320 445 320"
              strokeLinecap="round"
            />
            <path
              d="M484 264 C484 290 462 320 445 320"
              opacity="0.2"
              stroke={`url(#${id}-mixed-conn)`}
              strokeLinecap="round"
              strokeWidth="5"
            />
            <path
              d="M484 264 C484 290 462 320 445 320"
              stroke={`url(#${id}-mixed-conn)`}
              strokeLinecap="round"
              strokeWidth="1.5"
            />
            <circle
              className="fill-black/[0.12] dark:fill-white/[0.15]"
              cx="445"
              cy="320"
              r="2.5"
            />
          </g>

          {/* Orange right -> Card 3 (SWC) */}
          <g>
            <path
              className="stroke-black/[0.1] dark:stroke-white/[0.1]"
              d="M826 264 C826 290 800 320 748 320"
              strokeLinecap="round"
            />
            <path
              d="M826 264 C826 290 800 320 748 320"
              opacity="0.2"
              stroke={`url(#${id}-orange-conn)`}
              strokeLinecap="round"
              strokeWidth="5"
            />
            <path
              d="M826 264 C826 290 800 320 748 320"
              stroke={`url(#${id}-orange-conn)`}
              strokeLinecap="round"
              strokeWidth="1.5"
            />
            <circle
              className="fill-black/[0.12] dark:fill-white/[0.15]"
              cx="748"
              cy="320"
              r="2.5"
            />
          </g>
        </svg>

        {/* HTML CPU Chip overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute flex select-none items-center justify-center"
          style={{
            left: "50.3%",
            top: "51.3%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="flex flex-col items-center">
            {/* Top connectors */}
            <div className="flex gap-[5px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  className="block h-[6px] w-[7px] rounded-[1px] bg-black/5 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.08)] dark:bg-white/10 dark:shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.1)]"
                  key={`t-${i}`}
                />
              ))}
            </div>

            <div className="flex items-center">
              {/* Left connectors */}
              <div className="flex flex-col gap-[5px]">
                {Array.from({ length: 2 }).map((_, i) => (
                  <span
                    className="block h-[7px] w-[6px] rounded-[1px] bg-black/5 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.08)] dark:bg-white/10 dark:shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.1)]"
                    key={`l-${i}`}
                  />
                ))}
              </div>

              {/* Chip body */}
              <div
                className="relative rounded-lg px-5 py-4 sm:px-6 sm:py-5"
                style={{
                  background: "linear-gradient(180deg, #444 0%, #333 100%)",
                  boxShadow:
                    "0 2px 4px rgba(0,0,0,0.1), 0 6px 4px -2px rgba(0,0,0,0.15), inset 0 -3px 1px -1px rgba(0,0,0,0.25)",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 40%, transparent 60%)",
                  }}
                />
                <span className="relative whitespace-nowrap font-semibold text-base text-white leading-none tracking-tighter sm:text-xl md:text-2xl">
                  Powered By
                </span>
              </div>

              {/* Right connectors */}
              <div className="flex flex-col gap-[5px]">
                {Array.from({ length: 2 }).map((_, i) => (
                  <span
                    className="block h-[7px] w-[6px] rounded-[1px] bg-black/5 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.08)] dark:bg-white/10 dark:shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.1)]"
                    key={`r-${i}`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom connectors */}
            <div className="flex gap-[5px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  className="block h-[6px] w-[7px] rounded-[1px] bg-black/5 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.08)] dark:bg-white/10 dark:shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.1)]"
                  key={`b-${i}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technology Cards */}
      <motion.div
        animate="visible"
        className="-mt-4 relative z-10 grid w-full grid-cols-1 gap-4 md:grid-cols-3"
        initial="hidden"
        variants={cardStagger}
      >
        <TechCard
          description="The library for web and native user interfaces. Next.js is built on the latest React features, including Server Components and Actions."
          glowColor="rgba(0, 180, 216, 0.15)"
          glowDelay={0}
          href="https://react.dev"
          icon={<ReactIcon />}
          name="React"
        />
        <TechCard
          description={
            <>
              An incremental bundler optimized for JavaScript and TypeScript,
              written in Rust <RustIcon />, and built into Next.js.
            </>
          }
          glowColor="rgba(180, 120, 255, 0.15)"
          glowDelay={0.8}
          href="https://turbo.build/pack"
          icon={<TurbopackIcon />}
          name="Turbopack"
        />
        <TechCard
          description={
            <>
              An extensible Rust <RustIcon /> based platform for the next
              generation of fast developer tools, and can be used for both
              compilation and minification.
            </>
          }
          glowColor="rgba(255, 135, 0, 0.15)"
          glowDelay={1.6}
          href="https://swc.rs"
          icon={<SwcIcon />}
          name="Speedy Web Compiler"
        />
      </motion.div>
    </div>
  )
}

function TechCard({
  name,
  href,
  icon,
  description,
  glowColor,
  glowDelay,
}: {
  name: string
  href: string
  icon: React.ReactNode
  description: React.ReactNode
  glowColor: string
  glowDelay: number
}) {
  return (
    <motion.a
      className="group relative flex flex-col overflow-hidden rounded-xl bg-card p-6 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] transition-all duration-200 hover:bg-secondary/50 hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.06),0px_1px_2px_-1px_rgba(255,255,255,0.03),0px_2px_4px_0px_rgba(0,0,0,0.2)] dark:hover:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1),0px_1px_2px_-1px_rgba(255,255,255,0.05),0px_2px_4px_0px_rgba(0,0,0,0.25)]"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      variants={cardFadeUp}
    >
      {/* Glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          boxShadow: `0 0 24px 4px ${glowColor}, inset 0 0 16px 1px ${glowColor}`,
          animation: `pulse-glow 4s ease-in-out ${glowDelay}s infinite`,
        }}
      />
      {/* Top accent line */}
      <div
        className="pointer-events-none absolute inset-x-4 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
          animation: `pulse-glow 4s ease-in-out ${glowDelay}s infinite`,
        }}
      />
      <div className="mb-6 flex h-12 w-12 items-center justify-center">
        {icon}
      </div>
      <h3 className="mb-2 flex items-center gap-1 font-medium text-card-foreground text-lg transition-colors group-hover:text-card-foreground/80">
        {name}
        <ArrowUpRight className="group-hover:-translate-y-0.5 h-4 w-4 opacity-60 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </motion.a>
  )
}

function ReactIcon() {
  return (
    <svg className="h-12 w-12" fill="none" viewBox="0 0 48 48">
      <g className="opacity-80 dark:opacity-80">
        <circle cx="24" cy="24" fill="#61DAFB" r="4" />
        <ellipse
          cx="24"
          cy="24"
          fill="none"
          rx="18"
          ry="7"
          stroke="#61DAFB"
          strokeWidth="1.5"
        />
        <ellipse
          cx="24"
          cy="24"
          fill="none"
          rx="18"
          ry="7"
          stroke="#61DAFB"
          strokeWidth="1.5"
          transform="rotate(60 24 24)"
        />
        <ellipse
          cx="24"
          cy="24"
          fill="none"
          rx="18"
          ry="7"
          stroke="#61DAFB"
          strokeWidth="1.5"
          transform="rotate(120 24 24)"
        />
      </g>
    </svg>
  )
}

function TurbopackIcon() {
  return (
    <svg className="h-12 w-12" fill="none" viewBox="0 0 48 48">
      <g className="fill-foreground stroke-foreground">
        <rect
          className="opacity-60"
          fill="none"
          height="32"
          rx="4"
          strokeWidth="1.5"
          width="32"
          x="8"
          y="8"
        />
        <rect
          className="opacity-80"
          height="8"
          stroke="none"
          width="8"
          x="14"
          y="14"
        />
        <rect
          className="opacity-60"
          height="8"
          stroke="none"
          width="8"
          x="26"
          y="14"
        />
        <rect
          className="opacity-40"
          height="8"
          stroke="none"
          width="8"
          x="14"
          y="26"
        />
        <rect
          className="opacity-20"
          height="8"
          stroke="none"
          width="8"
          x="26"
          y="26"
        />
      </g>
    </svg>
  )
}

function SwcIcon() {
  return (
    <svg className="h-12 w-12" fill="none" viewBox="0 0 48 48">
      <path
        d="M8 28C8 28 12 20 16 20C20 20 20 28 24 28C28 28 28 20 32 20C36 20 40 28 40 28"
        fill="none"
        stroke="url(#swc-gradient)"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="swc-gradient"
          x1="8"
          x2="40"
          y1="24"
          y2="24"
        >
          <stop stopColor="#F9A825" />
          <stop offset="0.5" stopColor="#FF6F00" />
          <stop offset="1" stopColor="#E65100" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function RustIcon() {
  return (
    <svg
      className="mx-0.5 inline-block h-4 w-4 align-text-bottom"
      fill="none"
      viewBox="0 0 16 16"
    >
      <circle
        cx="8"
        cy="8"
        fill="none"
        r="6.5"
        stroke="#FF4F00"
        strokeWidth="1"
      />
      <circle cx="8" cy="8" fill="#FF4F00" r="1.5" />
      <path d="M8 3V5" stroke="#FF4F00" strokeLinecap="round" strokeWidth="1" />
      <path
        d="M8 11V13"
        stroke="#FF4F00"
        strokeLinecap="round"
        strokeWidth="1"
      />
      <path d="M3 8H5" stroke="#FF4F00" strokeLinecap="round" strokeWidth="1" />
      <path
        d="M11 8H13"
        stroke="#FF4F00"
        strokeLinecap="round"
        strokeWidth="1"
      />
    </svg>
  )
}
