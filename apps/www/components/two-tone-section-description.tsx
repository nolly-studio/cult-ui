import type * as React from "react";

import { cn } from "@/lib/utils";

export type TwoToneSectionDescriptionProps = React.ComponentProps<"p"> & {
  /** The claim, rendered at full ink. `children` is the softer rest. */
  lead: React.ReactNode;
  /** `xl` is the hero size. @default "default" */
  size?: "default" | "xl";
};

export function TwoToneSectionDescription({
  lead,
  size = "default",
  className,
  children,
  ...props
}: TwoToneSectionDescriptionProps) {
  return (
    <p
      data-slot="two-tone-description"
      className={cn(
        "max-w-2xl tracking-tight text-balance",
        size === "xl" ? "text-xl leading-8 sm:text-2xl sm:leading-9" : "text-lg",
        className
      )}
      {...props}
    >
      <span className="text-foreground font-medium">{lead}</span>{" "}
      <span className="text-foreground/55 font-normal">{children}</span>
    </p>
  );
}
