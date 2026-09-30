"use client"

import { useId, useState } from "react"
import { Mail } from "lucide-react"

import {
  AnimatedField,
  AnimatedFieldContent,
  AnimatedFieldDescription,
  AnimatedFieldError,
  AnimatedFieldLabel,
} from "@/registry/default/ui/animated-field"
import {
  AnimatedInput,
  AnimatedTextarea,
} from "@/registry/default/ui/animated-input"

const EMAIL_LIKE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function AnimatedFieldDemo() {
  const emailId = useId()
  const bioId = useId()
  const [email, setEmail] = useState("")
  const [showEmailError, setShowEmailError] = useState(false)
  const emailInvalid = showEmailError && !EMAIL_LIKE.test(email)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex w-full max-w-md flex-col gap-12">
        <section className="space-y-3">
          <h2 className="font-semibold text-foreground text-lg tracking-tight">
            Field + input
          </h2>
          <p className="text-pretty text-muted-foreground text-sm">
            Groups a label with an input, helper text, and optional validation
            messages in a frosted shell with an animated rim.
          </p>
          <AnimatedField>
            <AnimatedFieldLabel htmlFor={emailId}>Email</AnimatedFieldLabel>
            <AnimatedFieldContent>
              <AnimatedInput
                aria-invalid={emailInvalid}
                autoComplete="email"
                id={emailId}
                invalid={emailInvalid}
                leadingSlot={<Mail aria-hidden />}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                type="email"
                value={email}
              />
              <AnimatedFieldDescription>
                We’ll only use this for account updates.
              </AnimatedFieldDescription>
              {emailInvalid ? (
                <AnimatedFieldError>
                  Enter a valid email address.
                </AnimatedFieldError>
              ) : null}
            </AnimatedFieldContent>
          </AnimatedField>
          <button
            className="rounded-md border border-border px-3 py-1.5 font-medium text-foreground text-sm fine-hover:hover:bg-muted"
            onClick={() => setShowEmailError((v) => !v)}
            type="button"
          >
            Toggle validation (demo)
          </button>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-foreground text-lg tracking-tight">
            Textarea
          </h2>
          <AnimatedField>
            <AnimatedFieldLabel htmlFor={bioId}>Bio</AnimatedFieldLabel>
            <AnimatedFieldContent>
              <AnimatedTextarea
                id={bioId}
                placeholder="A few lines about you…"
                rows={5}
              />
              <AnimatedFieldDescription>
                Optional — shown on your profile.
              </AnimatedFieldDescription>
            </AnimatedFieldContent>
          </AnimatedField>
        </section>
      </div>
    </main>
  )
}
