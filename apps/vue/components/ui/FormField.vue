<script setup lang="ts">
import { useField } from "vee-validate"
import { toRef, provide } from "vue"

const props = defineProps<{
  name: string
  label?: string
}>()

const nameRef = toRef(props, "name")
const { value, errorMessage, handleBlur, handleChange, meta } = useField(nameRef)

provide("form-field", {
  name: nameRef,
  value,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
})
</script>

<template>
  <slot
    :field="{ name: props.name, value, onBlur: handleBlur, onChange: handleChange }"
    :error-message="errorMessage"
    :meta="meta"
  />
</template>
