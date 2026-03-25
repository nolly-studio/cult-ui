<script lang="ts">
import type { InjectionKey, Ref } from "vue"

// ============================================================================
// Types
// ============================================================================

export interface FileUIPart {
  id: string
  type: "file"
  filename: string
  mediaType: string
  url: string
}

export interface PromptInputMessage {
  text: string
  files: Omit<FileUIPart, "id">[]
}

export interface AttachmentsContext {
  files: Ref<FileUIPart[]>
  add: (files: File[] | FileList) => void
  remove: (id: string) => void
  clear: () => void
  openFileDialog: () => void
}

export const attachmentsKey: InjectionKey<AttachmentsContext> = Symbol("promptInputAttachments")

export function usePromptInputAttachments() {
  const context = inject(attachmentsKey)
  if (!context) {
    throw new Error("usePromptInputAttachments must be used within a PromptInput")
  }
  return context
}
</script>

<script setup lang="ts">
import {
  ref,
  computed,
  provide,
  inject,
  onMounted,
  onUnmounted,
  useTemplateRef,
} from "vue"
import { cn } from "@/lib/utils"
import { nanoid } from "nanoid"

defineOptions({ name: "PromptInput" })

const props = withDefaults(
  defineProps<{
    class?: string
    accept?: string
    multiple?: boolean
    globalDrop?: boolean
    maxFiles?: number
    maxFileSize?: number
  }>(),
  {
    multiple: true,
    globalDrop: false,
  }
)

const emit = defineEmits<{
  submit: [message: PromptInputMessage, event: Event]
  error: [err: { code: "max_files" | "max_file_size" | "accept"; message: string }]
}>()

// ---- Refs ----
const fileInputRef = useTemplateRef<HTMLInputElement>("fileInput")
const formRef = useTemplateRef<HTMLFormElement>("form")
const files = ref<FileUIPart[]>([])

// ---- Helpers ----
async function convertBlobUrlToDataUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

function matchesAccept(f: File): boolean {
  if (!props.accept || props.accept.trim() === "") return true
  const patterns = props.accept.split(",").map((s) => s.trim()).filter(Boolean)
  return patterns.some((pattern) => {
    if (pattern.endsWith("/*")) {
      const prefix = pattern.slice(0, -1)
      return f.type.startsWith(prefix)
    }
    return f.type === pattern
  })
}

function addFiles(fileList: File[] | FileList) {
  const incoming = [...fileList]
  const accepted = incoming.filter((f) => matchesAccept(f))

  if (incoming.length && accepted.length === 0) {
    emit("error", { code: "accept", message: "No files match the accepted types." })
    return
  }

  const withinSize = (f: File) => (props.maxFileSize ? f.size <= props.maxFileSize : true)
  const sized = accepted.filter(withinSize)

  if (accepted.length > 0 && sized.length === 0) {
    emit("error", { code: "max_file_size", message: "All files exceed the maximum size." })
    return
  }

  const capacity = typeof props.maxFiles === "number"
    ? Math.max(0, props.maxFiles - files.value.length)
    : undefined
  const capped = typeof capacity === "number" ? sized.slice(0, capacity) : sized

  if (typeof capacity === "number" && sized.length > capacity) {
    emit("error", { code: "max_files", message: "Too many files. Some were not added." })
  }

  for (const file of capped) {
    files.value.push({
      filename: file.name,
      id: nanoid(),
      mediaType: file.type,
      type: "file",
      url: URL.createObjectURL(file),
    })
  }
}

function removeFile(id: string) {
  const found = files.value.find((f) => f.id === id)
  if (found?.url) {
    URL.revokeObjectURL(found.url)
  }
  files.value = files.value.filter((f) => f.id !== id)
}

function clearFiles() {
  for (const f of files.value) {
    if (f.url) {
      URL.revokeObjectURL(f.url)
    }
  }
  files.value = []
}

function openFileDialog() {
  fileInputRef.value?.click()
}

// ---- Provide attachments context ----
provide(attachmentsKey, {
  files,
  add: addFiles,
  remove: removeFile,
  clear: clearFiles,
  openFileDialog,
})

// ---- File input handler ----
function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) {
    addFiles(input.files)
  }
  input.value = ""
}

// ---- Form submit ----
async function handleSubmit(event: Event) {
  event.preventDefault()

  const form = event.target as HTMLFormElement
  const formData = new FormData(form)
  const text = (formData.get("message") as string) || ""

  form.reset()

  try {
    const convertedFiles: Omit<FileUIPart, "id">[] = await Promise.all(
      files.value.map(async ({ id: _id, ...item }) => {
        if (item.url?.startsWith("blob:")) {
          const dataUrl = await convertBlobUrlToDataUrl(item.url)
          return { ...item, url: dataUrl ?? item.url }
        }
        return item
      })
    )

    emit("submit", { files: convertedFiles, text }, event)
    clearFiles()
  } catch {
    // Don't clear on error - user may want to retry
  }
}

// ---- Drag and drop ----
function onDragOver(e: DragEvent) {
  if (e.dataTransfer?.types?.includes("Files")) {
    e.preventDefault()
  }
}

function onDrop(e: DragEvent) {
  if (e.dataTransfer?.types?.includes("Files")) {
    e.preventDefault()
  }
  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
    addFiles(e.dataTransfer.files)
  }
}

onMounted(() => {
  if (props.globalDrop) {
    document.addEventListener("dragover", onDragOver)
    document.addEventListener("drop", onDrop)
  } else {
    const form = formRef.value
    if (form) {
      form.addEventListener("dragover", onDragOver)
      form.addEventListener("drop", onDrop)
    }
  }
})

onUnmounted(() => {
  // Clean up blob URLs
  for (const f of files.value) {
    if (f.url) {
      URL.revokeObjectURL(f.url)
    }
  }
  // Clean up drag listeners
  if (props.globalDrop) {
    document.removeEventListener("dragover", onDragOver)
    document.removeEventListener("drop", onDrop)
  } else {
    const form = formRef.value
    if (form) {
      form.removeEventListener("dragover", onDragOver)
      form.removeEventListener("drop", onDrop)
    }
  }
})
</script>

<template>
  <input
    ref="fileInput"
    :accept="props.accept"
    aria-label="Upload files"
    class="hidden"
    :multiple="props.multiple"
    title="Upload files"
    type="file"
    @change="handleFileChange"
  />
  <form
    ref="form"
    :class="cn('w-full', props.class)"
    @submit="handleSubmit"
  >
    <slot />
  </form>
</template>
