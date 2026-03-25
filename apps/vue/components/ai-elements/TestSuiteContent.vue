<script setup lang="ts">
import { cn } from "@/lib/utils"
import { CollapsibleContent } from "@/components/ui/collapsible"

defineOptions({ name: "TestSuiteContent" })

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <CollapsibleContent :class="cn('border-t', props.class)">
    <div class="divide-y">
      <slot />
    </div>
  </CollapsibleContent>
</template>
