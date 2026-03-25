<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const keywords = [
  'night', 'city', 'sky', 'sunset', 'sunrise', 'winter',
  'skyscraper', 'building', 'cityscape', 'architecture',
  'street', 'lights', 'downtown', 'bridge',
]

const cards = computed(() =>
  keywords.map((keyword) => `https://picsum.photos/200/300?${keyword}`)
)

const activeImg = ref<string | null>(null)
const isCarouselActive = ref(true)
const rotation = ref(0)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartRotation = ref(0)
const velocity = ref(0)
const lastDragX = ref(0)
const lastDragTime = ref(0)
const overlayVisible = ref(false)
const overlayScale = ref(0)

const isScreenSizeSm = ref(false)

function checkScreenSize() {
  if (typeof window !== 'undefined') {
    isScreenSizeSm.value = window.matchMedia('(max-width: 640px)').matches
  }
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

const cylinderWidth = computed(() => isScreenSizeSm.value ? 1100 : 1800)
const faceCount = computed(() => cards.value.length)
const faceWidth = computed(() => cylinderWidth.value / faceCount.value)
const radius = computed(() => cylinderWidth.value / (2 * Math.PI))

function getFaceTransform(index: number) {
  return `rotateY(${index * (360 / faceCount.value)}deg) translateZ(${radius.value}px)`
}

function handleClick(imgUrl: string) {
  activeImg.value = imgUrl
  isCarouselActive.value = false
  overlayVisible.value = true
  requestAnimationFrame(() => {
    overlayScale.value = 1
  })
}

function handleClose() {
  overlayScale.value = 0
  setTimeout(() => {
    overlayVisible.value = false
    activeImg.value = null
    isCarouselActive.value = true
  }, 300)
}

function onPointerDown(e: PointerEvent) {
  if (!isCarouselActive.value) return
  isDragging.value = true
  dragStartX.value = e.clientX
  dragStartRotation.value = rotation.value
  lastDragX.value = e.clientX
  lastDragTime.value = performance.now()
  velocity.value = 0
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value || !isCarouselActive.value) return
  const dx = e.clientX - dragStartX.value
  rotation.value = dragStartRotation.value + dx * 0.2

  const now = performance.now()
  const dt = now - lastDragTime.value
  if (dt > 0) {
    velocity.value = (e.clientX - lastDragX.value) / dt
  }
  lastDragX.value = e.clientX
  lastDragTime.value = now
}

function onPointerUp() {
  if (!isDragging.value) return
  isDragging.value = false

  // Apply inertia
  const inertia = velocity.value * 100
  const target = rotation.value + inertia
  const startRotation = rotation.value
  const startTime = performance.now()
  const duration = 600

  function animate() {
    const elapsed = performance.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    rotation.value = startRotation + (target - startRotation) * eased
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  requestAnimationFrame(animate)
}

const carouselTransform = computed(() => `rotate3d(0, 1, 0, ${rotation.value}deg)`)
</script>

<template>
  <div class="relative">
    <!-- Overlay -->
    <Teleport to="body">
      <Transition name="overlay">
        <div
          v-if="overlayVisible && activeImg"
          class="fixed inset-0 bg-black/10 flex items-center justify-center z-50 m-5 md:m-36 lg:mx-[19rem] rounded-3xl"
          :style="{ transform: `scale(${overlayScale})`, transition: 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)' }"
          @click="handleClose"
        >
          <img
            :src="activeImg"
            class="max-w-full max-h-full rounded-lg shadow-lg transition-transform duration-500"
            :style="{ transform: `scale(${overlayScale})` }"
            alt="Expanded carousel image"
          />
        </div>
      </Transition>
    </Teleport>

    <!-- Carousel -->
    <div class="relative h-[500px] w-full overflow-hidden">
      <div
        class="flex h-full items-center justify-center bg-mauve-dark-2"
        :style="{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }"
      >
        <div
          class="relative flex h-full origin-center justify-center"
          :class="[isCarouselActive ? 'cursor-grab' : '', isDragging ? 'cursor-grabbing' : '']"
          :style="{
            transform: carouselTransform,
            width: `${cylinderWidth}px`,
            transformStyle: 'preserve-3d',
          }"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointerleave="onPointerUp"
        >
          <div
            v-for="(imgUrl, i) in cards"
            :key="`key-${imgUrl}-${i}`"
            class="absolute flex h-full origin-center items-center justify-center rounded-xl bg-mauve-dark-2 p-2"
            :style="{
              width: `${faceWidth}px`,
              transform: getFaceTransform(i),
            }"
            @click="handleClick(imgUrl)"
          >
            <img
              :src="imgUrl"
              :alt="`keyword_${i} ${imgUrl}`"
              class="pointer-events-none w-full rounded-xl object-cover aspect-square"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
