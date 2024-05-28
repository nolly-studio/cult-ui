"use client"

import * as React from "react"

import { GradientHeading, Size, Variant, Weight } from "../ui/gradient-heading"

export default function GradientHeadingDemo() {
  const variants: Variant[] = ["default", "pink", "light"]
  const sizes: Size[] = ["lg", "xl", "xxl", "xxxl"]
  const weights: Weight[] = ["thin", "base", "semi", "bold", "black"]

  return (
    <div className="space-y-8 p-4">
      {variants.map((variant) => (
        <div key={variant}>
          <h2 className="text-xl font-semibold mb-4">Variant: {variant}</h2>
          {sizes.map((size) => (
            <div key={size} className="mb-2">
              {weights.map((weight) => (
                <GradientHeading
                  key={`${variant}-${size}-${weight}`}
                  variant={variant}
                  size={size}
                  weight={weight}
                  className="mb-2"
                >
                  {`Heading - ${size}`}
                </GradientHeading>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
