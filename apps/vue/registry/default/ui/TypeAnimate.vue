<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { cn } from '@/lib/utils'

// Container animation state
const containerVisible = ref(false)
const itemVisible = ref(false)

onMounted(() => {
  // Stagger the container animation
  requestAnimationFrame(() => {
    containerVisible.value = true
    setTimeout(() => {
      itemVisible.value = true
    }, 300)
  })
})

// --- TextAnimation ---
const baseText = 'Create a '
const typedText = ref('')
const animationComplete = ref(false)

onMounted(() => {
  // Start typing after 1s delay
  setTimeout(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < baseText.length) {
        typedText.value = baseText.slice(0, i + 1)
        i++
      } else {
        clearInterval(interval)
        animationComplete.value = true
      }
    }, 1000 / baseText.length) // ~1s total
  }, 1000)
})

// --- RepeatedTextAnimation ---
const texts = [
  'quiz page with questions and answers',
  'blog Article Details Page Layout',
  'ecommerce dashboard with a sidebar navigation and a table of recent orders.',
  'ui like platform.openai.com....',
  'buttttton',
  'fully detailed landing page for an application that tracks non-standard split sleep cycles',
  'transparent card to showcase achievements of a user',
  'list of product categories with image, name and description.',
  'landing page hero section with a heading, leading text and an opt-in form.',
  'contact form with first name, last name, email, and message fields.',
]

const repeatedText = ref('')
const textIndex = ref(0)
let repeatedAnimInterval: ReturnType<typeof setInterval> | null = null
let isTyping = ref(true)
let charIndex = ref(0)

function startRepeatedAnimation() {
  const typeDuration = 1000 // 1s to type
  const pauseDuration = 1000 // 1s pause
  const currentText = computed(() => texts[textIndex.value] || '')

  function typeForward() {
    isTyping.value = true
    const text = texts[textIndex.value] || ''
    const maxChars = Math.min(text.length, 60)
    charIndex.value = 0

    repeatedAnimInterval = setInterval(() => {
      if (charIndex.value < maxChars) {
        charIndex.value++
        repeatedText.value = text.slice(0, charIndex.value)
      } else {
        if (repeatedAnimInterval) clearInterval(repeatedAnimInterval)
        setTimeout(typeBackward, pauseDuration)
      }
    }, typeDuration / maxChars)
  }

  function typeBackward() {
    isTyping.value = false
    const text = texts[textIndex.value] || ''
    const maxChars = Math.min(text.length, 60)

    repeatedAnimInterval = setInterval(() => {
      if (charIndex.value > 0) {
        charIndex.value--
        repeatedText.value = text.slice(0, charIndex.value)
      } else {
        if (repeatedAnimInterval) clearInterval(repeatedAnimInterval)
        textIndex.value = (textIndex.value + 1) % texts.length
        setTimeout(typeForward, 100)
      }
    }, typeDuration / maxChars)
  }

  // Start after delay
  setTimeout(typeForward, 2000)
}

onMounted(() => {
  // Wait for base text animation to complete before starting repeated
  setTimeout(() => {
    startRepeatedAnimation()
  }, 2200)
})

onUnmounted(() => {
  if (repeatedAnimInterval) clearInterval(repeatedAnimInterval)
})

// Blinking cursor
const cursorVisible = ref(true)
let cursorInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  cursorInterval = setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 500)
})

onUnmounted(() => {
  if (cursorInterval) clearInterval(cursorInterval)
})
</script>

<template>
  <div
    class="flex w-full select-none items-center bg-black rounded-full h-[53px] md:h-[80px] justify-center transition-all duration-300"
    :style="{
      opacity: containerVisible ? 1 : 0,
      transform: containerVisible ? 'translateY(0)' : 'translateY(30px)',
    }"
  >
    <div
      :class="cn(
        'relative h-[53px] md:h-[68px] py-3 px-2 md:py-5 w-[34rem] md:w-[53rem]',
        'before:absolute before:-inset-1 before:rounded-[9991px] before:border before:border-neutral-100/20 before:opacity-0 before:ring-2 before:ring-neutral-100/40 before:transition',
        'dark:before:border-orange-400/40 dark:before:ring-2 dark:before:ring-orange-900/40',
        'input-shadow-glow after:pointer-events-none after:absolute after:inset-px after:rounded-[9987px] after:shadow-white/5 after:transition',
        'focus-within:before:opacity-100 focus-within:after:shadow-orange-100/20 dark:after:shadow-white/5 dark:focus-within:after:shadow-orange-500/30'
      )"
      :style="{
        opacity: itemVisible ? 1 : 0,
        transform: itemVisible ? 'translateY(0)' : 'translateY(15px)',
        transition: 'all 0.3s cubic-bezier(0, 0, 0.58, 1)',
      }"
    >
      <span
        :class="cn(
          'w-full text-sm md:text-xl',
          'dark:border dark:border-black/40',
          'input-shadow rounded-[9988px] !outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50 sm:leading-6',
          'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-900 dark:focus:ring-orange-900',
          'relative border border-black/5 bg-black/90 pl-3 py-5 md:pl-8 md:pr-7 shadow-black/5 placeholder:text-stone-400 focus:bg-black',
          'text-white font-bold bg-black dark:text-neutral-100 dark:shadow-black/10 dark:placeholder:text-stone-500',
          'dark:focus:bg-neutral-900'
        )"
      >
        <span>
          <span>{{ typedText }}</span>
          <span v-if="animationComplete" class="inline">{{ repeatedText }}</span>
          <div
            class="inline-block h-5 w-[1px] translate-y-1 bg-neutral-900"
            :style="{ opacity: cursorVisible ? 1 : 0 }"
          />
        </span>
      </span>
    </div>
  </div>
</template>
