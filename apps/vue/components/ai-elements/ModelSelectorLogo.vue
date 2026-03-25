<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "ModelSelectorLogo" })

const props = defineProps<{
  class?: string
  provider: string
}>()
</script>

<template>
  <img
    :alt="`${props.provider} logo`"
    :class="cn('size-3 dark:invert', props.class)"
    :height="12"
    :src="`https://models.dev/logos/${props.provider}.svg`"
    :width="12"
  />
</template>
