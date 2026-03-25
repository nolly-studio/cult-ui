<script setup lang="ts">
import { inject } from "vue"
import { AlertCircle } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { JSX_PREVIEW_KEY } from "./JsxPreview.vue"

defineOptions({ name: "JsxPreviewError" })

const props = defineProps<{
  class?: string
}>()

const ctx = inject(JSX_PREVIEW_KEY)!
</script>

<template>
  <div
    v-if="ctx.error.value"
    :class="cn(
      'flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm',
      props.class
    )"
  >
    <slot :error="ctx.error.value">
      <AlertCircle class="size-4 shrink-0" />
      <span>{{ ctx.error.value.message }}</span>
    </slot>
  </div>
</template>
