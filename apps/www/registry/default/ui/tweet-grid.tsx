"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const tweetGridVariants = cva("max-w-4xl px-2 md:max-w-6xl", {
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
});

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
});

export interface TweetGridProps
  extends
    VariantProps<typeof tweetGridVariants>,
    VariantProps<typeof tweetItemVariants> {
  tweets: string[];
  className?: string;
}

// Mock Tweet component to avoid react-tweet CSS import issues
const MockTweet: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-3 flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
          <span className="text-sm font-bold text-white">T</span>
        </div>
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            Twitter User
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">@user</div>
        </div>
      </div>
      <div className="mb-3 text-gray-900 dark:text-white">
        This is a mock tweet placeholder. Tweet ID: {id}
      </div>
      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
        <span>💬 0</span>
        <span>🔄 0</span>
        <span>❤️ 0</span>
      </div>
    </div>
  );
};

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
  );
};
