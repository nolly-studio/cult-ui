<script setup lang="ts">
import { DrawerDescription } from "vaul-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "DrawerDescription" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <DrawerDescription
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </DrawerDescription>
</template>
