<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const tweetGridVariants = cva('max-w-4xl md:max-w-6xl px-2', {
  variants: {
    columns: {
      1: 'columns-1',
      2: 'sm:columns-2',
      3: 'md:columns-3',
      4: 'lg:columns-4',
      5: 'xl:columns-5',
    },
  },
  defaultVariants: {
    columns: 3,
  },
})

const tweetItemVariants = cva('break-inside-avoid', {
  variants: {
    spacing: {
      sm: 'mb-2',
      md: 'mb-4',
      lg: 'mb-6',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
})

const props = withDefaults(defineProps<{
  tweets: string[]
  columns?: 1 | 2 | 3 | 4 | 5
  spacing?: 'sm' | 'md' | 'lg'
  class?: string
}>(), {
  columns: 3,
  spacing: 'md',
})
</script>

<template>
  <div :class="cn(tweetGridVariants({ columns: props.columns }), props.class)">
    <div
      v-for="(tweetId, i) in tweets"
      :key="`${tweetId}-${i}`"
      :class="cn(tweetItemVariants({ spacing: props.spacing }))"
    >
      <!-- Mock Tweet component -->
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
        <div class="flex items-center space-x-3 mb-3">
          <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-sm">T</span>
          </div>
          <div>
            <div class="font-semibold text-gray-900 dark:text-white">
              Twitter User
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">@user</div>
          </div>
        </div>
        <div class="text-gray-900 dark:text-white mb-3">
          This is a mock tweet placeholder. Tweet ID: {{ tweetId }}
        </div>
        <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <span>&#x1F4AC; 0</span>
          <span>&#x1F504; 0</span>
          <span>&#x2764;&#xFE0F; 0</span>
        </div>
      </div>
    </div>
  </div>
</template>
