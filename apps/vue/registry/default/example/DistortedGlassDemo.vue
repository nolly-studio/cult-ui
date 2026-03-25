<script setup lang="ts">
import { ref } from 'vue'
import { DistortedGlass } from '@/registry/default/ui/distorted-glass'
</script>

<template>
  <div class="relative h-screen flex flex-col overflow-hidden">
    <div class="flex-1 overflow-y-auto pt-[50px]">
      <div class="w-full absolute top-0 left-0 right-0 -mt-[1px]">
        <DistortedGlass class="h-48 w-full" />
      </div>

      <!-- Section 1: Large Moving Text -->
      <section class="relative h-96 flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute top-20 left-10 text-8xl font-black text-primary/30 select-none">
            DISTORTED
          </div>
          <div class="absolute top-40 right-10 text-8xl font-black text-primary/30 select-none">
            GLASS
          </div>
        </div>
      </section>

      <!-- Section 2: Grid of Squares -->
      <section class="relative h-[700px] flex items-center justify-center bg-gradient-to-br from-transparent via-primary/10 to-primary/20">
        <div class="absolute inset-0 overflow-hidden">
          <div class="grid grid-cols-8 gap-4 p-8">
            <div
              v-for="i in 64"
              :key="`square-${i}`"
              class="w-16 h-16 bg-primary rounded-lg border-2 border-primary/50 opacity-30"
            />
          </div>
        </div>
      </section>

      <!-- Section 3: Radial Circles -->
      <section class="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/20 via-transparent to-primary/10">
        <div class="absolute inset-0 overflow-hidden flex items-center justify-center">
          <div
            v-for="i in 5"
            :key="`circle-${i}`"
            class="absolute rounded-full border-4 border-primary/40"
            :style="{ width: `${200 + i * 80}px`, height: `${200 + i * 80}px` }"
          />
        </div>
      </section>

      <!-- Section 4: Lines Pattern -->
      <section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-transparent via-primary/10 to-primary/20">
        <div class="absolute inset-0 overflow-hidden">
          <div
            v-for="i in 20"
            :key="`line-${i}`"
            class="absolute left-0 right-0 h-1 bg-primary/40"
            :style="{ top: `${(i - 1) * 10}%` }"
          />
        </div>
      </section>

      <!-- Final Info Section -->
      <section class="min-h-screen flex items-center justify-center bg-muted/30">
        <div class="max-w-2xl mx-auto p-8 space-y-4 text-center">
          <h2 class="text-3xl font-bold text-foreground">About Distorted Glass</h2>
          <p class="text-muted-foreground">
            The DistortedGlass component uses SVG filters with fractal noise to create a unique glass morphism effect.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
