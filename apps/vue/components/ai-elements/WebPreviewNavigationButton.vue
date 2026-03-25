<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

defineOptions({ name: "WebPreviewNavigationButton" })

const props = defineProps<{
  tooltip?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          class="h-8 w-8 p-0 hover:text-foreground"
          :disabled="disabled"
          size="sm"
          variant="ghost"
          @click="emit('click', $event)"
        >
          <slot />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
