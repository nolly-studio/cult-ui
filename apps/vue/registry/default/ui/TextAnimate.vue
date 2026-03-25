<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

type AnimationType =
  | 'fadeIn'
  | 'fadeInUp'
  | 'popIn'
  | 'shiftInUp'
  | 'rollIn'
  | 'whipIn'
  | 'whipInUp'
  | 'calmInUp'

const props = withDefaults(
  defineProps<{
    text: string
    type?: AnimationType
    delay?: number
    duration?: number
  }>(),
  {
    type: 'whipInUp',
    delay: 0,
    duration: undefined,
  }
)

const containerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  if (!containerRef.value) {
    isVisible.value = true
    return
  }
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )
  observer.observe(containerRef.value)
})

const words = computed(() => props.text.split(' '))
const letters = computed(() => Array.from(props.text))

const isWordType = computed(
  () => props.type === 'rollIn' || props.type === 'whipIn'
)

// CSS-based animation config per type
const animConfig = computed(() => {
  const configs: Record<
    AnimationType,
    {
      containerStagger: number
      childDuration: number
      childEasing: string
      childFrom: Record<string, string>
      childTo: Record<string, string>
    }
  > = {
    fadeIn: {
      containerStagger: 0.05,
      childDuration: 0.5,
      childEasing: 'cubic-bezier(0.5, 0, 0.5, 1)',
      childFrom: { opacity: '0', transform: 'translateY(10px)' },
      childTo: { opacity: '1', transform: 'translateY(0)' },
    },
    fadeInUp: {
      containerStagger: 0.1,
      childDuration: 0.5,
      childEasing: 'ease',
      childFrom: { opacity: '0', transform: 'translateY(20px)' },
      childTo: { opacity: '1', transform: 'translateY(0)' },
    },
    popIn: {
      containerStagger: 0.05,
      childDuration: 0.4,
      childEasing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      childFrom: { opacity: '0', transform: 'scale(0)' },
      childTo: { opacity: '1', transform: 'scale(1.1)' },
    },
    calmInUp: {
      containerStagger: 0.01,
      childDuration: 0.75,
      childEasing: 'cubic-bezier(0.125, 0.92, 0.69, 0.975)',
      childFrom: { opacity: '1', transform: 'translateY(200%)' },
      childTo: { opacity: '1', transform: 'translateY(0)' },
    },
    shiftInUp: {
      containerStagger: 0.01,
      childDuration: 0.8,
      childEasing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      childFrom: { opacity: '1', transform: 'translateY(100%)' },
      childTo: { opacity: '1', transform: 'translateY(0)' },
    },
    whipInUp: {
      containerStagger: 0.01,
      childDuration: 0.75,
      childEasing: 'cubic-bezier(0.5, -0.15, 0.25, 1.05)',
      childFrom: { opacity: '1', transform: 'translateY(200%)' },
      childTo: { opacity: '1', transform: 'translateY(0)' },
    },
    rollIn: {
      containerStagger: 0.025,
      childDuration: 0.65,
      childEasing: 'cubic-bezier(0.65, 0, 0.75, 1)',
      childFrom: { opacity: '0', transform: 'translateY(0.25em)' },
      childTo: { opacity: '1', transform: 'translateY(0)' },
    },
    whipIn: {
      containerStagger: 0.025,
      childDuration: 0.45,
      childEasing: 'cubic-bezier(0.85, 0.1, 0.9, 1.2)',
      childFrom: { opacity: '0', transform: 'translateY(0.35em)' },
      childTo: { opacity: '1', transform: 'translateY(0)' },
    },
  }
  return configs[props.type]
})

function getCharDelay(wordIndex: number, charIndex: number): string {
  const wordDelay = wordIndex * 0.13
  const charDelay = charIndex * animConfig.value.containerStagger
  return `${wordDelay + charDelay}s`
}

function getLetterDelay(index: number): string {
  return `${index * animConfig.value.containerStagger + 0.2}s`
}
</script>

<template>
  <h2
    v-if="isWordType"
    ref="containerRef"
    class="mt-10 text-3xl font-black text-black dark:text-neutral-100 py-5 pb-8 px-8 md:text-5xl"
  >
    <span
      v-for="(word, wIdx) in words"
      :key="wIdx"
      class="inline-block mr-[0.25em] whitespace-nowrap"
      aria-hidden="true"
    >
      <span
        v-for="(char, cIdx) in Array.from(word)"
        :key="cIdx"
        class="inline-block -mr-[0.01em] text-animate-char"
        :class="{ 'text-animate-visible': isVisible }"
        :style="{
          '--char-delay': getCharDelay(wIdx, cIdx),
          '--char-duration': `${animConfig.childDuration}s`,
          '--char-easing': animConfig.childEasing,
          ...(!isVisible ? animConfig.childFrom : {}),
        }"
        aria-hidden="true"
      >
        {{ char }}
      </span>
    </span>
  </h2>

  <h2
    v-else
    ref="containerRef"
    class="mt-10 text-4xl font-black text-black dark:text-neutral-100 py-5 pb-8 px-8 md:text-5xl"
    style="display: flex; overflow: hidden"
    role="heading"
  >
    <span
      v-for="(letter, idx) in letters"
      :key="idx"
      class="text-animate-char"
      :class="{ 'text-animate-visible': isVisible }"
      :style="{
        '--char-delay': getLetterDelay(idx),
        '--char-duration': `${animConfig.childDuration}s`,
        '--char-easing': animConfig.childEasing,
        ...(!isVisible ? animConfig.childFrom : {}),
      }"
    >
      {{ letter === ' ' ? '\u00A0' : letter }}
    </span>
  </h2>
</template>

<style scoped>
.text-animate-char {
  transition-property: opacity, transform;
  transition-duration: var(--char-duration, 0.5s);
  transition-timing-function: var(--char-easing, ease);
  transition-delay: var(--char-delay, 0s);
}

.text-animate-char.text-animate-visible {
  opacity: 1 !important;
  transform: translateY(0) scale(1) !important;
}
</style>
