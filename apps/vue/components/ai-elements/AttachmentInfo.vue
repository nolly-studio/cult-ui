<script setup lang="ts">
import { inject, computed } from "vue"
import { cn } from "@/lib/utils"
import { ATTACHMENT_CONTEXT_KEY } from "./Attachment.vue"
import { getAttachmentLabel } from "./Attachments.vue"

defineOptions({ name: "AttachmentInfo" })

const props = withDefaults(
  defineProps<{
    class?: string
    showMediaType?: boolean
  }>(),
  { showMediaType: false }
)

const ctx = inject(ATTACHMENT_CONTEXT_KEY)!
const label = computed(() => getAttachmentLabel(ctx.data))
</script>

<template>
  <div v-if="ctx.variant !== 'grid'" :class="cn('min-w-0 flex-1', props.class)">
    <span class="block truncate">{{ label }}</span>
    <span
      v-if="props.showMediaType && ctx.data.mediaType"
      class="block truncate text-muted-foreground text-xs"
    >
      {{ ctx.data.mediaType }}
    </span>
  </div>
</template>
