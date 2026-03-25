<script setup lang="ts">
import { CollapsibleRoot } from "radix-vue"

defineOptions({ name: "Collapsible" })
</script>

<template>
  <CollapsibleRoot v-bind="$attrs">
    <slot />
  </CollapsibleRoot>
</template>
