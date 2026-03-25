<script setup lang="ts">
import type { Component } from "vue"
import { Dot } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "ChainOfThoughtStep" })

const stepStatusStyles: Record<string, string> = {
  active: "text-foreground",
  complete: "text-muted-foreground",
  pending: "text-muted-foreground/50",
}

const props = withDefaults(
  defineProps<{
    class?: string
    icon?: Component
    label: string
    description?: string
    status?: "complete" | "active" | "pending"
  }>(),
  { status: "complete" }
)
</script>

<template>
  <div
    :class="cn(
      'flex gap-2 text-sm',
      stepStatusStyles[props.status],
      'fade-in-0 slide-in-from-top-2 animate-in',
      props.class
    )"
  >
    <div class="relative mt-0.5">
      <component :is="props.icon || Dot" class="size-4" />
      <div class="absolute top-7 bottom-0 left-1/2 -mx-px w-px bg-border" />
    </div>
    <div class="flex-1 space-y-2 overflow-hidden">
      <div>{{ props.label }}</div>
      <div v-if="props.description" class="text-muted-foreground text-xs">
        {{ props.description }}
      </div>
      <slot />
    </div>
  </div>
</template>
