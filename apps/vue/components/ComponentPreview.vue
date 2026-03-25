<script setup lang="ts">
import { Index } from '@/registry/__index__'
import ComponentPreviewTabs from '@/components/ComponentPreviewTabs.vue'
import ComponentSource from '@/components/ComponentSource.vue'

interface Props {
  name: string
  type?: 'block' | 'component' | 'example'
  class?: string
  align?: 'center' | 'start' | 'end'
  description?: string
  hideCode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  hideCode: false,
})

const registryEntry = computed(() => Index[props.name])
const Component = computed(() => registryEntry.value?.component)
</script>

<template>
  <p
    v-if="!Component"
    class="text-muted-foreground text-sm"
  >
    Component
    <code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
      {{ name }}
    </code>
    not found in registry.
  </p>

  <div
    v-else-if="type === 'block'"
    class="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border md:-mx-1"
  >
    <img
      :src="`/r/styles/new-york-v4/${name}-light.png`"
      :alt="name"
      width="1440"
      height="900"
      class="bg-background absolute top-0 left-0 z-20 w-[970px] max-w-none sm:w-[1280px] md:hidden dark:hidden md:dark:hidden"
    />
    <img
      :src="`/r/styles/new-york-v4/${name}-dark.png`"
      :alt="name"
      width="1440"
      height="900"
      class="bg-background absolute top-0 left-0 z-20 hidden w-[970px] max-w-none sm:w-[1280px] md:hidden dark:block md:dark:hidden"
    />
    <div class="bg-background absolute inset-0 hidden w-[1600px] md:block">
      <iframe :src="`/view/${name}`" class="size-full" />
    </div>
  </div>

  <ComponentPreviewTabs
    v-else
    :class="props.class"
    :align="align"
    :hide-code="hideCode"
  >
    <template #component>
      <component :is="Component" />
    </template>
    <template #source>
      <ComponentSource :name="name" :collapsible="false" />
    </template>
  </ComponentPreviewTabs>
</template>
