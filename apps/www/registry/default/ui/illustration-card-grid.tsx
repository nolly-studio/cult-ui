import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { GatewayEndpoint } from "@/registry/default/ui/gateway-endpoint-illustration"
import { GatewayRouting } from "@/registry/default/ui/gateway-route-illustration"
import { GatewayOverhead } from "@/registry/default/ui/gateway-svg-illustration"

export type IllustrationCardGridItem = {
  id?: string
  title: ReactNode
  description: ReactNode
  illustration: ReactNode
  className?: string
  contentClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  illustrationClassName?: string
}

export type IllustrationCardGridProps = React.ComponentProps<"section"> & {
  items?: IllustrationCardGridItem[]
  cardClassName?: string
  contentClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  illustrationClassName?: string
}

export const DEFAULT_ILLUSTRATION_CARD_GRID_ITEMS: IllustrationCardGridItem[] =
  [
    {
      id: "gateway-endpoint",
      title: "One API key, hundreds of models",
      description:
        "Unified billing and observability across your entire AI stack, with text, image, and video models.",
      illustration: <GatewayEndpoint />,
    },
    {
      id: "gateway-overhead",
      title: "Built-in failovers, better uptime",
      description:
        "Automatic fallbacks during provider outages so your app stays up even when a model goes down.",
      illustration: <GatewayOverhead />,
    },
    {
      id: "gateway-routing",
      title: "No markup, just list price",
      description: "Pay exactly what providers charge with no platform fees.",
      illustration: <GatewayRouting />,
    },
  ]

export function IllustrationCardGrid({
  items = DEFAULT_ILLUSTRATION_CARD_GRID_ITEMS,
  className,
  cardClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  illustrationClassName,
  ...props
}: IllustrationCardGridProps) {
  const largeScreenColumnsClass =
    items.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"

  return (
    <section
      className={cn(
        "mx-auto grid w-full max-w-5xl grid-cols-1 border",
        largeScreenColumnsClass,
        className
      )}
      data-slot="illustration-card-grid"
      {...props}
    >
      {items.map((item, index) => {
        const isLastCard = index === items.length - 1

        return (
          <div
            className={cn(
              "flex flex-col gap-8 p-8 lg:h-[450px]",
              !isLastCard && "border-b lg:border-r lg:border-b-0",
              cardClassName,
              item.className
            )}
            data-slot="illustration-card-grid-item"
            key={item.id ?? index}
          >
            <div
              className={cn(
                "flex flex-col gap-4",
                contentClassName,
                item.contentClassName
              )}
              data-slot="illustration-card-grid-content"
            >
              <h3
                className={cn(
                  "text-balance font-medium text-2xl text-foreground/90 leading-8 tracking-[-0.96px]",
                  titleClassName,
                  item.titleClassName
                )}
                data-slot="illustration-card-grid-title"
              >
                {item.title}
              </h3>
              <p
                className={cn(
                  "text-foreground/70",
                  descriptionClassName,
                  item.descriptionClassName
                )}
                data-slot="illustration-card-grid-description"
              >
                {item.description}
              </p>
            </div>
            <div
              className={cn(
                "pointer-events-none flex grow select-none items-end justify-center",
                illustrationClassName,
                item.illustrationClassName
              )}
              data-slot="illustration-card-grid-illustration"
            >
              {item.illustration}
            </div>
          </div>
        )
      })}
    </section>
  )
}
