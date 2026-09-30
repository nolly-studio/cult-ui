"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { Building2, CheckCircle2, Layers, User, UserCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import WizardExpandable, {
  type WizardNavigateContext,
} from "@/registry/default/ui/wizard-expandable"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WHITESPACE_SPLIT = /\s+/

export default function WizardExpandableDemo() {
  const [submitted, setSubmitted] = useState(false)
  const [controlledExpanded, setControlledExpanded] = useState(false)
  const [controlledActiveStep, setControlledActiveStep] = useState<
    string | null
  >(null)

  const [accountName, setAccountName] = useState("")
  const [accountEmail, setAccountEmail] = useState("")
  const [headline, setHeadline] = useState("")
  const [bio, setBio] = useState("")
  const [organization, setOrganization] = useState("")
  const [planTier, setPlanTier] = useState("")

  const accountNameRef = useRef<HTMLInputElement>(null)
  const accountEmailRef = useRef<HTMLInputElement>(null)
  const headlineRef = useRef<HTMLInputElement>(null)
  const bioRef = useRef<HTMLTextAreaElement>(null)
  const organizationRef = useRef<HTMLInputElement>(null)
  const planSelectRef = useRef<HTMLSelectElement>(null)

  const canNavigateToStep = useCallback(
    (ctx: WizardNavigateContext) => {
      if (ctx.fromStepId === "account") {
        const nameOk = accountName.trim().length > 0
        const emailOk = EMAIL_PATTERN.test(accountEmail.trim())
        return nameOk && emailOk
      }
      if (ctx.fromStepId === "profile") {
        return (
          headline.trim().length > 0 &&
          bio.trim().split(WHITESPACE_SPLIT).filter(Boolean).length >= 3
        )
      }
      if (ctx.fromStepId === "organization") {
        return organization.trim().length > 0
      }
      if (ctx.fromStepId === "plan") {
        return planTier.length > 0
      }
      return true
    },
    [accountEmail, accountName, bio, headline, organization, planTier]
  )

  const onNavigateBlocked = useCallback(
    (ctx: WizardNavigateContext) => {
      if (ctx.fromStepId === "account") {
        if (!accountName.trim()) {
          accountNameRef.current?.focus()
          return
        }
        if (!EMAIL_PATTERN.test(accountEmail.trim())) {
          accountEmailRef.current?.focus()
        }
        return
      }
      if (ctx.fromStepId === "profile") {
        if (!headline.trim()) {
          headlineRef.current?.focus()
          return
        }
        bioRef.current?.focus()
        return
      }
      if (ctx.fromStepId === "organization") {
        organizationRef.current?.focus()
        return
      }
      if (ctx.fromStepId === "plan") {
        planSelectRef.current?.focus()
      }
    },
    [accountEmail, accountName, headline]
  )

  const validatedSteps = useMemo(
    () => [
      {
        id: "account",
        title: "Account",
        description:
          "Your sign-in details. Forward navigation requires a name and valid email.",
        icon: User,
        content: (
          <div className="space-y-4">
            <p className="text-muted-foreground text-xs">
              Try advancing without filling fields — focus returns to the first
              invalid input.
            </p>
            <div className="space-y-2">
              <Label htmlFor="wizard-account-name">Full name</Label>
              <Input
                autoComplete="name"
                id="wizard-account-name"
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Jordan Gilliam"
                ref={accountNameRef}
                value={accountName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wizard-account-email">Email</Label>
              <Input
                autoComplete="email"
                id="wizard-account-email"
                onChange={(e) => setAccountEmail(e.target.value)}
                placeholder="you@example.com"
                ref={accountEmailRef}
                type="email"
                value={accountEmail}
              />
            </div>
          </div>
        ),
      },
      {
        id: "profile",
        title: "Profile",
        description:
          "A short public profile. Requires a headline and at least three words in the bio.",
        icon: UserCircle,
        content: (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wizard-headline">Headline</Label>
              <Input
                id="wizard-headline"
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Design engineer"
                ref={headlineRef}
                value={headline}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wizard-bio">Bio</Label>
              <Textarea
                className="min-h-[100px] resize-y"
                id="wizard-bio"
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write at least three words about what you do."
                ref={bioRef}
                rows={4}
                value={bio}
              />
            </div>
          </div>
        ),
      },
      {
        id: "organization",
        title: "Organization",
        description:
          "Where you work. Pick a name your team will recognize on invoices and invites.",
        icon: Building2,
        content: (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wizard-org-name">Company or team name</Label>
              <Input
                id="wizard-org-name"
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Acme Design Co."
                ref={organizationRef}
                value={organization}
              />
            </div>
            <p className="text-muted-foreground text-xs">
              Required before Plan and Review — try Next with an empty field to
              see validation.
            </p>
          </div>
        ),
      },
      {
        id: "plan",
        title: "Plan",
        description:
          "Choose a starting tier. You can change this anytime after signup.",
        icon: Layers,
        content: (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wizard-plan">Product tier</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                id="wizard-plan"
                onChange={(e) => setPlanTier(e.target.value)}
                ref={planSelectRef}
                value={planTier}
              >
                <option value="">Select a plan…</option>
                <option value="starter">Starter — individuals</option>
                <option value="pro">Pro — small teams</option>
                <option value="business">Business — orgs & SSO</option>
              </select>
            </div>
          </div>
        ),
      },
      {
        id: "review",
        title: "Review",
        description: "Confirm your answers before finishing.",
        icon: CheckCircle2,
        content: (
          <div className="space-y-3 text-sm">
            <div className="rounded-lg border bg-background/60 p-3">
              <div className="text-muted-foreground text-xs">Name</div>
              <div className="font-medium text-foreground">
                {accountName.trim() || "—"}
              </div>
            </div>
            <div className="rounded-lg border bg-background/60 p-3">
              <div className="text-muted-foreground text-xs">Email</div>
              <div className="font-medium text-foreground">
                {accountEmail.trim() || "—"}
              </div>
            </div>
            <div className="rounded-lg border bg-background/60 p-3">
              <div className="text-muted-foreground text-xs">Headline</div>
              <div className="font-medium text-foreground">
                {headline.trim() || "—"}
              </div>
            </div>
            <div className="rounded-lg border bg-background/60 p-3">
              <div className="text-muted-foreground text-xs">Bio</div>
              <div className="text-pretty text-foreground leading-relaxed">
                {bio.trim() || "—"}
              </div>
            </div>
            <div className="rounded-lg border bg-background/60 p-3">
              <div className="text-muted-foreground text-xs">Organization</div>
              <div className="font-medium text-foreground">
                {organization.trim() || "—"}
              </div>
            </div>
            <div className="rounded-lg border bg-background/60 p-3">
              <div className="text-muted-foreground text-xs">Plan</div>
              <div className="font-medium text-foreground">
                {planTier === "starter" && "Starter"}
                {planTier === "pro" && "Pro"}
                {planTier === "business" && "Business"}
                {!planTier && "—"}
              </div>
            </div>
            {submitted ? (
              <p className="text-center text-emerald-600 text-sm dark:text-emerald-400">
                <code className="text-foreground">onComplete</code> ran. Reset
                the controlled demo to clear this message.
              </p>
            ) : (
              <p className="text-center text-muted-foreground text-xs">
                Use <strong>Finish</strong> in the bottom bar to run{" "}
                <code className="text-foreground">onComplete</code>.
              </p>
            )}
          </div>
        ),
      },
    ],
    [
      accountEmail,
      accountName,
      bio,
      headline,
      organization,
      planTier,
      submitted,
    ]
  )

  return (
    <div className="">
      <div className="mx-auto max-w-sm sm:max-w-6xl">
        <div className="mx-auto max-w-3xl space-y-12 px-4 sm:space-y-16 sm:px-0">
          <section className="rounded-xl p-4 pb-6 sm:border sm:bg-muted/50 sm:p-6 sm:pb-8">
            <div className="mb-8">
              <h2 className="mb-2 font-medium text-foreground text-lg">
                Validated wizard
              </h2>
              <p className="text-muted-foreground text-sm">
                Five steps with footer navigation,{" "}
                <code className="text-foreground">canNavigateToStep</code>, and{" "}
                <code className="text-foreground">onNavigateBlocked</code>{" "}
                focusing the first invalid field. Profile step includes a hook
                demo button.
              </p>
            </div>

            <WizardExpandable
              badgeText="SIGN UP"
              canNavigateToStep={canNavigateToStep}
              onComplete={() => setSubmitted(true)}
              onNavigateBlocked={onNavigateBlocked}
              steps={validatedSteps}
            />
          </section>
        </div>
      </div>
    </div>
  )
}
