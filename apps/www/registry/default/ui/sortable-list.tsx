"use client"

// npx shadcn-ui@latest add checkbox
// npm  i react-use-measure
import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import {
  AnimatePresence,
  LayoutGroup,
  Reorder,
  motion,
  useDragControls,
} from "framer-motion"
import { Plus, RepeatIcon, Trash } from "lucide-react"
import useMeasure from "react-use-measure"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

export type Item = {
  text: string
  checked: boolean
  id: number
  description: string
}

interface SortableListItemProps {
  item: Item
  onCompleteItem: (id: number) => void
  onRemoveItem: (id: number) => void
  renderExtra?: (item: Item) => React.ReactNode
  isExpanded?: boolean
  className?: string
  handleDrag: () => void
}

function SortableListItem({
  item,
  onCompleteItem,
  onRemoveItem,
  renderExtra,
  handleDrag,
  isExpanded,
  className,
}: SortableListItemProps) {
  let [ref, bounds] = useMeasure()
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggable, setIsDraggable] = useState(true)
  const dragControls = useDragControls()

  const handleDragStart = (event: any) => {
    setIsDragging(true)
    dragControls.start(event, { snapToCursor: true })
    handleDrag()
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <motion.div
      className={cn(
        "flex w-full items-center justify-between gap-2",
        className
      )}
      key={item.id}
    >
      <div className="flex w-full items-center justify-between gap-0">
        <Reorder.Item
          value={item}
          className={cn(
            "relative z-auto grow",
            "shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]",
            item.checked ? "cursor-not-allowed" : "cursor-grab",
            "h-full rounded-2xl border border-white/10 bg-[#141712]",
            item.checked && !isDragging ? "w-7/10" : "w-full"
          )}
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            height: bounds.height > 0 ? bounds.height : undefined,
            transition: { type: "spring", bounce: 0, duration: 0.3 },
          }}
          exit={{
            opacity: 0,
            transition: {
              delay: 0,
              duration: 0.05,
              type: "spring",
              bounce: 0,
            },
          }}
          layout
          layoutId={`item-${item.id}`}
          dragListener={!item.checked}
          dragControls={dragControls}
          onDragEnd={handleDragEnd}
          style={
            isExpanded
              ? {
                  zIndex: 9999,
                  marginTop: 10,
                  marginBottom: 10,
                  position: "relative",
                  overflow: "hidden",
                }
              : {
                  position: "relative",
                  overflow: "hidden",
                }
          }
          whileDrag={{ zIndex: 9999 }}
        >
          <div ref={ref} className="z-20">
            <motion.div layout="position" className="flex items-center gap-4 ">
              <AnimatePresence>
                {!isExpanded ? (
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.001 }}
                    className="flex w-full items-center gap-4 p-1"
                  >
                    <Checkbox
                      checked={item.checked}
                      id={`checkbox-${item.id}`}
                      aria-label="Mark as done"
                      onCheckedChange={() => onCompleteItem(item.id)}
                      className="ml-3 h-5 w-5 rounded-md border-neutral-400/80 bg-black data-[state=checked]:bg-black"
                    />
                    <motion.span className="w-full px-1 text-lg tracking-tight text-neutral-300/90">
                      {item.text}
                    </motion.span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              {renderExtra && renderExtra(item)}
            </motion.div>
          </div>
          <div
            onPointerDown={isDraggable ? handleDragStart : undefined}
            style={{ touchAction: "none" }}
          />
        </Reorder.Item>
        <AnimatePresence mode="popLayout">
          {item.checked ? (
            <motion.div
              layout
              initial={{ opacity: 0, x: -1 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.17,
                  duration: 0.2,
                  type: "spring",
                  bounce: 0.3,
                },
                zIndex: 5,
              }}
              exit={{
                opacity: 0,
                x: -5,
                transition: {
                  delay: 0,
                  duration: 0.05,
                  type: "spring",
                  bounce: 0,
                },
              }}
              className="-ml-2 h-[3.1rem] w-4 rounded-l-sm  rounded-r-md border-y border-r border-y-white/10 border-r-white/10 bg-[#141712]   shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]"
            />
          ) : null}
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          {item.checked ? (
            <motion.div
              layout
              initial={{ opacity: 0, x: -5, filter: "blur(4px)" }}
              animate={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                transition: {
                  delay: 0.3,
                  duration: 0.15,
                  type: "spring",
                  bounce: 0.9,
                },
              }}
              exit={{
                opacity: 0,
                filter: "blur(4px)",
                x: -10,
                transition: { delay: 0, duration: 0.12 },
              }}
              className="inset-0 z-0 border-spacing-1  rounded-r-xl border-y border-r-2 border-y-white/10 border-r-red-300 bg-[#141712]/80 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)] dark:bg-[#141712]/50"
            >
              <button
                className=" group inline-flex  h-9 items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium ring-offset-background transition-colors duration-150 hover:bg-[#141712] hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => onRemoveItem(item.id)}
              >
                <Trash className="h-4 w-4 text-red-400 transition-colors duration-150 group-hover:fill-red-400/60" />
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

SortableListItem.displayName = "SortableListItem"

interface SortableListProps {
  items: Item[]
  setItems: Dispatch<SetStateAction<Item[]>>
  onCompleteItem: (id: number) => void
  renderItem: (
    item: Item,
    onCompleteItem: (id: number) => void,
    onRemoveItem: (id: number) => void
  ) => ReactNode
}

function SortableList({
  items,
  setItems,
  onCompleteItem,
  renderItem,
}: SortableListProps) {
  if (items) {
    return (
      <LayoutGroup>
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className="flex flex-col"
        >
          <AnimatePresence>
            {items?.map((item) =>
              renderItem(item, onCompleteItem, (id: number) =>
                setItems((items) => items.filter((item) => item.id !== id))
              )
            )}
          </AnimatePresence>
        </Reorder.Group>
      </LayoutGroup>
    )
  }
  return null
}

SortableList.displayName = "SortableList"

export { SortableList, SortableListItem }
export default SortableList
