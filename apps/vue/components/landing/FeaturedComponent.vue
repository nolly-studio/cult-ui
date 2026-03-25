<script setup lang="ts">
// FeaturedComponent, LatestComponent, and LatestComponentVertical
// Some child components (LightBoard, ShiftCardDemo, ContactFormExample) are not yet
// converted. This file provides the LatestComponentVertical used on the home page.
</script>

<template>
  <div
    class="group relative mx-auto flex w-full flex-col border border-border bg-background transition-all duration-150 hover:border-foreground/10"
  >
    <!-- Header -->
    <div class="flex flex-col items-center border-border border-b px-4 pb-4 pt-5 text-center">
      <div class="mb-3 border border-border bg-background px-2 py-1">
        <span class="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Highlighted Component
        </span>
      </div>
      <h3 class="mb-1.5 font-medium text-lg leading-tight tracking-tight">
        Shift Card
      </h3>
      <p class="max-w-md font-light text-muted-foreground text-sm leading-relaxed">
        A card that shows more detail on hover
      </p>
    </div>

    <!-- Demo -->
    <div class="mx-auto w-full bg-muted/20">
      <div class="mx-auto flex w-full flex-col items-center py-8 sm:max-w-screen-lg lg:pb-8 lg:pt-6">
        <section class="max-w-xs sm:max-w-none">
          <!-- ShiftCardDemo placeholder -->
          <div class="flex h-48 items-center justify-center text-muted-foreground">
            Shift Card Demo — coming soon
          </div>
        </section>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-center border-border border-t px-4 py-3">
      <NuxtLink
        to="/docs/components/shift-card"
        class="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
      >
        View Component
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
      </NuxtLink>
    </div>
  </div>
</template>
