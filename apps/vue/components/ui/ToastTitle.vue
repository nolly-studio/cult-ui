<script setup lang="ts">
import { ToastTitle } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "ToastTitle" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <ToastTitle :class="cn('text-sm font-semibold', props.class)">
    <slot />
  </ToastTitle>
</template>
