<script setup lang="ts">
import { CommandSeparator } from "@/components/ui/command"

defineOptions({ name: "VoiceSelectorSeparator" })
</script>

<template>
  <CommandSeparator v-bind="$attrs" />
</template>
