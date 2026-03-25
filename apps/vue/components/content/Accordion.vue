<script setup lang="ts">
import UiAccordion from '@/components/ui/Accordion.vue'
</script>

<template>
  <UiAccordion type="multiple" class="divide-y">
    <slot />
  </UiAccordion>
</template>
