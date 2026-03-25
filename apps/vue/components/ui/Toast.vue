<script setup lang="ts">
import { ToastRoot } from "radix-vue"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

defineOptions({ name: "Toast" })

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type ToastVariants = VariantProps<typeof toastVariants>

const props = withDefaults(
  defineProps<{
    class?: string
    variant?: NonNullable<ToastVariants["variant"]>
    open?: boolean
    duration?: number
    type?: "foreground" | "background"
  }>(),
  { variant: "default", open: true }
)

const emit = defineEmits<{
  "update:open": [value: boolean]
}>()
</script>

<template>
  <ToastRoot
    :open="open"
    :duration="duration"
    :type="type"
    :class="cn(toastVariants({ variant }), props.class)"
    @update:open="emit('update:open', $event)"
    v-bind="$attrs"
  >
    <slot />
  </ToastRoot>
</template>
