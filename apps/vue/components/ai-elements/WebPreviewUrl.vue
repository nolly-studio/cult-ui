<script setup lang="ts">
import { ref, watch, inject, type InjectionKey } from "vue"
import { Input } from "@/components/ui/input"

defineOptions({ name: "WebPreviewUrl" })

interface WebPreviewContextValue {
  url: string
  setUrl: (url: string) => void
  consoleOpen: boolean
  setConsoleOpen: (open: boolean) => void
}

const webPreviewKey = Symbol.for("webPreview") as InjectionKey<WebPreviewContextValue>

const context = inject(webPreviewKey)

if (!context) {
  throw new Error("WebPreviewUrl must be used within WebPreview")
}

const inputValue = ref(context.url)

// Sync when context url changes externally
watch(() => context.url, (newUrl) => {
  inputValue.value = newUrl
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    const target = event.target as HTMLInputElement
    context.setUrl(target.value)
  }
}
</script>

<template>
  <Input
    class="h-8 flex-1 text-sm"
    :value="inputValue"
    placeholder="Enter URL..."
    @input="handleInput"
    @keydown="handleKeyDown"
  />
</template>
