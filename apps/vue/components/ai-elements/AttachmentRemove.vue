<script setup lang="ts">
import { inject } from "vue"
import { X } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { ATTACHMENT_CONTEXT_KEY } from "./Attachment.vue"

defineOptions({ name: "AttachmentRemove" })

const props = withDefaults(
  defineProps<{
    class?: string
    label?: string
  }>(),
  { label: "Remove" }
)

const ctx = inject(ATTACHMENT_CONTEXT_KEY)!

function handleClick(e: MouseEvent) {
  e.stopPropagation()
  ctx.onRemove?.()
}
</script>

<template>
  <button
    v-if="ctx.onRemove"
    type="button"
    :aria-label="props.label"
    :class="cn(
      ctx.variant === 'grid' && [
        'absolute top-2 right-2 size-6 rounded-full p-0',
        'bg-background/80 backdrop-blur-sm',
        'opacity-0 transition-opacity group-hover:opacity-100',
        'hover:bg-background',
        '[&>svg]:size-3',
      ],
      ctx.variant === 'inline' && [
        'size-5 rounded p-0',
        'opacity-0 transition-opacity group-hover:opacity-100',
        '[&>svg]:size-2.5',
      ],
      ctx.variant === 'list' && ['size-8 shrink-0 rounded p-0', '[&>svg]:size-4'],
      'inline-flex items-center justify-center hover:bg-accent',
      props.class
    )"
    @click="handleClick"
  >
    <slot>
      <X />
    </slot>
    <span class="sr-only">{{ props.label }}</span>
  </button>
</template>
