<script setup lang="ts">
import { inject } from "vue"
import { cn } from "~/lib/utils"
import Label from "./Label.vue"

const props = defineProps<{
  class?: string
}>()

const formField = inject<{ errorMessage: { value: string } } | null>("form-field", null)
const id = inject<string>("form-item-id", "")
</script>

<template>
  <Label
    :for="`${id}-form-item`"
    :class="cn(formField?.errorMessage?.value && 'text-destructive', props.class)"
  >
    <slot />
  </Label>
</template>
