<script setup lang="ts">
import { AlertDialogDescription } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "AlertDialogDescription" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <AlertDialogDescription
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </AlertDialogDescription>
</template>
