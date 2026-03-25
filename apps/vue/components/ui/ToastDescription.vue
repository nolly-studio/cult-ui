<script setup lang="ts">
import { ToastDescription } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "ToastDescription" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <ToastDescription :class="cn('text-sm opacity-90', props.class)">
    <slot />
  </ToastDescription>
</template>
