<script setup lang="ts">
import { ToggleGroupItem } from "radix-vue"
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { toggleVariants, type ToggleVariants } from "./Toggle.vue"

defineOptions({ name: "ToggleGroupItem" })

const props = withDefaults(
  defineProps<{
    class?: string
    value: string
    variant?: NonNullable<ToggleVariants["variant"]>
    size?: NonNullable<ToggleVariants["size"]>
    disabled?: boolean
  }>(),
  {}
)

const context = inject<{
  variant: NonNullable<ToggleVariants["variant"]>
  size: NonNullable<ToggleVariants["size"]>
}>("toggleGroupContext", { variant: "default", size: "default" })
</script>

<template>
  <ToggleGroupItem
    :value="value"
    :disabled="disabled"
    :class="
      cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        props.class
      )
    "
  >
    <slot />
  </ToggleGroupItem>
</template>
