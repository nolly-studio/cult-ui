<script setup lang="ts">
import { cn } from "@/lib/utils"
import { TabsTrigger } from "radix-vue"

defineOptions({ name: "SandboxTabsTrigger" })

const props = defineProps<{
  class?: string
  value: string
}>()
</script>

<template>
  <TabsTrigger
    :class="cn(
      'rounded-none border-0 border-transparent border-b-2 px-4 py-2 font-medium text-muted-foreground text-sm transition-colors data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none',
      props.class
    )"
    :value="props.value"
  >
    <slot />
  </TabsTrigger>
</template>
