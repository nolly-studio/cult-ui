<script setup lang="ts">
import { cn } from "~/lib/utils"
import Textarea from "./Textarea.vue"

const props = defineProps<{
  class?: string
}>()

const model = defineModel<string>()
</script>

<template>
  <Textarea
    v-model="model"
    data-slot="input-group-control"
    :class="
      cn(
        'flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent',
        props.class,
      )
    "
  />
</template>
