<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { ENV_VAR_KEY } from "./EnvironmentVariable.vue"

defineOptions({ name: "EnvironmentVariableName" })

const props = defineProps<{
  class?: string
}>()

const ctx = inject(ENV_VAR_KEY)!
</script>

<template>
  <span :class="cn('font-mono text-sm', props.class)">
    <slot>{{ ctx.name }}</slot>
  </span>
</template>
