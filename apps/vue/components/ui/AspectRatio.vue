<script setup lang="ts">
import { AspectRatio } from "radix-vue"

defineOptions({ name: "AspectRatio" })

defineProps<{ ratio?: number }>()
</script>

<template>
  <AspectRatio :ratio="ratio" v-bind="$attrs">
    <slot />
  </AspectRatio>
</template>
