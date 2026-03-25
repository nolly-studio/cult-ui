<script setup lang="ts">
import { TabsTrigger } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "TabsTrigger" })

const props = defineProps<{
  class?: string
  value: string
  disabled?: boolean
}>()
</script>

<template>
  <TabsTrigger
    :value="value"
    :disabled="disabled"
    :class="
      cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
        props.class
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>
