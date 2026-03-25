<script setup lang="ts">
import { CollapsibleTrigger } from "radix-vue"

defineOptions({ name: "CollapsibleTrigger" })
</script>

<template>
  <CollapsibleTrigger v-bind="$attrs">
    <slot />
  </CollapsibleTrigger>
</template>
