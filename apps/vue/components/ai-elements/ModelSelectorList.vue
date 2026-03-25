<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "ModelSelectorList" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('max-h-[300px] overflow-y-auto', props.class)">
    <slot />
  </div>
</template>
