<script setup lang="ts">
import { inject } from "vue"
import { cn } from "~/lib/utils"

const props = defineProps<{
  class?: string
}>()

const id = inject<string>("form-item-id", "")
</script>

<template>
  <p
    :id="`${id}-form-item-description`"
    :class="cn('text-[0.8rem] text-muted-foreground', props.class)"
  >
    <slot />
  </p>
</template>
