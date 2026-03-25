<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onUnmounted,
  provide,
  inject,
  useTemplateRef,
  onMounted,
  type InjectionKey,
  type Ref,
} from 'vue'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TerminalLine {
  text: string
  color?: string
  delay?: number
}

export interface TabContent {
  label: string
  command: string
  lines: TerminalLine[]
}

interface TerminalAnimationContextValue {
  activeTab: Ref<number>
  setActiveTab: (index: number) => void
  commandTyped: Ref<string>
  isTypingCommand: Ref<boolean>
  showCursor: Ref<boolean>
  visibleLines: Ref<number>
  currentTab: Ref<TabContent>
  tabs: TabContent[]
}

const terminalAnimationKey: InjectionKey<TerminalAnimationContextValue> =
  Symbol('TerminalAnimation')

export function useTerminalAnimation() {
  const ctx = inject(terminalAnimationKey)
  if (!ctx) {
    throw new Error(
      'TerminalAnimation components must be used within TerminalAnimationRoot'
    )
  }
  return ctx
}

// ---------------------------------------------------------------------------
// Default tabs data (for demo)
// ---------------------------------------------------------------------------

export const defaultTerminalTabs: TabContent[] = [
  {
    label: 'new',
    command: 'vite new my-app',
    lines: [
      { text: '', delay: 80 },
      { text: '  Scaffolding project in ./my-app...', color: 'text-[#b39aff]', delay: 400 },
      { text: '', delay: 80 },
      { text: '  Select a framework:', color: 'text-neutral-400', delay: 200 },
      { text: '    Vanilla', color: 'text-neutral-500', delay: 80 },
      { text: '    Vue', color: 'text-neutral-500', delay: 80 },
      { text: '  > React', color: 'text-[#32f3e9]', delay: 80 },
      { text: '    Preact', color: 'text-neutral-500', delay: 80 },
      { text: '    Svelte', color: 'text-neutral-500', delay: 80 },
      { text: '', delay: 200 },
      { text: '  Select a variant:', color: 'text-neutral-400', delay: 200 },
      { text: '  > TypeScript', color: 'text-[#32f3e9]', delay: 80 },
      { text: '', delay: 200 },
      { text: '  Done. Now run:', color: 'text-neutral-400', delay: 300 },
      { text: '', delay: 50 },
      { text: '    cd my-app', color: 'text-neutral-300', delay: 100 },
      { text: '    vite dev', color: 'text-neutral-300', delay: 100 },
    ],
  },
  {
    label: 'dev',
    command: 'vite dev',
    lines: [
      { text: '', delay: 80 },
      { text: '  VITE v6.3.0  ready in 124 ms', color: 'text-[#b39aff]', delay: 400 },
      { text: '', delay: 80 },
      { text: '  >  Local:   http://localhost:5173/', color: 'text-[#32f3e9]', delay: 200 },
      { text: '  >  Network: http://192.168.1.42:5173/', color: 'text-neutral-500', delay: 100 },
      { text: '  >  press h + enter to show help', color: 'text-neutral-600', delay: 100 },
      { text: '', delay: 300 },
      { text: '  hmr update /src/App.tsx 2ms', color: 'text-neutral-500', delay: 600 },
      { text: '  hmr update /src/App.tsx 1ms', color: 'text-neutral-500', delay: 400 },
    ],
  },
  {
    label: 'lint',
    command: 'vite lint ./src',
    lines: [
      { text: '', delay: 80 },
      { text: '  Checked 42 files in 8ms', color: 'text-neutral-400', delay: 300 },
      { text: '', delay: 80 },
      { text: '  src/App.tsx:14:5', color: 'text-neutral-500', delay: 150 },
      { text: '    warning  Unexpected console statement       no-console', color: 'text-yellow-400', delay: 100 },
      { text: '', delay: 80 },
      { text: '  src/utils.ts:31:1', color: 'text-neutral-500', delay: 150 },
      { text: '    warning  Missing return type on function    return-type', color: 'text-yellow-400', delay: 100 },
      { text: '', delay: 80 },
      { text: '  src/api/client.ts:7:10', color: 'text-neutral-500', delay: 150 },
      { text: "    error    Unused variable 'baseUrl'          no-unused", color: 'text-red-400', delay: 100 },
      { text: '', delay: 80 },
      { text: '  3 problems (1 error, 2 warnings)  [8ms]', color: 'text-neutral-300', delay: 300 },
    ],
  },
  {
    label: 'fmt',
    command: 'vite fmt ./src',
    lines: [
      { text: '', delay: 80 },
      { text: '  Checked 42 files in 4ms', color: 'text-neutral-400', delay: 200 },
      { text: '', delay: 80 },
      { text: '  Fixed  src/App.tsx', color: 'text-[#22ff73]', delay: 150 },
      { text: '  Fixed  src/components/Header.tsx', color: 'text-[#22ff73]', delay: 100 },
      { text: '  Fixed  src/utils/format.ts', color: 'text-[#22ff73]', delay: 100 },
      { text: '', delay: 80 },
      { text: '  3 files formatted', color: 'text-neutral-300', delay: 200 },
      { text: '  39 files unchanged', color: 'text-neutral-500', delay: 100 },
      { text: '', delay: 80 },
      { text: '  Done in 4ms', color: 'text-neutral-400', delay: 200 },
    ],
  },
  {
    label: 'test',
    command: 'vite test',
    lines: [
      { text: '', delay: 80 },
      { text: '  RUN  v6.3.0', color: 'text-[#b39aff]', delay: 300 },
      { text: '', delay: 80 },
      { text: '  src/utils.test.ts', color: 'text-neutral-400', delay: 200 },
      { text: '    \u2713 formats currency correctly', color: 'text-[#22ff73]', delay: 150 },
      { text: '    \u2713 parses date strings', color: 'text-[#22ff73]', delay: 100 },
      { text: '    \u2713 handles edge cases', color: 'text-[#22ff73]', delay: 100 },
      { text: '  src/App.test.tsx', color: 'text-neutral-400', delay: 200 },
      { text: '    \u2713 renders heading', color: 'text-[#22ff73]', delay: 100 },
      { text: '    \u2713 handles click events', color: 'text-[#22ff73]', delay: 100 },
      { text: '', delay: 80 },
      { text: '  Tests  5 passed (5)', color: 'text-[#22ff73]', delay: 200 },
      { text: '  Time   38ms', color: 'text-neutral-500', delay: 100 },
    ],
  },
  {
    label: 'build',
    command: 'vite build',
    lines: [
      { text: '', delay: 80 },
      { text: '  vite v6.3.0 building for production...', color: 'text-[#b39aff]', delay: 400 },
      { text: '', delay: 80 },
      { text: '  transforming...', color: 'text-neutral-500', delay: 300 },
      { text: '  \u2713 42 modules transformed.', color: 'text-[#22ff73]', delay: 300 },
      { text: '', delay: 80 },
      { text: '  rendering chunks...', color: 'text-neutral-500', delay: 200 },
      { text: '  computing gzip size...', color: 'text-neutral-500', delay: 200 },
      { text: '', delay: 80 },
      { text: '  dist/index.html                 0.46 kB  |  gzip:  0.30 kB', color: 'text-neutral-400', delay: 100 },
      { text: '  dist/assets/index-Dk2a9f.css    1.28 kB  |  gzip:  0.65 kB', color: 'text-neutral-400', delay: 80 },
      { text: '  dist/assets/index-Ba3x7q.js   143.36 kB  |  gzip: 46.12 kB', color: 'text-neutral-400', delay: 80 },
      { text: '', delay: 80 },
      { text: '  \u2713 built in 218ms', color: 'text-[#22ff73]', delay: 300 },
    ],
  },
]

