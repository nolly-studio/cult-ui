<script setup lang="ts">
import { StripeBgGuides } from '../ui/stripe-bg-guides'
</script>

<template>
  <div class="relative w-full h-[400px] overflow-hidden rounded-lg border bg-background">
    <StripeBgGuides
      :column-count="6"
      :animated="true"
      :animation-duration="8"
      glow-color="hsl(var(--primary))"
      :randomize="true"
      :random-interval="3000"
      :contained="true"
    />
    <div class="relative z-10 flex h-full items-center justify-center">
      <div class="max-w-md text-center">
        <h3 class="text-2xl font-bold mb-2">Stripe Background Guides</h3>
        <p class="text-muted-foreground">
          Animated background guides with glowing effects, inspired by Stripe's design system.
        </p>
      </div>
    </div>
  </div>
</template>
