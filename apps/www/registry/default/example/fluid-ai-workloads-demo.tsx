"use client"

import { FluidAIWorkloads } from "@/registry/default/ui/fluid-ai-workloads"

function FluidAIWorkloadsDemo() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="max-w-full overflow-hidden rounded-lg bg-card p-6">
        <FluidAIWorkloads height={200} width={400} />
      </div>
    </div>
  )
}

export default FluidAIWorkloadsDemo
