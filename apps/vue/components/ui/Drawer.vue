<script setup lang="ts">
import { DrawerRoot } from "vaul-vue"

defineOptions({ name: "Drawer" })

withDefaults(
  defineProps<{
    open?: boolean
    shouldScaleBackground?: boolean
    activeSnapPoint?: number | string | null
    closeThreshold?: number
    dismissible?: boolean
    snapPoints?: (number | string)[]
  }>(),
  { shouldScaleBackground: true }
)

const emit = defineEmits<{
  "update:open": [value: boolean]
  "update:activeSnapPoint": [value: number | string | null]
}>()
</script>

<template>
  <DrawerRoot
    :open="open"
    :should-scale-background="shouldScaleBackground"
    :active-snap-point="activeSnapPoint"
    :close-threshold="closeThreshold"
    :dismissible="dismissible"
    :snap-points="snapPoints"
    @update:open="emit('update:open', $event)"
    @update:active-snap-point="emit('update:activeSnapPoint', $event)"
  >
    <slot />
  </DrawerRoot>
</template>
