<script setup lang="ts">
import { inject, computed } from "vue"
import { File as FileIcon } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { FILE_TREE_KEY } from "./FileTree.vue"

defineOptions({ name: "FileTreeFile" })

const props = defineProps<{
  class?: string
  path: string
  name: string
}>()

const ctx = inject(FILE_TREE_KEY)!
const isSelected = computed(() => ctx.selectedPath.value === props.path)

function handleClick() {
  ctx.onSelect?.(props.path)
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === "Enter" || e.key === " ") {
    ctx.onSelect?.(props.path)
  }
}
</script>

<template>
  <div
    :class="cn(
      'flex cursor-pointer items-center gap-1 rounded px-2 py-1 transition-colors hover:bg-muted/50',
      isSelected && 'bg-muted',
      props.class
    )"
    role="treeitem"
    tabindex="0"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <slot>
      <span class="size-4" />
      <span class="shrink-0">
        <slot name="icon">
          <FileIcon class="size-4 text-muted-foreground" />
        </slot>
      </span>
      <span class="truncate">{{ props.name }}</span>
    </slot>
  </div>
</template>
