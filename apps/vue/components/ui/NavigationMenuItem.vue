<script setup lang="ts">
import { NavigationMenuItem } from "radix-vue"

defineOptions({ name: "NavigationMenuItem" })
</script>

<template>
  <NavigationMenuItem v-bind="$attrs">
    <slot />
  </NavigationMenuItem>
</template>
