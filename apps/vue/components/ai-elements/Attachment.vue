<script setup lang="ts">
import { provide, inject, computed, reactive, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"
import {
  ATTACHMENTS_VARIANT_KEY,
  getMediaCategory,
  type AttachmentData,
  type AttachmentMediaCategory,
  type AttachmentVariant,
} from "./Attachments.vue"

defineOptions({ name: "Attachment" })

export const ATTACHMENT_CONTEXT_KEY = Symbol("attachment-context") as InjectionKey<{
  data: () => AttachmentData
  mediaCategory: () => AttachmentMediaCategory
  variant: AttachmentVariant
  onRemove?: () => void
}>

const props = defineProps<{
  class?: string
  data: AttachmentData
  onRemove?: () => void
}>()

const variant = inject(ATTACHMENTS_VARIANT_KEY, "grid" as AttachmentVariant)
const mediaCategory = computed(() => getMediaCategory(props.data))

provide(ATTACHMENT_CONTEXT_KEY, {
  data: () => props.data,
  mediaCategory: () => mediaCategory.value,
  variant,
  onRemove: props.onRemove,
})
</script>

<template>
  <div
    :class="cn(
      'group relative',
      variant === 'grid' && 'size-24 overflow-hidden rounded-lg',
      variant === 'inline' && [
        'flex h-8 cursor-pointer select-none items-center gap-1.5',
        'rounded-md border border-border px-1.5',
        'font-medium text-sm transition-all',
        'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
      ],
      variant === 'list' && [
        'flex w-full items-center gap-3 rounded-lg border p-3',
        'hover:bg-accent/50',
      ],
      props.class
    )"
  >
    <slot />
  </div>
</template>
