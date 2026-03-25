<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'

defineProps<{
  class?: string
}>()

const isOpened = ref(false)
</script>

<template>
  <Collapsible
    v-model:open="isOpened"
    :class="cn('group/collapsible relative md:-mx-1', $props.class)"
  >
    <CollapsibleTrigger as-child>
      <div class="absolute top-1.5 right-9 z-10 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          class="text-muted-foreground h-7 rounded-md px-2"
        >
          {{ isOpened ? 'Collapse' : 'Expand' }}
        </Button>
        <Separator orientation="vertical" class="mx-1.5 !h-4" />
      </div>
    </CollapsibleTrigger>
    <CollapsibleContent
      force-mount
      class="relative mt-6 overflow-hidden data-[state=closed]:max-h-64 [&>figure]:mt-0 [&>figure]:md:!mx-0"
    >
      <slot />
    </CollapsibleContent>
    <CollapsibleTrigger
      class="from-muted/20 to-muted/70 text-muted-foreground absolute inset-x-0 -bottom-2 flex h-20 items-center justify-center rounded-b-lg bg-gradient-to-b text-sm group-data-[state=open]/collapsible:hidden"
    >
      {{ isOpened ? 'Collapse' : 'Expand' }}
    </CollapsibleTrigger>
  </Collapsible>
</template>
