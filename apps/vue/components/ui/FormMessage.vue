<script setup lang="ts">
import { inject, computed } from "vue"
import { cn } from "~/lib/utils"

const props = defineProps<{
  class?: string
}>()

const formField = inject<{ errorMessage: { value: string } } | null>("form-field", null)
const id = inject<string>("form-item-id", "")

const body = computed(() => formField?.errorMessage?.value || "")
</script>

<template>
  <p
    v-if="body || $slots.default"
    :id="`${id}-form-item-message`"
    :class="cn('text-[0.8rem] font-medium text-destructive', props.class)"
  >
    {{ body }}
    <slot v-if="!body" />
  </p>
</template>
