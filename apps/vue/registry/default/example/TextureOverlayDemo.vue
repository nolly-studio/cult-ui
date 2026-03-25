<script setup lang="ts">
import { TextureOverlay } from '../ui/texture-overlay'

const textures = [
  { type: 'dots' as const, name: 'Dots Pattern' },
  { type: 'grid' as const, name: 'Grid Pattern' },
  { type: 'noise' as const, name: 'Noise Pattern' },
  { type: 'crosshatch' as const, name: 'Crosshatch Pattern' },
  { type: 'diagonal' as const, name: 'Diagonal Pattern' },
  { type: 'scatteredDots' as const, name: 'Scattered Dots' },
  { type: 'halftone' as const, name: 'Halftone Pattern' },
  { type: 'triangular' as const, name: 'Triangular Pattern' },
  { type: 'chevron' as const, name: 'Chevron Pattern' },
  { type: 'paperGrain' as const, name: 'Paper Grain' },
  { type: 'horizontalLines' as const, name: 'Horizontal Lines' },
  { type: 'verticalLines' as const, name: 'Vertical Lines' },
]

const opacities = [0.3, 0.6, 1.0]
</script>

<template>
  <div class="dark:bg-stone-950 py-6 px-4 md:px-0 rounded-md flex justify-center">
    <div class="max-w-6xl w-full">
      <div class="text-center space-y-4 mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-foreground">Texture Overlay Showcase</h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore different texture patterns using CSS gradients for adding visual texture to backgrounds and surfaces.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="texture in textures"
          :key="texture.type"
          class="relative h-48 rounded-lg bg-card border overflow-hidden shadow-[0px_1px_0px_0px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_rgba(255,_255,_255,_0.25)]"
        >
          <TextureOverlay :texture="texture.type" />
          <div class="relative z-10 p-6 h-full flex items-end">
            <div class="bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 border">
              <h3 class="font-medium text-foreground">{{ texture.name }}</h3>
              <p class="text-sm text-muted-foreground">{{ texture.type }} texture</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 space-y-8">
        <div class="text-center">
          <h3 class="text-2xl font-bold tracking-tight text-foreground mb-4">Opacity Variations</h3>
          <p class="text-muted-foreground mb-8">See how different opacity values affect the texture appearance</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="opacity in opacities"
            :key="opacity"
            class="relative h-32 rounded-lg bg-card border overflow-hidden shadow-[0px_1px_0px_0px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_rgba(255,_255,_255,_0.25)]"
          >
            <TextureOverlay texture="dots" :opacity="opacity" />
            <div class="relative z-10 p-4 h-full flex items-end">
              <div class="bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 border">
                <h4 class="font-medium text-foreground">Dots Pattern</h4>
                <p class="text-sm text-muted-foreground">Opacity: {{ opacity }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <h3 class="text-2xl font-bold tracking-tight text-foreground mb-4">Custom Styling</h3>
          <p class="text-muted-foreground mb-8">Combine with custom classes for unique effects</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="relative h-32 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
            <TextureOverlay texture="grid" class="mix-blend-overlay" />
            <div class="relative z-10 p-4 h-full flex items-center justify-center">
              <div class="bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 border">
                <h4 class="font-medium text-foreground">Grid with Blend Mode</h4>
                <p class="text-sm text-muted-foreground">mix-blend-overlay</p>
              </div>
            </div>
          </div>
          <div class="relative h-32 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 overflow-hidden">
            <TextureOverlay texture="noise" class="opacity-50" />
            <div class="relative z-10 p-4 h-full flex items-center justify-center">
              <div class="bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 border">
                <h4 class="font-medium text-foreground">Noise with Custom Opacity</h4>
                <p class="text-sm text-muted-foreground">opacity-50 class</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
