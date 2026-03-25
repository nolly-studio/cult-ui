<script setup lang="ts">
import { provide, computed } from "vue"
import { cn } from "@/lib/utils"
import {
  FileText,
  Globe,
  ImageIcon,
  Music2,
  Paperclip,
  Video,
  X,
} from "lucide-vue-next"

defineOptions({ name: "Attachments" })

// ============================================================================
// Types
// ============================================================================

export interface AttachmentFileData {
  type: "file"
  id: string
  url?: string
  mediaType?: string
  filename?: string
}

export interface AttachmentSourceData {
  type: "source-document"
  id: string
  title?: string
  filename?: string
  mediaType?: string
}

export type AttachmentData = AttachmentFileData | AttachmentSourceData

export type AttachmentMediaCategory =
  | "image"
  | "video"
  | "audio"
  | "document"
  | "source"
  | "unknown"

export type AttachmentVariant = "grid" | "inline" | "list"

// ============================================================================
// Utility Functions
// ============================================================================

export const getMediaCategory = (data: AttachmentData): AttachmentMediaCategory => {
  if (data.type === "source-document") return "source"
  const mediaType = data.mediaType ?? ""
  if (mediaType.startsWith("image/")) return "image"
  if (mediaType.startsWith("video/")) return "video"
  if (mediaType.startsWith("audio/")) return "audio"
  if (mediaType.startsWith("application/") || mediaType.startsWith("text/"))
    return "document"
  return "unknown"
}

export const getAttachmentLabel = (data: AttachmentData): string => {
  if (data.type === "source-document") return data.title || data.filename || "Source"
  const category = getMediaCategory(data)
  return data.filename || (category === "image" ? "Image" : "Attachment")
}

// ============================================================================
// Provide/Inject Keys
// ============================================================================

export const ATTACHMENTS_VARIANT_KEY = Symbol("attachments-variant") as InjectionKey<AttachmentVariant>

// ============================================================================
// Component
// ============================================================================

const props = withDefaults(
  defineProps<{
    class?: string
    variant?: AttachmentVariant
  }>(),
  { variant: "grid" }
)

provide(ATTACHMENTS_VARIANT_KEY, props.variant)
</script>

<template>
  <div
    :class="cn(
      'flex items-start',
      props.variant === 'list' ? 'flex-col gap-2' : 'flex-wrap gap-2',
      props.variant === 'grid' && 'ml-auto w-fit',
      props.class
    )"
  >
    <slot />
  </div>
</template>
