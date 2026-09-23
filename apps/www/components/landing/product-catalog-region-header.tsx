"use client";

import { BorderBeam } from "border-beam";
import type { ReactNode } from "react";

/**
 * Wraps the product catalog rail header with an animated border beam (ocean / sunset)
 * while keeping the inner surface styling on the native <header>.
 */
export function ProductCatalogRegionHeader({
  isAi,
  headerClassName,
  children,
}: {
  isAi: boolean;
  headerClassName: string;
  children: ReactNode;
}) {
  return (
    <BorderBeam
      active
      borderRadius={0}
      className="block w-full"
      colorVariant={isAi ? "ocean" : "colorful"}
      duration={4.65}
      size="line"
      strength={1}
      theme="auto"
    >
      <header className={headerClassName}>{children}</header>
    </BorderBeam>
  );
}
