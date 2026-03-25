<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { siteConfig } from "~/config/site"
import { cn } from "~/lib/utils"

const route = useRoute()
const isDocs = computed(() => route.path.includes("/docs"))
</script>

<template>
  <header
    :class="
      cn(
        'sticky top-0 z-50 w-full',
        isDocs
          ? '-mb-12 bg-[#FAFAFA] backdrop-blur supports-[backdrop-filter]:bg-background dark:bg-background lg:backdrop-blur-xl'
          : '-mb-14',
      )
    "
  >
    <div class="flex h-14 items-center px-2">
      <MainNav />
      <MobileNav />
      <div class="flex flex-1 items-center justify-between space-x-2 justify-end">
        <nav class="flex items-center">
          <slot name="github-link">
            <a
              :href="siteConfig.links.github"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 px-0"
            >
              <span class="sr-only">GitHub</span>
            </a>
          </slot>
          <a
            :href="siteConfig.links.twitter"
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 px-0"
          >
            <span class="sr-only">Twitter</span>
          </a>
        </nav>
      </div>
    </div>
  </header>
</template>
