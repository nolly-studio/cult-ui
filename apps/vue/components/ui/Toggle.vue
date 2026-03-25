<script lang="ts">
import { cva, type VariantProps } from "class-variance-authority"

export const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ToggleVariants = VariantProps<typeof toggleVariants>
</script>

<script setup lang="ts">
import { Toggle } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "Toggle" })

const props = withDefaults(
  defineProps<{
    class?: string
    variant?: NonNullable<ToggleVariants["variant"]>
    size?: NonNullable<ToggleVariants["size"]>
    pressed?: boolean
    defaultPressed?: boolean
    disabled?: boolean
  }>(),
  {
    variant: "default",
    size: "default",
  }
)

const emit = defineEmits<{
  "update:pressed": [value: boolean]
}>()
</script>

<template>
  <Toggle
    :pressed="pressed"
    :default-pressed="defaultPressed"
    :disabled="disabled"
    :class="cn(toggleVariants({ variant, size }), props.class)"
    @update:pressed="emit('update:pressed', $event)"
  >
    <slot />
  </Toggle>
</template>
