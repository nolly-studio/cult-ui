<script setup lang="ts">
import { inject } from "vue"
import { cn } from "@/lib/utils"
import { JSX_PREVIEW_KEY } from "./JsxPreview.vue"

defineOptions({ name: "JsxPreviewContent" })

const props = defineProps<{
  class?: string
}>()

const ctx = inject(JSX_PREVIEW_KEY)!
</script>

<template>
  <div :class="cn('jsx-preview-content', props.class)" v-html="ctx.html.value" />
</template>
