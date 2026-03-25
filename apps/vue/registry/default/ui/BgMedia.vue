<script setup lang="ts">
import { ref, computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

type OverlayVariant = 'none' | 'light' | 'dark'
type MediaType = 'image' | 'video'

const backgroundVariants = cva(
  'relative h-screen max-h-[1000px] w-full min-h-[500px] lg:min-h-[600px]',
  {
    variants: {
      overlay: {
        none: '',
        light: 'before:absolute before:inset-0 before:bg-white before:opacity-30',
        dark: 'before:absolute before:inset-0 before:bg-black before:opacity-30',
      },
      type: {
        image: '',
        video: 'z-10',
      },
    },
    defaultVariants: {
      overlay: 'none',
      type: 'image',
    },
  }
)

interface Props {
  variant?: OverlayVariant
  type?: MediaType
  src: string
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light',
  type: 'image',
  alt: '',
})

const isPlaying = ref(true)
const mediaRef = ref<HTMLVideoElement | null>(null)

function toggleMediaPlay() {
  if (props.type === 'video' && mediaRef.value) {
    if (isPlaying.value) {
      mediaRef.value.pause()
    } else {
      mediaRef.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

const mediaClasses = computed(() =>
  cn(backgroundVariants({ overlay: props.variant, type: props.type }), 'overflow-hidden')
)
</script>

<template>
  <div :class="mediaClasses">
    <video
      v-if="type === 'video'"
      ref="mediaRef"
      aria-hidden="true"
      muted
      class="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 pointer-events-none"
      autoplay
      playsinline
    >
      <source :src="src" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <img
      v-else
      :src="src"
      :alt="alt"
      class="absolute inset-0 h-full w-full object-cover rounded-br-[88px]"
      loading="eager"
    />
    <button
      v-if="type === 'video'"
      :aria-label="isPlaying ? 'Pause video' : 'Play video'"
      class="absolute bottom-4 right-4 z-50 px-4 py-2 bg-gray-900 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      @click="toggleMediaPlay"
    >
      {{ isPlaying ? 'Pause' : 'Play' }}
    </button>
  </div>
</template>
