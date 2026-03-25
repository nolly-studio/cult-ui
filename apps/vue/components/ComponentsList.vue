<script setup lang="ts">
import { source } from '@/lib/source'

const components = computed(() => {
  const folder = source.pageTree.children.find(
    (page: any) => page.$id === 'components'
  )
  if (folder?.type !== 'folder') return []
  return folder.children.filter((component: any) => component.type === 'page')
})
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
    <NuxtLink
      v-for="component in components"
      :key="component.$id"
      :to="component.url"
      class="text-lg font-medium underline-offset-4 hover:underline md:text-base"
    >
      {{ component.name }}
    </NuxtLink>
  </div>
</template>
