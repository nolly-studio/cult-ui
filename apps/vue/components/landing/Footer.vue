<script setup lang="ts">
import LocalTime from './LocalTime.vue'
</script>

<template>
  <div class="relative grid w-full grid-cols-[0.2fr_3fr_0.2fr] md:grid-cols-[0.5fr_3fr_0.5fr]">
    <!-- Gradient overlays -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute top-0 right-0 left-0 h-8 bg-gradient-to-b from-background to-transparent" />
      <div class="absolute right-0 bottom-0 left-0 h-6 bg-gradient-to-t from-background to-transparent" />
      <div class="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-background to-transparent" />
      <div class="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent" />
    </div>

    <div class="absolute top-12 right-0 left-0 z-0">
      <div class="shader-background absolute inset-0 z-0 select-none">
        <!-- Dithering shader placeholder (no Vue equivalent for @paper-design/shaders-react) -->
        <div
          class="bg-black/5 dark:bg-white/5"
          :style="{ height: '30.2vh' }"
        />
      </div>
    </div>

    <!-- Middle row - main content -->
    <div class="" />
    <div class="relative flex items-center justify-center">
      <!-- Main content -->
      <div class="flex flex-col items-center justify-center px-5 py-36">
        <div class="flex items-center justify-center gap-1">
          <!-- cult logo placeholder -->
          <div class="size-6 rounded-full bg-foreground" />
          <h2 class="mb-2 text-center font-medium text-3xl tracking-[-0.12rem] md:text-4xl">
            cult ui
          </h2>
          <div class="size-6 rounded-full bg-foreground" />
        </div>

        <p class="max-w-2xl text-center text-lg font-pixel-line">
          Join the cult
        </p>
        <p class="max-w-2xl text-center text-lg font-pixel-line">
          <LocalTime />
        </p>
      </div>
    </div>

    <!-- Spacer -->
    <div class="h-16" />

    <div class="" />
  </div>
</template>
