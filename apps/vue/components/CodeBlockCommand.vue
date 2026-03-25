<script setup lang="ts">
import { Check, Copy } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<{
  npm?: string
  yarn?: string
  pnpm?: string
  bun?: string
}>()

const packageManager = ref<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm')
const hasCopied = ref(false)
const direction = ref(0)

watch(hasCopied, (val) => {
  if (val) {
    const timer = setTimeout(() => {
      hasCopied.value = false
    }, 2000)
    onBeforeUnmount(() => clearTimeout(timer))
  }
})

const tabs = computed(() => ({
  pnpm: props.pnpm,
  npm: props.npm,
  yarn: props.yarn,
  bun: props.bun,
}))

const availableTabs = computed(() =>
  Object.entries(tabs.value).filter(([, value]) => value) as [string, string][],
)

const currentCommand = computed(() =>
  tabs.value[packageManager.value] || availableTabs.value[0]?.[1] || '',
)

function copyCommand() {
  if (!currentCommand.value) return
  navigator.clipboard.writeText(currentCommand.value)
  hasCopied.value = true
}

function handleTabChange(key: string) {
  const currentIndex = availableTabs.value.findIndex(([k]) => k === packageManager.value)
  const newIndex = availableTabs.value.findIndex(([k]) => k === key)
  direction.value = newIndex > currentIndex ? 1 : -1
  packageManager.value = key as 'pnpm' | 'npm' | 'yarn' | 'bun'
}
</script>

<template>
  <div
    v-if="availableTabs.length > 0"
    :class="cn(
      'group relative overflow-hidden rounded-2xl border p-0.5',
      'border-border/50',
      'bg-muted/50',
      'text-foreground',
    )"
  >
    <!-- Tab Bar -->
    <div class="flex items-center relative pr-2.5">
      <div
        role="tablist"
        :class="cn(
          'flex-1 min-w-0 text-xs leading-6 rounded-tl-xl gap-1 flex',
          'overflow-x-auto overflow-y-hidden',
          'scrollbar-thin scrollbar-thumb-rounded',
          'scrollbar-thumb-black/15 hover:scrollbar-thumb-black/20',
          'dark:scrollbar-thumb-white/20 dark:hover:scrollbar-thumb-white/25',
        )"
      >
        <div class="relative flex items-center gap-2">
          <button
            v-for="[key] in availableTabs"
            :key="key"
            type="button"
            role="tab"
            :aria-selected="packageManager === key"
            :class="cn(
              'flex items-center relative gap-1.5 my-1 mb-1.5 outline-0',
              'whitespace-nowrap font-medium transition-colors duration-150',
              'px-1.5 first:ml-1 first:rounded-tl-lg rounded-sm',
              'hover:bg-muted',
              packageManager === key ? 'text-foreground' : 'text-muted-foreground',
            )"
            @click="handleTabChange(key)"
          >
            {{ key }}
            <div
              v-if="packageManager === key"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full"
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
          'text-muted-foreground',
          'bg-background/80 backdrop-blur-sm',
          'border border-border/50',
          'opacity-70 group-hover:opacity-100',
          'hover:bg-muted',
          'hover:text-foreground',
          'transition-all duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
        )"
        aria-label="Copy code"
        @click="copyCommand"
      >
        <span class="relative size-3.5">
          <Transition name="fade" mode="out-in">
            <div v-if="hasCopied" key="check" class="absolute inset-0">
              <Check class="size-full" />
            </div>
            <div v-else key="copy" class="absolute inset-0">
              <Copy class="size-full" />
            </div>
          </Transition>
        </span>
        <span>{{ hasCopied ? 'Copied' : 'Copy' }}</span>
      </button>

      <pre
        :class="cn(
          'p-4 text-sm leading-relaxed m-0',
          'bg-card',
          'rounded-b-2xl',
          'overflow-x-auto',
          'scrollbar-thin scrollbar-thumb-rounded',
          'scrollbar-thumb-border hover:scrollbar-thumb-border',
          '[&::-webkit-scrollbar]:h-2',
          '[&::-webkit-scrollbar-thumb]:rounded-full',
          '[&::-webkit-scrollbar-thumb]:bg-border/50',
          '[&::-webkit-scrollbar-thumb:hover]:bg-border',
          '[&::-webkit-scrollbar-track]:bg-transparent',
        )"
      ><code class="font-mono text-foreground block whitespace-pre">{{ currentCommand }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
