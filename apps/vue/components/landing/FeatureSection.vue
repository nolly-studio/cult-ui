<script setup lang="ts">
// FeatureSection — placeholder since it depends on heavy React-specific components
// (GradientHeading, FeatureCarousel, react-wrap-balancer) that aren't yet converted.
</script>

<template>
  <section class="relative w-full overflow-hidden" id="features">
    <div class="p-2">
      <div class="mb-4 pt-4 md:container">
        <div class="mx-auto">
          <div class="mt-1 w-full gap-3 pb-12 pt-8 text-center sm:px-0">
            <div class="mt-2 px-4 text-6xl font-bold tracking-tight text-white dark:text-neutral-100/90">
              <h2 class="bg-gradient-to-r from-neutral-800 to-neutral-400 bg-clip-text text-transparent dark:from-neutral-100 dark:to-neutral-400">
                Tailwind + Motion + Vue
              </h2>
            </div>
            <p class="mt-2 text-xl font-bold leading-5 text-neutral-700 md:text-3xl md:leading-7">
              Everything you need to ship
            </p>
          </div>

          <div class="relative z-10 grid w-full gap-8" />

          <div class="rounded-[34px] bg-neutral-700 p-2">
            <div class="relative z-10 grid w-full gap-8 rounded-[28px] bg-neutral-950 p-2">
              <!-- FeatureCarousel placeholder -->
              <div class="flex h-64 items-center justify-center text-neutral-400">
                Feature Carousel — coming soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
