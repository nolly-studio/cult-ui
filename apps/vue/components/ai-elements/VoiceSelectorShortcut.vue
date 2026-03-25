<script setup lang="ts">
import { CommandShortcut } from "@/components/ui/command"

defineOptions({ name: "VoiceSelectorShortcut" })
</script>

<template>
  <CommandShortcut v-bind="$attrs">
    <slot />
  </CommandShortcut>
</template>
