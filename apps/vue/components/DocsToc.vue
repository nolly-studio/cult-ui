<script setup lang="ts">
import { cn } from '@/lib/utils'

interface TocItem {
  title: string
  url: string
  children?: Array<{
    title: string
    url: string
  }>
}

defineProps<{
  toc: TocItem[]
}>()
</script>

<template>
  <div class="space-y-2">
    <h4 class="text-sm font-medium">On this page</h4>
    <ul class="space-y-1">
      <li v-for="item in toc" :key="item.url">
        <a
          :href="item.url"
          :class="cn(
            'block text-sm text-muted-foreground hover:text-foreground transition-colors'
          )"
        >
          {{ item.title }}
        </a>
        <ul v-if="item.children" class="ml-4 mt-1 space-y-1">
          <li v-for="child in item.children" :key="child.url">
            <a
              :href="child.url"
              :class="cn(
                'block text-sm text-muted-foreground hover:text-foreground transition-colors'
              )"
            >
              {{ child.title }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
