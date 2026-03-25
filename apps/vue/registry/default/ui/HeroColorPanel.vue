<script setup lang="ts">
/**
 * Hero section with ColorPanels shader background.
 * The @paper-design/shaders-react package is React-only,
 * so the shader is replaced with a CSS gradient placeholder.
 * Swap the placeholder div with a real WebGL/Canvas shader as needed.
 */
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface HeroColorPanelTechItem {
  name: string
  version?: string
}

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
  showBadges?: boolean
  techStack?: HeroColorPanelTechItem[]
}>(), {
  srTitle: 'AI SDK Agents',
  title: 'AI SDK Agents',
  subtitle: 'Copy and Paste',
  description: 'Full-stack AI SDK patterns for workflows, tool calling, and agent orchestration.',
  showCta: true,
  ctaLabel: 'Check it out today',
  ctaHref: 'https://aisdkagents.com',
  ctaTarget: '_blank',
  showBadges: true,
  techStack: () => [
    { name: 'Next.js', version: 'v16' },
    { name: 'AI SDK', version: 'v6' },
  ],
})

const classes = computed(() => cn('relative h-full w-full overflow-hidden', props.class))
</script>

<template>
  <section :class="classes" data-slot="hero-colorpanels-root">
    <h1 class="sr-only">{{ props.srTitle }}</h1>

    <!-- Desktop shader placeholder -->
    <div
      class="pointer-events-none absolute inset-0 hidden md:block"
      :style="{
        background: 'linear-gradient(135deg, #ed40b3 0%, #6ef7cc 33%, #adfa1e 66%, #b054de 100%)',
        opacity: 0.4,
      }"
      data-slot="hero-colorpanels-visual"
    />

    <!-- Mobile shader placeholder -->
    <div
      class="pointer-events-none absolute inset-0 md:hidden"
      :style="{
        background: 'linear-gradient(180deg, #ed40b3 0%, #6ef7cc 50%, #adfa1e 100%)',
        opacity: 0.3,
      }"
      data-slot="hero-colorpanels-mobile-visual"
    />

    <!-- Content overlay -->
    <div class="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
      <div data-slot="hero-colorpanels-heading">
        <p v-if="props.subtitle" class="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {{ props.subtitle }}
        </p>
        <h2 class="mt-2 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          <slot name="title">{{ props.title }}</slot>
        </h2>
      </div>

      <div class="mt-4 max-w-2xl text-lg text-muted-foreground" data-slot="hero-colorpanels-description">
        <slot name="description">{{ props.description }}</slot>
      </div>

      <div v-if="props.showCta" class="mt-8" data-slot="hero-colorpanels-actions">
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

      <div v-if="props.showBadges && props.techStack.length" class="mt-6 flex flex-wrap justify-center gap-2" data-slot="hero-colorpanels-badges">
        <slot name="badges">
          <span
            v-for="tech in props.techStack"
            :key="tech.name"
            class="inline-flex items-center rounded-full border bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur-sm"
          >
            {{ tech.name }}
            <span v-if="tech.version" class="ml-1 text-muted-foreground">{{ tech.version }}</span>
          </span>
        </slot>
      </div>
    </div>

    <slot />
  </section>
</template>
