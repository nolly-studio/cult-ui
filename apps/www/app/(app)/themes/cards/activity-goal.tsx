"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { useTheme } from "next-themes"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { useConfig } from "@/hooks/use-config"
import { TextureButton } from "@/registry/default/ui/texture-button"
import {
  TextureCard,
  TextureCardContent,
  TextureCardDescription,
  TextureCardFooter,
  TextureCardHeader,
  TextureCardTitle,
} from "@/registry/default/ui/texture-card"
import { themes } from "@/registry/themes"

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]

export function CardsActivityGoal() {
  const { theme: mode } = useTheme()
  const [config] = useConfig()

  const theme = themes.find((theme) => theme.name === config.theme)
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <TextureCard>
      <TextureCardHeader className="px-2 pb-4">
        <TextureCardTitle className="text-base">Move Goal</TextureCardTitle>
        <TextureCardDescription>
          Set your daily activity goal.
        </TextureCardDescription>
      </TextureCardHeader>
      <TextureCardContent className="px-2 pb-2">
        <div className="flex items-center justify-center space-x-2">
          <TextureButton
            variant="minimal"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(-10)}
            disabled={goal <= 200}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </TextureButton>
          <div className="flex-1 text-center">
            <div className="text-5xl font-bold tracking-tighter">{goal}</div>
            <div className="text-[0.70rem] uppercase text-muted-foreground">
              Calories/day
            </div>
          </div>
          <TextureButton
            variant="minimal"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(10)}
            disabled={goal >= 400}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </TextureButton>
        </div>
        <div className="my-3 h-[60px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar
                dataKey="goal"
                style={
                  {
                    fill: "var(--theme-primary)",
                    opacity: 0.2,
                    "--theme-primary": `hsl(${
                      theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                    })`,
                  } as React.CSSProperties
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </TextureCardContent>
      <TextureCardFooter>
        <TextureButton className="w-full">Set Goal</TextureButton>
      </TextureCardFooter>
    </TextureCard>
  )
}
