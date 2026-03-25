<script setup lang="ts">
import { ref, computed, watch, type CSSProperties } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textBaseVariants = cva('', {
  variants: {
    size: {
      default: 'text-2xl sm:text-3xl lg:text-4xl',
      xxs: 'text-base sm:text-lg lg:text-lg',
      xs: 'text-lg sm:text-xl lg:text-2xl',
      sm: 'text-xl sm:text-2xl lg:text-3xl',
      md: 'text-2xl sm:text-3xl lg:text-4xl',
      lg: 'text-3xl sm:text-4xl lg:text-5xl',
      xl: 'text-4xl sm:text-5xl lg:text-6xl',
      xxl: 'text-[2.5rem] sm:text-6xl lg:text-[6rem]',
      xll: 'text-5xl sm:text-6xl lg:text-[7rem]',
      xxxl: 'text-[6rem] leading-5 lg:leading-8 sm:text-6xl lg:text-[8rem]',
    },
    weight: {
      default: 'font-bold',
      thin: 'font-thin',
      base: 'font-base',
      semi: 'font-semibold',
      bold: 'font-bold',
      black: 'font-black',
    },
    font: {
      default: 'font-sansTight',
      serif: 'font-serif',
      mono: 'font-mono',
    },
  },
  defaultVariants: {
    size: 'default',
    weight: 'bold',
    font: 'default',
  },
})

type TextBaseVariantProps = VariantProps<typeof textBaseVariants>

const props = withDefaults(
  defineProps<{
    gifUrl: string
    text: string
    size?: TextBaseVariantProps['size']
    weight?: TextBaseVariantProps['weight']
    font?: TextBaseVariantProps['font']
    class?: string
    fallbackColor?: string
    transitionDuration?: number
  }>(),
  {
    size: 'default',
    weight: 'bold',
    font: 'default',
    class: undefined,
    fallbackColor: 'black',
    transitionDuration: 300,
  }
)

const loaded = ref(false)
const error = ref(false)

watch(
  () => props.gifUrl,
  () => {
    loaded.value = false
    error.value = false
  }
)

const textClassName = computed(() =>
  cn(
    textBaseVariants({ size: props.size, weight: props.weight, font: props.font }),
    loaded.value && !error.value ? 'text-transparent bg-clip-text' : '',
    props.class,
    'pb-1.5 md:pb-4'
  )
)

const textStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    WebkitBackgroundClip: 'text',
    lineHeight: 1,
    textAlign: 'center',
    color: props.fallbackColor,
    WebkitTextFillColor: props.fallbackColor,
    transition: `background-image ${props.transitionDuration}ms ease-in-out, color ${props.transitionDuration}ms ease-in-out`,
  }

  if (loaded.value && !error.value) {
    style.backgroundImage = `url(${props.gifUrl})`
    style.color = 'transparent'
    style.WebkitTextFillColor = 'transparent'
  }

  return style
})

function onLoad() {
  loaded.value = true
  error.value = false
}

function onError() {
  error.value = true
  loaded.value = false
}
</script>

<template>
  <div class="relative inline-block">
    <!-- Hidden image for preloading -->
    <img
      v-if="gifUrl"
      :src="gifUrl"
      alt=""
      class="absolute opacity-0 pointer-events-none w-px h-px"
      @load="onLoad"
      @error="onError"
    />
    <span :class="textClassName" :style="textStyle">
      {{ text }}
    </span>
  </div>
</template>
