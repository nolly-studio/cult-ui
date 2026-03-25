<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const outerDivVariants = cva('relative inline-block overflow-hidden ', {
  variants: {
    size: {
      sm: '',
      default: '',
      lg: '',
    },
    rounded: {
      full: 'rounded-full before:rounded-full',
      xl: 'rounded-xl before:rounded-xl',
      '2xl': 'rounded-2xl before:rounded-2xl',
      '3xl': 'rounded-3xl before:rounded-3xl',
      sm: 'rounded-sm before:rounded-sm',
      xs: 'rounded-xs before:rounded-xs',
      base: 'rounded before:rounded',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

const innerSpanVariants = cva(
  ['absolute inset-[-1000%] m-auto block '],
  {
    variants: {
      animation: {
        pulse: 'animate-pulse',
        'spin-fast': 'animate-[spin_2s_linear_infinite]',
        'spin-slow': 'animate-[spin_8s_linear_infinite]',
        spin: 'animate-[spin_4s_linear_infinite]',
      },
      gradient: {
        sunrise: 'text-black font-bold',
        ocean: 'bg-[conic-gradient(from_90deg_at_50%_50%,#a1c4fd_0%,#c2e9fb_50%,#a1c4fd_100%)] ',
        candy: 'bg-[conic-gradient(from_90deg_at_50%_50%,#ff9a9e_0%,#fad0c4_50%,#fad0c4_90%,#ff9a9e_100%)] ',
        forest: 'bg-[conic-gradient(from_90deg_at_50%_50%,#85d797_0%,#1a806b_50%,#85d797_100%)] ',
        sunset: 'bg-[conic-gradient(from_90deg_at_50%_50%,#fe5d75_0%,#f5af19_50%,#fe5d75_100%)] ',
        nebula: 'bg-[conic-gradient(from_90deg_at_50%_50%,#A77BFE_0%,#8860D0_50%,#A77BFE_100%)] ',
        default: 'bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] ',
      },
    },
    compoundVariants: [
      {
        animation: 'spin',
        gradient: 'sunrise',
        className: 'duration-4s ease-linear',
      },
    ],
    defaultVariants: {
      animation: 'spin',
      gradient: 'forest',
    },
  }
)

const buttonVariants = cva(
  'relative px-6 py-2 transition-all duration-150 ease-in-out disabled:pointer-events-none disabled:opacity-50 text-sm overflow-hidden',
  {
    variants: {
      size: {
        sm: 'text-xs px-4 py-1',
        default: 'text-sm px-6 py-2',
        lg: 'text-base px-8 py-3',
      },
      shadow: {
        flat: '',
        soft: 'shadow-[0_2px_4px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_2px_rgba(0,0,0,0.3)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(0,0,0,0.2),inset_0_-1px_2px_rgba(0,0,0,0.5)]',
        base: 'shadow-[0_3px_5px_rgba(0,0,0,0.2),inset_0_0.5px_1px_rgba(255,255,255,0.1),inset_0_-2px_3px_rgba(0,0,0,0.4)] dark:shadow-[0_3px_5px_rgba(0,0,0,0.3),inset_0_0.5px_1px_rgba(0,0,0,0.2),inset_0_-2px_3px_rgba(0,0,0,0.6)]',
        deep: 'shadow-[0_4px_6px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.5)] dark:shadow-[0_4px_6px_rgba(0,0,0,0.35),inset_0_1px_2px_rgba(0,0,0,0.3),inset_0_-2px_4px_rgba(0,0,0,0.7)]',
        deeper: 'shadow-[0_6px_8px_rgba(0,0,0,0.3),inset_0_2px_3px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.6)] dark:shadow-[0_6px_8px_rgba(0,0,0,0.4),inset_0_2px_3px_rgba(0,0,0,0.35),inset_0_-3px_6px_rgba(0,0,0,0.8)]',
      },
      gradient: {
        sunrise: 'text-black font-bold',
        ocean: 'text-black font-bold',
        candy: 'text-black font-bold',
        forest: 'text-black font-bold',
        sunset: 'text-black font-bold',
        nebula: 'text-white font-bold',
        default: 'text-white font-bold',
      },
      rounded: {
        full: 'rounded-full before:rounded-full',
        xl: 'rounded-xl before:rounded-xl',
        '2xl': 'rounded-2xl before:rounded-2xl',
        '3xl': 'rounded-3xl before:rounded-3xl',
        sm: 'rounded-sm before:rounded-sm',
        xs: 'rounded-xs before:rounded-xs',
        base: 'rounded before:rounded',
      },
    },
    defaultVariants: {
      size: 'default',
      shadow: 'base',
      rounded: 'xl',
    },
  }
)

interface Props {
  size?: 'sm' | 'lg' | 'default'
  shadow?: 'flat' | 'soft' | 'base' | 'deep' | 'deeper'
  rounded?: 'full' | 'xl' | '2xl' | '3xl' | 'sm' | 'xs' | 'base'
  showBackground?: boolean
  animation?: 'spin' | 'pulse' | 'spin-slow' | 'spin-fast'
  gradient?: 'sunrise' | 'ocean' | 'candy' | 'default' | 'forest' | 'sunset' | 'nebula' | null
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  shadow: 'soft',
  rounded: 'full',
  showBackground: false,
  animation: undefined,
  gradient: null,
})

const outerClass = computed(() =>
  cn(outerDivVariants({ size: props.size, rounded: props.rounded }), props.class)
)

const innerClass = computed(() =>
  props.gradient ? cn(innerSpanVariants({ gradient: props.gradient, animation: props.animation })) : null
)

const btnClass = computed(() =>
  cn(buttonVariants({ shadow: props.shadow, rounded: props.rounded, size: props.size, gradient: props.gradient }))
)
</script>

<template>
  <button :class="outerClass" v-bind="$attrs">
    <span v-if="innerClass" :class="innerClass" />
    <div :class="btnClass">
      <slot>Button</slot>
    </div>
  </button>
</template>
