<script setup lang="ts">
import { cn } from "@/lib/utils"
import { CollapsibleContent } from "@/components/ui/collapsible"

defineOptions({ name: "ToolContent" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <CollapsibleContent
    :class="cn(
      'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 space-y-4 p-4 text-popover-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
      props.class
    )"
  >
    <slot />
  </CollapsibleContent>
</template>
