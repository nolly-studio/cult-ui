"use client"

import { useCallback, useState } from "react"
import { Plus, RepeatIcon, Settings2Icon, XIcon } from "lucide-react"
import { AnimatePresence, LayoutGroup, motion } from "motion/react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { DirectionAwareTabs } from "@/registry/default/ui/direction-aware-tabs"

import SortableList, { Item, SortableListItem } from "../ui/sortable-list"

const initialState = [
  {
    text: "Gather Data",
    checked: false,
    id: 1,
    description:
      "Collect relevant marketing copy from the user's website and competitor sites to understand the current market positioning and identify potential areas for improvement.",
  },
  {
    text: "Analyze Copy",
    checked: false,
    id: 2,
    description:
      "As an AI language model, analyze the collected marketing copy for clarity, persuasiveness, and alignment with the user's brand voice and target audience. Identify strengths, weaknesses, and opportunities for optimization.",
  },
  {
    text: "Create Suggestions",
    checked: false,
    id: 3,
    description:
      "Using natural language generation techniques, create alternative versions of the marketing copy that address the identified weaknesses and leverage the opportunities for improvement. Ensure the generated copy is compelling, on-brand, and optimized for the target audience.",
  },
  {
    text: "Recommendations",
    checked: false,
    id: 5,
    description:
      "Present the AI-generated marketing copy suggestions to the user, along with insights on why these changes were recommended. Provide a user-friendly interface for the user to review, edit, and implement the optimized copy on their website.",
  },
]

