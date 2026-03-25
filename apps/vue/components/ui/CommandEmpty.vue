<script setup lang="ts">
import { ComboboxEmpty } from "radix-vue"

defineOptions({ name: "CommandEmpty" })
</script>

<template>
  <ComboboxEmpty class="py-6 text-center text-sm">
    <slot />
  </ComboboxEmpty>
</template>
