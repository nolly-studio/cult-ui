<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "CardDescription" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('text-sm text-muted-foreground', props.class)">
    <slot />
  </div>
</template>
