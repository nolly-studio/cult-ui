<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "TableFooter" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <tfoot
    :class="
      cn(
        'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
        props.class
      )
    "
  >
    <slot />
  </tfoot>
</template>
