<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue"

interface Props {
  delay?: number
  texts?: string[]
  baseText?: string
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  texts: () => [
    "quiz page with questions and answers",
    "blog Article Details Page Layout",
    "ecommerce dashboard with a sidebar",
    "ui like platform.openai.com....",
    "buttttton",
    "app that tracks non-standard split sleep cycles",
    "transparent card to showcase achievements of a user",
  ],
  baseText: "Create a ",
})

const baseDisplayLength = ref(0)
const repeatedDisplayLength = ref(0)
const textIndex = ref(0)
const baseComplete = ref(false)
const isTypingForward = ref(true)

let animationFrame: ReturnType<typeof requestAnimationFrame> | null = null
let startTime: number | null = null
let repeatedStartTime: number | null = null

const displayBase = computed(() => props.baseText.slice(0, baseDisplayLength.value))
const currentRepeatedText = computed(() => props.texts[textIndex.value] || "")
const displayRepeated = computed(() => currentRepeatedText.value.slice(0, repeatedDisplayLength.value))

function animateBase(timestamp: number) {
  if (!startTime) startTime = timestamp
  const elapsed = timestamp - startTime - props.delay * 1000

  if (elapsed < 0) {
    animationFrame = requestAnimationFrame(animateBase)
    return
  }

  const progress = Math.min(elapsed / 1000, 1)
  baseDisplayLength.value = Math.round(progress * props.baseText.length)

  if (progress < 1) {
    animationFrame = requestAnimationFrame(animateBase)
  } else {
    baseComplete.value = true
    repeatedStartTime = null
    animationFrame = requestAnimationFrame(animateRepeated)
  }
}

function animateRepeated(timestamp: number) {
  if (!repeatedStartTime) repeatedStartTime = timestamp
  const elapsed = (timestamp - repeatedStartTime) / 1000

  const maxLen = currentRepeatedText.value.length
  const cycleDuration = 2 // seconds per forward+reverse cycle
  const pauseDuration = 1 // seconds to pause at full text

  if (isTypingForward.value) {
    const progress = Math.min(elapsed / (cycleDuration / 2), 1)
    repeatedDisplayLength.value = Math.round(progress * maxLen)

    if (progress >= 1) {
      if (elapsed > cycleDuration / 2 + pauseDuration) {
        isTypingForward.value = false
        repeatedStartTime = timestamp
      }
    }
  } else {
    const progress = Math.min(elapsed / (cycleDuration / 2), 1)
    repeatedDisplayLength.value = Math.round((1 - progress) * maxLen)

    if (progress >= 1) {
      textIndex.value = (textIndex.value + 1) % props.texts.length
      isTypingForward.value = true
      repeatedStartTime = timestamp
    }
  }

  animationFrame = requestAnimationFrame(animateRepeated)
}

onMounted(() => {
  animationFrame = requestAnimationFrame(animateBase)
})

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <span>
    <span>{{ displayBase }}</span>
    <span v-if="baseComplete" class="inline">{{ displayRepeated }}</span>
    <span class="inline-block h-5 w-px translate-y-1 bg-neutral-900 animate-blink" />
  </span>
</template>

<style scoped>
@keyframes blink {
  0%, 50% { opacity: 0; }
  50.01%, 100% { opacity: 1; }
}
.animate-blink {
  animation: blink 1s linear infinite;
}
</style>
