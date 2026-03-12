"use client"

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
} from "../ui/hero-static-radial-gradient"

export default function HeroStaticRadialGradientDemo() {
  return (
    <div className="space-y-16">
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Default</h3>
        <HeroStaticRadialGradient />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-lg">Configured Via Props</h3>
        <HeroStaticRadialGradientRoot
          ctaProps={{
            href: "#",
            label: "Try NewCopy for marketing",
          }}
          description="Human-in-the-loop marketing copy software that helps teams draft, review, and ship high-converting campaigns with confidence."
          desktopShaderProps={{
            width: 1280,
            height: 720,
            colors: ["#ed40b3", "#adfa1e", "#6ef7cc"],
            colorBack: "#ffffff00",
            radius: 0.98,
            focalDistance: 0,
            focalAngle: 0,
            falloff: 0.9,
            mixing: 0.7,
            distortion: 0,
            distortionShift: 0,
            distortionFreq: 12,
            grainMixer: 1,
            grainOverlay: 0.5,
          }}
          mobileShaderProps={{
            colors: ["#ed40b3", "#adfa1e", "#6ef7cc"],
            colorBack: "#ffffff00",
            radius: 0.98,
            focalDistance: 0,
            focalAngle: 0,
            falloff: 0.9,
            mixing: 0.7,
            distortion: 0,
            distortionShift: 0,
            distortionFreq: 12,
            grainMixer: 1,
            grainOverlay: 0.5,
          }}
          srTitle="Composable hero"
          subtitle="Marketing"
          techStack={[
            { name: "Next.js", version: "v16" },
            { name: "AI SDK", version: "v6" },
            { name: "Tailwind", version: "v4" },
          ]}
          title="Cursor for"
        >
          <HeroStaticRadialGradientContainer>
            <HeroStaticRadialGradientContent>
              <HeroStaticRadialGradientHeading />
              <HeroStaticRadialGradientDescription />
              <HeroStaticRadialGradientActions />
              <div
                className="flex justify-center lg:justify-start"
                data-slot="hero-static-radial-gradient-badges-wrap"
              >
                <HeroStaticRadialGradientBadges
                  techStack={[
                    { name: "Next.js", version: "v16", icon: NextjsIcon },
                    { name: "AI SDK", version: "v6", icon: AISDKIcon },
                  ]}
                />
              </div>
            </HeroStaticRadialGradientContent>
            <HeroStaticRadialGradientVisual />
          </HeroStaticRadialGradientContainer>
          <HeroStaticRadialGradientMobileVisual />
        </HeroStaticRadialGradientRoot>
      </div>
    </div>
  )
}
