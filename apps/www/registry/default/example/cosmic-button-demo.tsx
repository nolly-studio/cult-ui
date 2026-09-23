"use client";

import { CosmicButton } from "@/registry/default/ui/cosmic-button";

export default function CosmicButtonDemo() {
  return (
    <div className="flex justify-center rounded-3xl p-6">
      <div>
        <div className="grid place-items-center">
          <CosmicButton as="button" type="button">
            Cosmic button goes brrr
          </CosmicButton>
        </div>
      </div>
    </div>
  );
}
