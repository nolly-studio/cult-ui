<script setup lang="ts">
import { cn } from "@/lib/utils"
import { Trash2Icon } from "lucide-vue-next"
import Button from "@/components/ui/Button.vue"
import { useTerminal } from "./terminal-utils"

defineOptions({ name: "TerminalClearButton" })

const props = defineProps<{
  class?: string
}>()

const { onClear } = useTerminal()
</script>

<template>
  <Button
    v-if="onClear"
    :class="cn(
      'size-7 shrink-0 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100',
      props.class
    )"
    size="icon"
    variant="ghost"
    @click="onClear"
  >
    <slot>
      <Trash2Icon :size="14" />
    </slot>
  </Button>
</template>
