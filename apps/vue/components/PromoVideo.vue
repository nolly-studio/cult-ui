<script setup lang="ts">
import { AspectRatio } from '@/components/ui/aspect-ratio'
</script>

<template>
  <AspectRatio
    :ratio="16 / 9"
    class="overflow-hidden rounded-lg border bg-white shadow-xl"
  >
    <video autoplay muted playsinline>
      <source
        src="https://ui-Jordan-Gilliam.s3.amazonaws.com/ui-promo-hd.mp4"
        type="video/mp4"
      />
    </video>
  </AspectRatio>
</template>
