<script setup lang="ts">
import { cn } from "~/lib/utils"
import Input from "./Input.vue"

const props = defineProps<{
  class?: string
  type?: string
}>()

const model = defineModel<string>()
</script>

<template>
  <Input
    v-model="model"
    :type="type"
    data-slot="input-group-control"
    :class="
      cn(
        'flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent',
        props.class,
      )
    "
  />
</template>
