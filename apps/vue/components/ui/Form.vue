<script setup lang="ts">
import { useForm } from "vee-validate"

const props = defineProps<{
  class?: string
  validationSchema?: Record<string, unknown>
}>()

const emit = defineEmits<{
  submit: [values: Record<string, unknown>]
}>()

const { handleSubmit } = useForm({
  validationSchema: props.validationSchema,
})

const onSubmit = handleSubmit((values) => {
  emit("submit", values)
})
</script>

<template>
  <form :class="props.class" @submit="onSubmit">
    <slot />
  </form>
</template>
