<script setup lang="ts">
import { cn } from "@/lib/utils"
import { TabsList } from "radix-vue"

defineOptions({ name: "SandboxTabsList" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <TabsList
    :class="cn('h-auto rounded-none border-0 bg-transparent p-0', props.class)"
  >
    <slot />
  </TabsList>
</template>
