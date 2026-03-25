<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  as?: 'a' | 'button'
  class?: string
  href?: string
  rel?: string
  target?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'a',
  href: undefined,
  rel: undefined,
  target: undefined,
})

const isAnchor = computed(() => props.as === 'a')

const baseClassName = computed(() =>
  cn(
    'group/cosmic relative inline-flex min-h-11 min-w-11 items-center justify-center gap-3 rounded-[15px] p-[3px] transition-transform',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#adfa1b] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0c0912]',
    props.class
  )
)
</script>

<template>
  <component
    :is="isAnchor ? 'a' : 'button'"
    :class="baseClassName"
    :href="isAnchor ? (href ?? 'https://aisdkagents.com') : undefined"
    :rel="isAnchor ? (rel ?? 'noopener noreferrer') : undefined"
    :target="isAnchor ? (target ?? '_blank') : undefined"
    v-bind="$attrs"
  >
    <!-- Animated cosmic border -->
    <span class="absolute inset-0 overflow-hidden rounded-[15px] transition-all duration-300 ease-out group-hover/cosmic:inset-[-3px] group-hover/cosmic:rounded-[15px]">
      <span class="absolute inset-[-200%] animate-cosmic-spin bg-[conic-gradient(from_0deg,#adfa1b,#c9ff63,#efffb7,#8cd413,#6f9f19,#92d61b,#adfa1b)] opacity-95" />
    </span>

    <!-- Noise/texture overlay on the border -->
    <span class="absolute inset-0 overflow-hidden rounded-[15px] opacity-45 mix-blend-soft-light transition-all duration-300 ease-out group-hover/cosmic:inset-[-3px] group-hover/cosmic:rounded-[15px] dark:opacity-60 dark:mix-blend-overlay">
      <span class="absolute inset-[-200%] animate-cosmic-spin-slow bg-[conic-gradient(from_180deg,#efffb7_0%,transparent_30%,#adfa1b_50%,transparent_70%,#7fbf17_100%)]" />
    </span>

    <!-- Theme-aware inner background -->
    <span class="relative z-10 flex items-center gap-3 rounded-[12px] bg-muted px-5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),inset_0_-1px_0_rgba(15,23,42,0.08),0_1px_1px_rgba(15,23,42,0.08),0_8px_24px_rgba(15,23,42,0.14)] transition-all duration-300 group-hover/cosmic:shadow-[inset_0_1px_0_rgba(255,255,255,0.82),inset_0_-1px_0_rgba(15,23,42,0.12),0_2px_6px_rgba(15,23,42,0.14),0_12px_34px_rgba(15,23,42,0.2)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.5),0_1px_1px_rgba(0,0,0,0.45),0_10px_28px_rgba(0,0,0,0.35)] dark:group-hover/cosmic:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(0,0,0,0.6),0_2px_6px_rgba(0,0,0,0.55),0_14px_34px_rgba(0,0,0,0.42)] active:scale-[0.98]">
      <span class="font-medium text-base tracking-wide text-foreground">
        <slot>Placeholder text</slot>
      </span>
    </span>
  </component>
</template>
