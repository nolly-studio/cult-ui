<script setup lang="ts">
import { cn } from "@/lib/utils"

defineOptions({ name: "ModelSelectorItem" })

const props = defineProps<{
  class?: string
  value?: string
}>()

const emit = defineEmits<{
  select: [value: string | undefined]
}>()
</script>

<template>
  <div
    :class="cn('cursor-pointer px-3 py-2 text-sm hover:bg-accent', props.class)"
    @click="emit('select', props.value)"
  >
    <slot />
  </div>
</template>
