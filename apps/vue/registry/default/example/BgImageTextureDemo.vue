<script setup lang="ts">
import { ref } from 'vue'
import { Download } from 'lucide-vue-next'
import { BackgroundImageTexture } from '@/registry/default/ui/bg-image-texture'
import type { TextureVariant } from '@/registry/default/ui/bg-image-texture'

const textureVariants: TextureVariant[] = [
  'fabric-of-squares',
  'grid-noise',
  'inflicted',
  'debut-light',
  'groovepaper',
  'none',
]

const textureMap: Record<Exclude<TextureVariant, 'none'>, string> = {
  'fabric-of-squares': '/textures/fabric-of-squares.png',
  'grid-noise': '/textures/grid-noise.png',
  inflicted: '/textures/inflicted.png',
  'debut-light': '/textures/debut-light.png',
  groovepaper: '/textures/groovepaper.png',
}

const selectedVariant = ref<TextureVariant>('fabric-of-squares')
const opacity = ref(0.5)

async function downloadTexture(variant: Exclude<TextureVariant, 'none'>) {
  const url = textureMap[variant]
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = `${variant}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)
  } catch {
    const link = document.createElement('a')
    link.href = url
    link.download = `${variant}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
</script>

<template>
  <div class="space-y-8 p-6">
    <div class="rounded-lg border p-6">
      <h3 class="text-lg font-semibold mb-2">Texture Controls</h3>
      <p class="text-sm text-muted-foreground mb-4">Select a texture variant and adjust the opacity</p>
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="variant in textureVariants"
            :key="variant"
            class="rounded-md border px-3 py-1 text-sm"
            :class="selectedVariant === variant ? 'bg-primary text-primary-foreground' : ''"
            @click="selectedVariant = variant"
          >
            {{ variant === 'none' ? 'None' : variant }}
          </button>
        </div>
        <div>
          <label class="text-sm font-medium">Opacity: {{ opacity.toFixed(2) }}</label>
          <input type="range" :min="0" :max="1" :step="0.01" v-model.number="opacity" class="w-full" />
        </div>
      </div>
    </div>

    <div class="rounded-lg border p-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-semibold">Preview with Content</h3>
          <p class="text-sm text-muted-foreground">See how the texture looks with content on top</p>
        </div>
        <button
          v-if="selectedVariant !== 'none'"
          class="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm"
          @click="downloadTexture(selectedVariant as Exclude<TextureVariant, 'none'>)"
        >
          <Download class="h-4 w-4" /> Download Texture
        </button>
      </div>
      <BackgroundImageTexture
        :variant="selectedVariant"
        :opacity="opacity"
        class="rounded-lg border border-border p-8 min-h-[400px]"
      >
        <div class="space-y-6">
          <div>
            <h3 class="text-3xl font-bold text-foreground mb-2">Texture Background</h3>
            <p class="text-muted-foreground text-lg">
              This content sits on top of the texture layer. Adjust the opacity slider to see how the texture affects the background.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 rounded-lg bg-card/50 border border-border">
              <h4 class="font-semibold mb-2">Feature 1</h4>
              <p class="text-sm text-muted-foreground">Content with texture background</p>
            </div>
            <div class="p-4 rounded-lg bg-card/50 border border-border">
              <h4 class="font-semibold mb-2">Feature 2</h4>
              <p class="text-sm text-muted-foreground">More content examples</p>
            </div>
          </div>
        </div>
      </BackgroundImageTexture>
    </div>

    <div class="space-y-4">
      <h3 class="text-2xl font-semibold">All Texture Variants</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="variant in textureVariants.filter(v => v !== 'none')" :key="variant" class="rounded-lg border p-4">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-lg capitalize">{{ variant.replace(/-/g, ' ') }}</h4>
            <button class="p-1" :title="`Download ${variant}.png`" @click="downloadTexture(variant as Exclude<TextureVariant, 'none'>)">
              <Download class="h-4 w-4" />
            </button>
          </div>
          <BackgroundImageTexture
            :variant="variant"
            :opacity="0.5"
            class="rounded-lg border border-border p-6 h-48 flex items-center justify-center"
          >
            <div class="text-center">
              <p class="text-sm font-medium text-foreground">{{ variant }}</p>
              <p class="text-xs text-muted-foreground mt-1">Opacity: 0.5</p>
            </div>
          </BackgroundImageTexture>
        </div>
      </div>
    </div>
  </div>
</template>
