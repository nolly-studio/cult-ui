<script setup lang="ts">
import { DialogDescription } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "SheetDescription" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <DialogDescription
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </DialogDescription>
</template>
