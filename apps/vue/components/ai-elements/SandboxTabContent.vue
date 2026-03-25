<script setup lang="ts">
import { cn } from "@/lib/utils"
import { TabsContent } from "radix-vue"

defineOptions({ name: "SandboxTabContent" })

const props = defineProps<{
  class?: string
  value: string
}>()
</script>

<template>
  <TabsContent :class="cn('mt-0 text-sm', props.class)" :value="props.value">
    <slot />
  </TabsContent>
</template>
