"use client"

import type React from "react"
import { useState } from "react"

import NeumorphButton from "../ui/neumorph-button"

export default function NeumorphButtonDemo() {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="space-y-8 p-4 ">
      <div>
        <h2 className="text-lg font-semibold mb-2">Button Variants</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <NeumorphButton>Default</NeumorphButton>
          <NeumorphButton intent="primary">Primary</NeumorphButton>
          <NeumorphButton intent="secondary">Secondary</NeumorphButton>
          <NeumorphButton intent="danger">Danger</NeumorphButton>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Button Sizes</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <NeumorphButton size="small">Small</NeumorphButton>
          <NeumorphButton size="medium">Medium</NeumorphButton>
          <NeumorphButton size="large">Large</NeumorphButton>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Full Width Button</h2>
        <div>
          <NeumorphButton fullWidth>Full Width</NeumorphButton>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Disabled Buttons</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <NeumorphButton disabled>Disabled Default</NeumorphButton>
          <NeumorphButton intent="primary" disabled>
            Disabled Primary
          </NeumorphButton>
          <NeumorphButton intent="secondary" disabled>
            Disabled Secondary
          </NeumorphButton>
          <NeumorphButton intent="danger" disabled>
            Disabled Danger
          </NeumorphButton>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Hover and Active Effects</h2>
        <p className="text-sm text-gray-600 mb-2">
          Hover over and click these buttons to see the animations.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <NeumorphButton>Animate Me</NeumorphButton>
          <NeumorphButton intent="primary">Animate Me</NeumorphButton>
          <NeumorphButton intent="secondary">Animate Me</NeumorphButton>
          <NeumorphButton intent="danger">Animate Me</NeumorphButton>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Loading State</h2>
        <p className="text-sm text-gray-600 mb-2">
          Click the button to see the loading animation.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <NeumorphButton
            intent="primary"
            loading={loading}
            onClick={handleClick}
          >
            {loading ? "Loading..." : "Click to Load"}
          </NeumorphButton>
        </div>
      </div>
    </div>
  )
}
