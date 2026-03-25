<script setup lang="ts">
import { GitCommit } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "CommitHash" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <span :class="cn('font-mono text-xs', props.class)">
    <GitCommit class="mr-1 inline-block size-3" />
    <slot />
  </span>
</template>
