<script setup lang="ts">
import { computed, inject, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "WebPreviewBody" })

interface WebPreviewContextValue {
  url: string
  setUrl: (url: string) => void
  consoleOpen: boolean
  setConsoleOpen: (open: boolean) => void
}

const webPreviewKey = Symbol.for("webPreview") as InjectionKey<WebPreviewContextValue>

const context = inject(webPreviewKey)

if (!context) {
  throw new Error("WebPreviewBody must be used within WebPreview")
}

const props = defineProps<{
  src?: string
  class?: string
}>()

const iframeSrc = computed(() => (props.src ?? context.url) || undefined)
</script>

<template>
  <div class="flex-1">
    <iframe
      :class="cn('size-full', props.class)"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
      :src="iframeSrc"
      title="Preview"
    />
    <slot name="loading" />
  </div>
</template>
