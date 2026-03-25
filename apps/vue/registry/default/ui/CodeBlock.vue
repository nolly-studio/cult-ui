<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { Check, Copy } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface CodeTab {
  label: string
  code: string
  language?: string
}

interface Props {
  tabs?: CodeTab[]
  code?: string
  language?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  tabs: undefined,
  code: undefined,
  language: 'bash',
})

const activeTab = ref(0)
const copied = ref(false)
const preRef = ref<HTMLPreElement | null>(null)
const hasOverflow = ref(false)

const codeContent = computed(() => {
  if (props.tabs && props.tabs.length > 0) return props.tabs
  if (props.code) return [{ label: props.language!, code: props.code, language: props.language }]
  return []
})

const currentCode = computed(() => codeContent.value[activeTab.value]?.code || '')

let resizeObserver: ResizeObserver | null = null

function checkOverflow() {
  if (preRef.value) {
    hasOverflow.value = preRef.value.scrollWidth > preRef.value.clientWidth
  }
}

watch(activeTab, () => {
  nextTick(checkOverflow)
})

onMounted(() => {
  checkOverflow()
  if (preRef.value) {
    resizeObserver = new ResizeObserver(checkOverflow)
    resizeObserver.observe(preRef.value)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})

async function handleCopy() {
  await navigator.clipboard.writeText(currentCode.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

function handleTabChange(index: number) {
  activeTab.value = index
}
</script>

<template>
  <div
    v-if="codeContent.length > 0"
    :class="cn(
      'group relative overflow-hidden rounded-2xl border p-0.5',
      'border-zinc-950/10 dark:border-white/10',
      'bg-zinc-50 dark:bg-white/5',
      'text-zinc-950 dark:text-zinc-50',
      props.class
    )"
  >
    <!-- Tab Bar -->
    <div v-if="codeContent.length > 1" class="flex items-center relative pr-2.5">
      <div
        role="tablist"
        :class="cn(
          'flex-1 min-w-0 text-xs leading-6 rounded-tl-xl gap-1 flex',
          'overflow-x-auto overflow-y-hidden',
          'scrollbar-thin scrollbar-thumb-rounded',
          'scrollbar-thumb-black/15 hover:scrollbar-thumb-black/20',
          'dark:scrollbar-thumb-white/20 dark:hover:scrollbar-thumb-white/25'
        )"
      >
        <div class="relative flex gap-1">
          <button
            v-for="(tab, index) in codeContent"
            :key="`${tab.label}-${index}`"
            type="button"
            role="tab"
            :aria-selected="activeTab === index"
            :class="cn(
              'flex items-center relative gap-1.5 my-1 mb-1.5 outline-0',
              'whitespace-nowrap font-medium transition-colors duration-150',
              'px-1.5 rounded-lg',
              index === 0 && 'ml-2.5',
              'hover:bg-zinc-200/50 dark:hover:bg-zinc-700/70',
              activeTab === index
                ? 'text-zinc-950 dark:text-zinc-50'
                : 'text-zinc-500 dark:text-zinc-400'
            )"
            @click="handleTabChange(index)"
          >
            {{ tab.label }}
            <div
              v-if="activeTab === index"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-950 dark:bg-zinc-50 rounded-full"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Code Content -->
    <div class="relative overflow-hidden">
      <!-- Copy Button -->
      <button
        :class="cn(
          'absolute top-2 right-2 z-10',
          'flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg',
          'text-zinc-500 dark:text-zinc-400',
          'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm',
          'border border-zinc-200/50 dark:border-zinc-800/50',
          'opacity-70 group-hover:opacity-100',
          'hover:bg-zinc-200/50 dark:hover:bg-zinc-700/70',
          'hover:text-zinc-950 dark:hover:text-zinc-50',
          'transition-all duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
        )"
        aria-label="Copy code"
        @click="handleCopy"
      >
        <span class="relative size-3.5">
          <Transition name="icon-swap">
            <Copy v-if="!copied" class="size-full absolute inset-0" />
            <Check v-else class="size-full absolute inset-0" />
          </Transition>
        </span>
        <span>{{ copied ? 'Copied' : 'Copy' }}</span>
      </button>

      <pre
        ref="preRef"
        :class="cn(
          'p-4 text-sm leading-relaxed m-0',
          'bg-white dark:bg-zinc-950/50',
          codeContent.length > 1 ? 'rounded-b-2xl' : 'rounded-2xl',
          hasOverflow ? 'overflow-x-auto' : 'overflow-x-hidden',
          hasOverflow && 'scrollbar-thin scrollbar-thumb-rounded',
          hasOverflow && 'scrollbar-thumb-black/15 hover:scrollbar-thumb-black/20',
          hasOverflow && 'dark:scrollbar-thumb-white/20 dark:hover:scrollbar-thumb-white/25',
          hasOverflow && '[&::-webkit-scrollbar]:h-2',
          hasOverflow && '[&::-webkit-scrollbar-thumb]:rounded-full',
          hasOverflow && '[&::-webkit-scrollbar-thumb]:bg-black/15',
          hasOverflow && '[&::-webkit-scrollbar-thumb]:dark:bg-white/20',
          hasOverflow && '[&::-webkit-scrollbar-thumb:hover]:bg-black/20',
          hasOverflow && '[&::-webkit-scrollbar-thumb:hover]:dark:bg-white/25',
          hasOverflow && '[&::-webkit-scrollbar-track]:bg-transparent'
        )"
      ><code class="font-mono text-zinc-950 dark:text-zinc-50 block whitespace-pre">{{ currentCode }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: all 0.2s ease;
}
.icon-swap-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0);
}
.icon-swap-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0);
}
</style>
