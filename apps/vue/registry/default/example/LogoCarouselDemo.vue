<script setup lang="ts">
import { GradientHeading } from '../ui/gradient-heading'
import LogoCarousel from '../ui/logo-carousel'
</script>

<template>
  <div class="space-y-8 py-24">
    <div class="w-full max-w-screen-lg mx-auto flex flex-col items-center space-y-8">
      <div class="text-center">
        <GradientHeading variant="secondary">
          The best are already here
        </GradientHeading>
        <a href="https://www.newcult.co" target="_blank">
          <GradientHeading size="xxl">Join new cult</GradientHeading>
        </a>
      </div>
      <LogoCarousel :column-count="3" />
    </div>
  </div>
</template>
