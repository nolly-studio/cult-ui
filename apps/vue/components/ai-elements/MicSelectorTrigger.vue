<script setup lang="ts">
import { inject } from "vue"
import { ChevronsUpDown } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { MIC_SELECTOR_KEY } from "./MicSelector.vue"

defineOptions({ name: "MicSelectorTrigger" })

const props = defineProps<{
  class?: string
}>()

const ctx = inject(MIC_SELECTOR_KEY)!

const currentDevice = computed(() => ctx.devices.value.find((d) => d.deviceId === ctx.value.value))
const displayLabel = computed(() => currentDevice.value?.label || "Select microphone...")
</script>

<template>
  <button
    type="button"
    :class="cn('inline-flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm w-full hover:bg-accent', props.class)"
    @click="ctx.onOpenChange(!ctx.open.value)"
  >
    <slot>
      <span class="flex-1 text-left truncate">{{ displayLabel }}</span>
    </slot>
    <ChevronsUpDown class="shrink-0 text-muted-foreground" :size="16" />
  </button>
</template>
