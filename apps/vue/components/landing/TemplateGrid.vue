<script setup lang="ts">
import { ref, computed } from 'vue'
import PixelHeadingWord from './PixelHeadingWord.vue'

import cultDirectoryHomeDark from '@/components/landing/assets/cult-directory-dark-home.png'
import cultLogoGPTHome from '@/components/landing/assets/cult-logo-gpt.png'
import cultSeoOg from '@/components/landing/assets/cult-seo-og.png'
import manifestBottomLeft from '@/components/landing/assets/manifest-library.png'
import runeHero from '@/components/landing/assets/rune-hero.png'
import travelStash4 from '@/components/landing/assets/travel-stash.png'

const TEMPLATES_GRID = [
  {
    name: 'Logo GPT',
    slug: 'https://pro.cult-ui.com/templates/logo-gpt-template',
    new: true,
    description: 'AI-powered logo generation platform with Dalle integration, token-based currency system, and secure image storage using Supabase.',
    stack: ['nextjs', 'tailwind', 'openai', 'supabase'],
    images: [cultLogoGPTHome],
  },
  {
    name: 'Directory',
    slug: 'https://pro.cult-ui.com/templates/cult-directory-template',
    new: true,
    description: 'Automated directory platform with AI enrichment, and web scraping pipeline for rapid deployment of SEO-optimized listings.',
    stack: ['nextjs', 'tailwind', 'claudeAI', 'supabase', 'web-scrapers'],
    images: [cultDirectoryHomeDark],
  },
  {
    name: 'Travel Stash',
    slug: 'https://pro.cult-ui.com/templates/cult-offline-travel-stash',
    new: false,
    description: 'Progressive web app for travel planning with offline capabilities, Claude AI integration, and real-time data synchronization across devices.',
    stack: ['nextjs', 'tailwind', 'claudeAI', 'pwa'],
    images: [travelStash4],
  },
  {
    name: 'Landing Page',
    slug: 'https://pro.cult-ui.com/templates/cult-landing-page',
    new: false,
    description: 'Modern landing page template featuring animations, custom navigation components, and responsive design optimized for conversions.',
    stack: ['nextjs', 'tailwind'],
    images: [runeHero],
  },
  {
    name: 'Cult SEO',
    slug: 'https://pro.cult-ui.com/templates/cult-seo',
    new: false,
    description: "Comprehensive SEO analysis tool with web crawling, performance testing, and AI-powered optimization recs for website improvement.",
    stack: ['nextjs', 'tailwind', 'claudeAI', 'web-scrapers'],
    images: [cultSeoOg],
  },
  {
    name: 'Manifest',
    slug: 'https://pro.cult-ui.com/templates/manifest',
    new: false,
    description: 'Vector embedding solution for building Perplexity-style AI applications with RAG retrieval, real-time source citations, and pgvector search.',
    stack: ['nextjs', 'tailwind', 'supabase', 'openai'],
    images: [manifestBottomLeft],
  },
]

const imgErrors = ref<Set<string>>(new Set())

function onImgError(slug: string) {
  imgErrors.value.add(slug)
}
</script>

<template>
  <section class="mx-auto max-w-6xl md:px-4 py-16 md:py-24">
    <!-- Section Header -->
    <div class="mb-12 text-center">
      <div class="mx-auto mb-8 flex max-w-xl items-center justify-center gap-4">
        <div class="h-px flex-1 bg-border/60" />
        <div class="flex items-center gap-2 border border-border/60 bg-background px-3 py-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-3.5 md:size-4 fill-[#ADFA1B]/50"
          >
            <path d="m7 11 2-2-2-2" />
            <path d="M11 13h4" />
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          </svg>
          <span class="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            TEMPLATES
          </span>
        </div>
        <div class="h-px flex-1 bg-border/60" />
      </div>

      <PixelHeadingWord
        as="h2"
        class="mx-auto mb-4 max-w-3xl font-medium text-3xl tracking-tight md:text-4xl lg:text-5xl"
        initial-font="square"
        disable-cycling
        disable-hover
      >
        {{ TEMPLATES_GRID.length }} Starter Templates
      </PixelHeadingWord>

      <p class="mx-auto px-4 md:px-0 max-w-md font-light text-base text-foreground/70 leading-relaxed md:text-lg">
        Production-ready starter templates with auth, payments, supabase db, and more.
      </p>
    </div>

    <!-- Templates Grid -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <a
        v-for="card in TEMPLATES_GRID"
        :key="card.slug"
        target="_blank"
        rel="noopener noreferrer"
        :href="card.slug"
        class="group relative flex flex-col overflow-hidden border border-border bg-background transition-all duration-150 hover:border-foreground/40 hover:shadow-lg hover:shadow-primary/5"
      >
        <!-- Corner accents -->
        <div class="-top-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
        <div class="-top-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-t-2 border-r-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
        <div class="-bottom-px -left-px pointer-events-none absolute h-3 w-3 border-primary/50 border-b-2 border-l-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />
        <div class="-bottom-px -right-px pointer-events-none absolute h-3 w-3 border-primary/50 border-r-2 border-b-2 opacity-0 transition-all duration-200 group-hover:opacity-100" />

        <!-- Image Preview -->
        <div class="relative aspect-[16/10] w-full overflow-hidden border-border border-b bg-muted/20">
          <div
            v-if="imgErrors.has(card.slug) || !card.images?.[0]"
            class="flex h-full items-center justify-center font-mono text-[10px] text-muted-foreground uppercase tracking-wider"
          >
            <span>Template Preview</span>
          </div>
          <img
            v-else
            :alt="`${card.name} preview`"
            class="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            :src="card.images[0]"
            @error="onImgError(card.slug)"
          />
        </div>

        <!-- Content -->
        <div class="flex flex-1 flex-col p-4">
          <h3 class="mb-2 line-clamp-1 font-medium text-base leading-tight tracking-tight">
            {{ card.name }}
          </h3>

          <p class="mb-4 line-clamp-2 flex-1 font-light text-muted-foreground text-sm leading-relaxed">
            {{ card.description }}
          </p>

          <!-- Tech Stack -->
          <div class="mb-3 flex flex-wrap gap-1.5">
            <span
              v-for="tech in card.stack.slice(0, 4)"
              :key="tech"
              class="border border-border bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground lowercase transition-colors group-hover:border-foreground/20"
            >
              {{ tech }}
            </span>
            <span
              v-if="card.stack.length > 4"
              class="px-1 font-mono text-[10px] text-muted-foreground/60"
            >
              +{{ card.stack.length - 4 }}
            </span>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between border-border border-t pt-3">
            <span class="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              Full-Stack Template
            </span>

            <span class="flex items-center gap-1 font-mono text-[10px] text-muted-foreground uppercase tracking-wider transition-colors group-hover:text-primary">
              View
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="size-3 transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>
