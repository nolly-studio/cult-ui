<script setup lang="ts">
defineProps<{
  href: string
}>()
</script>

<template>
  <NuxtLink :to="href" class="linked-card block rounded-lg border p-4 hover:bg-accent transition-colors">
    <slot />
  </NuxtLink>
</template>
