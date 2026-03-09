"use client"

import { CosmicButton } from "@/registry/default/ui/cosmic-button"

export default function CosmicButtonDemo() {
  return (
    <div className=" p-6 rounded-3xl flex justify-center">
      <div>
        <div className="grid place-items-center">
          <CosmicButton as="button" type="button">
            Cosmic button goes brrr
          </CosmicButton>
        </div>
      </div>
    </div>
  )
}
