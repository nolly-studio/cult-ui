<script setup lang="ts">
import { ref, computed, provide, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "WebPreview" })

export interface WebPreviewContextValue {
  url: string
  setUrl: (url: string) => void
  consoleOpen: boolean
  setConsoleOpen: (open: boolean) => void
}

export const webPreviewKey = Symbol("webPreview") as InjectionKey<WebPreviewContextValue>

const props = withDefaults(defineProps<{
  defaultUrl?: string
  class?: string
}>(), {
  defaultUrl: "",
})

const emit = defineEmits<{
  urlChange: [url: string]
}>()

const url = ref(props.defaultUrl)
const consoleOpen = ref(false)

const handleUrlChange = (newUrl: string) => {
  url.value = newUrl
  emit("urlChange", newUrl)
}

provide(webPreviewKey, {
  get url() { return url.value },
  setUrl: handleUrlChange,
  get consoleOpen() { return consoleOpen.value },
  setConsoleOpen: (open: boolean) => { consoleOpen.value = open },
})
</script>

<template>
  <div
    :class="cn('flex size-full flex-col rounded-lg border bg-card', props.class)"
  >
    <slot />
  </div>
</template>
