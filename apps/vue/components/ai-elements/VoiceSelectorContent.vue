<script setup lang="ts">
import { cn } from "@/lib/utils"
import { DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Command } from "@/components/ui/command"

defineOptions({ name: "VoiceSelectorContent" })

const props = withDefaults(defineProps<{
  title?: string
  class?: string
}>(), {
  title: "Voice Selector",
})
</script>

<template>
  <DialogContent
    :aria-describedby="undefined"
    :class="cn('p-0', props.class)"
  >
    <DialogTitle class="sr-only">{{ title }}</DialogTitle>
    <Command class="**:data-[slot=command-input-wrapper]:h-auto">
      <slot />
    </Command>
  </DialogContent>
</template>
