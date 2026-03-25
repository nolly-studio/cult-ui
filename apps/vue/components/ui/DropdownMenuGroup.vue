<script setup lang="ts">
import { DropdownMenuGroup } from "radix-vue"

defineOptions({ name: "DropdownMenuGroup" })
</script>

<template>
  <DropdownMenuGroup v-bind="$attrs">
    <slot />
  </DropdownMenuGroup>
</template>
