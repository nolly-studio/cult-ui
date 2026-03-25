<script setup lang="ts">
import { inject, computed } from "vue"
import { ChevronRight, Folder, FolderOpen } from "lucide-vue-next"
import { cn } from "@/lib/utils"
import { FILE_TREE_KEY } from "./FileTree.vue"

defineOptions({ name: "FileTreeFolder" })

const props = defineProps<{
  class?: string
  path: string
  name: string
}>()

const ctx = inject(FILE_TREE_KEY)!
const isExpanded = computed(() => ctx.expandedPaths.value.has(props.path))
const isSelected = computed(() => ctx.selectedPath.value === props.path)

function handleClick() {
  ctx.togglePath(props.path)
  ctx.onSelect?.(props.path)
}
</script>

<template>
  <div :class="cn('', props.class)" role="treeitem" tabindex="0">
    <button
      type="button"
      :class="cn(
        'flex w-full items-center gap-1 rounded px-2 py-1 text-left transition-colors hover:bg-muted/50',
        isSelected && 'bg-muted'
      )"
      @click="handleClick"
    >
      <ChevronRight
        :class="cn('size-4 shrink-0 text-muted-foreground transition-transform', isExpanded && 'rotate-90')"
      />
      <span class="shrink-0">
        <FolderOpen v-if="isExpanded" class="size-4 text-blue-500" />
        <Folder v-else class="size-4 text-blue-500" />
      </span>
      <span class="truncate">{{ props.name }}</span>
    </button>
    <div v-if="isExpanded" class="ml-4 border-l pl-2">
      <slot />
    </div>
  </div>
</template>
