<script setup lang="ts">
import { inject, computed } from "vue"

const formField = inject<{ errorMessage: { value: string } } | null>("form-field", null)
const id = inject<string>("form-item-id", "")

const formItemId = computed(() => `${id}-form-item`)
const formDescriptionId = computed(() => `${id}-form-item-description`)
const formMessageId = computed(() => `${id}-form-item-message`)
const hasError = computed(() => !!formField?.errorMessage?.value)
</script>

<template>
  <div
    :id="formItemId"
    :aria-describedby="
      !hasError
        ? formDescriptionId
        : `${formDescriptionId} ${formMessageId}`
    "
    :aria-invalid="hasError || undefined"
  >
    <slot />
  </div>
</template>
