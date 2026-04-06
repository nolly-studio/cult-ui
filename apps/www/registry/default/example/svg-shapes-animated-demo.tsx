"use client"

import { useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  ArrowPentagonShapeSvg,
  ChevronShapeSvg,
  CircleShapeSvg,
  CrossShapeSvg,
  CubeWireframeSvg,
  DiamondShapeSvg,
  DodecahedronWireframeSvg,
  DoubleNotchTechShapeSvg,
  EllipseShapeSvg,
  FlowerOfLifeSvg,
  GoldenSpiralSvg,
  GothicArchPanelSvg,
  HourglassBowtiePanelSvg,
  IcosahedronWireframeSvg,
  InvertedArchPanelSvg,
  KiteShapeSvg,
  MetatronsCubeSvg,
  OctagonShapeSvg,
  OctahedronWireframeSvg,
  OgeeOnionDomePanelSvg,
  ParallelogramShapeSvg,
  PennantShapeSvg,
  PillShapeSvg,
  QuarterCircleShapeSvg,
  RibbonBannerShapeSvg,
  RightTriangleShapeSvg,
  RoundedRectCornerBiteShapeSvg,
  RoundedSquareShapeSvg,
  RoundedTriangleShapeSvg,
  ScallopedTopPanelSvg,
  SeedOfLifeSvg,
  SemicircleShapeSvg,
  SquircleShapeSvg,
  SriYantraSvg,
  TetrahedronWireframeSvg,
  TorusTubeSvg,
  TrapezoidShapeSvg,
  TriangleShapeSvg,
  VesicaPiscisSvg,
} from "@/registry/default/ui/svg-shapes-animated"

function DemoSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="w-full space-y-4">
      <h3 className="text-foreground text-sm font-semibold tracking-tight">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3">
        {children}
      </div>
    </section>
  )
}

