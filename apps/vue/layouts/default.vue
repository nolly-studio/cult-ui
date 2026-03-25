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
      <slot />
    </main>
  </div>
</template>
