<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/Icons'
import { Skeleton } from '@/components/ui/skeleton'
import { siteConfig } from '@/config/site'

defineProps<{
  className?: string
}>()

const starsCount = ref<string | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const data = await fetch(
      'https://api.github.com/repos/nolly-studio/cult-ui'
    )
    const json = await data.json()
    const count = json.stargazers_count ?? 0
    starsCount.value =
      count >= 1000
        ? `${(count / 1000).toFixed(1)}k`.replace(/\.0$/, '')
        : count.toLocaleString()
  } catch {
    starsCount.value = null
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <NuxtLink
    :href="siteConfig.links.github"
    target="_blank"
    rel="noreferrer"
  >
    <div
      :class="cn(
        buttonVariants({ variant: 'ghost' }),
        'flex items-center gap-1 w-9 px-0 md:w-auto md:px-2',
        className
      )"
    >
      <component :is="Icons.gitHub" class="size-4" />
      <Skeleton v-if="isLoading" class="h-4 w-[42px]" />
      <span
        v-else-if="starsCount"
        class="text-xs text-muted-foreground tabular-nums"
      >
        {{ starsCount }}
      </span>
      <span class="sr-only">GitHub</span>
    </div>
  </NuxtLink>
</template>
