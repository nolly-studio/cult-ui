<script setup lang="ts">
import { Download } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "ConversationDownload" })

export interface ConversationMessage {
  role: "user" | "assistant" | "system" | "data" | "tool"
  content: string
}

const props = withDefaults(
  defineProps<{
    class?: string
    messages: ConversationMessage[]
    filename?: string
  }>(),
  { filename: "conversation.md" }
)

function defaultFormatMessage(message: ConversationMessage): string {
  const roleLabel = message.role.charAt(0).toUpperCase() + message.role.slice(1)
  return `**${roleLabel}:** ${message.content}`
}

function handleDownload() {
  const markdown = props.messages.map((msg, i) => defaultFormatMessage(msg)).join("\n\n")
  const blob = new Blob([markdown], { type: "text/markdown" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = props.filename
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <button
    type="button"
    :class="cn(
      'absolute top-4 right-4 rounded-full border bg-background p-2 shadow-sm hover:bg-muted dark:bg-background dark:hover:bg-muted',
      props.class
    )"
    @click="handleDownload"
  >
    <slot>
      <Download class="size-4" />
    </slot>
  </button>
</template>
