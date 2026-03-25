<script setup lang="ts">
import { siteConfig } from "~/config/site"
</script>

<template>
  <footer class="py-6 md:px-8 md:py-0">
    <div
      class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row"
    >
      <p
        class="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left"
      >
        Built by
        <a
          :href="siteConfig.links.twitter"
          target="_blank"
          rel="noreferrer"
          class="font-medium underline underline-offset-4"
        >
          Jordan-Gilliam </a
        >. The source code is available on
        <a
          :href="siteConfig.links.github"
          target="_blank"
          rel="noreferrer"
          class="font-medium underline underline-offset-4"
        >
          GitHub </a
        >.
      </p>
    </div>
  </footer>
</template>
