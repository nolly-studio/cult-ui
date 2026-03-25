<script setup lang="ts">
import { provide, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "EnvironmentVariable" })

export const ENV_VAR_KEY = Symbol("env-var") as InjectionKey<{ name: string; value: string }>

const props = defineProps<{
  class?: string
  name: string
  value: string
}>()

provide(ENV_VAR_KEY, { name: props.name, value: props.value })
</script>

<template>
  <div :class="cn('flex items-center justify-between gap-4 px-4 py-3', props.class)">
    <slot />
  </div>
</template>
