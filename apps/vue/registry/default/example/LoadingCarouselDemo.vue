<script setup lang="ts">
import { LoadingCarousel } from '../ui/loading-carousel'
</script>

<template>
  <div class="space-y-8 p-4 w-full">
    <div class="w-full">
      <div class="p-4">
        <h3 class="text-lg font-semibold">Default LoadingCarousel</h3>
      </div>
      <div class="p-4">
        <LoadingCarousel />
      </div>
    </div>

    <div class="w-full">
      <div class="p-4">
        <h3 class="text-lg font-semibold">Wide Aspect Ratio with Top Text</h3>
      </div>
      <div class="p-4">
        <LoadingCarousel aspect-ratio="wide" text-position="top" :show-indicators="false" />
      </div>
    </div>

    <div class="w-full">
      <div class="p-4">
        <h3 class="text-lg font-semibold">Background Tips + Gradient</h3>
      </div>
      <div class="p-4">
        <LoadingCarousel aspect-ratio="wide" :background-tips="true" :background-gradient="true" />
      </div>
    </div>

    <div class="w-full">
      <div class="p-4">
        <h3 class="text-lg font-semibold">Custom Interval and Navigation</h3>
      </div>
      <div class="p-4">
        <LoadingCarousel :autoplay-interval="2000" :show-navigation="true" />
      </div>
    </div>

    <div class="w-full">
      <div class="p-4">
        <h3 class="text-lg font-semibold">Shuffled Tips with Custom Interval</h3>
      </div>
      <div class="p-4">
        <LoadingCarousel :shuffle-tips="true" :autoplay-interval="3000" :show-progress="false" />
      </div>
    </div>

    <div class="w-full">
      <div class="p-4">
        <h3 class="text-lg font-semibold">Square Aspect Ratio with Background Tips</h3>
      </div>
      <div class="p-4">
        <LoadingCarousel aspect-ratio="square" :background-tips="true" :background-gradient="true" />
      </div>
    </div>
  </div>
</template>