function SortableListDemo() {
  const [items, setItems] = useState<Item[]>(initialState)
  const [openItemId, setOpenItemId] = useState<number | null>(null)
  const [tabChangeRerender, setTabChangeRerender] = useState<number>(1)
  const [topP, setTopP] = useState([10])
  const [temp, setTemp] = useState([10])
  const [tokens, setTokens] = useState([10])

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
    order: number,
    onCompleteItem: (id: number) => void,
    onRemoveItem: (id: number) => void
  ) => {
    const isOpen = item.id === openItemId

    const tabs = [
      {
        id: 0,
        label: "Title",
        content: (
          <div className="flex w-full flex-col pr-2 py-2">
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.75,
                delay: 0.15,
              }}
            >
              <label className="text-xs text-neutral-400">
                Short title for your agent task
              </label>
              <motion.input
                type="text"
                value={item.text}
                className=" w-full rounded-lg border font-semibold border-black/10 bg-neutral-800 px-1 py-[6px] text-xl md:text-3xl text-white placeholder:text-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13EEE3]/80 dark:border-white/10"
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
        label: "Prompt",
        content: (
          <div className="flex flex-col  pr-2 ">
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.75,
                delay: 0.15,
              }}
            >
              <label className="text-xs text-neutral-400" htmlFor="prompt">
                Prompt{" "}
                <span className="lowercase">
                  instructing your agent how to {item.text.slice(0, 20)}
                </span>
              </label>
              <textarea
                id="prompt"
                className="h-[100px] w-full resize-none rounded-[6px]  bg-neutral-800 px-2 py-[2px] text-sm text-white placeholder:text-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13EEE3]/80"
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
        label: "Settings",
        content: (
          <div className="flex flex-col py-2 px-1 ">
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.75,
                delay: 0.15,
              }}
              className="space-y-3"
            >
              <p className="text-xs text-neutral-400">
                AI settings for the{" "}
                <span className="lowercase">
                  {item.text.slice(0, 20)} stage
                </span>
              </p>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-neutral-400" htmlFor="top-p">
                    Top P
                  </label>
                  <div className="flex w-1/2 items-center gap-3">
                    <span className="w-12 rounded-md  bg-black/20 px-2 py-0.5 text-right text-sm text-muted-foreground">
                      {topP}
                    </span>
                    <Slider
                      id="temperature"
                      max={1}
                      defaultValue={topP}
                      step={0.1}
                      onValueChange={setTopP}
                      className="[&_[role=slider]]:h-8 [&_[role=slider]]:w-5 [&_[role=slider]]:rounded-md [&_[role=slider]]:border-neutral-100/10 [&_[role=slider]]:bg-neutral-900 [&_[role=slider]]:hover:border-[#13EEE3]/70 "
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
                    <span className="w-12 rounded-md  bg-black/20 px-2 py-0.5 text-right text-sm text-muted-foreground">
                      {temp}
                    </span>
                    <Slider
                      id="top-p"
                      max={1}
                      defaultValue={temp}
                      step={0.1}
                      onValueChange={setTemp}
                      className="[&_[role=slider]]:h-8 [&_[role=slider]]:w-5 [&_[role=slider]]:rounded-md [&_[role=slider]]:border-neutral-100/10 [&_[role=slider]]:bg-neutral-900 [&_[role=slider]]:hover:border-[#13EEE3]/70"
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
                    <span className="w-12 rounded-md  bg-black/20 px-2 py-0.5 text-right text-sm text-muted-foreground">
                      {tokens}
                    </span>
                    <Slider
                      id="max_tokens"
                      max={1}
                      defaultValue={tokens}
                      step={0.1}
                      onValueChange={setTokens}
                      className="[&_[role=slider]]:h-8 [&_[role=slider]]:w-5 [&_[role=slider]]:rounded-md [&_[role=slider]]:border-neutral-100/10 [&_[role=slider]]:bg-neutral-900 [&_[role=slider]]:hover:border-[#13EEE3]/70"
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
      <SortableListItem
        item={item}
        order={order}
        key={item.id}
        isExpanded={isOpen}
        onCompleteItem={onCompleteItem}
        onRemoveItem={onRemoveItem}
        handleDrag={handleCloseOnDrag}
        className="my-2 "
        renderExtra={(item) => (
          <div
            key={`${isOpen}`}
            className={cn(
              "flex h-full w-full flex-col items-center justify-center gap-2 ",
              isOpen ? "py-1 px-1" : "py-3 "
            )}
          >
            <motion.button
              layout
              onClick={() => setOpenItemId(!isOpen ? item.id : null)}
              key="collapse"
              className={cn(
                isOpen
                  ? "absolute right-3 top-3 z-10 "
                  : "relative z-10 ml-auto mr-3 "
              )}
            >
              {isOpen ? (
                <motion.span
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    type: "spring",
                    duration: 1.95,
                  }}
                >
                  <XIcon className="h-5 w-5 text-neutral-500" />
                </motion.span>
              ) : (
                <motion.span
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    type: "spring",
                    duration: 0.95,
                  }}
                >
                  <Settings2Icon className="stroke-1 h-5 w-5 text-white/80  hover:stroke-[#13EEE3]/70 " />
                </motion.span>
              )}
            </motion.button>

            <LayoutGroup id={`${item.id}`}>
              <AnimatePresence mode="popLayout">
                {isOpen ? (
                  <motion.div className="flex w-full flex-col ">
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
                          rounded="rounded "
                          tabs={tabs}
                          onChange={() =>
                            setTabChangeRerender(tabChangeRerender + 1)
                          }
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      key={`re-render-${tabChangeRerender}`} //  re-animates the button section on tab change
                      className="mb-2 flex w-full items-center justify-between pl-2"
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{
                        type: "spring",
                        bounce: 0,
                        duration: 0.55,
                      }}
                    >
                      <motion.div className="flex items-center gap-2 pt-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#13EEE3]" />
                        <span className="text-xs text-neutral-300/80">
                          Changes
                        </span>
                      </motion.div>
                      <motion.div layout className="ml-auto mr-1  pt-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setOpenItemId(null)
                            toast.info("Changes saved")
                          }}
                          className="h-7 rounded-lg bg-[#13EEE3]/80 hover:bg-[#13EEE3] hover:text-black text-black"
                        >
                          Apply Changes
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </LayoutGroup>
          </div>
        )}
      />
    )
  }

  return (
    <div className="md:px-4 w-full max-w-xl ">
      <div className="mb-9 rounded-2xl  p-2 shadow-sm md:p-6 dark:bg-[#151515]/50 bg-black">
        <div className=" overflow-auto p-1  md:p-4">
          <div className="flex flex-col space-y-2">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="256"
                height="260"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 256 260"
                className="h-6 w-6 fill-neutral-500 "
              >
                <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" />
              </svg>
              <h3 className="text-neutral-200">Agent workflow</h3>
              <a
                className="text-xs text-white/80"
                href="https://www.uilabs.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Inspired by <span className="text-[#13EEE3]"> @mrncst</span>
              </a>
            </div>
            <div className="flex items-center justify-between gap-4 py-2">
              <button disabled={items?.length > 5} onClick={handleAddItem}>
                <Plus className="dark:text-netural-100 h-5 w-5 text-neutral-500/80 hover:text-white/80" />
              </button>
              <div data-tip="Reset task list">
                <button onClick={handleResetItems}>
                  <RepeatIcon className="dark:text-netural-100 h-4 w-4 text-neutral-500/80 hover:text-white/80" />
                </button>
              </div>
            </div>
            <SortableList
              items={items}
              setItems={setItems}
              onCompleteItem={handleCompleteItem}
              renderItem={renderListItem}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortableListDemo
