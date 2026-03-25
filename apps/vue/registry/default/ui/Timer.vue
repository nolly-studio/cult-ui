<script setup lang="ts">
import { ref, computed, watch, onUnmounted, type Component } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { Clock } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const timerVariants = cva(
  [
    'inline-flex items-center gap-2 font-medium rounded-full transition-all duration-200',
    '',
  ],
  {
    variants: {
      variant: {
        default:
          'bg-background text-foreground border border-border shadow-[0_2px_4px_rgba(0,0,0,0.02),_0px_1px_2px_rgba(0,0,0,0.04)] shadow-[inset_0px_-2.10843px_0px_0px_hsl(var(--muted)),_0px_1.20482px_6.3253px_0px_hsl(var(--muted))]',
        outline:
          'border border-input bg-background text-foreground shadow-[0px_1px_0px_0px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_rgba(255,_255,_255,_0.25)]',
        ghost: 'bg-transparent text-foreground',
        destructive:
          'bg-destructive/10 text-destructive border border-destructive/20',
      },
      size: {
        sm: 'text-xs px-2 py-1 h-6 gap-1.5',
        md: 'text-sm px-2.5 py-1.5 h-7 gap-2',
        lg: 'text-base px-3 py-2 h-8 gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const timerIconVariants = cva('transition-transform duration-[2000ms]', {
  variants: {
    size: {
      sm: 'w-3 h-3',
      md: 'w-3.5 h-3.5',
      lg: 'w-4 h-4',
    },
    loading: {
      true: 'animate-spin',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    loading: false,
  },
})

const timerDisplayVariants = cva('font-mono tabular-nums tracking-tight', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type TimerFormat = 'SS.MS' | 'MM:SS' | 'HH:MM:SS'

const props = withDefaults(defineProps<{
  loading?: boolean
  resetOnLoadingChange?: boolean
  format?: TimerFormat
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  class?: string
  icon?: Component
}>(), {
  loading: false,
  resetOnLoadingChange: true,
  format: 'SS.MS',
  variant: 'default',
  size: 'md',
})

const emit = defineEmits<{
  tick: [seconds: number, milliseconds: number]
}>()

// Timer logic
const elapsedTime = ref(0)
const milliseconds = ref(0)
const isRunning = ref(false)
const startTime = ref(0)
let rafId: number | null = null

function reset() {
  elapsedTime.value = 0
  milliseconds.value = 0
  startTime.value = 0
}

function start() {
  isRunning.value = true
  startTime.value = performance.now()
}

function stop() {
  isRunning.value = false
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function updateTimer() {
  if (!isRunning.value) return
  const now = performance.now()
  const elapsed = now - startTime.value
  elapsedTime.value = Math.floor(elapsed / 1000)
  milliseconds.value = Math.floor(elapsed % 1000)
  emit('tick', elapsedTime.value, milliseconds.value)
  rafId = requestAnimationFrame(updateTimer)
}

watch(isRunning, (running) => {
  if (running) {
    rafId = requestAnimationFrame(updateTimer)
  } else if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
})

watch(() => props.loading, (loading) => {
  if (loading) {
    if (props.resetOnLoadingChange) {
      reset()
    }
    start()
  } else {
    stop()
  }
})

onUnmounted(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
  }
})

const formattedTime = computed(() => {
  const totalSeconds = elapsedTime.value
  const ms = milliseconds.value
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  switch (props.format) {
    case 'HH:MM:SS':
      return {
        seconds: seconds.toString().padStart(2, '0'),
        milliseconds: Math.floor(ms / 10).toString().padStart(2, '0'),
        display: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
      }
    case 'MM:SS': {
      const totalMinutes = Math.floor(totalSeconds / 60)
      const remainingSeconds = totalSeconds % 60
      return {
        seconds: remainingSeconds.toString().padStart(2, '0'),
        milliseconds: Math.floor(ms / 10).toString().padStart(2, '0'),
        display: `${totalMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`,
      }
    }
    case 'SS.MS':
    default:
      return {
        seconds: totalSeconds.toString().padStart(2, '0'),
        milliseconds: Math.floor(ms / 10).toString().padStart(2, '0'),
        display: `${totalSeconds.toString().padStart(2, '0')}.${Math.floor(ms / 10).toString().padStart(2, '0')}`,
      }
  }
})

defineExpose({
  elapsedTime,
  milliseconds,
  formattedTime,
  isRunning,
  reset,
  start,
  stop,
})
</script>

<template>
  <div
    :class="cn(timerVariants({ variant: props.variant, size: props.size }), props.class)"
    role="timer"
    aria-live="polite"
    aria-atomic="true"
  >
    <div :class="cn(timerIconVariants({ size: props.size, loading: props.loading }))">
      <component :is="props.icon || Clock" class="w-full h-full" />
    </div>
    <div
      :class="cn(timerDisplayVariants({ size: props.size }))"
      :aria-label="`Timer: ${formattedTime.display}`"
    >
      {{ formattedTime.display }}
    </div>
  </div>
</template>
