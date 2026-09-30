"use client"

import {
  OrganicCard,
  OrganicCardBand,
  OrganicCardBody,
  OrganicCardDescription,
  OrganicCardEyebrow,
  OrganicCardFooter,
  OrganicCardFooterIcon,
  OrganicCardFooterLabel,
  OrganicCardImage,
  OrganicCardTitle,
} from "@/registry/default/ui/organic-card"

export default function OrganicCardDemo() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-0">
      <OrganicCard
        backgroundColor="#f0eee9"
        className="max-w-[617px]"
        href="/north"
      >
        <OrganicCardBody>
          <div>
            <OrganicCardImage
              alt="Card image"
              className="mb-5 h-[240px] animate-none opacity-100 sm:h-[300px]"
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=670&h=208&fit=crop"
            />
            <OrganicCardEyebrow className="animate-none opacity-100">
              Product update
            </OrganicCardEyebrow>
            <OrganicCardTitle className="animate-none opacity-100">
              North
            </OrganicCardTitle>
            <OrganicCardDescription className="w-11/12 animate-none opacity-100">
              Powered by Command A, Compass, Embed, and Rerank - secure AI
              agents, search, and generative AI in one place.
            </OrganicCardDescription>
          </div>
        </OrganicCardBody>

        <OrganicCardBand />

        <OrganicCardFooter>
          <OrganicCardFooterLabel className="animate-none opacity-100">
            Read more
          </OrganicCardFooterLabel>
          <OrganicCardFooterIcon className="animate-none opacity-100" />
        </OrganicCardFooter>
      </OrganicCard>
    </div>
  )
}
