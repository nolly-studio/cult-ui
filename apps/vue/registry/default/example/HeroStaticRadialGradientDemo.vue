<script setup lang="ts">
import {
  AISDKIcon,
  HeroStaticRadialGradient,
  HeroStaticRadialGradientActions,
  HeroStaticRadialGradientBadges,
  HeroStaticRadialGradientContainer,
  HeroStaticRadialGradientContent,
  HeroStaticRadialGradientDescription,
  HeroStaticRadialGradientHeading,
  HeroStaticRadialGradientMobileVisual,
  HeroStaticRadialGradientRoot,
  HeroStaticRadialGradientVisual,
  NextjsIcon,
} from '../ui/hero-static-radial-gradient'
</script>

<template>
  <div class="space-y-16">
    <div class="space-y-4">
      <h3 class="font-medium text-lg">Default</h3>
      <HeroStaticRadialGradient />
    </div>

    <div class="space-y-4">
      <h3 class="font-medium text-lg">Configured Via Props</h3>
      <HeroStaticRadialGradientRoot
        :cta-props="{ href: '#', label: 'Try NewCopy for marketing' }"
        description="Human-in-the-loop marketing copy software that helps teams draft, review, and ship high-converting campaigns with confidence."
        :desktop-shader-props="{
          width: 1280, height: 720,
          colors: ['#ed40b3', '#adfa1e', '#6ef7cc'],
          colorBack: '#ffffff00', radius: 0.98, focalDistance: 0, focalAngle: 0,
          falloff: 0.9, mixing: 0.7, distortion: 0, distortionShift: 0,
          distortionFreq: 12, grainMixer: 1, grainOverlay: 0.5,
        }"
        :mobile-shader-props="{
          colors: ['#ed40b3', '#adfa1e', '#6ef7cc'],
          colorBack: '#ffffff00', radius: 0.98, focalDistance: 0, focalAngle: 0,
          falloff: 0.9, mixing: 0.7, distortion: 0, distortionShift: 0,
          distortionFreq: 12, grainMixer: 1, grainOverlay: 0.5,
        }"
        sr-title="Composable hero"
        subtitle="Marketing"
        :tech-stack="[
          { name: 'Next.js', version: 'v16' },
          { name: 'AI SDK', version: 'v6' },
          { name: 'Tailwind', version: 'v4' },
        ]"
        title="Cursor for"
      >
        <HeroStaticRadialGradientContainer>
          <HeroStaticRadialGradientContent>
            <HeroStaticRadialGradientHeading />
            <HeroStaticRadialGradientDescription />
            <HeroStaticRadialGradientActions />
            <div class="flex justify-center lg:justify-start" data-slot="hero-static-radial-gradient-badges-wrap">
              <HeroStaticRadialGradientBadges
                :tech-stack="[
                  { name: 'Next.js', version: 'v16', icon: NextjsIcon },
                  { name: 'AI SDK', version: 'v6', icon: AISDKIcon },
                ]"
              />
            </div>
          </HeroStaticRadialGradientContent>
          <HeroStaticRadialGradientVisual />
        </HeroStaticRadialGradientContainer>
        <HeroStaticRadialGradientMobileVisual />
      </HeroStaticRadialGradientRoot>
    </div>
  </div>
</template>
