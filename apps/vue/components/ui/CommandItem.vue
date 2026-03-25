<script setup lang="ts">
import { ComboboxItem } from "radix-vue"
import { cn } from "@/lib/utils"

defineOptions({ name: "CommandItem" })

const props = defineProps<{
  class?: string
  value: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  select: [event: Event]
}>()
</script>

<template>
  <ComboboxItem
    :value="value"
    :disabled="disabled"
    :class="
      cn(
        'relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        props.class
      )
    "
    @select="emit('select', $event)"
  >
    <slot />
  </ComboboxItem>
</template>
