<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

defineOptions({ name: "Alert" })

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type AlertVariants = VariantProps<typeof alertVariants>

const props = withDefaults(
  defineProps<{
    class?: string
    variant?: NonNullable<AlertVariants["variant"]>
  }>(),
  { variant: "default" }
)
</script>

<template>
  <div
    role="alert"
    :class="cn(alertVariants({ variant }), props.class)"
  >
    <slot />
  </div>
</template>
