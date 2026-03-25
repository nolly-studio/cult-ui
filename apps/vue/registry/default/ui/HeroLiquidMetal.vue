<script setup lang="ts">
/**
 * Hero section with LiquidMetal shader background.
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
  srTitle: 'Liquid Metal Hero',
  title: 'Liquid Metal Hero',
  subtitle: 'Shader Effect',
  description: 'A hero section with a liquid metal shader background effect.',
  showCta: true,
  ctaLabel: 'Learn More',
  ctaHref: '#',
  ctaTarget: '_self',
})

const classes = computed(() => cn('relative h-full w-full overflow-hidden', props.class))
</script>

<template>
  <section :class="classes" data-slot="hero-liquidmetal-root">
    <h1 class="sr-only">{{ props.srTitle }}</h1>

    <!-- LiquidMetal shader placeholder -->
    <div
      class="pointer-events-none absolute inset-0"
      :style="{
        background: 'linear-gradient(145deg, #c0c0c0 0%, #e8e8e8 25%, #808080 50%, #d4d4d4 75%, #a0a0a0 100%)',
        opacity: 0.5,
        filter: 'blur(1px)',
      }"
      data-slot="hero-liquidmetal-visual"
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
