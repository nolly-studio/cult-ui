<script setup lang="ts">
/**
 * Loading/tip carousel with autoplay and text scramble effect.
 * Uses embla-carousel-vue for carousel behavior.
 */
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Tip {
  text: string
  image: string
  url?: string
}

const props = withDefaults(defineProps<{
  tips?: Tip[]
  class?: string
  autoplayInterval?: number
  showNavigation?: boolean
  showIndicators?: boolean
  showProgress?: boolean
  aspectRatio?: 'video' | 'square' | 'wide'
  textPosition?: 'top' | 'bottom'
  backgroundTips?: boolean
  backgroundGradient?: boolean
  shuffleTips?: boolean
  animateText?: boolean
}>(), {
  tips: () => [
    { text: 'Tip 1: Use keyboard shortcuts for faster navigation.', image: '/placeholders/tip1.png' },
    { text: 'Tip 2: Customize your workspace in settings.', image: '/placeholders/tip2.png' },
    { text: 'Tip 3: Check out the documentation for advanced features.', image: '/placeholders/tip3.png' },
  ],
  autoplayInterval: 5000,
  showNavigation: false,
  showIndicators: true,
  showProgress: true,
  aspectRatio: 'video',
  textPosition: 'bottom',
  backgroundTips: false,
  backgroundGradient: true,
  shuffleTips: false,
  animateText: true,
})

const emit = defineEmits<{
  tipChange: [index: number]
}>()

function shuffleArray<T>(arr: T[]): T[] {
  const s = [...arr]
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[s[i], s[j]] = [s[j], s[i]]
  }
  return s
}

const orderedTips = computed(() => props.shuffleTips ? shuffleArray(props.tips) : props.tips)

const [emblaRef, emblaApi] = emblaCarouselVue(
  { loop: true },
  [Autoplay({ delay: props.autoplayInterval, stopOnInteraction: false })]
)

const currentIndex = ref(0)
const displayText = ref('')
const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
let scrambleIntervalId: ReturnType<typeof setInterval> | null = null

function scrambleText(target: string) {
  if (scrambleIntervalId) {
    clearInterval(scrambleIntervalId)
    scrambleIntervalId = null
  }

  if (!props.animateText) {
    displayText.value = target
    return
  }

  let iteration = 0
  scrambleIntervalId = setInterval(() => {
    displayText.value = target
      .split('')
      .map((char, i) => {
        if (i < iteration) return char
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
      })
      .join('')
    iteration += 1
    if (iteration > target.length) {
      clearInterval(scrambleIntervalId!)
      scrambleIntervalId = null
    }
  }, 30)
}

onUnmounted(() => {
  if (scrambleIntervalId) clearInterval(scrambleIntervalId)
})

const aspectClass = computed(() => {
  switch (props.aspectRatio) {
    case 'square': return 'aspect-square'
    case 'wide': return 'aspect-[2/1]'
    default: return 'aspect-video'
  }
})

onMounted(() => {
  if (!emblaApi.value) return

  const api = emblaApi.value

  function onSelect() {
    currentIndex.value = api.selectedScrollSnap()
    emit('tipChange', currentIndex.value)
    scrambleText(orderedTips.value[currentIndex.value]?.text ?? '')
  }

  api.on('select', onSelect)
  onSelect()
})

watch(emblaApi, (api) => {
  if (!api) return

  function onSelect() {
    currentIndex.value = api!.selectedScrollSnap()
    emit('tipChange', currentIndex.value)
    scrambleText(orderedTips.value[currentIndex.value]?.text ?? '')
  }

  api.on('select', onSelect)
  onSelect()
})

function scrollNext() {
  emblaApi.value?.scrollNext()
}

function scrollPrev() {
  emblaApi.value?.scrollPrev()
}

function scrollTo(index: number) {
  emblaApi.value?.scrollTo(index)
}
</script>

<template>
  <div :class="cn('relative w-full overflow-hidden rounded-lg', props.class)">
    <!-- Text (top position) -->
    <div v-if="props.textPosition === 'top'" class="px-4 py-3">
      <p class="text-sm text-muted-foreground font-mono min-h-[2.5rem]">
        {{ displayText }}
      </p>
    </div>

    <!-- Carousel -->
    <div ref="emblaRef" class="overflow-hidden">
      <div class="flex">
        <div
          v-for="(tip, i) in orderedTips"
          :key="i"
          class="min-w-0 flex-[0_0_100%]"
        >
          <div :class="cn('relative overflow-hidden', aspectClass)">
            <img
              :src="tip.image"
              :alt="tip.text"
              class="h-full w-full object-cover"
            />
            <div
              v-if="props.backgroundGradient"
              class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Text (bottom position) -->
    <div v-if="props.textPosition === 'bottom'" class="px-4 py-3">
      <p class="text-sm text-muted-foreground font-mono min-h-[2.5rem]">
        {{ displayText }}
      </p>
    </div>

    <!-- Navigation -->
    <div v-if="props.showNavigation" class="absolute inset-y-0 flex items-center justify-between w-full px-2 pointer-events-none">
      <button
        class="pointer-events-auto rounded-full bg-background/80 p-1.5 shadow-sm backdrop-blur-sm hover:bg-background"
        @click="scrollPrev"
      >
        <ChevronRight :size="16" class="rotate-180" />
      </button>
      <button
        class="pointer-events-auto rounded-full bg-background/80 p-1.5 shadow-sm backdrop-blur-sm hover:bg-background"
        @click="scrollNext"
      >
        <ChevronRight :size="16" />
      </button>
    </div>

    <!-- Indicators -->
    <div v-if="props.showIndicators" class="flex justify-center gap-1.5 py-2">
      <button
        v-for="(_, i) in orderedTips"
        :key="i"
        :class="cn(
          'h-1.5 rounded-full transition-all duration-300',
          i === currentIndex ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/30'
        )"
        @click="scrollTo(i)"
      />
    </div>

    <!-- Progress bar -->
    <div v-if="props.showProgress" class="h-0.5 w-full bg-muted">
      <div
        class="h-full bg-primary transition-all duration-300"
        :style="{ width: `${((currentIndex + 1) / orderedTips.length) * 100}%` }"
      />
    </div>
  </div>
</template>
