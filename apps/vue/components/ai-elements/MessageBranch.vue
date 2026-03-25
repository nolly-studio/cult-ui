<script setup lang="ts">
import { ref, provide, computed, type InjectionKey } from "vue"
import { ChevronLeft, ChevronRight } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "MessageBranch" })

export const MESSAGE_BRANCH_KEY = Symbol("message-branch") as InjectionKey<{
  currentBranch: Ref<number>
  totalBranches: Ref<number>
  goToPrevious: () => void
  goToNext: () => void
}>

const props = withDefaults(
  defineProps<{
    class?: string
    defaultBranch?: number
    totalBranches: number
  }>(),
  { defaultBranch: 0 }
)

const emit = defineEmits<{
  "update:branch": [index: number]
}>()

const currentBranch = ref(props.defaultBranch)
const totalBranches = computed(() => props.totalBranches)

function goToPrevious() {
  currentBranch.value = currentBranch.value > 0 ? currentBranch.value - 1 : props.totalBranches - 1
  emit("update:branch", currentBranch.value)
}

function goToNext() {
  currentBranch.value = currentBranch.value < props.totalBranches - 1 ? currentBranch.value + 1 : 0
  emit("update:branch", currentBranch.value)
}

provide(MESSAGE_BRANCH_KEY, { currentBranch, totalBranches, goToPrevious, goToNext })
</script>

<template>
  <div :class="cn('grid w-full gap-2 [&>div]:pb-0', props.class)">
    <slot :current-branch="currentBranch" />
  </div>
</template>
