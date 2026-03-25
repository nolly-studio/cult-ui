<script setup lang="ts">
/**
 * Hero section with Heatmap shader background.
 * Shader placeholder — replace with WebGL/Canvas implementation as needed.
 */
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: string
  srTitle?: string
  title?: string
  subtitle?: string
  description?: string
  showCta?: boolean
  ctaLabel?: string
  ctaHref?: string
  ctaTarget?: string
}>(), {
  srTitle: 'Heatmap Hero',
  title: 'Heatmap Hero',
  subtitle: 'Shader Effect',
  description: 'A hero section with a heatmap shader background effect.',
  showCta: true,
  ctaLabel: 'Learn More',
  ctaHref: '#',
  ctaTarget: '_self',
})

const classes = computed(() => cn('relative h-full w-full overflow-hidden', props.class))
</script>

<template>
  <section :class="classes" data-slot="hero-heatmap-root">
    <h1 class="sr-only">{{ props.srTitle }}</h1>

    <!-- Heatmap shader placeholder -->
    <div
      class="pointer-events-none absolute inset-0"
      :style="{
        background: 'radial-gradient(ellipse at 30% 50%, #ff6b35 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, #ffc107 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, #e91e63 0%, transparent 50%)',
        opacity: 0.4,
      }"
      data-slot="hero-heatmap-visual"
    />

    <div class="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
      <p v-if="props.subtitle" class="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        {{ props.subtitle }}
      </p>
      <h2 class="mt-2 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        <slot name="title">{{ props.title }}</slot>
      </h2>
      <div class="mt-4 max-w-2xl text-lg text-muted-foreground">
        <slot name="description">{{ props.description }}</slot>
      </div>
      <div v-if="props.showCta" class="mt-8">
        <slot name="cta">
          <a
            :href="props.ctaHref"
            :target="props.ctaTarget"
            rel="noopener noreferrer"
            class="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            {{ props.ctaLabel }}
          </a>
        </slot>
      </div>
    </div>

    <slot />
  </section>
</template>
