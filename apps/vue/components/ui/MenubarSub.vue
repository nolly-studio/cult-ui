<script setup lang="ts">
import { MenubarSub } from "radix-vue"

defineOptions({ name: "MenubarSub" })
</script>

<template>
  <MenubarSub data-slot="menubar-sub" v-bind="$attrs">
    <slot />
  </MenubarSub>
</template>
