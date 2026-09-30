"use client"

/**
 * Form field layout aligned with shadcn `Field` — label, description, error, and control
 * slots for {@link AnimatedInput} / {@link AnimatedTextarea} (general-purpose; not tied to
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

export type AnimatedFieldProps = ComponentProps<typeof Field>

/** Root group; pairs with {@link AnimatedFieldLabel}, {@link AnimatedFieldContent}, etc. */
export function AnimatedField({ className, ...props }: AnimatedFieldProps) {
  return (
    <Field
      className={cn("group/animated-field w-full max-w-full gap-2", className)}
      data-slot="animated-field"
      {...props}
    />
  )
}

export const AnimatedFieldContent = FieldContent
export const AnimatedFieldDescription = FieldDescription
export const AnimatedFieldError = FieldError
export const AnimatedFieldLabel = FieldLabel
export const AnimatedFieldTitle = FieldTitle
