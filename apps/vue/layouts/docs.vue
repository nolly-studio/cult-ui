<script setup lang="ts">
</script>

<template>
  <div>
    <SiteHeader>
      <template #github-link>
        <slot name="github-link" />
      </template>
    </SiteHeader>
    <main class="flex-1">
      <div class="container-wrapper flex flex-1 flex-col px-2">
        <div
          class="min-h-min flex-1 items-start px-0 lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)]"
          :style="{
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 24)',
          }"
        >
          <slot name="sidebar" />
          <div class="h-full w-full">
            <slot />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
