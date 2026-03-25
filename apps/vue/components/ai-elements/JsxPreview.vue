<script setup lang="ts">
/**
 * JsxPreview - Vue equivalent of the React JSX preview component.
 * Since Vue doesn't have a JSX parser equivalent to react-jsx-parser,
 * this component renders raw HTML content with v-html.
 * For safe usage, ensure content is sanitized before passing.
 */
import { ref, computed, provide, watch, type InjectionKey } from "vue"
import { AlertCircle } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "JsxPreview" })

export const JSX_PREVIEW_KEY = Symbol("jsx-preview") as InjectionKey<{
  html: Ref<string>
  error: Ref<Error | null>
}>

const props = withDefaults(
  defineProps<{
    class?: string
    html: string
    isStreaming?: boolean
  }>(),
  { isStreaming: false }
)

const emit = defineEmits<{
  error: [error: Error]
}>()

const error = ref<Error | null>(null)
const processedHtml = computed(() => props.html)

watch(() => props.html, () => {
  error.value = null
})

provide(JSX_PREVIEW_KEY, { html: processedHtml, error })
</script>

<template>
  <div :class="cn('relative', props.class)">
    <slot />
  </div>
</template>
