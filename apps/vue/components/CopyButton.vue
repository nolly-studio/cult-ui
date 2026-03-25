<script setup lang="ts">
import { CheckIcon, ClipboardIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface CopyButtonProps {
  value: string
  src?: string
  event?: string
  class?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

const props = withDefaults(defineProps<CopyButtonProps>(), {
  variant: 'ghost',
})

const hasCopied = ref(false)

watch(hasCopied, (val) => {
  if (val) {
    setTimeout(() => {
      hasCopied.value = false
    }, 2000)
  }
})

async function copyToClipboardWithMeta(value: string, event?: { name: string; properties?: Record<string, unknown> }) {
  navigator.clipboard.writeText(value)
}

function handleCopy() {
  copyToClipboardWithMeta(
    props.value,
    props.event
      ? {
          name: props.event,
          properties: {
            code: props.value,
          },
        }
      : undefined,
  )
  hasCopied.value = true
}
</script>

<template>
  <Button
    size="icon"
    :variant="variant"
    :class="cn('relative z-10 size-6 [&_svg]:size-3', props.class)"
    @click="handleCopy"
  >
    <span class="sr-only">Copy</span>
    <CheckIcon v-if="hasCopied" />
    <ClipboardIcon v-else />
  </Button>
</template>
