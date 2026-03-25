<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "DropdownMenuShortcut" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <span
    :class="cn('ml-auto text-xs tracking-widest opacity-60', props.class)"
  >
    <slot />
  </span>
</template>
