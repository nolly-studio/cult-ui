<script setup lang="ts">
import UiAccordionItem from '@/components/ui/AccordionItem.vue'
import UiAccordionTrigger from '@/components/ui/AccordionTrigger.vue'
import UiAccordionContent from '@/components/ui/AccordionContent.vue'

defineProps<{
  value: string
  title: string
}>()
</script>

<template>
  <UiAccordionItem :value="value">
    <UiAccordionTrigger>{{ title }}</UiAccordionTrigger>
    <UiAccordionContent>
      <slot />
    </UiAccordionContent>
  </UiAccordionItem>
</template>
