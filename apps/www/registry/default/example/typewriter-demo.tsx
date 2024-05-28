"use client"

import { ReactNode } from "react"

import { Typewriter } from "../ui/typewriter"

const texts = [
  "Testing 124",
  "Look at newcult.co",
  "and check gnow.io",
  "Sick af",
]

export default function TypewriterDemo() {
  return (
    <IosOgShellCard>
      <div className="ml-auto px-4 py-2 mb-3 text-white bg-blue-500 rounded-2xl">
        <p className="text-sm md:text-base font-semibold text-base-900 truncate">
          <Typewriter texts={texts} delay={1} baseText="Yo " />
        </p>
      </div>
    </IosOgShellCard>
  )
}

function IosOgShellCard({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-xs md:max-w-xl md:min-w-80 mx-auto flex flex-col rounded-lg bg-neutral-900 px-px pb-px shadow-inner-shadow">
      <div className="p-4 flex flex-col md:px-5">
        <div className="mb-2 text-sm md:text-neutral-500 text-neutral-500">
          iMessage
        </div>
        <div className="mb-3 text-xs md:text-sm text-neutral-500">
          Today 11:29
        </div>
        <div className="ml-auto px-4 py-2 mb-3 text-white bg-blue-500 rounded-2xl">
          <span>Hey!</span>
        </div>
        <div className="mr-auto px-4 py-2 mb-3 text-white bg-neutral-700 rounded-2xl">
          <span>Whats up bretheren?!</span>
        </div>
        {children}
        <div className="mt-3 text-xs md:text-sm text-neutral-500">
          Delivered
        </div>
      </div>
    </div>
  )
}
