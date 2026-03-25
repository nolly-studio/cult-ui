<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "DialogFooter" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div
    :class="
      cn(
        'bg-muted/50 -mx-4 -mb-4 rounded-b-xl border-t p-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
