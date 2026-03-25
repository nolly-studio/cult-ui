<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "ConfirmationTitle" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <p :class="cn('inline text-sm', props.class)">
    <slot />
  </p>
</template>
