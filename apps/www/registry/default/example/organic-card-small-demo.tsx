"use client"

import { OrganicCardSmall } from "@/registry/default/ui/organic-card-small"

export default function OrganicCardSmallDemo() {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 sm:px-0">
        <OrganicCardSmall
          category="Engineering"
          date="Apr 2, 2026"
          href="#"
          image="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=670&h=208&fit=crop"
          imageAlt="AI neural network visualization"
          title="Building scalable AI infrastructure for enterprise"
        />
      </div>
    </div>
  )
}
