<script setup lang="ts">
import { computed, ref, onMounted, nextTick, watch } from "vue"
import { useRoute } from "vue-router"
import type { SidebarNavItem } from "~/types/nav"
import { cn } from "~/lib/utils"

const props = defineProps<{
  items: SidebarNavItem[]
}>()

const route = useRoute()
const pathname = computed(() => route.path)
const containerRef = ref<HTMLDivElement | null>(null)

function scrollToActive() {
  if (!containerRef.value) return
  const activeLink = containerRef.value.querySelector<HTMLElement>(
    '[data-sidebar-active="true"]',
  )
  if (!activeLink) return
  requestAnimationFrame(() => {
    activeLink.scrollIntoView({ block: "center", inline: "nearest" })
  })
}

onMounted(scrollToActive)
watch(pathname, () => nextTick(scrollToActive))
</script>

<template>
  <div v-if="items.length" ref="containerRef" class="w-full">
    <div
      v-for="(item, index) in items"
      :key="`${item.title}-${index}`"
      class="pb-4"
    >
      <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
        {{ item.title }}
      </h4>
      <SidebarNavItems
        v-if="item.items?.length"
        :items="item.items"
        :pathname="pathname"
      />
    </div>
  </div>
</template>
