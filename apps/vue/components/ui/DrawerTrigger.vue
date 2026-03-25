<script setup lang="ts">
import { DrawerTrigger } from "vaul-vue"

defineOptions({ name: "DrawerTrigger" })

defineProps<{ asChild?: boolean }>()
</script>

<template>
  <DrawerTrigger :as-child="asChild" v-bind="$attrs">
    <slot />
  </DrawerTrigger>
</template>
