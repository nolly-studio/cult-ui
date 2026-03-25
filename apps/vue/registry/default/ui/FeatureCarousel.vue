<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'

interface Step {
  id: string
  name: string
  title: string
  description: string
}

interface ImageSet {
  step1light1: string
  step1light2: string
  step2light1: string
  step2light2: string
  step3light: string
  step4light: string
  alt: string
  step1dark1?: string
  step1dark2?: string
  step2dark1?: string
  step2dark2?: string
  step3dark?: string
}

interface Props {
  title: string
  description: string
  bgClass?: string
  image: ImageSet
  step1img1Class?: string
  step1img2Class?: string
  step2img1Class?: string
  step2img2Class?: string
  step3imgClass?: string
  step4imgClass?: string
  steps?: Step[]
  autoPlayInterval?: number
}

const TOTAL_STEPS = 4

const props = withDefaults(defineProps<Props>(), {
  bgClass: '',
  step1img1Class: '',
  step1img2Class: '',
  step2img1Class: '',
  step2img2Class: '',
  step3imgClass: '',
  step4imgClass: '',
  steps: () => [
    { id: '1', name: 'Step 1', title: 'First Step', description: 'Description for step 1' },
    { id: '2', name: 'Step 2', title: 'Second Step', description: 'Description for step 2' },
    { id: '3', name: 'Step 3', title: 'Third Step', description: 'Description for step 3' },
    { id: '4', name: 'Step 4', title: 'Fourth Step', description: 'Description for step 4' },
  ],
  autoPlayInterval: 5000,
})

const currentStep = ref(0)
const isAutoPlaying = ref(true)
let autoPlayTimer: ReturnType<typeof setInterval> | null = null

function goToStep(index: number) {
  currentStep.value = index
  resetAutoPlay()
}

function nextStep() {
  currentStep.value = (currentStep.value + 1) % TOTAL_STEPS
}

function prevStep() {
  currentStep.value = (currentStep.value - 1 + TOTAL_STEPS) % TOTAL_STEPS
}

function resetAutoPlay() {
  if (autoPlayTimer) clearInterval(autoPlayTimer)
  if (isAutoPlaying.value) {
    autoPlayTimer = setInterval(nextStep, props.autoPlayInterval)
  }
}

onMounted(() => {
  resetAutoPlay()
})

onUnmounted(() => {
  if (autoPlayTimer) clearInterval(autoPlayTimer)
})

const progress = computed(() => ((currentStep.value + 1) / TOTAL_STEPS) * 100)
</script>

<template>
  <div
    :class="cn(
      'animated-cards relative flex flex-col rounded-3xl overflow-hidden',
      bgClass
    )"
  >
    <!-- Header -->
    <div class="p-6 pb-0">
      <h3 class="text-xl font-semibold text-foreground">{{ title }}</h3>
      <p class="mt-1 text-sm text-muted-foreground">{{ description }}</p>
    </div>

    <!-- Step indicators -->
    <div class="flex gap-2 px-6 pt-4">
      <button
        v-for="(step, index) in steps"
        :key="step.id"
        :class="cn(
          'flex-1 h-1 rounded-full transition-all duration-300',
          currentStep >= index ? 'bg-foreground' : 'bg-foreground/20'
        )"
        @click="goToStep(index)"
      />
    </div>

    <!-- Step content -->
    <div class="relative flex-1 p-6">
      <TransitionGroup name="carousel">
        <div
          v-for="(step, index) in steps"
          v-show="currentStep === index"
          :key="step.id"
          class="w-full"
        >
          <div class="space-y-2">
            <div class="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {{ step.name }}
            </div>
            <h4 class="text-lg font-semibold text-foreground">{{ step.title }}</h4>
            <p class="text-sm text-muted-foreground">{{ step.description }}</p>
          </div>

          <!-- Image area -->
          <div class="mt-4 relative aspect-video rounded-xl overflow-hidden bg-muted">
            <slot :name="`step-${index + 1}`" :step="step" :index="index">
              <img
                v-if="index === 0"
                :src="typeof image.step1light1 === 'string' ? image.step1light1 : ''"
                :alt="image.alt"
                :class="cn('w-full h-full object-cover', step1img1Class)"
              />
              <img
                v-else-if="index === 1"
                :src="typeof image.step2light1 === 'string' ? image.step2light1 : ''"
                :alt="image.alt"
                :class="cn('w-full h-full object-cover', step2img1Class)"
              />
              <img
                v-else-if="index === 2"
                :src="typeof image.step3light === 'string' ? image.step3light : ''"
                :alt="image.alt"
                :class="cn('w-full h-full object-cover', step3imgClass)"
              />
              <img
                v-else-if="index === 3"
                :src="typeof image.step4light === 'string' ? image.step4light : ''"
                :alt="image.alt"
                :class="cn('w-full h-full object-cover', step4imgClass)"
              />
            </slot>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between px-6 pb-6">
      <button
        class="text-sm text-muted-foreground hover:text-foreground transition-colors"
        @click="prevStep"
      >
        Previous
      </button>
      <span class="text-xs text-muted-foreground">
        {{ currentStep + 1 }} / {{ TOTAL_STEPS }}
      </span>
      <button
        class="text-sm text-muted-foreground hover:text-foreground transition-colors"
        @click="nextStep"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.carousel-enter-active {
  transition: all 0.3s ease-out;
}
.carousel-leave-active {
  transition: all 0.2s ease-in;
  position: absolute;
}
.carousel-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.carousel-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
