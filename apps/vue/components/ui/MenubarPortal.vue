<script setup lang="ts">
import { MenubarPortal } from "radix-vue"

defineOptions({ name: "MenubarPortal" })
</script>

<template>
  <MenubarPortal v-bind="$attrs">
    <slot />
  </MenubarPortal>
</template>
