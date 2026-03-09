"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  BookOpen,
  Building,
  Building2,
  CircleDashed,
  Code2,
  Download,
  Megaphone,
  Palette,
  Rocket,
  TrendingUp,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  ChoiceGroup,
  FeatureCarousel,
  Onboarding,
  TipsList,
  useOnboarding,
} from "../ui/onboarding"

const STEP_CONFIG = [
  {
    title: "Welcome to AI SDK Agents",
    description: "Lets get you shipping ai agents that actually work.",
  },
  {
    title: "Personalize your experience",
    description: "Tell us about yourself so we can tailor the experience",
  },
  {
    title: "You're ready to go!",
    description: "A few tips to get the most out of AI SDK Agents",
  },
]

export const FEATURES = [
  {
    id: "source-code",
    icon: Code2, // swap Sparkles → Code2
    title: "Full Stack Source Code",
    description:
      "Browse and copy the complete source code for every pattern directly from the Source Code tab.",
    image: "/component-images/onboarding/onboarding-source-code.png",
  },
  {
    id: "skills",
    icon: BookOpen, // swap ImagePlus → BookOpen (or similar)
    title: "Copy Skills & Critical Files",
    description:
      "Copy agent skills and critical files to supercharge your AI-powered workflows.",
    image: "/component-images/onboarding/onboarding-skills.png",
  },
  {
    id: "download",
    icon: Download, // swap Lightbulb → Download
    title: "Download as Next.js App",
    description:
      "Download any pattern as a fully working Next.js application, ready to run locally.",
    image: "/component-images/onboarding/onboarding-nextjs.png",
  },
] as const

export const ROLES = [
  { id: "designer", label: "Designer", icon: Palette },
  { id: "founder", label: "Founder", icon: Rocket },
  { id: "sales", label: "Sales", icon: TrendingUp },
  { id: "freelancer", label: "Freelancer", icon: Building2 },
  { id: "marketing", label: "Marketing", icon: Megaphone },
  { id: "developer", label: "Developer", icon: Code2 },
  { id: "agency", label: "Agency", icon: Building },
  { id: "other", label: "Other", icon: CircleDashed },
] as const

export const GOALS = [
  { id: "ai-agents", label: "Building AI agents" },
  { id: "chatbots", label: "Chatbots & assistants" },
  { id: "automation", label: "Workflow automation" },
  { id: "rag", label: "RAG & search" },
  { id: "prototyping", label: "Rapid prototyping" },
  { id: "other", label: "Something else" },
] as const

export const TIPS = [
  {
    number: 1,
    text: "Browse patterns by use case to find the right agent architecture for your project.",
  },
  {
    number: 2,
    text: "Use the Download as Next.js App button to get a fully working local project in seconds.",
  },
  {
    number: 3,
    text: "Copy skills and critical files to quickly skill up claude code and cursor.",
  },
] as const

export const TOTAL_STEPS = 3
export const MAX_STEP_VALUE = FEATURES.length - 1

// ============================================================================
// Headless Primitives Demo (composable, uses shadcn tokens)
// ============================================================================

export default function OnboardingDemo() {
  return <HeadlessOnboardingDemo />
}

export function HeadlessOnboardingDemo() {
  const [open, setOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setOpen(true)} variant="outline">
        Open Headless Onboarding
      </Button>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent
          className="w-full max-w-[calc(100dvw-2rem)] border-none bg-transparent p-0 shadow-none sm:max-w-3xl"
          showCloseButton={false}
        >
          <div className="w-full rounded-2xl bg-muted p-2">
            <Onboarding
              canGoNext={(step) =>
                step === 1 ||
                (step === 2 && selectedGoal !== null) ||
                step === 3
              }
              className="relative overflow-hidden"
              maxStepValue={MAX_STEP_VALUE}
              onComplete={() => setOpen(false)}
              totalSteps={3}
            >
              <HeadlessOnboardingHeader />
              <div className="my-8 min-h-[280px]">
                <Onboarding.Step step={1}>
                  <HeadlessFeatureStep />
                </Onboarding.Step>
                <Onboarding.Step step={2}>
                  <HeadlessRoleStep
                    onGoalSelect={setSelectedGoal}
                    onRoleSelect={setSelectedRole}
                    selectedGoal={selectedGoal}
                    selectedRole={selectedRole}
                  />
                </Onboarding.Step>
                <Onboarding.Step step={3}>
                  <HeadlessTipsStep />
                </Onboarding.Step>
              </div>
              <Onboarding.Navigation completeLabel="Start Creating" />
            </Onboarding>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function HeadlessOnboardingHeader() {
  const { currentStep } = useOnboarding()
  const config = STEP_CONFIG[currentStep - 1]

  return (
    <DialogHeader className="!text-center">
      {/* <DialogTitle className="font-normal font-pixel-square text-3xl text-foreground"> */}
      <DialogTitle className="font-semibold  text-3xl tracking-tighter text-foreground">
        {config.title}
      </DialogTitle>
      <DialogDescription className="text-base text-muted-foreground">
        {config.description}
      </DialogDescription>
      <div className="pt-3">
        <Onboarding.StepIndicator />
      </div>
    </DialogHeader>
  )
}

function HeadlessFeatureStep() {
  const { stepValue, setStepValue } = useOnboarding()

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
      <FeatureCarousel
        className="order-2 flex w-full flex-col gap-3 md:order-1 md:w-1/2"
        onValueChange={setStepValue}
        totalItems={FEATURES.length}
        value={stepValue}
      >
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon
          const isActive = stepValue === index
          return (
            <FeatureCarousel.Item index={index} key={feature.id}>
              <div
                className={cn(
                  "flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200",
                  isActive
                    ? "border-primary/30 bg-primary/10"
                    : "border-transparent hover:bg-muted"
                )}
              >
                <Icon
                  className={cn(
                    "mt-0.5 size-5 shrink-0",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {feature.title}
                  </p>
                  {isActive && (
                    <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  )}
                </div>
              </div>
            </FeatureCarousel.Item>
          )
        })}
      </FeatureCarousel>
      <div className="order-1 w-full md:order-2 md:w-1/2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-muted">
          <Image
            alt={FEATURES[stepValue].title}
            className="object-cover transition-opacity duration-300"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            src={FEATURES[stepValue].image}
          />
        </div>
      </div>
    </div>
  )
}

