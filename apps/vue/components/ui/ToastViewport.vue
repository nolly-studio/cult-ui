<script setup lang="ts">
import { ToastViewport } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "ToastViewport" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <ToastViewport
    :class="
      cn(
        'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
        props.class
      )
    "
  />
</template>
