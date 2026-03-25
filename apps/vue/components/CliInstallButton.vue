<script setup lang="ts">
import { CheckIcon, CopyIcon, Terminal } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const props = defineProps<{
  value: string
  class?: string
}>()

const isCopied = ref(false)

const command = computed(
  () => `npx shadcn@latest add "https://cult-ui.com/r/${props.value}.json"`,
)

// Simple responsive breakpoints via matchMedia
const isSmallScreen = ref(false)
const isMediumScreen = ref(false)

onMounted(() => {
  const smQuery = window.matchMedia('(max-width: 640px)')
  const mdQuery = window.matchMedia('(max-width: 768px)')

  isSmallScreen.value = smQuery.matches
  isMediumScreen.value = mdQuery.matches

  const smHandler = (e: MediaQueryListEvent) => { isSmallScreen.value = e.matches }
  const mdHandler = (e: MediaQueryListEvent) => { isMediumScreen.value = e.matches }

  smQuery.addEventListener('change', smHandler)
  mdQuery.addEventListener('change', mdHandler)

  onBeforeUnmount(() => {
    smQuery.removeEventListener('change', smHandler)
    mdQuery.removeEventListener('change', mdHandler)
  })
})

const isVerticalLayout = computed(
  () => isSmallScreen.value && command.value.length > 30,
)

async function onCopy() {
  try {
    await navigator.clipboard.writeText(command.value)
    isCopied.value = true
    setTimeout(() => { isCopied.value = false }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <div
    :class="cn(
      'group relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950',
      isVerticalLayout ? 'flex flex-col' : 'flex items-center',
      props.class,
    )"
  >
    <!-- Logo section -->
    <div
      :class="cn(
        'flex items-center gap-2 bg-zinc-900 px-3 py-2.5',
        isVerticalLayout
          ? 'w-full justify-between border-b border-zinc-800'
          : 'h-full border-r border-zinc-800',
      )"
    >
      <div class="flex items-center gap-2">
        <!-- ShadcnLogo placeholder - replace with your icon component -->
        <span class="size-4 text-zinc-100">&#9670;</span>
      </div>

      <!-- Copy button in header on vertical layout -->
      <TooltipProvider v-if="isVerticalLayout">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              :class="cn(
                'relative size-8 rounded-md transition-all duration-200 hover:bg-zinc-800',
                isCopied
                  ? 'bg-green-900/30 text-green-400 hover:bg-green-900/30'
                  : 'text-zinc-400 hover:text-zinc-100',
              )"
              :aria-label="isCopied ? 'Copied!' : 'Copy to clipboard'"
              @click="onCopy"
            >
              <Transition name="fade" mode="out-in">
                <div v-if="isCopied" key="check" class="absolute inset-0 flex items-center justify-center">
                  <CheckIcon class="size-4" />
                </div>
                <div v-else key="copy" class="absolute inset-0 flex items-center justify-center">
                  <CopyIcon class="size-4" />
                </div>
              </Transition>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {{ isCopied ? 'Copied!' : 'Copy to clipboard' }}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>

    <!-- Command section -->
    <div
      :class="cn(
        'scrollbar-hide flex flex-1 items-center gap-2 overflow-x-auto px-3 py-2.5',
        isVerticalLayout && 'w-full',
      )"
    >
      <Terminal
        :class="cn(
          'shrink-0 text-emerald-400',
          isSmallScreen ? 'size-3.5' : 'size-4',
        )"
      />
      <code
        :class="cn(
          'flex-1 whitespace-pre font-mono text-zinc-100',
          isSmallScreen ? 'text-xs' : 'text-sm',
        )"
      >
        {{ command }}
      </code>
    </div>

    <!-- Copy button - horizontal layout only -->
    <TooltipProvider v-if="!isVerticalLayout">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            variant="ghost"
            size="icon"
            :class="cn(
              'relative m-1 rounded-md transition-all duration-200 hover:bg-zinc-800',
              isMediumScreen ? 'size-7' : 'size-8',
              isCopied
                ? 'bg-green-900/30 text-green-400 hover:bg-green-900/30'
                : 'text-zinc-400 hover:text-zinc-100',
            )"
            :aria-label="isCopied ? 'Copied!' : 'Copy to clipboard'"
            @click="onCopy"
          >
            <Transition name="fade" mode="out-in">
              <div v-if="isCopied" key="check" class="absolute inset-0 flex items-center justify-center">
                <CheckIcon :class="isMediumScreen ? 'size-3.5' : 'size-4'" />
              </div>
              <div v-else key="copy" class="absolute inset-0 flex items-center justify-center">
                <CopyIcon :class="isMediumScreen ? 'size-3.5' : 'size-4'" />
              </div>
            </Transition>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {{ isCopied ? 'Copied!' : 'Copy to clipboard' }}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <!-- Copy confirmation overlay -->
    <Transition name="fade">
      <div
        v-if="isCopied"
        class="absolute inset-0 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm"
      >
        <div class="flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400">
          <CheckIcon class="size-4" />
          Copied!
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
