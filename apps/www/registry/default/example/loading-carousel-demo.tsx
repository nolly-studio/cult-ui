"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { LoadingCarousel } from "../ui/loading-carousel"

export default function LoadingCarouselDemo() {
  return (
    <div className="space-y-8 p-4 w-full">
      <div className="w-full">
        <CardHeader>
          <CardTitle>Default LoadingCarousel</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingCarousel />
        </CardContent>
      </div>

      <div className="w-full">
        <CardHeader>
          <CardTitle>Wide Aspect Ratio with Top Text</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingCarousel
            aspectRatio="wide"
            textPosition="top"
            showIndicators={false}
          />
        </CardContent>
      </div>

      <div className="w-full">
        <CardHeader>
          <CardTitle>Background Tips + Gradient</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingCarousel
            aspectRatio="wide"
            backgroundTips={true}
            backgroundGradient={true}
          />
        </CardContent>
      </div>

      <div className="w-full">
        <CardHeader>
          <CardTitle>Custom Interval and Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingCarousel autoplayInterval={2000} showNavigation={true} />
        </CardContent>
      </div>

      <div className="w-full">
        <CardHeader>
          <CardTitle>Shuffled Tips with Custom Interval</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingCarousel
            shuffleTips={true}
            autoplayInterval={3000}
            showProgress={false}
          />
        </CardContent>
      </div>

      <div className="w-full">
        <CardHeader>
          <CardTitle>Square Aspect Ratio with Background Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingCarousel
            aspectRatio="square"
            backgroundTips={true}
            backgroundGradient={true}
          />
        </CardContent>
      </div>
    </div>
  )
}
