<script setup lang="ts">
import { GradientHeading, type Size, type Variant, type Weight } from '../ui/gradient-heading'

const variants: Variant[] = ['default', 'pink', 'light']
const sizes: Size[] = ['lg', 'xl', 'xxl', 'xxxl']
const weights: Weight[] = ['thin', 'base', 'semi', 'bold', 'black']
</script>

<template>
  <div class="space-y-8 p-4">
    <div v-for="variant in variants" :key="variant">
      <h2 class="text-xl font-semibold mb-4">Variant: {{ variant }}</h2>
      <div v-for="size in sizes" :key="size" class="mb-2">
        <GradientHeading
          v-for="weight in weights"
          :key="`${variant}-${size}-${weight}`"
          :variant="variant"
          :size="size"
          :weight="weight"
          class="mb-2"
        >
          Heading - {{ size }}
        </GradientHeading>
      </div>
    </div>
  </div>
</template>
