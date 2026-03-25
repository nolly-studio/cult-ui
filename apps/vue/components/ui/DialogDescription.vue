<script setup lang="ts">
import { DialogDescription } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "DialogDescription" })

const props = defineProps<{ class?: string }>()
</script>

<template>
  <DialogDescription
    :class="
      cn(
        'text-muted-foreground text-sm [&_a:hover]:text-foreground [&_a]:underline [&_a]:underline-offset-[3px]',
        props.class
      )
    "
  >
    <slot />
  </DialogDescription>
</template>
