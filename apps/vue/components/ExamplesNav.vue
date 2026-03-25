<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface Props {
  class?: string
}

const props = defineProps<Props>()

const route = useRoute()

const examples = [
  {
    name: 'Mail',
    href: '/examples/mail',
    code: 'https://github.com/Jordan-Gilliam/ui/tree/main/apps/www/app/(app)/examples/mail',
  },
  {
    name: 'Dashboard',
    href: '/examples/dashboard',
    code: 'https://github.com/Jordan-Gilliam/ui/tree/main/apps/www/app/(app)/examples/dashboard',
  },
  {
    name: 'Cards',
    href: '/examples/cards',
    code: 'https://github.com/Jordan-Gilliam/ui/tree/main/apps/www/app/(app)/examples/cards',
  },
  {
    name: 'Tasks',
    href: '/examples/tasks',
    code: 'https://github.com/Jordan-Gilliam/ui/tree/main/apps/www/app/(app)/examples/tasks',
  },
  {
    name: 'Playground',
    href: '/examples/playground',
    code: 'https://github.com/Jordan-Gilliam/ui/tree/main/apps/www/app/(app)/examples/playground',
  },
  {
    name: 'Forms',
    href: '/examples/forms',
    code: 'https://github.com/Jordan-Gilliam/ui/tree/main/apps/www/app/(app)/examples/forms',
  },
  {
    name: 'Music',
    href: '/examples/music',
    code: 'https://github.com/Jordan-Gilliam/ui/tree/main/apps/www/app/(app)/examples/music',
  },
  {
    name: 'Authentication',
    href: '/examples/authentication',
    code: 'https://github.com/Jordan-Gilliam/ui/tree/main/apps/www/app/(app)/examples/authentication',
  },
]
</script>

<template>
  <div class="relative">
    <ScrollArea class="max-w-[600px] lg:max-w-none">
      <div :class="cn('mb-4 flex items-center', props.class)">
        <NuxtLink
          v-for="(example, index) in examples"
          :key="example.href"
          :to="example.href"
          :class="cn(
            'flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary',
            route.path?.startsWith(example.href) || (index === 0 && route.path === '/')
              ? 'bg-muted font-medium text-primary'
              : 'text-muted-foreground'
          )"
        >
          {{ example.name }}
        </NuxtLink>
      </div>
      <ScrollBar orientation="horizontal" class="invisible" />
    </ScrollArea>
  </div>
</template>
