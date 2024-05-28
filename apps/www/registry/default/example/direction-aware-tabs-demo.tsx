"use client"

import { BgAnimateButton } from "../ui/bg-animate-button"
import { DirectionAwareTabs } from "../ui/direction-aware-tabs"

const DirectionAwareTabsDemo = ({}) => {
  const tabs = [
    {
      id: 0,
      label: "ocean",
      content: (
        <div className="border border-border/50 w-full flex flex-col items-center p-4 rounded-lg gap-3">
          <BgAnimateButton animation="spin-fast" gradient="ocean">
            Button
          </BgAnimateButton>
          <BgAnimateButton animation="spin" gradient="ocean">
            Button
          </BgAnimateButton>
          <BgAnimateButton animation="spin-slow" gradient="ocean">
            Button
          </BgAnimateButton>
        </div>
      ),
    },
    {
      id: 1,
      label: "forest",
      content: (
        <div className="border border-border/50 w-full flex flex-col items-center p-4 rounded-lg gap-3">
          <BgAnimateButton animation="spin-fast" gradient="forest">
            Button
          </BgAnimateButton>
          <BgAnimateButton animation="spin" gradient="forest">
            Button
          </BgAnimateButton>
          <BgAnimateButton animation="spin-slow" gradient="forest">
            Button
          </BgAnimateButton>
        </div>
      ),
    },
    {
      id: 2,
      label: "default",
      content: (
        <div className="border border-border/50 w-full flex flex-col items-center gap-3 p-4">
          <BgAnimateButton animation="spin-fast" gradient="default">
            Button
          </BgAnimateButton>
          <BgAnimateButton animation="spin" gradient="default">
            Button
          </BgAnimateButton>
          <BgAnimateButton animation="spin-slow" gradient="default">
            Button
          </BgAnimateButton>
        </div>
      ),
    },
    {
      id: 3,
      label: "sunset",
      content: (
        <div className="border border-border/50 w-full flex flex-col items-center p-4 rounded-lg gap-3">
          <BgAnimateButton animation="spin-fast" gradient="sunset">
            Button
          </BgAnimateButton>
          <BgAnimateButton animation="spin" gradient="sunset">
            Button
          </BgAnimateButton>
          <BgAnimateButton animation="spin-slow" gradient="sunset">
            Button
          </BgAnimateButton>
        </div>
      ),
    },
  ]

  return (
    <div className="">
      <DirectionAwareTabs tabs={tabs} />
    </div>
  )
}

export default DirectionAwareTabsDemo
