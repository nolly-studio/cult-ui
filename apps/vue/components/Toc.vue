<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { cn } from '@/lib/utils'

interface TocItem {
  url: string
  title: string
  items?: TocItem[]
}

interface TableOfContents {
  items?: TocItem[]
}

interface Props {
  toc: TableOfContents
}

const props = defineProps<Props>()

const mounted = ref(false)
const activeId = ref<string | null>(null)

const itemIds = computed(() => {
  if (!props.toc.items) return []
  return props.toc.items
    .flatMap((item) => [item.url, ...(item.items?.map((sub) => sub.url) ?? [])])
    .filter(Boolean)
    .map((id) => id?.split('#')[1])
})

let observer: IntersectionObserver | null = null

function setupObserver() {
  if (observer) observer.disconnect()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      })
    },
    { rootMargin: '0% 0% -80% 0%' }
  )

  itemIds.value?.forEach((id) => {
    if (!id) return
    const element = document.getElementById(id)
    if (element) observer!.observe(element)
  })
}

watch(itemIds, () => {
  if (mounted.value) setupObserver()
})

onMounted(() => {
  mounted.value = true
  setupObserver()
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div v-if="toc?.items && mounted" class="space-y-2">
    <p class="font-medium">On This Page</p>
    <TocTree :tree="toc" :active-item="activeId ?? undefined" />
  </div>
</template>

<!-- Recursive Tree sub-component defined inline via a separate SFC would be ideal,
     but for self-containment we use a render-based approach below -->
<script lang="ts">
import { defineComponent, h, type PropType } from 'vue'

const TocTree = defineComponent({
  name: 'TocTree',
  props: {
    tree: { type: Object as PropType<TableOfContents>, required: true },
    level: { type: Number, default: 1 },
    activeItem: { type: String, default: undefined },
  },
  setup(props) {
    return () => {
      if (!props.tree?.items?.length || props.level >= 3) return null

      return h(
        'ul',
        { class: cn('m-0 list-none', { 'pl-4': props.level !== 1 }) },
        props.tree.items.map((item, index) =>
          h('li', { key: index, class: cn('mt-0 pt-2') }, [
            h(
              'a',
              {
                href: item.url,
                class: cn(
                  'inline-block no-underline transition-colors hover:text-foreground',
                  item.url === `#${props.activeItem}`
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground'
                ),
              },
              item.title
            ),
            item.items?.length
              ? h(TocTree, {
                  tree: item,
                  level: props.level + 1,
                  activeItem: props.activeItem,
                })
              : null,
          ])
        )
      )
    }
  },
})
</script>
