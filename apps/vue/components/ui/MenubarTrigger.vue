<script setup lang="ts">
import { MenubarTrigger } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "MenubarTrigger" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <MenubarTrigger
    :class="
      cn(
        'flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        props.class
      )
    "
  >
    <slot />
  </MenubarTrigger>
</template>
