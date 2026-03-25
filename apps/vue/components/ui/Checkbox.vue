<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from "radix-vue"
import { Check } from "lucide-vue-next"
import { cn } from "~/lib/utils"

const props = defineProps<{
  class?: string
  checked?: boolean
  disabled?: boolean
  value?: string
  id?: string
}>()

const emit = defineEmits<{
  "update:checked": [value: boolean]
}>()
</script>

<template>
  <CheckboxRoot
    :id="id"
    :checked="checked"
    :disabled="disabled"
    :value="value"
    :class="
      cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        props.class,
      )
    "
    @update:checked="emit('update:checked', $event)"
  >
    <CheckboxIndicator class="flex items-center justify-center text-current">
      <Check class="h-4 w-4" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
