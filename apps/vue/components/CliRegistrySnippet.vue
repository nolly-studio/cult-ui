<script setup lang="ts">
import { CheckIcon, ChevronDownIcon, ChevronRightIcon, CopyIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

defineProps<{
  class?: string
}>()

const isOpen = ref(false)
const isCopied = ref(false)

const registrySnippet = `{
  "registries": {
    "@cult-ui": "https://cult-ui.com/r/{name}.json"
  }
}`

async function onCopy() {
  try {
    await navigator.clipboard.writeText(registrySnippet)
    isCopied.value = true
    setTimeout(() => { isCopied.value = false }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <div :class="cn('space-y-3', $props.class)">
    <Collapsible v-model:open="isOpen">
      <CollapsibleTrigger as-child>
        <Button
          variant="ghost"
          class="flex h-auto items-center gap-2 p-0 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronDownIcon v-if="isOpen" class="size-4" />
          <ChevronRightIcon v-else class="size-4" />
          <span>Configure registry (shadcn v3)</span>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent class="space-y-3">
        <div class="space-y-2">
          <p class="text-sm text-muted-foreground">
            Add this to your
            <code class="rounded bg-muted px-1.5 py-0.5 text-xs">components.json</code>
            file:
          </p>

          <div class="relative">
            <pre class="overflow-x-auto rounded-md bg-muted p-3 text-sm"><code>{{ registrySnippet }}</code></pre>

            <Button
              variant="ghost"
              size="icon"
              :class="cn(
                'absolute right-2 top-2 size-8 transition-all duration-200',
                isCopied
                  ? 'bg-green-100 text-green-600 hover:bg-green-100'
                  : 'hover:bg-background',
              )"
              :aria-label="isCopied ? 'Copied!' : 'Copy to clipboard'"
              @click="onCopy"
            >
              <Transition name="fade" mode="out-in">
                <CheckIcon v-if="isCopied" key="check" class="size-4" />
                <CopyIcon v-else key="copy" class="size-4" />
              </Transition>
            </Button>
          </div>

          <p class="text-xs text-muted-foreground">
            Then install with:
            <code class="rounded bg-muted px-1.5 py-0.5 text-xs">npx shadcn@beta add @cult-ui/component-name</code>
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
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
