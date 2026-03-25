<script setup lang="ts">
import ThemeWrapper from '@/components/theme/ThemeWrapper.vue'
import ThemeCustomizer from '@/components/theme/ThemeCustomizer.vue'
import ThemesTabs from '@/components/theme/ThemesTabs.vue'

useHead({
  title: 'Themes',
  meta: [
    { name: 'description', content: 'Hand-picked themes that you can copy and paste into your apps.' },
  ],
})
</script>

<template>
  <div class="container">
    <ThemeWrapper
      default-theme="zinc"
      class="relative flex flex-col items-start md:flex-row md:items-center"
    >
      <div class="flex-1 space-y-4 py-8">
        <h1 class="hidden text-3xl font-bold leading-tight tracking-tighter md:block md:text-4xl lg:leading-[1.1]">
          Add colors. Make it yours.
        </h1>
        <h1 class="text-3xl font-bold leading-tight tracking-tighter md:hidden">
          Make it yours
        </h1>
        <p class="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Hand-picked themes that you can copy and paste into your apps.
        </p>
        <div class="flex w-full items-center space-x-4 py-4 md:pb-10">
          <ThemeCustomizer />
        </div>
      </div>
    </ThemeWrapper>
    <ThemesTabs />
  </div>
</template>
