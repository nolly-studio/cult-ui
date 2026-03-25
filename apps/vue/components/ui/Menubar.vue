<script setup lang="ts">
import { MenubarRoot } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "Menubar" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <MenubarRoot
    :class="
      cn(
        'flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm',
        props.class
      )
    "
  >
    <slot />
  </MenubarRoot>
</template>
