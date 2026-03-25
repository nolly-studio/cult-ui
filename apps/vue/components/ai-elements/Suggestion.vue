<script setup lang="ts">
import { cn } from "@/lib/utils"
import Button from "@/components/ui/Button.vue"

defineOptions({ name: "Suggestion" })

const props = withDefaults(
  defineProps<{
    class?: string
    suggestion: string
    variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
    size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"
  }>(),
  {
    variant: "outline",
    size: "sm",
  },
)

const emit = defineEmits<{
  click: [suggestion: string]
}>()

function handleClick() {
  emit("click", props.suggestion)
}
</script>

<template>
  <Button
    :class="cn('cursor-pointer rounded-full px-4', props.class)"
    :size="props.size"
    type="button"
    :variant="props.variant"
    @click="handleClick"
  >
    <slot>{{ props.suggestion }}</slot>
  </Button>
</template>
