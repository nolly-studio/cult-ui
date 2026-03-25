<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "TableHeader" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <thead :class="cn('[&_tr]:border-b', props.class)">
    <slot />
  </thead>
</template>
