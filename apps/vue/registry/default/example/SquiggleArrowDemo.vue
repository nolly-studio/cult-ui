<script setup lang="ts">
import SquigglyArrow from '../ui/squiggle-arrow'
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center gap-12">
    <div class="flex flex-col gap-12 items-center">
      <div class="flex flex-col gap-6">
        <h2 class="text-2xl font-semibold text-center">Variants</h2>
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <span class="w-24 text-foreground">Wavy</span>
            <SquigglyArrow variant="wavy" />
          </div>
          <div class="flex items-center gap-4">
            <span class="w-24 text-foreground">Bouncy</span>
            <SquigglyArrow variant="bouncy" class="text-blue-500" />
          </div>
          <div class="flex items-center gap-4">
            <span class="w-24 text-foreground">Smooth</span>
            <SquigglyArrow variant="smooth" class="text-purple-600" />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <h2 class="text-2xl font-semibold text-center">Directions</h2>
        <div class="flex flex-wrap gap-8 justify-center p-4">
          <div class="flex flex-col items-center gap-2">
            <span class="text-foreground">Right</span>
            <SquigglyArrow direction="right" class="text-green-600" />
          </div>
          <div class="flex flex-col items-center gap-2">
            <span class="text-foreground">Left</span>
            <SquigglyArrow direction="left" class="text-orange-600" />
          </div>
          <div class="flex flex-col items-center gap-2">
            <span class="text-foreground">Down</span>
            <SquigglyArrow direction="down" class="text-pink-600" />
          </div>
          <div class="flex flex-col items-center gap-2">
            <span class="text-foreground">Up</span>
            <SquigglyArrow direction="up" class="text-cyan-600" />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <h2 class="text-2xl font-semibold text-center">Sizes</h2>
        <div class="flex items-center gap-8 overflow-x-auto p-4">
          <SquigglyArrow :width="150" :height="75" :stroke-width="2" />
          <SquigglyArrow :width="250" :height="125" :stroke-width="3" class="text-blue-500" />
          <SquigglyArrow :width="300" :height="150" :stroke-width="4" class="text-purple-600" />
        </div>
      </div>
    </div>
  </main>
</template>
