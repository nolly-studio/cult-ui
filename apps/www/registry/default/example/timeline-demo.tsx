"use client"

import React, { useEffect, useState } from "react"

import { GradientHeading } from "../ui/gradient-heading"

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent
    const isSmall = window.matchMedia("(max-width: 768px)").matches
    const isMobile = Boolean(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.exec(
        userAgent
      )
    )

    const isDev = process.env.NODE_ENV !== "production"
    if (isDev) setIsMobile(isSmall || isMobile)

    setIsMobile(isSmall && isMobile)
  }, [])

  return isMobile
}

const PricingTimeline = () => {
  const isMobile = useIsMobile()
  const usedEvents = isMobile
    ? events.slice(events.length - 5, events.length - 1)
    : events

  return (
    <div className="py-8 pt-24 flex flex-col items-center justify-center overflow-hidden">
      <GradientHeading>Previous Releases</GradientHeading>
      <div className="md:flex flex-col items-center justify-center md:py-8 pt-20 w-full">
        <div className="md:py-8">
          <div className="h-full md:flex flex-col items-start justify-center w-full">
            <Timeline events={usedEvents} />
          </div>
        </div>
      </div>
    </div>
  )
}
