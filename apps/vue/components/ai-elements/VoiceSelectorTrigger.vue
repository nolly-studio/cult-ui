<script setup lang="ts">
import { DialogTrigger } from "@/components/ui/dialog"

defineOptions({ name: "VoiceSelectorTrigger" })
</script>

<template>
  <DialogTrigger v-bind="$attrs">
    <slot />
  </DialogTrigger>
</template>
