<script setup lang="ts">
import { CommandGroup } from "@/components/ui/command"

defineOptions({ name: "VoiceSelectorGroup" })
</script>

<template>
  <CommandGroup v-bind="$attrs">
    <slot />
  </CommandGroup>
</template>
