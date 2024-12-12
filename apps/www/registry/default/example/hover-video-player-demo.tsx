"use client"

import React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

import { GradientHeading } from "../ui/gradient-heading"
import { HoverVideoPlayer } from "../ui/hover-video-player"

export default function HoverVideoPlayerDemo() {
  return (
    <div className="flex flex-col gap-12 py-12 w-full h-full items-center justify-center">
      <div className="text-center">
        <GradientHeading>Hover video player</GradientHeading>
      </div>
      <motion.div
        initial={{ maxWidth: "24rem" }} // 96 in rem
        whileHover={{ maxWidth: "100%" }}
        transition={{
          duration: 0.5,
          ease: [0.32, 0.72, 0, 1], // Custom easing for smooth animation
        }}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-lg w-full h-full",
          "bg-white shadow-sm ring-1 ring-black/5",
          "data-[dark]:bg-stone-800 data-[dark]:ring-white/15"
        )}
      >
        <HoverVideoPlayer
          videoSrc="https://player.vimeo.com/video/1037289858"
          thumbnailSrc="/placeholders/newcopy-thumbnail.png"
          enableControls
          style={{
            width: "100%",
            maxWidth: "100vw",
            aspectRatio: "16/9",
          }}
        />
      </motion.div>

      <a href="https://www.newcult.co" target="_blank">
        newcopy.ai
      </a>
    </div>
  )
}
