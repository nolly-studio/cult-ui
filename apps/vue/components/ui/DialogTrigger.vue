<script setup lang="ts">
import { DialogTrigger } from "radix-vue"

defineOptions({ name: "DialogTrigger" })

defineProps<{ asChild?: boolean }>()
</script>

<template>
  <DialogTrigger :as-child="asChild" v-bind="$attrs">
    <slot />
  </DialogTrigger>
</template>
