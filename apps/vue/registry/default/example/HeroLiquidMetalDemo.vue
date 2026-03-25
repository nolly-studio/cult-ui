<script setup lang="ts">
import {
  AISDKIcon,
  HeroLiquidMetal,
  HeroLiquidMetalActions,
  HeroLiquidMetalBadges,
  HeroLiquidMetalContainer,
  HeroLiquidMetalContent,
  HeroLiquidMetalDescription,
  HeroLiquidMetalHeading,
  HeroLiquidMetalMobileVisual,
  HeroLiquidMetalRoot,
  HeroLiquidMetalVisual,
  NextjsIcon,
} from '../ui/hero-liquid-metal'
</script>

<template>
  <div class="space-y-16">
    <div class="space-y-4">
      <h3 class="font-medium text-lg flex items-center justify-center">Default</h3>
      <HeroLiquidMetal />
    </div>

    <div class="space-y-4">
      <h3 class="font-medium text-lg flex items-center justify-center">Root-level shader props</h3>
      <HeroLiquidMetal
        :width="1280"
        :height="720"
        image="https://shaders.paper.design/images/logos/diamond.svg"
        color-back="#ffffff00"
        color-tint="#2c5d72"
        :repetition="6"
        :softness="0.8"
        :shift-red="1"
        :shift-blue="-1"
        :distortion="0.4"
        :contour="0.4"
        :angle="0"
        :speed="1"
        :scale="0.6"
        fit="contain"
      />
    </div>

    <div class="space-y-4">
      <h3 class="font-medium text-lg flex items-center justify-center">Configured via props</h3>
      <HeroLiquidMetalRoot
        :cta-props="{ href: '#', label: 'Try NewCopy for marketing' }"
        description="Human-in-the-loop marketing copy software that helps teams draft, review, and ship high-converting campaigns with confidence."
        :desktop-shader-props="{
          scale: 0.8, speed: 0.7, repetition: 7, softness: 0.9,
          distortion: 0.3, colorTint: '#4f46e5',
        }"
        image="https://shaders.paper.design/images/logos/diamond.svg"
        :mobile-shader-props="{ speed: 0.65, scale: 0.78, colorTint: '#0ea5e9' }"
        sr-title="Composable hero"
        subtitle="Marketing"
        :tech-stack="[
          { name: 'Next.js', version: 'v16' },
          { name: 'AI SDK', version: 'v6' },
          { name: 'Tailwind', version: 'v4' },
        ]"
        title="Cursor for"
      >
        <HeroLiquidMetalContainer>
          <HeroLiquidMetalContent>
            <HeroLiquidMetalHeading />
            <HeroLiquidMetalDescription />
            <HeroLiquidMetalActions />
            <div class="hidden lg:flex justify-center lg:justify-start" data-slot="hero-liquid-metal-badges-wrap">
              <HeroLiquidMetalBadges
                :tech-stack="[
                  { name: 'Next.js', version: 'v16', icon: NextjsIcon },
                  { name: 'AI SDK', version: 'v6', icon: AISDKIcon },
                ]"
              />
            </div>
          </HeroLiquidMetalContent>
          <HeroLiquidMetalVisual />
        </HeroLiquidMetalContainer>
        <HeroLiquidMetalMobileVisual />
      </HeroLiquidMetalRoot>
    </div>
  </div>
</template>
