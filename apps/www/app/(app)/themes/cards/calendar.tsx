"use client"

import { addDays } from "date-fns"

import { Calendar } from "@/components/ui/calendar"
import {
  TextureCard,
  TextureCardContent,
} from "@/registry/default/ui/texture-card"

const start = new Date(2023, 5, 5)

export function CardsCalendar() {
  return (
    <TextureCard className="max-w-[280px]">
      <TextureCardContent className="p-0">
        <Calendar
          numberOfMonths={1}
          mode="range"
          defaultMonth={start}
          selected={{
            from: start,
            to: addDays(start, 8),
          }}
        />
      </TextureCardContent>
    </TextureCard>
  )
}
