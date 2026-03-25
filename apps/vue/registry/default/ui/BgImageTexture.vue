<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type TextureVariant =
  | 'fabric-of-squares'
  | 'grid-noise'
  | 'inflicted'
  | 'debut-light'
  | 'groovepaper'
  | 'none'

interface Props {
  variant?: TextureVariant
  opacity?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'fabric-of-squares',
  opacity: 0.5,
})

const textureMap: Record<Exclude<TextureVariant, 'none'>, string> = {
  'fabric-of-squares': '/textures/fabric-of-squares.png',
  'grid-noise': '/textures/grid-noise.png',
  inflicted: '/textures/inflicted.png',
  'debut-light': '/textures/debut-light.png',
  groovepaper: '/textures/groovepaper.png',
}

const textureUrl = computed(() =>
  props.variant !== 'none' ? textureMap[props.variant as Exclude<TextureVariant, 'none'>] : null
)
</script>

<template>
  <div :class="cn('relative', props.class)">
    <div
      v-if="textureUrl"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0"
      :style="{
        backgroundImage: `url(${textureUrl})`,
        backgroundRepeat: 'repeat',
        opacity: props.opacity,
      }"
    />
    <div v-if="$slots.default" class="relative">
      <slot />
    </div>
  </div>
</template>