function HeadlessRoleStep({
  selectedRole,
  onRoleSelect,
  selectedGoal,
  onGoalSelect,
}: {
  selectedRole: string | null
  onRoleSelect: (v: string) => void
  selectedGoal: string | null
  onGoalSelect: (v: string) => void
}) {
  const { handleNext } = useOnboarding()
  const [question, setQuestion] = useState(selectedGoal ? 2 : 1)

  return (
    <div className="flex flex-col gap-4">
      {question === 1 ? (
        <div className="flex flex-col gap-4" key="q1">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-6 items-center justify-center rounded-lg bg-muted text-muted-foreground text-sm">
              1
            </span>
            <span className="font-medium text-base text-foreground">
              What best describes you?
            </span>
          </div>
          <ChoiceGroup
            className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3"
            name="Select your role"
            onValueChange={(v) => {
              onRoleSelect(v)
              setTimeout(() => setQuestion(2), 300)
            }}
            orientation="grid"
            value={selectedRole}
          >
            {ROLES.map((role) => {
              const Icon = role.icon
              const isSelected = selectedRole === role.id
              return (
                <ChoiceGroup.Item
                  className={cn(
                    "flex items-center gap-2.5 cursor-pointer rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200",
                    isSelected
                      ? "border-primary/30 bg-primary/10 text-foreground"
                      : "border-border bg-background text-foreground hover:bg-muted"
                  )}
                  key={role.id}
                  value={role.id}
                >
                  <Icon className="size-4 shrink-0 text-muted-foreground" />
                  <span>{role.label}</span>
                </ChoiceGroup.Item>
              )
            })}
          </ChoiceGroup>
          <p className="text-muted-foreground text-sm">Question 1 of 2</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4" key="q2">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-6 items-center justify-center rounded-lg bg-muted text-muted-foreground text-sm">
              2
            </span>
            <span className="font-medium text-base text-foreground">
              What do you want to create?
            </span>
          </div>
          <ChoiceGroup
            className="grid grid-cols-2 gap-2 sm:gap-3"
            name="Select your goal"
            onValueChange={(v) => {
              onGoalSelect(v)
              setTimeout(() => handleNext(), 300)
            }}
            orientation="grid"
            value={selectedGoal}
          >
            {GOALS.map((goal) => {
              const isSelected = selectedGoal === goal.id
              return (
                <ChoiceGroup.Item
                  className={cn(
                    "flex items-center cursor-pointer gap-2.5 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200",
                    isSelected
                      ? "border-primary/30 bg-primary/10 text-foreground"
                      : "border-border bg-background text-foreground hover:bg-muted"
                  )}
                  key={goal.id}
                  value={goal.id}
                >
                  <span>{goal.label}</span>
                </ChoiceGroup.Item>
              )
            })}
          </ChoiceGroup>
          <div className="flex items-center justify-between">
            <Button
              className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              onClick={() => setQuestion(1)}
              type="button"
              size="sm"
              variant="ghost"
            >
              <ArrowLeft className="size-4" />
              Back to question 1
            </Button>
            <p className="text-muted-foreground text-sm">Question 2 of 2</p>
          </div>
        </div>
      )}
    </div>
  )
}

function HeadlessTipsStep() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:gap-6">
      <div className="order-2 w-full md:order-1 md:w-1/2">
        <TipsList
          className="flex h-full flex-col [&_[data-slot=tips-list-title]]:not-sr-only [&_[data-slot=tips-list-title]]:mb-4 [&_[data-slot=tips-list-title]]:font-semibold [&_[data-slot=tips-list-title]]:text-muted-foreground [&_[data-slot=tips-list-title]]:text-xs [&_[data-slot=tips-list-title]]:uppercase [&_[data-slot=tips-list-title]]:tracking-wider [&_[data-slot=tips-list-items]]:flex [&_[data-slot=tips-list-items]]:h-full [&_[data-slot=tips-list-items]]:flex-col [&_[data-slot=tips-list-items]]:justify-between [&_[data-slot=tips-list-items]]:gap-4"
          title="Tips"
        >
          {TIPS.map((tip) => (
            <TipsList.Item
              className="flex items-start gap-3 [&_[data-slot=tips-list-item-number]]:inline-flex [&_[data-slot=tips-list-item-number]]:size-6 [&_[data-slot=tips-list-item-number]]:shrink-0 [&_[data-slot=tips-list-item-number]]:items-center [&_[data-slot=tips-list-item-number]]:justify-center [&_[data-slot=tips-list-item-number]]:rounded-lg [&_[data-slot=tips-list-item-number]]:bg-muted [&_[data-slot=tips-list-item-number]]:text-muted-foreground [&_[data-slot=tips-list-item-number]]:text-sm"
              key={tip.number}
              number={tip.number}
            >
              <p className="text-foreground text-sm leading-relaxed">
                {tip.text}
              </p>
            </TipsList.Item>
          ))}
        </TipsList>
      </div>
      <div className="order-1 w-full md:order-2 md:w-1/2">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-background md:aspect-[4/3]">
          <Image
            src="/component-images/onboarding/onboarding-tip1.png"
            alt="Onboarding"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
