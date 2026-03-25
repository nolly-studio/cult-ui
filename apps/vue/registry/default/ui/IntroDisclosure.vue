<script setup lang="ts">
/**
 * Feature tour / intro disclosure component.
 * Uses Dialog on desktop and bottom sheet behavior on mobile.
 * Persists "don't show again" state via localStorage.
 */
import { ref, computed, onMounted, watch } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { CheckIcon, ExternalLinkIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

export interface IntroFeature {
  title: string
  description: string
  image?: string
  url?: string
}

const props = withDefaults(defineProps<{
  featureId: string
  features?: IntroFeature[]
  class?: string
  title?: string
  subtitle?: string
  showCheckbox?: boolean
  checkboxLabel?: string
}>(), {
  features: () => [],
  title: 'What\'s New',
  subtitle: 'Check out the latest features',
  showCheckbox: true,
  checkboxLabel: 'Don\'t show this again',
})

const emit = defineEmits<{
  complete: []
}>()

const isDesktop = useMediaQuery('(min-width: 768px)')
const isOpen = ref(false)
const currentIndex = ref(0)
const dontShowAgain = ref(false)

const storageKey = computed(() => `feature_${props.featureId}`)
const currentFeature = computed(() => props.features[currentIndex.value])
const isLast = computed(() => currentIndex.value === props.features.length - 1)
const isFirst = computed(() => currentIndex.value === 0)
const progressPercent = computed(() => ((currentIndex.value + 1) / props.features.length) * 100)

function next() {
  if (isLast.value) {
    close()
  } else {
    currentIndex.value++
  }
}

function prev() {
  if (!isFirst.value) {
    currentIndex.value--
  }
}

function close() {
  isOpen.value = false
  if (dontShowAgain.value) {
    localStorage.setItem(storageKey.value, JSON.stringify(false))
  }
  emit('complete')
}

onMounted(() => {
  const stored = localStorage.getItem(storageKey.value)
  const shouldShow = stored ? JSON.parse(stored) : true
  if (shouldShow && props.features.length > 0) {
    isOpen.value = true
  }
})

// Touch swipe support
let touchStartX = 0
function handleTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX
}
function handleTouchEnd(e: TouchEvent) {
  const diff = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(diff) > 100) {
    if (diff > 0) prev()
    else next()
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="intro-backdrop">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        @click="close"
      />
    </Transition>

    <Transition :name="isDesktop ? 'intro-dialog' : 'intro-drawer'">
      <div
        v-if="isOpen"
        :class="cn(
          'fixed z-50 bg-background shadow-lg',
          isDesktop
            ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border max-w-lg w-full max-h-[85vh]'
            : 'bottom-0 left-0 right-0 rounded-t-xl border-t max-h-[90vh]',
          props.class,
        )"
        @touchstart.passive="handleTouchStart"
        @touchend.passive="handleTouchEnd"
      >
        <!-- Drawer handle (mobile) -->
        <div v-if="!isDesktop" class="flex justify-center pt-3 pb-1">
          <div class="h-1 w-10 rounded-full bg-muted-foreground/30" />
        </div>

        <!-- Header -->
        <div class="px-6 pt-4 pb-2">
          <h2 class="text-lg font-semibold">{{ props.title }}</h2>
          <p class="text-sm text-muted-foreground">{{ props.subtitle }}</p>
        </div>

        <!-- Progress bar -->
        <div class="mx-6 h-1 rounded-full bg-muted">
          <div
            class="h-full rounded-full bg-primary transition-all duration-300"
            :style="{ width: `${progressPercent}%` }"
          />
        </div>

        <!-- Feature content -->
        <div v-if="currentFeature" class="p-6">
          <div v-if="currentFeature.image" class="mb-4 overflow-hidden rounded-lg bg-muted aspect-video">
            <img :src="currentFeature.image" :alt="currentFeature.title" class="h-full w-full object-cover" />
          </div>

          <h3 class="text-base font-medium">{{ currentFeature.title }}</h3>
          <p class="mt-1 text-sm text-muted-foreground">{{ currentFeature.description }}</p>

          <a
            v-if="currentFeature.url"
            :href="currentFeature.url"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Learn more <ExternalLinkIcon :size="14" />
          </a>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between border-t px-6 py-4">
          <label v-if="props.showCheckbox" class="flex items-center gap-2 text-sm text-muted-foreground">
            <input v-model="dontShowAgain" type="checkbox" class="rounded border-muted-foreground/30" />
            {{ props.checkboxLabel }}
          </label>
          <div v-else />

          <div class="flex gap-2">
            <button
              v-if="!isFirst"
              class="rounded-lg border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
              @click="prev"
            >
              Back
            </button>
            <button
              class="rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
              @click="next"
            >
              {{ isLast ? 'Done' : 'Next' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.intro-backdrop-enter-active,
.intro-backdrop-leave-active {
  transition: opacity 0.2s ease;
}
.intro-backdrop-enter-from,
.intro-backdrop-leave-to {
  opacity: 0;
}
.intro-dialog-enter-active,
.intro-dialog-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.intro-dialog-enter-from,
.intro-dialog-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.95);
}
.intro-drawer-enter-active,
.intro-drawer-leave-active {
  transition: transform 0.3s ease;
}
.intro-drawer-enter-from,
.intro-drawer-leave-to {
  transform: translateY(100%);
}
</style>
