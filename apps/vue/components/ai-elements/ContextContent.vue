<script setup lang="ts">
import { inject, computed } from "vue"
import { cn } from "@/lib/utils"
import { CONTEXT_KEY } from "./Context.vue"

defineOptions({ name: "ContextContent" })

const props = defineProps<{
  class?: string
}>()

const ctx = inject(CONTEXT_KEY)!

const PERCENT_MAX = 100
const usedPercent = computed(() => ctx.usedTokens / ctx.maxTokens)
const displayPct = computed(() =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 1, style: "percent" }).format(usedPercent.value)
)
const used = computed(() => new Intl.NumberFormat("en-US", { notation: "compact" }).format(ctx.usedTokens))
const total = computed(() => new Intl.NumberFormat("en-US", { notation: "compact" }).format(ctx.maxTokens))
</script>

<template>
  <div :class="cn('min-w-60 divide-y overflow-hidden rounded-md border bg-popover p-0 shadow-md', props.class)">
    <slot>
      <div class="w-full space-y-2 p-3">
        <div class="flex items-center justify-between gap-3 text-xs">
          <p>{{ displayPct }}</p>
          <p class="font-mono text-muted-foreground">{{ used }} / {{ total }}</p>
        </div>
        <div class="space-y-2">
          <div class="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              class="h-full bg-primary transition-all"
              :style="{ width: `${usedPercent * PERCENT_MAX}%` }"
            />
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>
