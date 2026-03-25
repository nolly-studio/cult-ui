<script setup lang="ts">
import { MenubarGroup } from "radix-vue"

defineOptions({ name: "MenubarGroup" })
</script>

<template>
  <MenubarGroup v-bind="$attrs">
    <slot />
  </MenubarGroup>
</template>
