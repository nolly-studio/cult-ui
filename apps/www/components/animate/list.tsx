"use client"

// https://blog.maximeheckel.com/posts/framer-motion-layout-animations/
import React, { useCallback, useState } from "react"
import {
  AnimatePresence,
  LayoutGroup,
  Reorder,
  motion,
  useDragControls,
} from "framer-motion"
import { CogIcon, Plus, RepeatIcon, Trash, XIcon } from "lucide-react"
import useMeasure from "react-use-measure"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { DirectionAwareTabs } from "@/registry/default/ui/direction-aware-tabs"

import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import { Slider } from "../ui/slider"

type Item = {
  text: string
  checked: boolean
  id: number
  description: string
}

interface ListItemProps {
  item: Item
  onCompleteItem: (id: number) => void
  onRemoveItem: (id: number) => void
  renderExtra?: (item: Item) => React.ReactNode
  isExpanded?: boolean
  className?: string
  handleDrag: () => void
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  onCompleteItem,
  onRemoveItem,
  renderExtra,
  handleDrag,
  isExpanded,
  className,
}) => {
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
                      className="ml-3 h-5 w-5 rounded-md border-neutral-400/80 bg-black "
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

interface ListProps {
  items: Item[]
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
  onAddItem: () => void
  onResetItems: () => void
  onCompleteItem: (id: number) => void
  renderItem: (
    item: Item,
    onCompleteItem: (id: number) => void,
    onRemoveItem: (id: number) => void
  ) => React.ReactNode
}

const List: React.FC<ListProps> = ({
  items,
  setItems,
  onAddItem,
  onResetItems,
  onCompleteItem,
  renderItem,
}) => {
  return (
    <div className="mb-9  ">
      <div className=" overflow-auto  p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between gap-4">
            <button
              className="flex items-center  gap-1 rounded-md border border-black/10 p-2 disabled:opacity-50"
              disabled={items.length > 5}
              onClick={onAddItem}
            >
              <Plus className="dark:text-netural-100 h-4 w-4 text-neutral-800" />
              New stage
            </button>
            <div data-tip="Reset task list">
              <button onClick={onResetItems}>
                <RepeatIcon className="dark:text-netural-100 h-4 w-4 text-neutral-800" />
              </button>
            </div>
          </div>
          <LayoutGroup>
            <Reorder.Group
              axis="y"
              values={items}
              onReorder={setItems}
              className="flex flex-col"
            >
              <AnimatePresence>
                {items.map((item) =>
                  renderItem(item, onCompleteItem, (id: number) =>
                    setItems((items) => items.filter((item) => item.id !== id))
                  )
                )}
              </AnimatePresence>
            </Reorder.Group>
          </LayoutGroup>
        </div>
      </div>
    </div>
  )
}

const initialState = [
  {
    text: "Scrape",
    checked: false,
    id: 1,
    description: "Collecting and preparing data for training.",
  },
  {
    text: "Process",
    checked: false,
    id: 2,
    description: "Cleaning and transforming data for the model.",
  },
  {
    text: "Refine",
    checked: false,
    id: 3,
    description: "Training the AI model with the prepared data.",
  },

  {
    text: "Send to user",
    checked: false,
    id: 5,
    description: "Deploying the trained model for real-world use.",
  },
]

const AIAgentListDemo: React.FC = () => {
  const [items, setItems] = useState<Item[]>(initialState)
  const [openItemId, setOpenItemId] = useState<number | null>(null)
  const [isTabChanged, setIsTabChanged] = useState<boolean | null>(false)
  const [topP, setTopP] = React.useState([10])
  const [temp, setTemp] = React.useState([10])
  const [tokens, setTokens] = React.useState([10])

  const handleCompleteItem = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        text: `Item ${prevItems.length + 1}`,
        checked: false,
        id: Date.now(),
        description: "",
      },
    ])
  }

  const handleResetItems = () => {
    setItems(initialState)
  }

  const handleCloseOnDrag = useCallback(() => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.checked ? { ...item, checked: false } : item
      )
      return updatedItems.some(
        (item, index) => item.checked !== prevItems[index].checked
      )
        ? updatedItems
        : prevItems
    })
  }, [])

  const renderListItem = (
    item: Item,
    onCompleteItem: (id: number) => void,
    onRemoveItem: (id: number) => void
  ) => {
    const isOpen = item.id === openItemId

    const tabs = [
      {
        id: 0,
        label: "title",
        content: (
          <div className="flex w-full flex-col pr-2 ">
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ type: "spring", duration: 2.75, delay: 0.2 }}
            >
              <label className="text-xs text-neutral-400">Title</label>
              <motion.input
                type="text"
                value={item.text}
                className="h-12 w-full rounded-lg border border-black/10 bg-neutral-800 px-1 text-sm text-white placeholder:text-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 dark:border-white/10"
                onChange={(e) => {
                  const text = e.target.value
                  setItems((prevItems) =>
                    prevItems.map((i) =>
                      i.id === item.id ? { ...i, text } : i
                    )
                  )
                }}
              />
            </motion.div>
          </div>
        ),
      },
      {
        id: 1,
        label: "prompt",
        content: (
          <div className="flex flex-col py-2 pr-2">
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ type: "spring", duration: 2.75, delay: 0.2 }}
            >
              <label className="text-xs text-neutral-400">Prompt</label>
              <textarea
                className="h-[120px] w-full resize-none rounded-[6px]  bg-neutral-800 px-2 py-[6px] text-sm text-white placeholder:text-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                value={item.description}
                placeholder="update agent prompt"
                onChange={(e) => {
                  const description = e.target.value
                  setItems((prevItems) =>
                    prevItems.map((i) =>
                      i.id === item.id ? { ...i, description } : i
                    )
                  )
                }}
              />
            </motion.div>
          </div>
        ),
      },
      {
        id: 2,
        label: "settings",
        content: (
          <div className="flex flex-col py-2 pr-2 ">
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ type: "spring", duration: 2.75, delay: 0.2 }}
              className="space-y-3"
            >
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-neutral-400" htmlFor="top-p">
                    Top P
                  </label>
                  <div className="flex w-1/2 items-center gap-3">
                    <span className="w-12 rounded-md border border-white/10 bg-black px-2 py-0.5 text-right text-sm text-muted-foreground">
                      {topP}
                    </span>
                    <Slider
                      id="temperature"
                      max={1}
                      defaultValue={topP}
                      step={0.1}
                      onValueChange={setTopP}
                      className="[&_[role=slider]]:h-8 [&_[role=slider]]:w-5 [&_[role=slider]]:rounded-md [&_[role=slider]]:border-neutral-100/10 [&_[role=slider]]:bg-neutral-900 [&_[role=slider]]:hover:border-cyan-300/70 "
                      aria-label="Top P"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-neutral-400" htmlFor="top-p">
                    Temperature
                  </label>
                  <div className="flex w-1/2 items-center gap-3">
                    <span className="w-12 rounded-md border border-white/10 bg-black px-2 py-0.5 text-right text-sm text-muted-foreground">
                      {temp}
                    </span>
                    <Slider
                      id="top-p"
                      max={1}
                      defaultValue={temp}
                      step={0.1}
                      onValueChange={setTemp}
                      className="[&_[role=slider]]:h-8 [&_[role=slider]]:w-5 [&_[role=slider]]:rounded-md [&_[role=slider]]:border-neutral-100/10 [&_[role=slider]]:bg-neutral-900 [&_[role=slider]]:hover:border-cyan-300/70"
                      aria-label="Temperature"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-neutral-400" htmlFor="top-p">
                    Max Tokens
                  </label>
                  <div className="flex w-1/2 items-center gap-3">
                    <span className="w-12 rounded-md border border-white/10 bg-black px-2 py-0.5 text-right text-sm text-muted-foreground">
                      {tokens}
                    </span>
                    <Slider
                      id="max_tokens"
                      max={1}
                      defaultValue={tokens}
                      step={0.1}
                      onValueChange={setTokens}
                      className="[&_[role=slider]]:h-8 [&_[role=slider]]:w-5 [&_[role=slider]]:rounded-md [&_[role=slider]]:border-neutral-100/10 [&_[role=slider]]:bg-neutral-900 [&_[role=slider]]:hover:border-cyan-300/70"
                      aria-label="Tokens"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ),
      },
    ]

    return (
      <ListItem
        item={item}
        key={item.id}
        isExpanded={isOpen}
        onCompleteItem={onCompleteItem}
        onRemoveItem={onRemoveItem}
        handleDrag={handleCloseOnDrag}
        className="my-2 "
        renderExtra={(item) => (
          <Collapsible
            open={isOpen}
            onOpenChange={(open) => setOpenItemId(open ? item.id : null)}
            className={cn(
              "flex h-full w-full flex-col items-center justify-center gap-2 px-1",
              isOpen ? "py-1" : "py-3"
            )}
          >
            <CollapsibleTrigger asChild className="cursor-pointer">
              <motion.button
                layout
                key="collapse"
                className={cn(
                  isOpen
                    ? "absolute right-3 top-3 z-10 "
                    : "relative z-10 ml-auto mr-3"
                )}
              >
                {isOpen ? (
                  <XIcon className="h-5 w-5 text-neutral-500" />
                ) : (
                  <CogIcon className="mt-1.5 h-6 w-6 text-neutral-500 hover:rotate-12" />
                )}
              </motion.button>
            </CollapsibleTrigger>

            <LayoutGroup id={`${item.id}`}>
              <CollapsibleContent className="flex w-full flex-col ">
                <div className=" w-full  ">
                  <motion.div
                    initial={{
                      y: 0,
                      opacity: 0,
                      filter: "blur(4px)",
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      type: "spring",
                      duration: 0.15,
                    }}
                    layout
                    className="  w-full"
                  >
                    <DirectionAwareTabs
                      className="mr-auto bg-transparent pr-2"
                      rounded="rounded-xl "
                      tabs={tabs}
                      onChange={() => setIsTabChanged(!isTabChanged)}
                    />
                  </motion.div>
                </div>

                <motion.div
                  layout
                  key={`re-render-${isTabChanged}`} //  re-animates the button section on tab change
                  className="mb-2 flex w-full items-center justify-between pl-2"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ type: "spring", duration: 0.25, delay: 0.2 }}
                  exit={{ opacity: 0, transition: { duration: 0 } }}
                >
                  <div className="flex items-center gap-2 pt-2">
                    <motion.div className="h-1.5 w-1.5 rounded-full bg-cyan-200" />
                    <span className="text-xs text-neutral-300/80">Changes</span>
                  </div>
                  <div className="ml-auto mr-2 pt-2 ">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setOpenItemId(null)
                        toast.info("Changes saved")
                      }}
                      className="h-7 rounded-lg bg-cyan-300 text-black"
                    >
                      Apply Changes
                    </Button>
                  </div>
                </motion.div>
              </CollapsibleContent>
            </LayoutGroup>
          </Collapsible>
        )}
      />
    )
  }

  return (
    <List
      items={items}
      setItems={setItems}
      onAddItem={handleAddItem}
      onResetItems={handleResetItems}
      onCompleteItem={handleCompleteItem}
      renderItem={renderListItem}
    />
  )
}

export default AIAgentListDemo
