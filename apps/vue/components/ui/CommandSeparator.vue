<script setup lang="ts">
import { ComboboxSeparator } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "CommandSeparator" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <ComboboxSeparator :class="cn('-mx-1 h-px bg-border', props.class)" />
</template>
