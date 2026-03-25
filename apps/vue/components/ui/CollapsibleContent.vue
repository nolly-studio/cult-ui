<script setup lang="ts">
import { CollapsibleContent } from "radix-vue"

defineOptions({ name: "CollapsibleContent" })
</script>

<template>
  <CollapsibleContent v-bind="$attrs">
    <slot />
  </CollapsibleContent>
</template>
