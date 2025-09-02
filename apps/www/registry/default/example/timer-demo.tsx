"use client"

import { Pause, Play, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Timer,
  TimerDisplay,
  TimerIcon,
  TimerRoot,
  useTimer,
} from "@/registry/default/ui/timer"

export default function TimerExamples() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        {/* Basic Timer */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Timer</h3>
          <Timer loading={true} />
        </div>

        {/* Variants */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Variants</h3>
          <div className="flex gap-4 flex-wrap">
            <Timer variant="default" loading={true} />
            <Timer variant="outline" loading={true} />
            <Timer variant="ghost" loading={true} />
            <Timer variant="destructive" loading={true} />
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Sizes</h3>
          <div className="flex gap-4 items-center flex-wrap">
            <Timer size="sm" loading={true} />
            <Timer size="md" loading={true} />
            <Timer size="lg" loading={true} />
          </div>
        </div>

        {/* Compound Components */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Compound Components</h3>
          <TimerRoot variant="outline" size="lg">
            <TimerIcon loading={true} />
            <TimerDisplay time="01:23" />
          </TimerRoot>
        </div>

        {/* Custom Timer with Controls */}
        <CustomTimerExample />
      </div>
    </div>
  )
}

function CustomTimerExample() {
  const { formattedTime, isRunning, start, stop, reset } = useTimer({
    format: "MM:SS",
  })

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Custom Timer with Controls</h3>
      <div className="flex items-center gap-4">
        <TimerRoot variant="outline" size="lg">
          <TimerIcon loading={isRunning} />
          <TimerDisplay time={formattedTime.display} />
        </TimerRoot>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={isRunning ? stop : start}
          >
            {isRunning ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          <Button size="sm" variant="outline" onClick={reset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
