<script setup lang="ts">
import { inject } from "vue"
import { MODEL_SELECTOR_KEY } from "./ModelSelector.vue"

defineOptions({ name: "ModelSelectorTrigger" })

const ctx = inject(MODEL_SELECTOR_KEY)!
</script>

<template>
  <div @click="ctx.onOpenChange(!ctx.open.value)">
    <slot />
  </div>
</template>
