<script setup lang="ts">
defineProps<{
  label?: string
  items?: Array<{ text: string; href: string }>
}>()
</script>

<template>
  <div class="citations my-4 rounded-md border p-4 text-sm">
    <p v-if="label" class="font-medium text-primary mb-2">{{ label }}</p>
    <ul v-if="items" class="list-disc pl-4 space-y-1">
      <li v-for="item in items" :key="item.href">
        <a :href="item.href" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">
          {{ item.text }}
        </a>
      </li>
    </ul>
    <slot />
  </div>
</template>
