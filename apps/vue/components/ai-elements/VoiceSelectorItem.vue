<script setup lang="ts">
import { cn } from "@/lib/utils"
import { CommandItem } from "@/components/ui/command"

defineOptions({ name: "VoiceSelectorItem" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <CommandItem :class="cn('px-4 py-2', props.class)" v-bind="$attrs">
    <slot />
  </CommandItem>
</template>
