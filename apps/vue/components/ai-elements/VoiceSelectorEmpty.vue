<script setup lang="ts">
import { CommandEmpty } from "@/components/ui/command"

defineOptions({ name: "VoiceSelectorEmpty" })
</script>

<template>
  <CommandEmpty v-bind="$attrs">
    <slot />
  </CommandEmpty>
</template>
