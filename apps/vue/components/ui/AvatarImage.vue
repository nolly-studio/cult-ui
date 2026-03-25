<script setup lang="ts">
import { AvatarImage } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "AvatarImage" })

const props = defineProps<{
  class?: string
  src?: string
  alt?: string
}>()
</script>

<template>
  <AvatarImage
    :src="src"
    :alt="alt"
    :class="cn('aspect-square h-full w-full', props.class)"
  />
</template>
