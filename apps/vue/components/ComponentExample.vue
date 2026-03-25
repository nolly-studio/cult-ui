<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CopyButton from '@/components/CopyButton.vue'
import CopyWithClassNames from '@/components/CopyWithClassNames.vue'

interface Props {
  extractClassname?: boolean
  extractedClassNames?: string
  align?: 'center' | 'start' | 'end'
  src?: string
  class?: string
  codeString?: string
}

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
})
</script>

<template>
  <div
    :class="cn('group relative my-4 flex flex-col space-y-2', props.class)"
  >
    <Tabs default-value="preview" class="relative mr-auto w-full">
      <div class="flex items-center justify-between pb-3">
        <TabsList class="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="preview"
            class="relative h-9 rounded-none rounded-tl-lg border border-b-2 border-b-transparent border-l-black/10 border-r-transparent border-t-black/10 bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none dark:border-l-white/10 dark:border-t-white/10"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            class="relative h-9 rounded-none rounded-tr-lg border border-b-2 border-b-transparent border-l-transparent border-r-black/10 border-t-black/10 bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none dark:border-r-white/10 dark:border-t-white/10"
          >
            Code
          </TabsTrigger>
        </TabsList>
        <CopyWithClassNames
          v-if="extractedClassNames"
          :value="codeString"
          :class-names="extractedClassNames"
          class="absolute right-4 top-20"
        />
        <CopyButton
          v-else-if="codeString"
          :value="codeString"
          class="absolute right-4 top-20"
        />
      </div>
      <TabsContent value="preview" class="rounded-md border">
        <div
          :class="cn('flex min-h-[350px] justify-center p-2 md:p-10', {
            'items-center': align === 'center',
            'items-start': align === 'start',
            'items-end': align === 'end',
          })"
        >
          <slot name="example" />
        </div>
      </TabsContent>
      <TabsContent value="code">
        <div class="flex flex-col space-y-4">
          <div class="w-full rounded-md [&_button]:hidden [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
            <slot name="code" />
          </div>
          <div
            v-if="$slots.extra"
            class="rounded-md [&_button]:hidden [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto"
          >
            <slot name="extra" />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>
