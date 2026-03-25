<script setup lang="ts">
import { ref, computed } from "vue"
import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-vue-next"

defineOptions({ name: "SchemaDisplayPropertyItem" })

interface SchemaProperty {
  name: string
  type: string
  required?: boolean
  description?: string
  properties?: SchemaProperty[]
  items?: SchemaProperty
}

const props = withDefaults(
  defineProps<{
    class?: string
    name: string
    type: string
    required?: boolean
    description?: string
    properties?: SchemaProperty[]
    items?: SchemaProperty
    depth?: number
  }>(),
  { depth: 0 }
)

const hasChildren = computed(() => props.properties || props.items)
const paddingLeft = computed(() => `${40 + props.depth * 16}px`)
const isOpen = ref(props.depth < 2)

const itemsAsProperty = computed(() => {
  if (!props.items) return null
  return {
    ...props.items,
    name: `${props.name}[]`,
  }
})
</script>

<template>
  <!-- With children: collapsible -->
  <div v-if="hasChildren">
    <button
      :class="cn(
        'group flex w-full items-center gap-2 py-3 text-left transition-colors hover:bg-muted/50',
        props.class
      )"
      :style="{ paddingLeft }"
      type="button"
      @click="isOpen = !isOpen"
    >
      <ChevronRightIcon
        :class="cn(
          'size-4 shrink-0 text-muted-foreground transition-transform',
          isOpen && 'rotate-90'
        )"
      />
      <span class="font-mono text-sm">{{ props.name }}</span>
      <span class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors">
        {{ props.type }}
      </span>
      <span
        v-if="props.required"
        class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      >
        required
      </span>
    </button>
    <p
      v-if="props.description"
      class="pb-2 text-muted-foreground text-sm"
      :style="{ paddingLeft: `${40 + props.depth * 16 + 24}px` }"
    >
      {{ props.description }}
    </p>
    <div v-if="isOpen" class="divide-y border-t">
      <SchemaDisplayPropertyItem
        v-for="prop in props.properties"
        :key="prop.name"
        v-bind="prop"
        :depth="props.depth + 1"
      />
      <SchemaDisplayPropertyItem
        v-if="itemsAsProperty"
        v-bind="itemsAsProperty"
        :depth="props.depth + 1"
      />
    </div>
  </div>

  <!-- Without children: simple display -->
  <div
    v-else
    :class="cn('py-3 pr-4', props.class)"
    :style="{ paddingLeft }"
  >
    <div class="flex items-center gap-2">
      <span class="size-4" />
      <span class="font-mono text-sm">{{ props.name }}</span>
      <span class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors">
        {{ props.type }}
      </span>
      <span
        v-if="props.required"
        class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      >
        required
      </span>
    </div>
    <p v-if="props.description" class="mt-1 pl-6 text-muted-foreground text-sm">
      {{ props.description }}
    </p>
  </div>
</template>
