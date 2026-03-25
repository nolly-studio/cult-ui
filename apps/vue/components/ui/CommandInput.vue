<script setup lang="ts">
import { ComboboxInput } from "radix-vue"
import { Search } from "lucide-vue-next"
import { cn } from "@/lib/utils"

defineOptions({ name: "CommandInput" })

const props = defineProps<{
  class?: string
  placeholder?: string
  disabled?: boolean
}>()
</script>

<template>
  <div class="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <ComboboxInput
      :placeholder="placeholder"
      :disabled="disabled"
      :class="
        cn(
          'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          props.class
        )
      "
    />
  </div>
</template>