function ShapeTile({
  label,
  tall,
  children,
}: {
  label: string
  tall?: boolean
  children: ReactNode
}) {
  return (
    <div className="bg-muted/30 flex flex-col gap-2 rounded-lg border p-3">
      <p className="text-muted-foreground text-xs font-medium">{label}</p>
      <div
        className={`flex items-center justify-center [&_svg]:w-full ${
          tall ? "min-h-28 [&_svg]:max-h-28" : "min-h-20 [&_svg]:max-h-20"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default function SvgShapesAnimatedDemo() {
  const [replayKey, setReplayKey] = useState(0)

  return (
    <div className="dark:bg-stone-950 flex flex-col items-center gap-12 rounded-md px-4 py-6 md:px-0">
      <div className="max-w-2xl space-y-4 text-center">
        <h2 className="text-foreground text-2xl font-bold tracking-tight">
          SVG shapes (animated)
        </h2>
        <p className="text-muted-foreground text-sm">
          Same wide viewBox geometry as the static set, with paths drawn via{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">
            motion/react
          </code>{" "}
          when each graphic scrolls into view. Respects{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">
            prefers-reduced-motion
          </code>
          .
        </p>
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setReplayKey((k) => k + 1)}
          >
            Replay animations
          </Button>
        </div>
      </div>

      <div key={replayKey} className="flex w-full max-w-5xl flex-col gap-10">
        <DemoSection title="Polygons and curves">
          <ShapeTile label="Triangle">
            <TriangleShapeSvg />
          </ShapeTile>
          <ShapeTile label="Circle">
            <CircleShapeSvg />
          </ShapeTile>
          <ShapeTile label="Ellipse">
            <EllipseShapeSvg />
          </ShapeTile>
          <ShapeTile label="Semicircle (D panel)">
            <SemicircleShapeSvg />
          </ShapeTile>
          <ShapeTile label="Right triangle">
            <RightTriangleShapeSvg />
          </ShapeTile>
          <ShapeTile label="Kite">
            <KiteShapeSvg />
          </ShapeTile>
          <ShapeTile label="Pennant">
            <PennantShapeSvg />
          </ShapeTile>
          <ShapeTile label="Quarter circle">
            <QuarterCircleShapeSvg />
          </ShapeTile>
        </DemoSection>

        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setReplayKey((k) => k + 1)}
          >
            Replay animations
          </Button>
        </div>

        <DemoSection title="Rounded and architectural">
          <ShapeTile label="Rounded square">
            <RoundedSquareShapeSvg />
          </ShapeTile>
          <ShapeTile label="Rounded triangle">
            <RoundedTriangleShapeSvg />
          </ShapeTile>
          <ShapeTile label="Squircle">
            <SquircleShapeSvg />
          </ShapeTile>
          <ShapeTile label="Gothic arch panel">
            <GothicArchPanelSvg />
          </ShapeTile>
          <ShapeTile label="Inverted arch panel">
            <InvertedArchPanelSvg />
          </ShapeTile>
          <ShapeTile label="Arrow pentagon">
            <ArrowPentagonShapeSvg />
          </ShapeTile>
        </DemoSection>

        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setReplayKey((k) => k + 1)}
          >
            Replay animations
          </Button>
        </div>

        <DemoSection title="Primitives">
          <ShapeTile label="Diamond">
            <DiamondShapeSvg />
          </ShapeTile>
          <ShapeTile label="Trapezoid">
            <TrapezoidShapeSvg />
          </ShapeTile>
          <ShapeTile label="Octagon">
            <OctagonShapeSvg />
          </ShapeTile>
          <ShapeTile label="Parallelogram">
            <ParallelogramShapeSvg />
          </ShapeTile>
          <ShapeTile label="Chevron">
            <ChevronShapeSvg />
          </ShapeTile>
          <ShapeTile label="Cross">
            <CrossShapeSvg />
          </ShapeTile>
          <ShapeTile label="Pill">
            <PillShapeSvg />
          </ShapeTile>
        </DemoSection>

        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setReplayKey((k) => k + 1)}
          >
            Replay animations
          </Button>
        </div>

        <DemoSection title="Panels">
          <ShapeTile label="Ribbon banner">
            <RibbonBannerShapeSvg />
          </ShapeTile>
          <ShapeTile label="Hourglass / bowtie">
            <HourglassBowtiePanelSvg />
          </ShapeTile>
          <ShapeTile label="Scalloped top">
            <ScallopedTopPanelSvg />
          </ShapeTile>
          <ShapeTile label="Corner bite">
            <RoundedRectCornerBiteShapeSvg />
          </ShapeTile>
          <ShapeTile label="Double notch">
            <DoubleNotchTechShapeSvg />
          </ShapeTile>
          <ShapeTile label="Ogee onion dome">
            <OgeeOnionDomePanelSvg />
          </ShapeTile>
        </DemoSection>

        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setReplayKey((k) => k + 1)}
          >
            Replay animations
          </Button>
        </div>

        <DemoSection title="Sacred geometry">
          <ShapeTile label="Vesica piscis" tall>
            <VesicaPiscisSvg />
          </ShapeTile>
          <ShapeTile label="Seed of life" tall>
            <SeedOfLifeSvg />
          </ShapeTile>
          <ShapeTile label="Flower of life" tall>
            <FlowerOfLifeSvg />
          </ShapeTile>
          <ShapeTile label="Metatron cube" tall>
            <MetatronsCubeSvg />
          </ShapeTile>
          <ShapeTile label="Sri Yantra" tall>
            <SriYantraSvg />
          </ShapeTile>
          <ShapeTile label="Golden spiral" tall>
            <GoldenSpiralSvg />
          </ShapeTile>
          <ShapeTile label="Torus tube" tall>
            <TorusTubeSvg />
          </ShapeTile>
        </DemoSection>

        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setReplayKey((k) => k + 1)}
          >
            Replay animations
          </Button>
        </div>

        <DemoSection title="Platonic solids (wireframe)">
          <ShapeTile label="Tetrahedron">
            <TetrahedronWireframeSvg />
          </ShapeTile>
          <ShapeTile label="Cube">
            <CubeWireframeSvg />
          </ShapeTile>
          <ShapeTile label="Octahedron">
            <OctahedronWireframeSvg />
          </ShapeTile>
          <ShapeTile label="Icosahedron">
            <IcosahedronWireframeSvg />
          </ShapeTile>
          <ShapeTile label="Dodecahedron">
            <DodecahedronWireframeSvg />
          </ShapeTile>
        </DemoSection>

        <section className="w-full space-y-4">
          <h3 className="text-foreground text-sm font-semibold tracking-tight">
            Flip prop
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(
              [
                ["none", "none"],
                ["vertical", "vertical"],
                ["horizontal", "horizontal"],
                ["both axes", "both"],
              ] as const
            ).map(([label, flip]) => (
              <ShapeTile key={flip} label={label}>
                <PennantShapeSvg flip={flip} />
              </ShapeTile>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
