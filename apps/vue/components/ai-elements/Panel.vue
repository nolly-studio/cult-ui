<script setup lang="ts">
import { cn } from "@/lib/utils"
import { Panel as PanelPrimitive } from "@vue-flow/core"

defineOptions({ name: "Panel" })

const props = defineProps<{
  class?: string
  position?: InstanceType<typeof PanelPrimitive>["$props"]["position"]
}>()
</script>

<template>
  <PanelPrimitive
    :class="cn('m-4 overflow-hidden rounded-md border bg-card p-1', props.class)"
    :position="props.position"
  >
    <slot />
  </PanelPrimitive>
</template>
