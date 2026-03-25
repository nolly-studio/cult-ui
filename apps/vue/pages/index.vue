<script setup lang="ts">
import PixelHeadingCharacter from '@/components/landing/PixelHeadingCharacter.vue'
import PixelParagraphWordsInverse from '@/components/landing/PixelParagraphWordsInverse.vue'
import FeaturedComponent from '@/components/landing/FeaturedComponent.vue'
import AiSdkAgentsPatterns from '@/components/landing/AiSdkAgentsPatterns.vue'
import BlocksGrid from '@/components/landing/BlocksGrid.vue'
import TemplateGrid from '@/components/landing/TemplateGrid.vue'
import PlugGrid from '@/components/landing/PlugGrid.vue'
import Footer from '@/components/landing/Footer.vue'

// Hardcoded component count to match the React version
const componentCount = 54
</script>

<template>
  <div class="isolate min-h-screen overflow-hidden pb-8 sm:pb-12 md:pb-0">
    <div class="container relative py-12 md:pt-0">
      <!-- Hero -->
      <section
        class="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-14"
      >
        <!-- Index marker -->
        <div class="mx-auto mb-1 flex max-w-2xl items-center justify-center gap-4" />

        <!-- Hero Title -->
        <PixelHeadingCharacter
          as="h1"
          prefix="Shadcn,"
          prefix-font="line"
          mode="wave"
          auto-play
          :cycle-interval="200"
          :stagger-delay="0"
          text="expanded"
          class="text-center text-4xl leading-tight tracking-tight md:text-4xl lg:text-8xl lg:leading-[1.1]"
        />

        <!-- Hero Description -->
        <PixelParagraphWordsInverse
          :text="`${componentCount}+ animated components and effects. Free, open source, built to drop into any shadcn/ui project.`"
          :plain-words="['and ', 'to', 'any']"
          initial-plain-font="mono"
          pixel-font="square"
          class="mx-auto max-w-2xl text-sm whitespace-pre-line text-center md:leading-snug md:text-2xl"
        />

        <!-- CTA Buttons -->
        <div class="flex w-full items-center justify-center gap-4 py-6">
          <NuxtLink
            to="/docs/components/hero-color-panels"
            class="border border-foreground bg-foreground px-6 py-3 text-sm uppercase tracking-wider text-white transition-all hover:bg-foreground/90"
          >
            <PixelParagraphWordsInverse
              :text="`Browse ${componentCount} Components`"
            />
          </NuxtLink>

          <!-- GitHub button placeholder -->
          <a
            href="https://github.com/nolly-studio/cult-ui"
            target="_blank"
            rel="noopener noreferrer"
            class="border border-border bg-background px-6 py-3 text-sm uppercase tracking-wider transition-all hover:border-foreground/40"
          >
            GitHub
          </a>
        </div>

        <!-- Tech Stack Pills -->
        <div class="flex flex-wrap items-center justify-center gap-2">
          <div class="flex items-center gap-1.5 border border-border px-2 py-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="size-3.5 text-[#4FC08D]"
              fill="currentColor"
            >
              <path d="M2 3l10 18L22 3h-4l-6 10.5L5.9 3H2z" />
            </svg>
            <span class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Vue
            </span>
          </div>
          <div class="flex items-center gap-1.5 border border-border px-2 py-0.5">
            <div class="size-3 rounded-full bg-foreground" />
            <span class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Shadcn/ui
            </span>
          </div>
          <div class="flex items-center gap-1.5 border border-border px-2 py-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="size-3.5 text-[#06B6D4]"
              fill="currentColor"
            >
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
            </svg>
            <span class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Tailwind CSS
            </span>
          </div>
        </div>
      </section>

      <section class="w-full space-y-4 md:block">
        <div class="mx-auto w-full max-w-4xl">
          <FeaturedComponent />
        </div>

        <div class="mx-auto max-w-4xl">
          <AiSdkAgentsPatterns />
        </div>

        <div class="mx-auto max-w-4xl">
          <BlocksGrid />
        </div>

        <div class="mx-auto max-w-4xl">
          <TemplateGrid />
        </div>

        <div class="mx-auto max-w-4xl">
          <PlugGrid />
        </div>
      </section>

      <Footer />
    </div>
  </div>
</template>
