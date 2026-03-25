<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { MODEL_SELECTOR_KEY } from "./ModelSelector.vue"

defineOptions({ name: "ModelSelectorContent" })

const props = withDefaults(
  defineProps<{
    class?: string
    title?: string
  }>(),
  { title: "Model Selector" }
)

const ctx = inject(MODEL_SELECTOR_KEY)!
</script>

<template>
  <Teleport to="body">
    <div
      v-if="ctx.open.value"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div class="fixed inset-0 bg-black/50" @click="ctx.onOpenChange(false)" />
      <div
        :class="cn(
          'relative z-50 w-full max-w-sm rounded-lg border bg-background p-0 shadow-lg outline-none',
          props.class
        )"
      >
        <span class="sr-only">{{ props.title }}</span>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
