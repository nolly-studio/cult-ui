<script setup lang="ts">
import { cn } from "~/lib/utils"
import Button from "./Button.vue"
import { inputGroupButtonVariants, type InputGroupButtonVariants } from "./InputGroup.vue"
import type { ButtonVariants } from "./Button.vue"

const props = withDefaults(
  defineProps<{
    class?: string
    type?: string
    variant?: NonNullable<ButtonVariants["variant"]>
    size?: NonNullable<InputGroupButtonVariants["size"]>
  }>(),
  {
    type: "button",
    variant: "ghost",
    size: "xs",
  },
)
</script>

<template>
  <Button
    :type="type"
    :data-size="size"
    :variant="variant"
    :class="cn(inputGroupButtonVariants({ size }), props.class)"
  >
    <slot />
  </Button>
</template>
