<script setup lang="ts">
import { DialogClose } from "radix-vue"

defineOptions({ name: "DialogClose" })

defineProps<{ asChild?: boolean }>()
</script>

<template>
  <DialogClose :as-child="asChild" v-bind="$attrs">
    <slot />
  </DialogClose>
</template>
