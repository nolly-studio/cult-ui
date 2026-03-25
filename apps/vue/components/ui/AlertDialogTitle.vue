<script setup lang="ts">
import { AlertDialogTitle } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "AlertDialogTitle" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <AlertDialogTitle
    :class="cn('text-lg font-semibold', props.class)"
  >
    <slot />
  </AlertDialogTitle>
</template>
