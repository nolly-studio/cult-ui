<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import type { SidebarNavItem } from '@/types/nav'

import { docsConfig } from '@/config/docs'
import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const route = useRoute()
const containerRef = ref<HTMLDivElement | null>(null)

function getIsActive(pathname: string | null, href?: string): boolean {
  if (!pathname || !href) {
    return false
  }

  if (href === '/docs') {
    return pathname === href
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

function scrollToActive() {
  if (!route.path) return

  const activeLink = containerRef.value?.querySelector<HTMLElement>(
    '[data-sidebar-active="true"]'
  )
  if (!activeLink) return

  requestAnimationFrame(() => {
    activeLink.scrollIntoView({
      block: 'center',
      inline: 'nearest',
    })
  })
}

onMounted(() => {
  nextTick(scrollToActive)
})

watch(() => route.path, () => {
  nextTick(scrollToActive)
})
</script>

<template>
  <Sidebar class="sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-7rem)] overscroll-none bg-transparent lg:flex">
    <div class="h-(--top-spacing) shrink-0" />
    <div class="relative mt-2 h-full overflow-hidden">
      <div class="pointer-events-none absolute -top-1 z-20 h-8 w-(--sidebar-menu-width) shrink-0 bg-linear-to-b from-background via-background/80 to-background/50 blur-xs" />
      <div class="pointer-events-none absolute bottom-8 z-20 h-8 w-(--sidebar-menu-width) shrink-0 bg-linear-to-t from-background via-background/80 to-background/50 blur-xs" />
      <div class="absolute top-12 right-0 bottom-0 hidden h-full w-px bg-linear-to-b from-transparent via-border to-transparent lg:flex" />
      <SidebarContent
        ref="containerRef"
        class="mx-auto no-scrollbar w-(--sidebar-menu-width) overflow-x-hidden px-2 pb-2 h-[calc(100svh-10rem)]"
      >
        <SidebarGroup
          v-for="(section, index) in docsConfig.sidebarNav"
          :key="`${section.title}-${index}`"
          class="pt-6 first:pt-6"
        >
          <SidebarGroupLabel class="px-2 text-[1rem] font-semibold font-pixel-square uppercase tracking-wide text-foreground">
            {{ section.title }}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <DocsSidebarItems :items="section.items" :pathname="route.path" />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </div>
  </Sidebar>
</template>

<script lang="ts">
// Child component defined inline for recursive usage
import { defineComponent, h, type PropType } from 'vue'

const LabelBadge = defineComponent({
  name: 'LabelBadge',
  props: {
    label: { type: String, default: undefined },
  },
  setup(props) {
    return () => {
      if (!props.label) return null

      const classMap: Record<string, string> = {
        new: 'rounded-sm border border-black bg-[#adfa1d] px-1.5 py-0.5 text-[10px] leading-none text-black',
        recent: 'rounded-sm border border-black bg-cyan-200 px-1.5 py-0.5 text-[10px] leading-none text-black',
        updated: 'rounded-sm border border-black bg-pink-400 px-1.5 py-0.5 text-[10px] leading-none text-black',
      }

      const cls = classMap[props.label] ?? 'rounded-sm bg-muted px-1.5 py-0.5 text-[10px] leading-none text-foreground'

      return h('span', { class: cls }, props.label)
    }
  },
})

const DocsSidebarItems = defineComponent({
  name: 'DocsSidebarItems',
  props: {
    items: { type: Array as PropType<SidebarNavItem[]>, required: true },
    pathname: { type: String as PropType<string | null>, default: null },
    depth: { type: Number, default: 0 },
  },
  components: { LabelBadge },
  setup() {
    function getIsActive(pathname: string | null, href?: string): boolean {
      if (!pathname || !href) return false
      if (href === '/docs') return pathname === href
      return pathname === href || pathname.startsWith(`${href}/`)
    }
    return { getIsActive, cn }
  },
  template: `
    <SidebarMenu :class="cn(depth > 0 && 'pl-[2px]')">
      <SidebarMenuItem v-for="(item, index) in items" :key="item.title + '-' + index">
        <template v-if="item.href && !item.disabled">
          <SidebarMenuButton
            as-child
            :is-active="getIsActive(pathname, item.href)"
            :class="cn(
              'justify-between',
              depth > 0 && 'h-7 text-[0.75rem]',
              item.external && 'pr-3'
            )"
          >
            <NuxtLink
              :to="item.href"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noreferrer' : undefined"
              :data-sidebar-active="getIsActive(pathname, item.href) ? 'true' : undefined"
            >
              <span class="truncate">{{ item.title }}</span>
              <LabelBadge :label="item.label" />
            </NuxtLink>
          </SidebarMenuButton>
        </template>
        <template v-else>
          <div
            :class="cn(
              'flex h-8 items-center justify-between rounded-md px-2 text-[1rem] font-medium font-pixel-square text-foreground',
              depth > 0 && 'h-7 text-[0.75rem]'
            )"
          >
            <span class="truncate">{{ item.title }}</span>
            <LabelBadge :label="item.label" />
          </div>
        </template>

        <DocsSidebarItems
          v-if="item.items && item.items.length > 0"
          :items="item.items"
          :pathname="pathname"
          :depth="depth + 1"
        />
      </SidebarMenuItem>
    </SidebarMenu>
  `,
})

export default {}
</script>
