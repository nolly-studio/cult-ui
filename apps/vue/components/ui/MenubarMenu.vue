<script setup lang="ts">
import { MenubarMenu } from "radix-vue"

defineOptions({ name: "MenubarMenu" })
</script>

<template>
  <MenubarMenu v-bind="$attrs">
    <slot />
  </MenubarMenu>
</template>
