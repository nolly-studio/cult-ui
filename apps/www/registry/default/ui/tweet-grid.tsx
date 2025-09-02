"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tweetGridVariants = cva("max-w-4xl md:max-w-6xl px-2", {
  variants: {
    columns: {
      1: "columns-1",
      2: "sm:columns-2",
      3: "md:columns-3",
      4: "lg:columns-4",
      5: "xl:columns-5",
    },
  },
  defaultVariants: {
    columns: 3,
  },
})

const tweetItemVariants = cva("break-inside-avoid", {
  variants: {
    spacing: {
      sm: "mb-2",
      md: "mb-4",
      lg: "mb-6",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
})

export interface TweetGridProps
  extends VariantProps<typeof tweetGridVariants>,
    VariantProps<typeof tweetItemVariants> {
  tweets: string[]
  className?: string
}

// Mock Tweet component to avoid react-tweet CSS import issues
const MockTweet: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">T</span>
        </div>
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            Twitter User
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">@user</div>
        </div>
      </div>
      <div className="text-gray-900 dark:text-white mb-3">
        This is a mock tweet placeholder. Tweet ID: {id}
      </div>
      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
        <span>💬 0</span>
        <span>🔄 0</span>
        <span>❤️ 0</span>
      </div>
    </div>
  )
}

export const TweetGrid: React.FC<TweetGridProps> = ({
  tweets,
  columns,
  spacing,
  className,
}) => {
  return (
    <div className={cn(tweetGridVariants({ columns }), className)}>
      {tweets.map((tweetId, i) => (
        <div
          key={`${tweetId}-${i}`}
          className={cn(tweetItemVariants({ spacing }))}
        >
          <MockTweet id={tweetId} />
        </div>
      ))}
    </div>
  )
}
