<script setup lang="ts">
import { ref, computed } from 'vue'
import { ExternalLinkIcon } from 'lucide-vue-next'
import { AnimatePresence, Motion } from 'motion-v'

import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/composables/use-media-query'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Props {
  name: string
  class?: string
}

const props = defineProps<Props>()

const isHovered = ref(false)
const isSmallScreen = useMediaQuery('(max-width: 640px)')

const url = computed(
  () => `https://v0.dev/chat/api/open?url=https://cult-ui.com/r/${props.name}.json`
)
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <a
          :href="url"
          target="_blank"
          rel="noreferrer"
          :class="
            cn(
              'group flex items-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-800',
              props.class
            )
          "
          aria-label="Open in v0"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
        >
          <!-- Logo section -->
          <div
            class="flex h-full items-center gap-2 border-r border-zinc-800 bg-zinc-900 px-3 py-2"
          >
            <svg
              viewBox="0 0 40 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="cn('text-zinc-100', isSmallScreen ? 'h-3.5' : 'h-4')"
            >
              <path
                d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
                fill="currentColor"
              />
              <path
                d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <!-- Text section -->
          <div class="flex w-full flex-1 items-center px-3 py-2">
            <span
              :class="
                cn(
                  'font-medium text-zinc-100',
                  isSmallScreen ? 'text-xs' : 'text-sm'
                )
              "
            >
              Open in v0
            </span>
          </div>

          <!-- Icon section -->
          <div class="flex items-center px-2">
            <AnimatePresence>
              <Motion
                :initial="{ x: 0 }"
                :animate="{ x: isHovered ? 2 : 0 }"
                class="text-zinc-400 transition-colors duration-200 group-hover:text-emerald-400"
              >
                <ExternalLinkIcon
                  :class="isSmallScreen ? 'size-3.5' : 'size-4'"
                />
              </Motion>
            </AnimatePresence>
          </div>
        </a>
      </TooltipTrigger>
      <TooltipContent side="bottom">Open this component in v0</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
