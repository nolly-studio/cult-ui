"use client"

/**
 * Form field layout aligned with shadcn `Field` — label, description, error, and control
 * slots for {@link HaloInput} / {@link HaloTextarea} (general-purpose; not tied to
 * search or composer).
 */
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"

export type HaloFieldProps = ComponentProps<typeof Field>

/** Root group; pairs with {@link HaloFieldLabel}, {@link HaloFieldContent}, etc. */
export function HaloField({ className, ...props }: HaloFieldProps) {
  return (
    <Field
      className={cn("group/halo-field w-full max-w-full gap-2", className)}
      data-slot="halo-field"
      {...props}
    />
  )
}

export const HaloFieldContent = FieldContent
export const HaloFieldDescription = FieldDescription
export const HaloFieldError = FieldError
export const HaloFieldLabel = FieldLabel
export const HaloFieldTitle = FieldTitle
