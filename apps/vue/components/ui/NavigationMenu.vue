<script lang="ts">
import { cva } from "class-variance-authority"

export const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"
)
</script>

<script setup lang="ts">
import { NavigationMenuRoot } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "NavigationMenu" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <NavigationMenuRoot
    :class="
      cn(
        'relative z-10 flex max-w-max flex-1 items-center justify-center',
        props.class
      )
    "
  >
    <slot />
    <NavigationMenuViewport />
  </NavigationMenuRoot>
</template>
