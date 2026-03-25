<script setup lang="ts">
import { ref, provide, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "Commit" })

export const COMMIT_OPEN_KEY = Symbol("commit-open") as InjectionKey<Ref<boolean>>

const props = defineProps<{
  class?: string
}>()

const isOpen = ref(false)
provide(COMMIT_OPEN_KEY, isOpen)
</script>

<template>
  <div :class="cn('rounded-lg border bg-background', props.class)">
    <slot />
  </div>
</template>
