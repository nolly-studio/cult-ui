<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Props {
  class?: string
  align?: 'center' | 'start' | 'end'
  hideCode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  hideCode: false,
})

const tab = ref('preview')
</script>

<template>
  <div
    :class="cn('group relative mt-4 mb-12 flex flex-col gap-2', props.class)"
  >
    <Tabs
      v-model="tab"
      class="relative mr-auto w-full"
    >
      <div class="flex items-center justify-between">
        <TabsList v-if="!hideCode">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
    <div
      :data-tab="tab"
      class="data-[tab=code]:border-code relative rounded-lg border md:-mx-1"
    >
      <div v-if="tab === 'preview'" data-slot="preview">
        <div
          :data-align="align"
          :class="cn(
            'preview flex overflow-y-auto min-h-[650px] w-full justify-center md:p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start',
          )"
        >
          <slot name="component" />
        </div>
      </div>
      <div v-else data-slot="code" class="overflow-auto **:[figure]:!m-0">
        <slot name="source" />
      </div>
    </div>
  </div>
</template>
