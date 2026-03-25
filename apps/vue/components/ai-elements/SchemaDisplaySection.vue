<script setup lang="ts">
import { ref } from "vue"
import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-vue-next"

defineOptions({ name: "SchemaDisplaySection" })

const props = withDefaults(
  defineProps<{
    class?: string
    title: string
    count?: number
    defaultOpen?: boolean
  }>(),
  { defaultOpen: true }
)

const isOpen = ref(props.defaultOpen)
</script>

<template>
  <div :class="cn(props.class)" :data-state="isOpen ? 'open' : 'closed'">
    <button
      class="group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50"
      type="button"
      @click="isOpen = !isOpen"
    >
      <ChevronRightIcon
        :class="cn(
          'size-4 shrink-0 text-muted-foreground transition-transform',
          isOpen && 'rotate-90'
        )"
      />
      <span class="font-medium text-sm">{{ props.title }}</span>
      <span
        v-if="props.count !== undefined"
        class="ml-auto inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-secondary text-secondary-foreground"
      >
        {{ props.count }}
      </span>
    </button>
    <div v-if="isOpen" class="divide-y border-t">
      <slot />
    </div>
  </div>
</template>
