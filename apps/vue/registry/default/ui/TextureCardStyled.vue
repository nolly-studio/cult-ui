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
        'rounded-[24px] border border-white/60 dark:border-stone-950/60',
        'bg-gradient-to-b dark:from-neutral-800 dark:to-neutral-900 from-neutral-100 to-white/70',
        $props.class
      )
    "
  >
    <div class="rounded-[23px] border dark:border-neutral-900/80 border-black/10">
      <div class="rounded-[22px] border dark:border-neutral-950 border-white/50">
        <div class="rounded-[21px] border dark:border-neutral-900/70 border-neutral-950/20">
          <div
            class="w-full border border-white/50 dark:border-neutral-700/50 rounded-[20px] text-neutral-500"
          >
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
