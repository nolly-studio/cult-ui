<script setup lang="ts">
import { AlertDialogCancel } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "AlertDialogCancel" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <AlertDialogCancel
    :class="
      cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-2 sm:mt-0',
        props.class
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogCancel>
</template>
