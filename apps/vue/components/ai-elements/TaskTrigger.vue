<script setup lang="ts">
import { cn } from "@/lib/utils"
import { CollapsibleTrigger } from "radix-vue"
import { SearchIcon, ChevronDownIcon } from "lucide-vue-next"

defineOptions({ name: "TaskTrigger" })

const props = defineProps<{
  class?: string
  title: string
}>()
</script>

<template>
  <CollapsibleTrigger as-child :class="cn('group', props.class)">
    <slot>
      <div class="flex w-full cursor-pointer items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground">
        <SearchIcon class="size-4" />
        <p class="text-sm">{{ props.title }}</p>
        <ChevronDownIcon class="size-4 transition-transform group-data-[state=open]:rotate-180" />
      </div>
    </slot>
  </CollapsibleTrigger>
</template>
