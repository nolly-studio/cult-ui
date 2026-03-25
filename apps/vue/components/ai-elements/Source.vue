<script setup lang="ts">
import { BookIcon } from "lucide-vue-next"

defineOptions({ name: "Source" })

const props = defineProps<{
  href?: string
  title?: string
}>()
</script>

<template>
  <a
    class="flex items-center gap-2"
    :href="props.href"
    rel="noreferrer"
    target="_blank"
  >
    <slot>
      <BookIcon class="h-4 w-4" />
      <span class="block font-medium">{{ props.title }}</span>
    </slot>
  </a>
</template>
