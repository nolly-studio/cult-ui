"use client"

import { useCallback, useState } from "react"
import { MotionConfig } from "motion/react"

import {
  Column,
  gentleSpring,
  type ColumnData,
  type ColumnStatus,
  type DragState,
} from "@/registry/default/ui/kanban-board"

const SAMPLE_COLUMNS: ColumnData[] = [
  {
    id: "todo",
    title: "Backlog",
    status: "todo",
    cards: [
      {
        id: "1",
        title: "Draft Q2 nurture email series",
        tags: [{ label: "Campaign", variant: "feature" }],
        assignee: {
          name: "Méschac Irung",
          avatar: "https://i.pravatar.cc/80?img=11",
        },
        date: "Jan 8",
      },
      {
        id: "2",
        title: "Fix broken UTMs on paid search ads",
        tags: [{ label: "Tracking", variant: "bug" }],
        assignee: {
          name: "Bernard Ngandu",
          avatar: "https://i.pravatar.cc/80?img=12",
        },
        date: "Jan 5",
      },
      {
        id: "6",
        title: "Refresh one-pager for enterprise pitch",
        tags: [{ label: "Collateral", variant: "docs" }],
        assignee: { name: "Anika Patel" },
        date: "Jan 9",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In flight",
    status: "in-progress",
    cards: [
      {
        id: "3",
        title: "Homepage hero & social proof block",
        tags: [{ label: "Creative", variant: "design" }],
        assignee: {
          name: "Théo Balick",
          avatar: "https://i.pravatar.cc/80?img=33",
        },
        date: "Jan 6",
      },
      {
        id: "7",
        title: "A/B test LinkedIn lead-gen forms",
        tags: [{ label: "Growth", variant: "improvement" }],
        assignee: {
          name: "Liam Chen",
          avatar: "https://i.pravatar.cc/80?img=53",
        },
        date: "Jan 7",
      },
    ],
  },
  {
    id: "done",
    title: "Launched",
    status: "done",
    cards: [
      {
        id: "4",
        title: "Spring launch landing page live",
        tags: [{ label: "Launch", variant: "done" }],
        assignee: {
          name: "Méschac Irung",
          avatar: "https://i.pravatar.cc/80?img=11",
        },
        date: "Jan 3",
      },
    ],
  },
]

function KanbanBoardDemo() {
  const [columns, setColumns] = useState<ColumnData[]>(SAMPLE_COLUMNS)
  const [dragState, setDragState] = useState<DragState>(null)

  const handleDrop = useCallback(
    (cardId: string, fromColumnId: ColumnStatus, toColumnId: ColumnStatus) => {
      if (fromColumnId === toColumnId) {
        return
      }
      setColumns((prev) => {
        const fromCol = prev.find((c) => c.id === fromColumnId)
        const card = fromCol?.cards.find((c) => c.id === cardId)
        if (!card) {
          return prev
        }
        return prev.map((col) => {
          if (col.id === fromColumnId) {
            return {
              ...col,
              cards: col.cards.filter((c) => c.id !== cardId),
            }
          }
          if (col.id === toColumnId) {
            return { ...col, cards: [...col.cards, card] }
          }
          return col
        })
      })
    },
    []
  )

  return (
    <MotionConfig transition={gentleSpring}>
      <div
        className="flex min-h-[500px] w-full max-w-4xl items-start justify-center bg-[#f0f0f0]/20 px-6 py-12 antialiased dark:bg-transparent"
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <div className="w-full max-w-[520px]">
          <div className="grid grid-cols-3 gap-5">
            {columns.map((col) => (
              <Column
                column={col}
                dragState={dragState}
                key={col.id}
                onDrop={handleDrop}
                setDragState={setDragState}
              />
            ))}
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}

export default KanbanBoardDemo
