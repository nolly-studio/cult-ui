<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

interface Props {
  expandButtonTitle?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  expandButtonTitle: 'View Code',
})

const isOpened = ref(false)
</script>

<template>
  <Collapsible v-model:open="isOpened">
    <div :class="cn('relative overflow-hidden', props.class)">
      <CollapsibleContent
        force-mount
        :class="cn('overflow-hidden', !isOpened && 'max-h-32')"
      >
        <div
          :class="cn(
            '[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px]',
            !isOpened ? '[&_pre]:overflow-hidden' : '[&_pre]:overflow-auto]'
          )"
        >
          <slot />
        </div>
      </CollapsibleContent>
      <div
        :class="cn(
          'absolute flex items-center justify-center bg-gradient-to-b from-zinc-700/30 to-zinc-950/90 p-2',
          isOpened ? 'inset-x-0 bottom-0 h-12' : 'inset-0'
        )"
      >
        <CollapsibleTrigger as-child>
          <Button variant="secondary" class="h-8 text-xs">
            {{ isOpened ? 'Collapse' : expandButtonTitle }}
          </Button>
        </CollapsibleTrigger>
      </div>
    </div>
  </Collapsible>
</template>
