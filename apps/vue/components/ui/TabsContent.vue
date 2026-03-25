<script setup lang="ts">
import { TabsContent } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "TabsContent" })

const props = defineProps<{
  class?: string
  value: string
}>()
</script>

<template>
  <TabsContent
    :value="value"
    :class="
      cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        props.class
      )
    "
  >
    <slot />
  </TabsContent>
</template>
