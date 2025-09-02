"use client"

import type React from "react"
import { useState } from "react"
import { ExternalLinkIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// V0 Logo component
const V0Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 40 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
      fill="currentColor"
    ></path>
    <path
      d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
      fill="currentColor"
    ></path>
  </svg>
)

export interface OpenInV0ButtonProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  name: string
  className?: string
}

export function OpenInV0Button({
  name,
  className,
  ...props
}: OpenInV0ButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isSmallScreen = useMediaQuery("(max-width: 640px)")
  const url = `https://v0.dev/chat/api/open?url=https://cult-ui.com/r/${name}.json`

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "group flex items-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-800",
              className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Open in v0"
            {...props}
          >
            {/* Logo section */}
            <div className="flex h-full items-center gap-2 border-r border-zinc-800 bg-zinc-900 px-3 py-2">
              <V0Logo
                className={cn("text-zinc-100", isSmallScreen ? "h-3.5" : "h-4")}
              />
            </div>

            {/* Text section */}
            <div className="flex w-full flex-1 items-center px-3 py-2">
              <span
                className={cn(
                  "font-medium text-zinc-100",
                  isSmallScreen ? "text-xs" : "text-sm"
                )}
              >
                Open in v0
              </span>
            </div>

            {/* Icon section */}
            <div className="flex items-center px-2">
              <AnimatePresence>
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: isHovered ? 2 : 0 }}
                  className="text-zinc-400 transition-colors duration-200 group-hover:text-emerald-400"
                >
                  <ExternalLinkIcon
                    className={isSmallScreen ? "size-3.5" : "size-4"}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </a>
        </TooltipTrigger>
        <TooltipContent side="bottom">Open this component in v0</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
