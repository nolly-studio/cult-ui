<script setup lang="ts">
import { cn } from "@/lib/utils"
import { CommandInput } from "@/components/ui/command"

defineOptions({ name: "VoiceSelectorInput" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <CommandInput :class="cn('h-auto py-3.5', props.class)" v-bind="$attrs">
    <slot />
  </CommandInput>
</template>
