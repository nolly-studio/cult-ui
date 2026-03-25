<script setup lang="ts">
import { inject, computed } from "vue"
import { cn } from "@/lib/utils"
import { CONTEXT_KEY } from "./Context.vue"

defineOptions({ name: "ContextTrigger" })

const props = defineProps<{
  class?: string
}>()

const ctx = inject(CONTEXT_KEY)!

const ICON_RADIUS = 10
const ICON_VIEWBOX = 24
const ICON_CENTER = 12
const ICON_STROKE_WIDTH = 2

const usedPercent = computed(() => ctx.usedTokens() / ctx.maxTokens())
const renderedPercent = computed(() =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 1, style: "percent" }).format(usedPercent.value)
)

const circumference = 2 * Math.PI * ICON_RADIUS
const dashOffset = computed(() => circumference * (1 - usedPercent.value))
</script>

<template>
  <button
    type="button"
    :class="cn('inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm hover:bg-accent', props.class)"
  >
    <slot>
      <span class="font-medium text-muted-foreground">{{ renderedPercent }}</span>
      <svg
        aria-label="Model context usage"
        height="20"
        role="img"
        style="color: currentcolor"
        :viewBox="`0 0 ${ICON_VIEWBOX} ${ICON_VIEWBOX}`"
        width="20"
      >
        <circle
          :cx="ICON_CENTER"
          :cy="ICON_CENTER"
          fill="none"
          opacity="0.25"
          :r="ICON_RADIUS"
          stroke="currentColor"
          :stroke-width="ICON_STROKE_WIDTH"
        />
        <circle
          :cx="ICON_CENTER"
          :cy="ICON_CENTER"
          fill="none"
          opacity="0.7"
          :r="ICON_RADIUS"
          stroke="currentColor"
          :stroke-dasharray="`${circumference} ${circumference}`"
          :stroke-dashoffset="dashOffset"
          stroke-linecap="round"
          :stroke-width="ICON_STROKE_WIDTH"
          style="transform: rotate(-90deg); transform-origin: center"
        />
      </svg>
    </slot>
  </button>
</template>
