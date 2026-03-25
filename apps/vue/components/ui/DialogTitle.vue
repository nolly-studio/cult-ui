<script setup lang="ts">
import { DialogTitle } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "DialogTitle" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <DialogTitle
    :class="cn('text-base leading-none font-medium', props.class)"
  >
    <slot />
  </DialogTitle>
</template>
