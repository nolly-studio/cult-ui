<script setup lang="ts">
import { inject, computed } from "vue"
import { cn } from "@/lib/utils"
import { ENV_VAR_KEY } from "./EnvironmentVariable.vue"
import { ENV_VARS_KEY } from "./EnvironmentVariables.vue"

defineOptions({ name: "EnvironmentVariableValue" })

const props = defineProps<{
  class?: string
}>()

const envVar = inject(ENV_VAR_KEY)!
const envVars = inject(ENV_VARS_KEY)!

const displayValue = computed(() =>
  envVars.showValues.value ? envVar.value() : "•".repeat(Math.min(envVar.value().length, 20))
)
</script>

<template>
  <span
    :class="cn(
      'font-mono text-muted-foreground text-sm',
      !envVars.showValues.value && 'select-none',
      props.class
    )"
  >
    <slot>{{ displayValue }}</slot>
  </span>
</template>
