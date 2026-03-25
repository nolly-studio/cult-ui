<script setup lang="ts">
import { DrawerClose } from "vaul-vue"

defineOptions({ name: "DrawerClose" })

defineProps<{ asChild?: boolean }>()
</script>

<template>
  <DrawerClose :as-child="asChild" v-bind="$attrs">
    <slot />
  </DrawerClose>
</template>