// ---------------------------------------------------------------------------
// Root Props
// ---------------------------------------------------------------------------

const props = withDefaults(
  defineProps<{
    tabs: TabContent[]
    defaultActiveTab?: number
    activeTab?: number
    backgroundImage?: string
    alwaysDark?: boolean
    hideCursorOnComplete?: boolean
    class?: string
  }>(),
  {
    defaultActiveTab: 0,
    activeTab: undefined,
    backgroundImage: undefined,
    alwaysDark: false,
    hideCursorOnComplete: true,
    class: undefined,
  }
)

const emit = defineEmits<{
  'update:activeTab': [index: number]
}>()

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const internalActiveTab = ref(props.defaultActiveTab)

const activeTabValue = computed({
  get: () => (props.activeTab !== undefined ? props.activeTab : internalActiveTab.value),
  set: (val: number) => {
    internalActiveTab.value = val
    emit('update:activeTab', val)
  },
})

const visibleLines = ref(0)
const commandTyped = ref('')
const isTypingCommand = ref(true)
const showCursor = ref(true)
const timeouts: ReturnType<typeof setTimeout>[] = []

function clearTimeouts() {
  timeouts.forEach(clearTimeout)
  timeouts.length = 0
}

function setActiveTab(index: number) {
  activeTabValue.value = index
}

const currentTab = computed(() => props.tabs[activeTabValue.value] ?? props.tabs[0])
const safeActiveTab = computed(() => Math.min(activeTabValue.value, props.tabs.length - 1))

function animateTab(tabIndex: number) {
  clearTimeouts()
  visibleLines.value = 0
  commandTyped.value = ''
  isTypingCommand.value = true
  showCursor.value = true

  const tab = props.tabs[tabIndex]
  if (!tab) return

  const command = tab.command
  let charIndex = 0

  const typeCommand = () => {
    if (charIndex <= command.length) {
      commandTyped.value = command.slice(0, charIndex)
      charIndex++
      const t = setTimeout(typeCommand, 25 + Math.random() * 35)
      timeouts.push(t)
    } else {
      const t = setTimeout(() => {
        isTypingCommand.value = false
        showLines(0)
      }, 250)
      timeouts.push(t)
    }
  }

  const showLines = (lineIndex: number) => {
    if (lineIndex <= tab.lines.length) {
      visibleLines.value = lineIndex
      if (lineIndex < tab.lines.length) {
        const delay = tab.lines[lineIndex].delay ?? 100
        const t = setTimeout(() => showLines(lineIndex + 1), delay)
        timeouts.push(t)
      } else if (props.hideCursorOnComplete) {
        const t = setTimeout(() => {
          showCursor.value = false
        }, 600)
        timeouts.push(t)
      }
    }
  }

  const t = setTimeout(typeCommand, 300)
  timeouts.push(t)
}

watch(activeTabValue, (val) => {
  animateTab(val)
}, { immediate: true })

onUnmounted(() => {
  clearTimeouts()
})

// ---------------------------------------------------------------------------
// Provide context
// ---------------------------------------------------------------------------

provide(terminalAnimationKey, {
  activeTab: safeActiveTab,
  setActiveTab,
  commandTyped,
  isTypingCommand,
  showCursor,
  visibleLines,
  currentTab,
  tabs: props.tabs,
})
</script>

<template>
  <div
    :class="cn(alwaysDark && 'dark', props.class)"
    data-slot="terminal-animation-root"
  >
    <div
      v-if="backgroundImage"
      aria-hidden="true"
      class="absolute inset-0 bg-center bg-cover"
      data-slot="terminal-animation-background"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    />
    <slot />
  </div>
</template>
