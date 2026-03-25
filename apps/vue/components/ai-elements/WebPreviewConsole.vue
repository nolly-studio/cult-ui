<script setup lang="ts">
import { inject, type InjectionKey } from "vue"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon } from "lucide-vue-next"

defineOptions({ name: "WebPreviewConsole" })

interface WebPreviewContextValue {
  url: string
  setUrl: (url: string) => void
  consoleOpen: boolean
  setConsoleOpen: (open: boolean) => void
}

interface ConsoleLog {
  level: "log" | "warn" | "error"
  message: string
  timestamp: Date
}

const webPreviewKey = Symbol.for("webPreview") as InjectionKey<WebPreviewContextValue>

const context = inject(webPreviewKey)

if (!context) {
  throw new Error("WebPreviewConsole must be used within WebPreview")
}

const props = withDefaults(defineProps<{
  logs?: ConsoleLog[]
  class?: string
}>(), {
  logs: () => [],
})
</script>

<template>
  <Collapsible
    :class="cn('border-t bg-muted/50 font-mono text-sm', props.class)"
    :open="context.consoleOpen"
    @update:open="context.setConsoleOpen"
  >
    <CollapsibleTrigger as-child>
      <Button
        class="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-muted/50"
        variant="ghost"
      >
        Console
        <ChevronDownIcon
          :class="cn(
            'h-4 w-4 transition-transform duration-200',
            context.consoleOpen && 'rotate-180'
          )"
        />
      </Button>
    </CollapsibleTrigger>
    <CollapsibleContent
      :class="cn(
        'px-4 pb-4',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in'
      )"
    >
      <div class="max-h-48 space-y-1 overflow-y-auto">
        <p v-if="logs.length === 0" class="text-muted-foreground">No console output</p>
        <div
          v-for="(log, index) in logs"
          :key="`${log.timestamp.getTime()}-${index}`"
          :class="cn(
            'text-xs',
            log.level === 'error' && 'text-destructive',
            log.level === 'warn' && 'text-yellow-600',
            log.level === 'log' && 'text-foreground'
          )"
        >
          <span class="text-muted-foreground">{{ log.timestamp.toLocaleTimeString() }}</span>
          {{ ' ' }}{{ log.message }}
        </div>
        <slot />
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
