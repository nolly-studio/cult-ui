<script setup lang="ts">
import {
  AISDKIcon,
  HeroHeatmap,
  HeroHeatmapActions,
  HeroHeatmapBadges,
  HeroHeatmapContainer,
  HeroHeatmapContent,
  HeroHeatmapDescription,
  HeroHeatmapHeading,
  HeroHeatmapMobileVisual,
  HeroHeatmapRoot,
  HeroHeatmapVisual,
  NextjsIcon,
} from '../ui/hero-heatmap'
</script>

<template>
  <div class="space-y-16">
    <div class="space-y-4">
      <h3 class="font-medium text-lg flex items-center justify-center">Default</h3>
      <HeroHeatmap />
    </div>

    <div class="space-y-4">
      <h3 class="font-medium text-lg flex items-center justify-center">Root-level shader props</h3>
      <HeroHeatmap
        :angle="45"
        color-back="#0a0a0a"
        :colors="['#112069', '#1f3ca3', '#367c66', '#adfa1e', '#ffe77a', '#ff9a1f', '#ed40b3']"
        :contour="0.6"
        image="https://shaders.paper.design/images/logos/diamond.svg"
        :inner-glow="0.6"
        :noise="0.1"
        :outer-glow="0.4"
        :scale="0.8"
        :speed="1.2"
        :width="1280"
        :height="720"
      />
    </div>

    <div class="space-y-4">
      <h3 class="font-medium text-lg flex items-center justify-center">Configured via props</h3>
      <HeroHeatmapRoot
        :cta-props="{ href: '#', label: 'Try NewCopy for marketing' }"
        description="Human-in-the-loop marketing copy software that helps teams draft, review, and ship high-converting campaigns with confidence."
        :desktop-shader-props="{ scale: 0.8, speed: 0.7, innerGlow: 0.6, outerGlow: 0.4 }"
        image="https://shaders.paper.design/images/logos/diamond.svg"
        :mobile-shader-props="{ speed: 0.65 }"
        sr-title="Composable hero"
        subtitle="Marketing"
        :tech-stack="[
          { name: 'Next.js', version: 'v16' },
          { name: 'AI SDK', version: 'v6' },
          { name: 'Tailwind', version: 'v4' },
        ]"
        title="Cursor for"
      >
        <HeroHeatmapContainer>
          <HeroHeatmapContent>
            <HeroHeatmapHeading />
            <HeroHeatmapDescription />
            <HeroHeatmapActions />
            <div class="hidden lg:flex justify-center lg:justify-start" data-slot="hero-heatmap-badges-wrap">
              <HeroHeatmapBadges
                :tech-stack="[
                  { name: 'Next.js', version: 'v16', icon: NextjsIcon },
                  { name: 'AI SDK', version: 'v6', icon: AISDKIcon },
                ]"
              />
            </div>
          </HeroHeatmapContent>
          <HeroHeatmapVisual />
        </HeroHeatmapContainer>
        <HeroHeatmapMobileVisual />
      </HeroHeatmapRoot>
    </div>
  </div>
</template>
