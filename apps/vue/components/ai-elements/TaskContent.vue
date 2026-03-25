<script setup lang="ts">
import { cn } from "@/lib/utils"
import { CollapsibleContent } from "radix-vue"

defineOptions({ name: "TaskContent" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <CollapsibleContent
    :class="cn(
      'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-popover-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
      props.class
    )"
  >
    <div class="mt-4 space-y-2 border-muted border-l-2 pl-4">
      <slot />
    </div>
  </CollapsibleContent>
</template>
