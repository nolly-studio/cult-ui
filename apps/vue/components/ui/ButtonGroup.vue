<script lang="ts">
import { cva, type VariantProps } from "class-variance-authority"

export const buttonGroupVariants = cva(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
)

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>
</script>

<script setup lang="ts">
import { cn } from "~/lib/utils"

const props = withDefaults(
  defineProps<{
    class?: string
    orientation?: NonNullable<ButtonGroupVariants["orientation"]>
  }>(),
  {
    orientation: "horizontal",
  },
)
</script>

<template>
  <div
    role="group"
    data-slot="button-group"
    :data-orientation="orientation"
    :class="cn(buttonGroupVariants({ orientation }), props.class)"
  >
    <slot />
  </div>
</template>
