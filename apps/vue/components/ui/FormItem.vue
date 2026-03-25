<script setup lang="ts">
import { useId, provide } from "vue"
import { cn } from "~/lib/utils"

const props = defineProps<{
  class?: string
}>()

const id = useId()
provide("form-item-id", id)
</script>

<template>
  <div :class="cn('space-y-2', props.class)">
    <slot />
  </div>
</template>
