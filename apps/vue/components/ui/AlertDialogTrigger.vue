<script setup lang="ts">
import { AlertDialogTrigger } from "radix-vue"

defineOptions({ name: "AlertDialogTrigger" })

defineProps<{ asChild?: boolean }>()
</script>

<template>
  <AlertDialogTrigger :as-child="asChild" v-bind="$attrs">
    <slot />
  </AlertDialogTrigger>
</template>
