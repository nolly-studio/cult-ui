<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-lg border border-white/60 dark:border-border/30',
        'rounded-[calc(var(--radius))]',
        $props.class
      )
    "
  >
    <div
      class="border dark:border-neutral-900/80 border-black/10 rounded-[calc(var(--radius)-1px)]"
    >
      <div
        class="border dark:border-neutral-950 border-white/50 rounded-[calc(var(--radius)-2px)]"
      >
        <div
          class="border dark:border-neutral-900/70 border-neutral-950/20 rounded-[calc(var(--radius)-3px)]"
        >
          <div
            class="w-full border border-white/50 dark:border-neutral-700/50 text-neutral-500 bg-gradient-to-b from-card/70 to-secondary/50 rounded-[calc(var(--radius)-4px)]"
          >
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
