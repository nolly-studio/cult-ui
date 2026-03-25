<script setup lang="ts">
import { inject, computed, type Component } from "vue"
import { cn } from "@/lib/utils"
import { FileText, Globe, ImageIcon, Music2, Paperclip, Video } from "lucide-vue-next"
import { ATTACHMENT_CONTEXT_KEY } from "./Attachment.vue"
import type { AttachmentMediaCategory, AttachmentFileData } from "./Attachments.vue"

defineOptions({ name: "AttachmentPreview" })

const props = defineProps<{
  class?: string
}>()

const ctx = inject(ATTACHMENT_CONTEXT_KEY)!

const mediaCategoryIcons: Record<AttachmentMediaCategory, Component> = {
  audio: Music2,
  document: FileText,
  image: ImageIcon,
  source: Globe,
  unknown: Paperclip,
  video: Video,
}

const iconSize = computed(() => ctx.variant === "inline" ? "size-3" : "size-4")
const Icon = computed(() => mediaCategoryIcons[ctx.mediaCategory()])

const fileData = computed(() => {
  const d = ctx.data()
  return d.type === "file" ? d as AttachmentFileData : null
})

const isImageGrid = computed(
  () => ctx.mediaCategory() === "image" && fileData.value?.url && ctx.variant === "grid"
)
const isImageInline = computed(
  () => ctx.mediaCategory() === "image" && fileData.value?.url && ctx.variant !== "grid"
)
const isVideo = computed(
  () => ctx.mediaCategory() === "video" && fileData.value?.url
)
</script>

<template>
  <div
    :class="cn(
      'flex shrink-0 items-center justify-center overflow-hidden',
      ctx.variant === 'grid' && 'size-full bg-muted',
      ctx.variant === 'inline' && 'size-5 rounded bg-background',
      ctx.variant === 'list' && 'size-12 rounded bg-muted',
      props.class
    )"
  >
    <img
      v-if="isImageGrid"
      :alt="fileData?.filename || 'Image'"
      class="size-full object-cover"
      :height="96"
      :src="fileData?.url"
      :width="96"
    />
    <img
      v-else-if="isImageInline"
      :alt="fileData?.filename || 'Image'"
      class="size-full rounded object-cover"
      :height="20"
      :src="fileData?.url"
      :width="20"
    />
    <video
      v-else-if="isVideo"
      class="size-full object-cover"
      muted
      :src="fileData?.url"
    />
    <slot v-else>
      <component :is="Icon" :class="cn(iconSize, 'text-muted-foreground')" />
    </slot>
  </div>
</template>
