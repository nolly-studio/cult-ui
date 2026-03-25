<script setup lang="ts">
import { DrawerTitle } from "vaul-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "DrawerTitle" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <DrawerTitle
    :class="
      cn('text-lg font-semibold leading-none tracking-tight', props.class)
    "
  >
    <slot />
  </DrawerTitle>
</template>
