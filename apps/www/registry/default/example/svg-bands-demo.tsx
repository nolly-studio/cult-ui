"use client"

import type { ReactNode } from "react"

import {
  AngledCornerPanelSvg,
  ArrowChevronBandSvg,
  BandShape,
  BottomBandSteepRightSvg,
  castleWallBandPath,
  CastleWallBandSvg,
  CenterTabBandSvg,
  CenterTabTopBandSvg,
  DiagonalSlashBandSvg,
  DualSideNotchFrameSvg,
  FlatSingleAngleBandSvg,
  NotchedTopBandSvg,
  PyramidStepBandLotsOfStepsSvg,
  PyramidStepBandSvg,
  StaircaseBandSvg,
  SteppedInsetFrameSvg,
  SteppedLeftSteepRightBandSvg,
  SymmetricVBandSvg,
  TallAngledHeroPanelSvg,
  TopBandSteepBothSvg,
  TopBandSteepLeftSvg,
  TopBandSteepRightSvg,
  WavyBottomEdgeSvg,
  zigzagSawtoothBandPath,
  ZigzagSawtoothBandSvg,
} from "@/registry/default/ui/svg-bands"

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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {children}
      </div>
    </section>
  )
}

function BandTile({
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
        className={`flex items-center justify-center overflow-hidden [&_svg]:w-full ${
          tall ? "min-h-40 [&_svg]:max-h-56" : "min-h-16 [&_svg]:max-h-24"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default function SvgBandsDemo() {
  return (
    <div className="dark:bg-stone-950 flex flex-col items-center gap-12 rounded-md px-4 py-6 md:px-0">
      <div className="max-w-2xl space-y-2 text-center">
        <h2 className="text-foreground text-2xl font-bold tracking-tight">
          SVG bands
        </h2>
        <p className="text-muted-foreground text-sm">
          Wide (2400-based) section ornaments: battlement and zigzag trims,
          steep hero headers, and frame panels. Styling follows{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">
            currentColor
          </code>{" "}
          with light fill tints — pair with your background and type color.
        </p>
      </div>

      <div className="flex w-full max-w-5xl flex-col gap-10">
        <DemoSection title="Profile bands">
          <BandTile label="Flat single angle">
            <FlatSingleAngleBandSvg />
          </BandTile>
          <BandTile label="Castle wall (12 merlons)">
            <CastleWallBandSvg />
          </BandTile>
          <BandTile label="Symmetric V">
            <SymmetricVBandSvg />
          </BandTile>
          <BandTile label="Twin top notches">
            <NotchedTopBandSvg />
          </BandTile>
          <BandTile label="Zigzag (12 teeth)">
            <ZigzagSawtoothBandSvg />
          </BandTile>
          <BandTile label="Zigzag (8 teeth)">
            <ZigzagSawtoothBandSvg teeth={8} />
          </BandTile>
          <BandTile label="Center tab">
            <CenterTabBandSvg />
          </BandTile>
          <BandTile label="Diagonal slash">
            <DiagonalSlashBandSvg />
          </BandTile>
          <BandTile label="Arrow chevron">
            <ArrowChevronBandSvg />
          </BandTile>
          <BandTile label="Staircase">
            <StaircaseBandSvg />
          </BandTile>
          <BandTile label="Stepped left, steep right">
            <SteppedLeftSteepRightBandSvg />
          </BandTile>
        </DemoSection>

        <DemoSection title="Panels and frames">
          <BandTile label="Stepped inset frame" tall>
            <SteppedInsetFrameSvg />
          </BandTile>
          <BandTile label="Angled corner panel" tall>
            <AngledCornerPanelSvg />
          </BandTile>
          <BandTile label="Dual side notch frame" tall>
            <DualSideNotchFrameSvg />
          </BandTile>
          <BandTile label="Tall angled hero" tall>
            <TallAngledHeroPanelSvg />
          </BandTile>
        </DemoSection>

        <DemoSection title="Steep tops, bottom trims">
          <BandTile label="Top steep right">
            <TopBandSteepRightSvg />
          </BandTile>
          <BandTile label="Top steep both">
            <TopBandSteepBothSvg />
          </BandTile>
          <BandTile label="Top steep left">
            <TopBandSteepLeftSvg />
          </BandTile>
          <BandTile label="Bottom steep right (mirrored)">
            <BottomBandSteepRightSvg />
          </BandTile>
          <BandTile label="Wavy bottom">
            <WavyBottomEdgeSvg />
          </BandTile>
          <BandTile label="Center tab top (wide grid)">
            <CenterTabTopBandSvg />
          </BandTile>
        </DemoSection>

        <DemoSection title="Pyramid steps">
          <BandTile label="Four steps">
            <PyramidStepBandSvg />
          </BandTile>
          <BandTile label="Twelve steps">
            <PyramidStepBandLotsOfStepsSvg />
          </BandTile>
        </DemoSection>

        <DemoSection title="Generic BandShape + path builders">
          <BandTile label="BandShape · castleWallBandPath(6)">
            <BandShape
              path={castleWallBandPath(6)}
              title="Custom battlement from path helper"
              viewBox="0 0 2400 180"
            />
          </BandTile>
          <BandTile label="BandShape · zigzagSawtoothBandPath(10)">
            <BandShape
              path={zigzagSawtoothBandPath(10)}
              title="Custom sawtooth from path helper"
              viewBox="0 0 2400 200"
            />
          </BandTile>
        </DemoSection>

        <section className="w-full space-y-4">
          <h3 className="text-foreground text-sm font-semibold tracking-tight">
            BandShape flip prop
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
              <BandTile key={flip} label={label}>
                <BandShape
                  flip={flip}
                  path="M1 199V6C1 3 3 1 6 1H2394C2397 1 2399 3 2399 6V199H1Z"
                  title="Slab band flip demo"
                  viewBox="0 0 2400 200"
                />
              </BandTile>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
