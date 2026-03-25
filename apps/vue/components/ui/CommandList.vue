<script setup lang="ts">
import { ComboboxContent } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "CommandList" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <ComboboxContent
    :class="cn('max-h-[300px] overflow-y-auto overflow-x-hidden', props.class)"
  >
    <slot />
  </ComboboxContent>
</template>
