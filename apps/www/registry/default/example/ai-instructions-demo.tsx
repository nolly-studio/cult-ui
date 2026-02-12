"use client"

import { useState } from "react"

import {
  Instruction,
  Instructions,
  InstructionsContent,
  InstructionsCreateDialog,
  InstructionsCreateTrigger,
  InstructionsEmpty,
  InstructionsFooter,
  InstructionsGroup,
  InstructionsItem,
  InstructionsList,
  InstructionsSearch,
  InstructionsTrigger,
} from "../ui/ai-instructions"

const SAMPLE_INSTRUCTIONS: Instruction[] = [
  {
    id: "concise",
    title: "Be Concise",
    description: "Keep responses short and to the point",
    content:
      "Provide brief, focused responses. Avoid unnecessary elaboration unless specifically requested. Get to the point quickly.",
  },
  {
    id: "code-examples",
    title: "Include Code Examples",
    description: "Always include relevant code snippets",
    content:
      "When explaining technical concepts, always include working code examples that demonstrate the concept. Use appropriate syntax highlighting.",
  },
  {
    id: "explain-reasoning",
    title: "Explain Your Reasoning",
    description: "Walk through your thought process step by step",
    content:
      "Before providing a solution, explain the reasoning behind your approach. Break down complex problems into smaller steps.",
  },
  {
    id: "typescript",
    title: "Prefer TypeScript",
    description: "Use TypeScript over JavaScript when possible",
    content:
      "Write all code examples in TypeScript with proper type annotations. Include interfaces and type definitions.",
  },
  {
    id: "accessibility",
    title: "Consider Accessibility",
    description: "Ensure solutions are accessible to all users",
    content:
      "Include ARIA attributes, semantic HTML, keyboard navigation support, and screen reader considerations in all UI-related code.",
  },
]

export default function AiInstructionsDemo() {
  const [activeInstructions, setActiveInstructions] = useState<string[]>([
    "concise",
  ])
  const [instructions, setInstructions] =
    useState<Instruction[]>(SAMPLE_INSTRUCTIONS)

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="rounded-lg border bg-card p-4">
        <p className="mb-3 text-muted-foreground text-sm">
          Configure AI behavior with custom instructions. Click the button below
          to manage your active instructions.
        </p>
        <Instructions
          instructions={instructions}
          onInstructionsChange={setInstructions}
          onValueChange={setActiveInstructions}
          value={activeInstructions}
        >
          <InstructionsTrigger />
          <InstructionsContent>
            <InstructionsSearch />
            <InstructionsList>
              <InstructionsEmpty />
              <InstructionsGroup heading="Available Instructions">
                {instructions.map((instruction) => (
                  <InstructionsItem
                    instruction={instruction}
                    key={instruction.id}
                  />
                ))}
              </InstructionsGroup>
            </InstructionsList>
            <InstructionsFooter>
              <InstructionsCreateTrigger />
            </InstructionsFooter>
          </InstructionsContent>
          <InstructionsCreateDialog />
        </Instructions>
      </div>
      {activeInstructions.length > 0 && (
        <div className="rounded-lg border bg-muted/50 p-3">
          <p className="mb-2 font-medium text-xs">
            Active ({activeInstructions.length}):
          </p>
          <div className="flex flex-wrap gap-1.5">
            {activeInstructions.map((id) => {
              const instruction = instructions.find((i) => i.id === id)
              return instruction ? (
                <span
                  className="rounded-md bg-primary/10 px-2 py-0.5 text-primary text-xs"
                  key={id}
                >
                  {instruction.title}
                </span>
              ) : null
            })}
          </div>
        </div>
      )}
    </div>
  )
}
