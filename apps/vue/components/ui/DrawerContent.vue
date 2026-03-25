<script setup lang="ts">
import { DrawerContent, DrawerOverlay, DrawerPortal } from "vaul-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "DrawerContent" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay class="fixed inset-0 z-50 bg-black/80" />
    <DrawerContent
      :class="
        cn(
          'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background',
          props.class
        )
      "
      v-bind="$attrs"
    >
      <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>
