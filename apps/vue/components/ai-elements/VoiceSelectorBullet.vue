<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "VoiceSelectorBullet" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <span
    aria-hidden="true"
    :class="cn('select-none text-border', props.class)"
  >&bull;</span>
</template>
