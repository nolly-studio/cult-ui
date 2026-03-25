<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue"
import { useThrottleFn } from "@vueuse/core"
import { cn } from "@/lib/utils"
import { useMounted } from "@/composables/useMounted"

interface Step {
  id: string
  name: string
  title: string
  description: string
}

interface Props {
  title?: string
  description?: string
  bgClass?: string
  steps?: Step[]
  autoPlayInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  description: "",
  bgClass: "",
  autoPlayInterval: 3000,
  steps: () => [
    { id: "1", name: "Step 1", title: "Feature 1", description: "Feature 1 description" },
    { id: "2", name: "Step 2", title: "Feature 2", description: "Feature 2 description" },
    { id: "3", name: "Step 3", title: "Feature 3", description: "Feature 3 description" },
    { id: "4", name: "Step 4", title: "Feature 4", description: "Feature 4 description" },
  ],
})

const currentStep = ref(0)
const mounted = useMounted()
const mouseX = ref(0)
const mouseY = ref(0)
let timer: ReturnType<typeof setTimeout> | null = null

const totalSteps = computed(() => props.steps.length)

function setupTimer() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    currentStep.value = (currentStep.value + 1) % totalSteps.value
    setupTimer()
  }, props.autoPlayInterval)
}

function increment() {
  currentStep.value = (currentStep.value + 1) % totalSteps.value
  setupTimer()
}

const handleMouseMove = useThrottleFn((event: MouseEvent) => {
  const target = event.currentTarget
  if (!(target instanceof HTMLElement)) return
  const { left, top } = target.getBoundingClientRect()
  mouseX.value = event.clientX - left
  mouseY.value = event.clientY - top
}, 16)

onMounted(() => {
  setupTimer()
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

const activeStep = computed(() => props.steps[currentStep.value])
</script>

<template>
  <div
    class="animated-cards relative w-full rounded-[16px]"
    :style="{
      '--x': `${mouseX}px`,
      '--y': `${mouseY}px`,
    }"
    @mousemove="handleMouseMove"
  >
    <div
      :class="cn(
        'group relative w-full overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-b from-neutral-900/90 to-stone-800 transition duration-300 dark:from-neutral-950/90 dark:to-neutral-800/90',
        'md:hover:border-transparent',
        bgClass
      )"
    >
      <div class="m-10 min-h-[450px] w-full">
        <Transition mode="out-in" name="fade-slide">
          <div :key="currentStep" class="flex w-4/6 flex-col gap-3">
            <h2 class="text-xl font-bold tracking-tight text-white md:text-2xl">
              {{ activeStep?.title }}
            </h2>
            <p class="text-sm leading-5 text-neutral-300 dark:text-zinc-400 sm:text-base sm:leading-5">
              {{ activeStep?.description }}
            </p>
          </div>
        </Transition>

        <slot v-if="mounted" :step="currentStep" :increment="increment" />
      </div>

      <!-- Step indicators -->
      <nav aria-label="Progress" class="absolute left-48 top-5 z-50 md:left-0">
        <ol class="flex flex-wrap items-start gap-2 px-4 sm:justify-center">
          <li
            v-for="(step, idx) in steps"
            :key="`${step.name}-${idx}`"
            :class="cn(
              'relative z-50 rounded-full px-3 py-1 transition-all duration-300 ease-in-out',
              currentStep > idx ? 'bg-neutral-500/20' : 'bg-neutral-500/10',
              currentStep === idx ? 'scale-100 opacity-100' : 'scale-[0.8] opacity-50'
            )"
          >
            <div
              :class="cn(
                'group flex w-full cursor-pointer items-center',
                (currentStep <= idx) && 'pointer-events-none'
              )"
              @click="currentStep = idx; setupTimer()"
            >
              <span class="flex items-center gap-2 text-sm font-medium">
                <span
                  :class="cn(
                    'flex size-4 shrink-0 items-center justify-center rounded-full duration-300',
                    currentStep > idx && 'bg-brand-400 text-white',
                    currentStep === idx && 'bg-brand-300/80 text-neutral-400 dark:bg-neutral-500/50',
                    currentStep < idx && 'bg-brand-300/10 dark:bg-neutral-500/20'
                  )"
                >
                  <svg
                    v-if="currentStep > idx"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    class="size-3 stroke-white stroke-[3] text-white dark:stroke-black"
                  >
                    <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
                  </svg>
                  <span v-else :class="cn('text-xs', currentStep !== idx && 'text-[#C6EA7E]')">
                    {{ idx + 1 }}
                  </span>
                </span>
                <span
                  :class="cn(
                    'text-sm font-medium duration-300',
                    currentStep > idx && 'text-muted-foreground',
                    currentStep === idx && 'text-lime-300 dark:text-lime-500',
                    currentStep < idx && 'text-neutral-500'
                  )"
                >
                  {{ step.name }}
                </span>
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Click overlay to advance -->
      <div
        class="absolute right-0 top-0 z-50 size-full cursor-pointer"
        @click="increment"
      />
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
