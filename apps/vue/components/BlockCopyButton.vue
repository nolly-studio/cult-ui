<script setup lang="ts">
import { ref, watch } from 'vue'
import { Check, Clipboard } from 'lucide-vue-next'

import { trackEvent } from '@/lib/events'
import type { Event } from '@/lib/events'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const props = defineProps<{
  event: Event['name']
  name: string
  code: string
}>()

const hasCopied = ref(false)

watch(hasCopied, (value) => {
  if (value) {
    setTimeout(() => {
      hasCopied.value = false
    }, 2000)
  }
})

function onCopy() {
  navigator.clipboard.writeText(props.code)
  trackEvent({
    name: props.event,
    properties: {
      name: props.name,
    },
  })
  hasCopied.value = true
}
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Button
        size="icon"
        variant="outline"
        class="size-7 rounded-[6px] [&_svg]:size-3.5"
        @click="onCopy"
      >
        <span class="sr-only">Copy</span>
        <Check v-if="hasCopied" />
        <Clipboard v-else />
      </Button>
    </TooltipTrigger>
    <TooltipContent>Copy code</TooltipContent>
  </Tooltip>
</template>
