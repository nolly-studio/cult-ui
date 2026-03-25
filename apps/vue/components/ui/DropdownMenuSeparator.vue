<script setup lang="ts">
import { DropdownMenuSeparator } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "DropdownMenuSeparator" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <DropdownMenuSeparator
    :class="cn('-mx-1 my-1 h-px bg-muted', props.class)"
  />
</template>
