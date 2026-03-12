"use client"

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
} from "../ui/hero-liquid-metal"

export default function HeroLiquidMetalDemo() {
  return (
    <div className="space-y-16">
      <div className="space-y-4">
        <h3 className="font-medium text-lg flex items-center justify-center">
          Default
        </h3>
        <HeroLiquidMetal />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-lg flex items-center justify-center">
          Root-level shader props
        </h3>
        <HeroLiquidMetal
          width={1280}
          height={720}
          image="https://shaders.paper.design/images/logos/diamond.svg"
          colorBack="#ffffff00"
          colorTint="#2c5d72"
          shape={undefined}
          repetition={6}
          softness={0.8}
          shiftRed={1}
          shiftBlue={-1}
          distortion={0.4}
          contour={0.4}
          angle={0}
          speed={1}
          scale={0.6}
          fit="contain"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-lg flex items-center justify-center">
          Configured via props
        </h3>
        <HeroLiquidMetalRoot
          ctaProps={{
            href: "#",
            label: "Try NewCopy for marketing",
          }}
          description="Human-in-the-loop marketing copy software that helps teams draft, review, and ship high-converting campaigns with confidence."
          desktopShaderProps={{
            scale: 0.8,
            speed: 0.7,
            repetition: 7,
            softness: 0.9,
            distortion: 0.3,
            colorTint: "#4f46e5",
          }}
          image="https://shaders.paper.design/images/logos/diamond.svg"
          mobileShaderProps={{
            speed: 0.65,
            scale: 0.78,
            colorTint: "#0ea5e9",
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
          <HeroLiquidMetalContainer>
            <HeroLiquidMetalContent>
              <HeroLiquidMetalHeading />
              <HeroLiquidMetalDescription />
              <HeroLiquidMetalActions />
              <div
                className="hidden lg:flex justify-center lg:justify-start"
                data-slot="hero-liquid-metal-badges-wrap"
              >
                <HeroLiquidMetalBadges
                  techStack={[
                    { name: "Next.js", version: "v16", icon: NextjsIcon },
                    { name: "AI SDK", version: "v6", icon: AISDKIcon },
                  ]}
                />
              </div>
            </HeroLiquidMetalContent>
            <HeroLiquidMetalVisual />
          </HeroLiquidMetalContainer>
          <HeroLiquidMetalMobileVisual />
        </HeroLiquidMetalRoot>
      </div>
    </div>
  )
}
