"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

/* ═══════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════════════ */

const TAG_VARIANTS = {
  feature: { bg: "rgba(59,130,246,0.10)", color: "#2563eb" },
  bug: { bg: "rgba(239,68,68,0.10)", color: "#dc2626" },
  design: { bg: "rgba(168,85,247,0.10)", color: "#9333ea" },
  done: { bg: "rgba(16,185,129,0.10)", color: "#059669" },
  improvement: { bg: "rgba(245,158,11,0.10)", color: "#d97706" },
  docs: { bg: "rgba(6,182,212,0.10)", color: "#0891b2" },
}

const COLUMN_META = {
  todo: {
    icon: (
      <svg
        aria-hidden="true"
        fill="none"
        height="13"
        stroke="#b0b0b0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
        viewBox="0 0 24 24"
        width="13"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  "in-progress": {
    icon: (
      <svg
        aria-hidden="true"
        fill="none"
        height="13"
        stroke="#f59e0b"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
        viewBox="0 0 24 24"
        width="13"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  done: {
    icon: (
      <svg
        aria-hidden="true"
        fill="none"
        height="13"
        stroke="#10b981"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
        viewBox="0 0 24 24"
        width="13"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
}

export type TagVariant = keyof typeof TAG_VARIANTS
export type ColumnStatus = keyof typeof COLUMN_META

export type CardTag = {
  label: string
  variant: TagVariant
}

export type Assignee = {
  name: string
  avatar?: string
}

export type CardData = {
  id: string
  title: string
  tags?: CardTag[]
  assignee?: Assignee
  date?: string
}

export type ColumnData = {
  id: ColumnStatus
  title: string
  status: ColumnStatus
  cards: CardData[]
}

export type DragState = {
  cardId: string
  fromColumn: ColumnStatus
} | null

type TagProps = {
  label: string
  variant: TagVariant
}

type AvatarProps = {
  src?: string
  name?: string
}

type CardProps = {
  card: CardData
  isDone: boolean
  index: number
  onDragStart: () => void
  onDragEnd: () => void
  isDragging: boolean
}

type DropIndicatorProps = {
  isActive: boolean
}

export type ColumnProps = {
  column: ColumnData
  onDrop: (
    cardId: string,
    fromColumnId: ColumnStatus,
    toColumnId: ColumnStatus
  ) => void
  dragState: DragState
  setDragState: React.Dispatch<React.SetStateAction<DragState>>
}

const springTransition = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
}
export const gentleSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 26,
}

/* ═══════════════════════════════════════════════════════════════════════
   TAG
   ═══════════════════════════════════════════════════════════════════════ */

function Tag({ label, variant }: TagProps) {
  const v = TAG_VARIANTS[variant] || TAG_VARIANTS.feature
  return (
    <span
      className="inline-block rounded-[6px] px-[7px] py-[2.5px] font-semibold text-[10.5px] leading-snug tracking-wide"
      style={{ backgroundColor: v.bg, color: v.color }}
    >
      {label}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   AVATAR
   ═══════════════════════════════════════════════════════════════════════ */

function Avatar({ src, name }: AvatarProps) {
  if (src) {
    return (
      <Image
        alt={name || ""}
        className="size-[22px] rounded-full object-cover"
        height={22}
        src={src}
        style={{
          outline: "1px solid var(--border)",
          outlineOffset: "-1px",
        }}
        width={22}
      />
    )
  }
  const initials = (name || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  return (
    <div
      className="flex size-[22px] items-center justify-center rounded-full font-bold text-[9px]"
      style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
    >
      {initials}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   CARD
   ═══════════════════════════════════════════════════════════════════════ */

const cardVariants = {
  initial: { opacity: 0, y: 8, scale: 0.97, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -6, scale: 0.98, filter: "blur(3px)" },
}

function Card({
  card,
  isDone,
  index,
  onDragStart,
  onDragEnd,
  isDragging,
}: CardProps) {
  const shouldReduce = useReducedMotion()
  const tags = card.tags ?? []

  return (
    <motion.div
      animate="animate"
      className="not-prose flex cursor-grab select-none flex-col gap-1.5 active:cursor-grabbing"
      draggable
      exit="exit"
      initial="initial"
      layout
      layoutId={card.id}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      style={{
        borderRadius: 14,
        background: "var(--muted)",
        padding: "8px 10px",
        boxShadow: isDragging
          ? "0 0 0 1px var(--border), 0 12px 32px rgba(0,0,0,0.18), 0 4px 8px rgba(0,0,0,0.10)"
          : "0 0 0 1px var(--border), 0 1px 2px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.03)",
        opacity: isDone && !isDragging ? 0.5 : 1,
        position: "relative",
        zIndex: isDragging ? 50 : 1,
      }}
      transition={{
        ...gentleSpring,
        delay: shouldReduce ? 0 : index * 0.05,
        layout: springTransition,
      }}
      variants={cardVariants}
      whileHover={{
        y: -2,
        boxShadow:
          "0 0 0 1px var(--border), 0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)",
        transition: { type: "spring", stiffness: 400, damping: 20 },
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Tag
              key={`${card.id}-${tag.label}-${tag.variant}`}
              label={tag.label}
              variant={tag.variant}
            />
          ))}
        </div>
      )}

      {/* Title — `div` avoids `.prose p` margins when embedded in MDX/docs */}
      <div
        className="font-semibold text-[11.5px] leading-snug"
        style={{
          color: "var(--foreground)",
          textDecoration: isDone ? "line-through" : "none",
          textDecorationColor: isDone ? "var(--muted-foreground)" : undefined,
          textWrap: "pretty",
        }}
      >
        {card.title}
      </div>

      {/* Footer */}
      {(card.assignee || card.date) && (
        <div className="flex items-center justify-between">
          {card.assignee ? (
            <Avatar name={card.assignee.name} src={card.assignee.avatar} />
          ) : (
            <div />
          )}
          {card.date && (
            <span
              className="font-medium text-[10.5px] tabular-nums"
              style={{ color: "var(--muted-foreground)" }}
            >
              {card.date}
            </span>
          )}
        </div>
      )}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   DROP INDICATOR
   ═══════════════════════════════════════════════════════════════════════ */

function DropIndicator({ isActive }: DropIndicatorProps) {
  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : 0,
        scaleX: isActive ? 1 : 0.3,
      }}
      className="pointer-events-none mx-auto"
      initial={false}
      style={{
        height: 3,
        width: "60%",
        borderRadius: 99,
        background:
          "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)",
        marginTop: 2,
        marginBottom: 2,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   COLUMN
   ═══════════════════════════════════════════════════════════════════════ */

export function Column({
  column,
  onDrop,
  dragState,
  setDragState,
}: ColumnProps) {
  const [dragOver, setDragOver] = useState(false)
  const meta = COLUMN_META[column.status] || COLUMN_META.todo
  const isDone = column.status === "done"
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setDragOver(false), 60)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setDragOver(false)
      if (dragState) {
        onDrop(dragState.cardId, dragState.fromColumn, column.id)
      }
    },
    [dragState, onDrop, column.id]
  )

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col">
      {/* Header */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mb-[14px] flex items-center gap-[7px] px-[2px]"
        initial={{ opacity: 0, y: -4 }}
        transition={{ ...gentleSpring, delay: 0.05 }}
      >
        {meta.icon}
        <span
          className="font-bold text-[13px] tracking-[-0.01em]"
          style={{ color: "var(--foreground)" }}
        >
          {column.title}
        </span>
        <motion.span
          animate={{ scale: 1, opacity: 1 }}
          className="ml-auto font-semibold text-[12.5px] tabular-nums"
          initial={{ scale: 0.6, opacity: 0 }}
          key={column.cards.length}
          style={{ color: "var(--muted-foreground)" }}
          transition={springTransition}
        >
          {column.cards.length}
        </motion.span>
      </motion.div>

      {/* Card list — flex-1 so drop target spans full column below header (short / empty columns) */}
      <motion.div
        animate={{
          backgroundColor: dragOver
            ? "rgba(59,130,246,0.045)"
            : "rgba(0,0,0,0)",
          scale: dragOver ? 1.012 : 1,
        }}
        className="flex min-h-0 flex-1 flex-col gap-2 rounded-2xl p-0.5"
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
      >
        <DropIndicator isActive={dragOver} />

        <AnimatePresence initial={false} mode="popLayout">
          {column.cards.map((card, i) => (
            <Card
              card={card}
              index={i}
              isDone={isDone}
              isDragging={dragState?.cardId === card.id}
              key={card.id}
              onDragEnd={() => setDragState(null)}
              onDragStart={() =>
                setDragState({ cardId: card.id, fromColumn: column.id })
              }
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
