<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { docsConfig } from '@/config/docs'
import type { NavItem, NavItemWithChildren } from '@/types/nav'

interface DocsPagerProps {
  doc: {
    slug: string
    title: string
  }
}

const props = defineProps<DocsPagerProps>()

function flatten(links: NavItemWithChildren[]): NavItem[] {
  return links
    .reduce<NavItem[]>((flat, link) => {
      return flat.concat(link.items?.length ? flatten(link.items) : link)
    }, [])
    .filter((link) => !link?.disabled)
}

function getPagerForDoc(doc: { slug: string; title: string }) {
  const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null]
  const activeIndex = flattenedLinks.findIndex(
    (link) => `/docs/${doc.slug}` === link?.href
  )
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null
  return { prev, next }
}

const pager = computed(() => getPagerForDoc(props.doc))
</script>

<template>
  <div v-if="pager" class="flex flex-row items-center justify-between">
    <NuxtLink
      v-if="pager.prev?.href"
      :to="pager.prev.href"
      :class="buttonVariants({ variant: 'outline' })"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        class="mr-2 size-4"
      >
        <path
          d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        />
      </svg>
      {{ pager.prev.title }}
    </NuxtLink>
    <NuxtLink
      v-if="pager.next?.href"
      :to="pager.next.href"
      :class="cn(buttonVariants({ variant: 'outline' }), 'ml-auto')"
    >
      {{ pager.next.title }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        class="ml-2 size-4"
      >
        <path
          d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.56501 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        />
      </svg>
    </NuxtLink>
  </div>
</template>
