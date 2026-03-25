<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { useConfig } from '@/composables/use-config'
import { useLiftMode } from '@/composables/use-lift-mode'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import BlockToolbar from '@/components/BlockToolbar.vue'
import { Icons } from '@/components/Icons'
import type { Block } from '@/registry/schema'

const props = defineProps<{
  block: Block & { hasLiftMode: boolean }
}>()

const [config] = useConfig()
const { isLiftMode } = useLiftMode(props.block.name)
const isLoading = ref(true)
const panelRef = ref<InstanceType<typeof ResizablePanel> | null>(null)
</script>

<template>
  <Tabs
    v-if="config.style === block.style"
    :id="block.name"
    default-value="preview"
    class="relative grid w-full scroll-m-20 gap-4"
    :style="{ '--container-height': block.container?.height } as any"
  >
    <BlockToolbar :block="block" :resizable-panel-ref="panelRef" />
    <TabsContent
      value="preview"
      class="relative after:absolute after:inset-0 after:right-3 after:z-0 after:rounded-lg after:bg-muted"
    >
      <ResizablePanelGroup direction="horizontal" class="relative z-10">
        <ResizablePanel
          ref="panelRef"
          :class="cn(
            'relative rounded-lg border bg-background',
            isLiftMode ? 'border-border/50' : 'border-border'
          )"
          :default-size="100"
          :min-size="30"
        >
          <div
            v-if="isLoading"
            class="absolute inset-0 z-10 flex h-[--container-height] w-full items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <component :is="Icons.spinner" class="size-4 animate-spin" />
            Loading...
          </div>
          <iframe
            :src="`/blocks/${block.style}/${block.name}`"
            :height="block.container?.height"
            class="chunk-mode relative z-20 w-full bg-background"
            @load="isLoading = false"
          />
        </ResizablePanel>
        <ResizableHandle
          :class="cn(
            'relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-x-px after:-translate-y-1/2 after:rounded-full after:bg-border after:transition-all after:hover:h-10 sm:block',
            isLiftMode && 'invisible'
          )"
        />
        <ResizablePanel :default-size="0" :min-size="0" />
      </ResizablePanelGroup>
    </TabsContent>
    <TabsContent value="code">
      <div
        data-rehype-pretty-code-fragment
        v-html="block.highlightedCode"
        class="w-full overflow-hidden rounded-md [&_pre]:my-0 [&_pre]:h-[--container-height] [&_pre]:overflow-auto [&_pre]:whitespace-break-spaces [&_pre]:p-6 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
      />
    </TabsContent>
  </Tabs>
</template>
