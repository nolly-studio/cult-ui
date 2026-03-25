<script setup lang="ts">
import type { SidebarNavItem } from "~/types/nav"
import { cn } from "~/lib/utils"

defineProps<{
  items: SidebarNavItem[]
  pathname: string
}>()

const LABEL_BASE = "ml-2 rounded-sm px-1.5 py-0.5 text-xs leading-none no-underline group-hover:no-underline"

const LABEL_COLORS: Record<string, string> = {
  new: `${LABEL_BASE} border border-black bg-[#adfa1d] text-[#000000]`,
  recent: `${LABEL_BASE} border border-black bg-cyan-200 text-[#000000]`,
  updated: `${LABEL_BASE} border border-black bg-pink-400 text-[#000000]`,
}

const LABEL_DEFAULT = "ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline"

function labelClass(label: string) {
  return LABEL_COLORS[label] ?? LABEL_DEFAULT
}
</script>

<template>
  <div class="grid grid-flow-row auto-rows-max text-sm">
    <template v-for="(item, index) in items" :key="`${item.title}-${index}`">
      <!-- Item with children (nested group) -->
      <div v-if="item.items && item.items.length > 0">
        <span
          class="flex w-full cursor-default items-center rounded-md p-2 text-xs font-medium text-muted-foreground"
        >
          {{ item.title }}
        </span>
        <div class="ml-3 border-l border-border pl-3">
          <SidebarNavItems :items="item.items" :pathname="pathname" />
        </div>
      </div>

      <!-- Linked item -->
      <NuxtLink
        v-else-if="item.href && !item.disabled"
        :to="item.href"
        :target="item.external ? '_blank' : undefined"
        :rel="item.external ? 'noreferrer' : undefined"
        :data-sidebar-active="pathname === item.href ? 'true' : undefined"
        :class="
          cn(
            'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline',
            item.disabled && 'cursor-not-allowed opacity-60',
            pathname === item.href
              ? 'font-medium text-foreground'
              : 'text-muted-foreground',
          )
        "
      >
        {{ item.title }}
        <span
          v-if="item.label"
          :class="labelClass(item.label)"
        >
          {{ item.label }}
        </span>
      </NuxtLink>

      <!-- Disabled item -->
      <span
        v-else
        :class="
          'flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground opacity-60'
        "
      >
        {{ item.title }}
        <span
          v-if="item.label"
          :class="labelClass(item.label!)"
        >
          {{ item.label }}
        </span>
      </span>
    </template>
  </div>
</template>
