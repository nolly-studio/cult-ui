<script setup lang="ts">
/**
 * Video player that plays on hover/touch with controls, PiP, and thumbnail support.
 * Converts React context + AnimatePresence to Vue provide/inject + Transition.
 */
import { ref, computed, onMounted, onUnmounted, watch, useTemplateRef, provide, inject, type InjectionKey } from 'vue'
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  videoSrc: string
  thumbnailSrc?: string
  playbackStartDelay?: number
  restartOnPaused?: boolean
  unloadVideoOnPaused?: boolean
  playbackRangeStart?: number
  playbackRangeEnd?: number
  muted?: boolean
  loop?: boolean
  preload?: 'auto' | 'metadata' | 'none'
  class?: string
  enableControls?: boolean
  cropTop?: number
  cropBottom?: number
}>(), {
  playbackStartDelay: 0,
  restartOnPaused: false,
  unloadVideoOnPaused: false,
  muted: false,
  loop: true,
  preload: 'metadata',
  enableControls: false,
  cropTop: 0,
  cropBottom: 0,
})

const containerRef = useTemplateRef<HTMLDivElement>('container')
const videoRef = useTemplateRef<HTMLVideoElement>('video')

const isHovering = ref(false)
const isPlaying = ref(false)
const isLoading = ref(false)
const progress = ref(0)
const isMuted = ref(props.muted)
const volume = ref(1)
const isPiP = ref(false)
const isMobile = ref(false)
const controlsVisible = ref(false)
const showThumbnail = ref(true)
const isInView = ref(false)

let playbackTimeout: ReturnType<typeof setTimeout> | null = null
let observer: IntersectionObserver | null = null

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

function handleMouseEnter() {
  if (!isMobile.value) {
    isHovering.value = true
  }
}

function handleMouseLeave() {
  if (!isMobile.value) {
    isHovering.value = false
  }
}

function handleTouchStart() {
  if (isMobile.value) {
    controlsVisible.value = !controlsVisible.value
  }
}

function playVideo() {
  const video = videoRef.value
  if (!video || !isInView.value) return

  isLoading.value = true
  video.play()
    .then(() => {
      isLoading.value = false
      isPlaying.value = true
      showThumbnail.value = false
    })
    .catch(() => {
      isLoading.value = false
    })
}

function pauseVideo() {
  const video = videoRef.value
  if (!video) return

  video.pause()
  isPlaying.value = false

  if (props.restartOnPaused) {
    video.currentTime = props.playbackRangeStart ?? 0
  }
}

function togglePlay() {
  if (isPlaying.value) {
    pauseVideo()
  } else {
    playVideo()
  }
}

function toggleMute() {
  isMuted.value = !isMuted.value
  if (videoRef.value) {
    videoRef.value.muted = isMuted.value
  }
}

function setVolumeValue(val: number) {
  volume.value = val
  if (videoRef.value) {
    videoRef.value.volume = val
  }
}

async function togglePiP() {
  const video = videoRef.value
  if (!video) return

  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture()
      isPiP.value = false
    } else {
      await video.requestPictureInPicture()
      isPiP.value = true
    }
  } catch {
    // PiP not supported or denied
  }
}

function handleTimeUpdate() {
  const video = videoRef.value
  if (!video || !video.duration) return
  progress.value = (video.currentTime / video.duration) * 100

  if (props.playbackRangeEnd && video.currentTime >= props.playbackRangeEnd) {
    if (props.loop) {
      video.currentTime = props.playbackRangeStart ?? 0
    } else {
      pauseVideo()
    }
  }
}

function setProgressValue(val: number) {
  const video = videoRef.value
  if (!video || !video.duration) return
  video.currentTime = (val / 100) * video.duration
  progress.value = val
}

watch(isHovering, (hovering) => {
  if (hovering) {
    if (props.playbackStartDelay > 0) {
      playbackTimeout = setTimeout(playVideo, props.playbackStartDelay)
    } else {
      playVideo()
    }
  } else {
    if (playbackTimeout) {
      clearTimeout(playbackTimeout)
      playbackTimeout = null
    }
    pauseVideo()
  }
})

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

  observer = new IntersectionObserver(
    ([entry]) => { isInView.value = entry.isIntersecting },
    { threshold: 0.5 }
  )
  if (containerRef.value) observer.observe(containerRef.value)

  if (videoRef.value && props.playbackRangeStart) {
    videoRef.value.currentTime = props.playbackRangeStart
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  if (observer) observer.disconnect()
  if (playbackTimeout) clearTimeout(playbackTimeout)
})

const cropStyle = computed(() => ({
  clipPath: props.cropTop || props.cropBottom
    ? `inset(${props.cropTop}% 0 ${props.cropBottom}% 0)`
    : undefined,
}))
</script>

<template>
  <div
    ref="container"
    :class="cn('group relative overflow-hidden rounded-lg', props.class)"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart.passive="handleTouchStart"
  >
    <!-- Thumbnail -->
    <Transition name="fade">
      <img
        v-if="showThumbnail && props.thumbnailSrc"
        :src="props.thumbnailSrc"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
        :style="cropStyle"
      />
    </Transition>

    <!-- Video -->
    <video
      v-if="!props.unloadVideoOnPaused || isHovering"
      ref="video"
      :src="props.videoSrc"
      :muted="isMuted"
      :loop="props.loop"
      :preload="props.preload"
      playsinline
      class="h-full w-full object-cover"
      :style="cropStyle"
      @timeupdate="handleTimeUpdate"
    />

    <!-- Loading overlay -->
    <Transition name="fade">
      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-black/20">
        <slot name="loading">
          <div class="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </slot>
      </div>
    </Transition>

    <!-- Paused overlay -->
    <Transition name="fade">
      <div v-if="!isPlaying && !isLoading" class="absolute inset-0 flex items-center justify-center">
        <slot name="paused" />
      </div>
    </Transition>

    <!-- Hover overlay -->
    <Transition name="fade">
      <div v-if="isHovering" class="absolute inset-0">
        <slot name="hover" />
      </div>
    </Transition>

    <!-- Controls -->
    <Transition name="fade">
      <div
        v-if="props.enableControls && (isHovering || controlsVisible)"
        class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3"
      >
        <!-- Progress bar -->
        <div
          class="mb-2 h-1 w-full cursor-pointer rounded-full bg-white/30"
          @click.stop="(e: MouseEvent) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
            setProgressValue(((e.clientX - rect.left) / rect.width) * 100)
          }"
        >
          <div class="h-full rounded-full bg-white transition-all" :style="{ width: `${progress}%` }" />
        </div>

        <div class="flex items-center gap-2">
          <button class="text-white hover:text-white/80" @click.stop="togglePlay">
            <Play v-if="!isPlaying" :size="16" />
            <Pause v-else :size="16" />
          </button>

          <button class="text-white hover:text-white/80" @click.stop="toggleMute">
            <VolumeX v-if="isMuted" :size="16" />
            <Volume2 v-else :size="16" />
          </button>

          <div class="flex-1" />

          <button class="text-white hover:text-white/80" @click.stop="togglePiP">
            <Minimize v-if="isPiP" :size="16" />
            <Maximize v-else :size="16" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
