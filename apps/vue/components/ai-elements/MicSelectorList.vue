<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { MIC_SELECTOR_KEY } from "./MicSelector.vue"

defineOptions({ name: "MicSelectorList" })

const props = defineProps<{
  class?: string
}>()

const ctx = inject(MIC_SELECTOR_KEY)!
</script>

<template>
  <div
    v-if="ctx.open.value"
    :class="cn('absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 shadow-md', props.class)"
  >
    <div v-if="ctx.devices.value.length === 0" class="px-2 py-1.5 text-sm text-muted-foreground">
      No microphone found.
    </div>
    <slot :devices="ctx.devices.value" />
  </div>
</template>
