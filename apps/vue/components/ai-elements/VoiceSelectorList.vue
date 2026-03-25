<script setup lang="ts">
import { CommandList } from "@/components/ui/command"

defineOptions({ name: "VoiceSelectorList" })
</script>

<template>
  <CommandList v-bind="$attrs">
    <slot />
  </CommandList>
</template>
