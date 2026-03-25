<script setup lang="ts">
import { AvatarFallback } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "AvatarFallback" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <AvatarFallback
    :class="
      cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        props.class
      )
    "
  >
    <slot />
  </AvatarFallback>
</template>
