<script setup lang="ts">
import { DialogTitle } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "SheetTitle" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <DialogTitle
    :class="cn('text-lg font-semibold text-foreground', props.class)"
  >
    <slot />
  </DialogTitle>
</template>
