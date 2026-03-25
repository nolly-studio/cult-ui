<script setup lang="ts">
import { NavigationMenuLink } from "radix-vue"

defineOptions({ name: "NavigationMenuLink" })
</script>

<template>
  <NavigationMenuLink v-bind="$attrs">
    <slot />
  </NavigationMenuLink>
</template>
