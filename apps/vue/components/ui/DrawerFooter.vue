<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "DrawerFooter" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('mt-auto flex flex-col gap-2 p-4', props.class)">
    <slot />
  </div>
</template>
