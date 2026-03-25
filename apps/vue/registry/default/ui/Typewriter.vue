<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  delay?: number
  texts: string[]
  baseText?: string
}>(), {
  delay: 0,
  baseText: '',
})

// Base text typing
const typedBaseText = ref('')
const animationComplete = ref(false)

// Repeated text typing
const repeatedText = ref('')
const textIndex = ref(0)
let repeatedAnimInterval: ReturnType<typeof setInterval> | null = null
let charIndex = 0

// Blinking cursor
const cursorVisible = ref(true)
let cursorInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  // Blinking cursor
  cursorInterval = setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 500)

  // Type base text after delay
  setTimeout(() => {
    if (!props.baseText) {
      animationComplete.value = true
      startRepeatedAnimation()
      return
    }

    let i = 0
    const totalDuration = 1000
    const interval = setInterval(() => {
      if (i < props.baseText.length) {
        typedBaseText.value = props.baseText.slice(0, i + 1)
        i++
      } else {
        clearInterval(interval)
        animationComplete.value = true
        startRepeatedAnimation()
      }
    }, totalDuration / props.baseText.length)
  }, props.delay * 1000)
})

function startRepeatedAnimation() {
  const typeDuration = 1000
  const pauseDuration = 1000
  const delayMs = (props.delay + 1) * 1000

  function typeForward() {
    const text = props.texts[textIndex.value] || ''
    const maxChars = Math.min(text.length, 60)
    charIndex = 0

    repeatedAnimInterval = setInterval(() => {
      if (charIndex < maxChars) {
        charIndex++
        repeatedText.value = text.slice(0, charIndex)
      } else {
        if (repeatedAnimInterval) clearInterval(repeatedAnimInterval)
        setTimeout(typeBackward, pauseDuration)
      }
    }, typeDuration / maxChars)
  }

  function typeBackward() {
    const text = props.texts[textIndex.value] || ''
    const maxChars = Math.min(text.length, 60)

    repeatedAnimInterval = setInterval(() => {
      if (charIndex > 0) {
        charIndex--
        repeatedText.value = text.slice(0, charIndex)
      } else {
        if (repeatedAnimInterval) clearInterval(repeatedAnimInterval)
        textIndex.value = (textIndex.value + 1) % props.texts.length
        setTimeout(typeForward, 100)
      }
    }, typeDuration / maxChars)
  }

  setTimeout(typeForward, delayMs)
}

onUnmounted(() => {
  if (repeatedAnimInterval) clearInterval(repeatedAnimInterval)
  if (cursorInterval) clearInterval(cursorInterval)
})
</script>

<template>
  <span>
    <span>{{ typedBaseText }}</span>
    <span v-if="animationComplete" class="inline">{{ repeatedText }}</span>
    <div
      class="inline-block h-5 w-[1px] translate-y-1 bg-neutral-900"
      :style="{ opacity: cursorVisible ? 1 : 0 }"
    />
  </span>
</template>
