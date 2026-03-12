"use client"

import {
  AISDKIcon,
  HeroColorPanels,
  HeroColorPanelsActions,
  HeroColorPanelsBadges,
  HeroColorPanelsContainer,
  HeroColorPanelsContent,
  HeroColorPanelsDescription,
  HeroColorPanelsHeading,
  HeroColorPanelsMobileVisual,
  HeroColorPanelsRoot,
  HeroColorPanelsVisual,
  NextjsIcon,
} from "../ui/hero-color-panel"

export default function HeroColorPanelsDemo() {
  return (
    <div className="space-y-16">
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Default</h3>
        <HeroColorPanels />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-lg">Configured Via Props</h3>
        <HeroColorPanelsRoot
          ctaProps={{
            href: "#",
            label: "Try NewCopy for marketing",
          }}
          description="Human-in-the-loop marketing copy software that helps teams draft, review, and ship high-converting campaigns with confidence."
          desktopShaderProps={{
            width: 1280,
            height: 720,
            colors: ["#ed40b3", "#6ef7cc", "#adfa1e", "#b054de"],
            colorBack: "#ffffff00",
            density: 5.03,
            angle1: 0.68,
            angle2: 0.28,
            length: 1.13,
            edges: true,
            blur: 0.25,
            fadeIn: 0.85,
            fadeOut: 0.3,
            gradient: 0.56,
            speed: 4,
            scale: 0.96,
            rotation: 180,
          }}
          mobileShaderProps={{
            colors: ["#ed40b3", "#6ef7cc", "#adfa1e", "#b054de"],
            colorBack: "#ffffff00",
            density: 5.03,
            angle1: 0.68,
            angle2: 0.28,
            length: 1.13,
            edges: true,
            blur: 0.25,
            fadeIn: 0.85,
            fadeOut: 0.3,
            gradient: 0.56,
            speed: 4,
            scale: 0.96,
            rotation: 180,
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
          <HeroColorPanelsContainer>
            <HeroColorPanelsContent>
              <HeroColorPanelsHeading headingClassName="font-sans" />
              <HeroColorPanelsDescription />
              <HeroColorPanelsActions />
              <div
                className="flex justify-center lg:justify-start"
                data-slot="hero-colorpanels-badges-wrap"
              >
                <HeroColorPanelsBadges
                  techStack={[
                    { name: "Next.js", version: "v16", icon: NextjsIcon },
                    { name: "AI SDK", version: "v6", icon: AISDKIcon },
                  ]}
                />
              </div>
            </HeroColorPanelsContent>
            <HeroColorPanelsVisual />
          </HeroColorPanelsContainer>
          <HeroColorPanelsMobileVisual />
        </HeroColorPanelsRoot>
      </div>
    </div>
  )
}
