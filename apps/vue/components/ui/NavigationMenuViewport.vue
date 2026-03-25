<script setup lang="ts">
import { NavigationMenuViewport } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "NavigationMenuViewport" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('absolute left-0 top-full flex justify-center')">
    <NavigationMenuViewport
      :class="
        cn(
          'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
          props.class
        )
      "
    />
  </div>
</template>
