<script setup lang="ts">
import { ref, provide, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "FileTree" })

export const FILE_TREE_KEY = Symbol("file-tree") as InjectionKey<{
  expandedPaths: Ref<Set<string>>
  togglePath: (path: string) => void
  selectedPath: Ref<string | undefined>
  onSelect?: (path: string) => void
}>

const props = withDefaults(
  defineProps<{
    class?: string
    selectedPath?: string
    defaultExpanded?: Set<string>
  }>(),
  { defaultExpanded: () => new Set() }
)

const emit = defineEmits<{
  select: [path: string]
  "update:expanded": [expanded: Set<string>]
}>()

const expandedPaths = ref(new Set(props.defaultExpanded))
const selectedPathRef = ref(props.selectedPath)

function togglePath(path: string) {
  const newExpanded = new Set(expandedPaths.value)
  if (newExpanded.has(path)) {
    newExpanded.delete(path)
  } else {
    newExpanded.add(path)
  }
  expandedPaths.value = newExpanded
  emit("update:expanded", newExpanded)
}

provide(FILE_TREE_KEY, {
  expandedPaths,
  togglePath,
  selectedPath: selectedPathRef,
  onSelect: (path: string) => {
    selectedPathRef.value = path
    emit("select", path)
  },
})
</script>

<template>
  <div
    :class="cn('rounded-lg border bg-background font-mono text-sm', props.class)"
    role="tree"
  >
    <div class="p-2">
      <slot />
    </div>
  </div>
</template>
