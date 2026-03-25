<script setup lang="ts">
import { AlertDialogAction } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "AlertDialogAction" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <AlertDialogAction
    :class="
      cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
        props.class
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogAction>
</template>
