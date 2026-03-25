<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "radix-vue"
import { X } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "DialogContent" })

withDefaults(
  defineProps<{
    class?: string
    showCloseButton?: boolean
  }>(),
  { showCloseButton: true }
)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      :class="
        cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-black/10 duration-100 supports-[backdrop-filter]:backdrop-blur-sm fixed inset-0 isolate z-50'
        )
      "
    />
    <DialogContent
      :class="
        cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ring-foreground/10 grid max-w-[calc(100%-2rem)] gap-4 rounded-xl p-4 text-sm ring-1 duration-100 sm:max-w-sm fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 outline-none',
          props.class
        )
      "
      v-bind="$attrs"
    >
      <slot />
      <DialogClose
        v-if="showCloseButton"
        :class="
          cn(
            'absolute top-2 right-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground inline-flex h-8 w-8 items-center justify-center'
          )
        "
      >
        <X class="h-4 w-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
