<script setup lang="ts">
import { MenubarSeparator } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "MenubarSeparator" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <MenubarSeparator :class="cn('-mx-1 my-1 h-px bg-muted', props.class)" />
</template>
