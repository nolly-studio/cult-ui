"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentProps,
  type PropsWithChildren,
  type ReactNode,
} from "react"
import { LibraryIcon, PlusSignIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  type DialogDescriptionProps,
  type DialogTitleProps,
} from "@/components/ui/dialog"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useOptionalPromptInputController } from "@/components/ai-elements/prompt-input"

// ============================================================================
// Types
// ============================================================================

export interface Prompt {
  /** Unique identifier for the prompt */
  id: string
  /** Display title for the prompt */
  title: string
  /** Short description shown in the list */
  description: string
  /** The actual prompt content to insert/copy */
  prompt: string
  /** Optional category for grouping */
  category?: string
  /** Whether this is a user-created prompt */
  isCustom?: boolean
}

export interface PromptLibraryContextValue {
  /** All available prompts */
  prompts: Prompt[]
  /** Add a custom prompt */
  addCustom: (prompt: Omit<Prompt, "id" | "isCustom">) => void
  /** Remove a custom prompt */
  removeCustom: (id: string) => void
  /** Select a prompt (insert or copy) */
  selectPrompt: (prompt: Prompt) => void
  /** Last selected prompt ID */
  lastSelectedId: string | null
  /** Open state for the popover */
  open: boolean
  /** Set open state for the popover */
  setOpen: (open: boolean) => void
  /** Open state for the create dialog */
  createDialogOpen: boolean
  /** Set open state for the create dialog */
  setCreateDialogOpen: (open: boolean) => void
}

// ============================================================================
// Context
// ============================================================================

const PromptLibraryContext = createContext<PromptLibraryContextValue | null>(
  null
)

/**
 * Hook to access the PromptLibrary context
 * @throws Error if used outside of PromptLibrary provider
 */
export const usePromptLibrary = () => {
  const ctx = useContext(PromptLibraryContext)
  if (!ctx) {
    throw new Error(
      "usePromptLibrary must be used within a PromptLibrary provider"
    )
  }
  return ctx
}

// ============================================================================
// Controllable State Hook
// ============================================================================

function useControllableState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): [T, (value: T | ((prev: T) => T)) => void] {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const setValue = useCallback(
    (nextValue: T | ((prev: T) => T)) => {
      const resolvedValue =
        typeof nextValue === "function"
          ? (nextValue as (prev: T) => T)(value)
          : nextValue

      if (!isControlled) {
        setUncontrolledValue(resolvedValue)
      }
      onChange?.(resolvedValue)
    },
    [isControlled, onChange, value]
  )

  return [value, setValue]
}

// ============================================================================
// Root Component
// ============================================================================

export type PromptLibraryProps = PropsWithChildren<{
  /** Initial set of prompts */
  prompts?: Prompt[]
  /** Callback when prompts change (for custom prompts) */
  onPromptsChange?: (prompts: Prompt[]) => void
  /** Callback when a prompt is selected */
  onSelect?: (prompt: Prompt) => void
  /** Controlled open state for popover */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
}>

/**
 * Root component for the PromptLibrary widget.
 * Provides context for all child components.
 * Integrates with PromptInput when used inside PromptInputProvider.
 */
export function PromptLibrary({
  prompts: controlledPrompts,
  onPromptsChange,
  onSelect,
  open: controlledOpen,
  onOpenChange,
  children,
}: PromptLibraryProps) {
  const [internalPrompts, setInternalPrompts] = useState<Prompt[]>(
    controlledPrompts ?? []
  )

  const prompts = controlledPrompts ?? internalPrompts

  const [open, setOpen] = useControllableState(
    controlledOpen,
    false,
    onOpenChange
  )
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null)

  // Try to get PromptInput controller for integration
  const promptInputController = useOptionalPromptInputController()

  const selectPrompt = useCallback(
    async (prompt: Prompt) => {
      setLastSelectedId(prompt.id)

      if (promptInputController) {
        // Insert directly into PromptInput textarea
        promptInputController.textInput.setInput(prompt.prompt)
      } else {
        // Fallback: copy to clipboard
        try {
          await navigator.clipboard.writeText(prompt.prompt)
        } catch (err) {
          console.error("Failed to copy to clipboard:", err)
        }
      }

      // Close popover after selection
      setOpen(false)

      // Call onSelect callback
      onSelect?.(prompt)
    },
    [promptInputController, setOpen, onSelect]
  )

  const addCustom = useCallback(
    (prompt: Omit<Prompt, "id" | "isCustom">) => {
      const newPrompt: Prompt = {
        ...prompt,
        id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        isCustom: true,
      }

      if (controlledPrompts) {
        onPromptsChange?.([...controlledPrompts, newPrompt])
      } else {
        setInternalPrompts((prev) => [...prev, newPrompt])
      }
    },
    [controlledPrompts, onPromptsChange]
  )

  const removeCustom = useCallback(
    (id: string) => {
      if (controlledPrompts) {
        onPromptsChange?.(controlledPrompts.filter((p) => p.id !== id))
      } else {
        setInternalPrompts((prev) => prev.filter((p) => p.id !== id))
      }
    },
    [controlledPrompts, onPromptsChange]
  )

  const contextValue = useMemo<PromptLibraryContextValue>(
    () => ({
      prompts,
      addCustom,
      removeCustom,
      selectPrompt,
      lastSelectedId,
      open,
      setOpen,
      createDialogOpen,
      setCreateDialogOpen,
    }),
    [
      prompts,
      addCustom,
      removeCustom,
      selectPrompt,
      lastSelectedId,
      open,
      setOpen,
      createDialogOpen,
    ]
  )

  return (
    <PromptLibraryContext.Provider value={contextValue}>
      <Popover onOpenChange={setOpen} open={open}>
        {children}
      </Popover>
    </PromptLibraryContext.Provider>
  )
}

// ============================================================================
// Trigger Component
// ============================================================================

export type PromptLibraryTriggerProps = ComponentProps<typeof Button> & {
  /** Custom label for the trigger button */
  label?: ReactNode
}

/**
 * Button that opens the prompt library popover.
 */
export function PromptLibraryTrigger({
  className,
  label,
  children,
  ...props
}: PromptLibraryTriggerProps) {
  return (
    <PopoverTrigger asChild>
      <Button
        className={cn("gap-1.5", className)}
        size="sm"
        type="button"
        variant="ghost"
        {...props}
      >
        {children ?? (
          <>
            <HugeiconsIcon
              className="size-3.5"
              icon={LibraryIcon}
              strokeWidth={2}
            />
            {label ?? "Prompts"}
          </>
        )}
      </Button>
    </PopoverTrigger>
  )
}

// ============================================================================
// Content Component
// ============================================================================

export type PromptLibraryContentProps = ComponentProps<typeof PopoverContent>

/**
 * Popover content container for the prompt library list.
 */
export function PromptLibraryContent({
  className,
  children,
  ...props
}: PromptLibraryContentProps) {
  return (
    <PopoverContent
      align="start"
      className={cn("w-80 p-0", className)}
      side="top"
      sideOffset={8}
      {...props}
    >
      <Command className="rounded-lg" data-slot="prompt-library-content">
        {children}
      </Command>
    </PopoverContent>
  )
}

// ============================================================================
// Search Component
// ============================================================================

export type PromptLibrarySearchProps = ComponentProps<typeof CommandInput>

/**
 * Search input for filtering prompts.
 */
export function PromptLibrarySearch({
  placeholder = "Search prompts...",
  className,
  ...props
}: PromptLibrarySearchProps) {
  return (
    <CommandInput
      className={cn(className)}
      data-slot="prompt-library-search"
      placeholder={placeholder}
      {...props}
    />
  )
}

// ============================================================================
// List Component
// ============================================================================

export type PromptLibraryListProps = ComponentProps<typeof CommandList>

/**
 * Scrollable list container for prompts.
 */
export function PromptLibraryList({
  className,
  children,
  ...props
}: PromptLibraryListProps) {
  return (
    <CommandList
      className={cn("max-h-64", className)}
      data-slot="prompt-library-list"
      {...props}
    >
      {children}
    </CommandList>
  )
}

// ============================================================================
// Empty Component
// ============================================================================

export type PromptLibraryEmptyProps = ComponentProps<typeof CommandEmpty>

/**
 * Empty state shown when no prompts match the search.
 */
export function PromptLibraryEmpty({
  children = "No prompts found.",
  className,
  ...props
}: PromptLibraryEmptyProps) {
  return (
    <CommandEmpty
      className={cn(className)}
      data-slot="prompt-library-empty"
      {...props}
    >
      {children}
    </CommandEmpty>
  )
}

// ============================================================================
// Group Component
// ============================================================================

export type PromptLibraryGroupProps = ComponentProps<typeof CommandGroup>

/**
 * Group container for categorizing prompts.
 */
export function PromptLibraryGroup({
  className,
  ...props
}: PromptLibraryGroupProps) {
  return (
    <CommandGroup
      className={cn(
        // Remove default rounding from all items
        "**:[[cmdk-item]]:rounded-none",
        // First child in group gets rounded top
        "[&_[cmdk-group-items]>:first-child_[cmdk-item]]:rounded-t-md",
        // Last child in group gets rounded bottom
        "[&_[cmdk-group-items]>:last-child_[cmdk-item]]:rounded-b-md",
        className
      )}
      data-slot="prompt-library-group"
      {...props}
    />
  )
}

// ============================================================================
// Separator Component
// ============================================================================

export type PromptLibrarySeparatorProps = ComponentProps<
  typeof CommandSeparator
>

/**
 * Visual separator between prompt groups.
 */
export function PromptLibrarySeparator({
  className,
  ...props
}: PromptLibrarySeparatorProps) {
  return (
    <CommandSeparator
      className={cn(className)}
      data-slot="prompt-library-separator"
      {...props}
    />
  )
}

// ============================================================================
// Item Component
// ============================================================================

export type PromptLibraryItemProps = Omit<
  ComponentProps<typeof CommandItem>,
  "value" | "onSelect"
> & {
  /** The prompt data */
  prompt: Prompt
  /** Disable hover card preview */
  disablePreview?: boolean
}

/**
 * Individual prompt item with click-to-select and optional hover preview.
 */
export function PromptLibraryItem({
  prompt,
  disablePreview = false,
  className,
  children,
  ...props
}: PromptLibraryItemProps) {
  const { selectPrompt, lastSelectedId } = usePromptLibrary()
  const isLastSelected = lastSelectedId === prompt.id

  const handleSelect = () => {
    selectPrompt(prompt)
  }

  const itemContent = (
    <CommandItem
      className={cn(
        "group/prompt-item flex cursor-pointer items-start gap-3 py-2",
        isLastSelected && "bg-accent/50",
        className
      )}
      data-slot="prompt-library-item"
      data-state={isLastSelected ? "selected" : "idle"}
      onSelect={handleSelect}
      value={prompt.title}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {children ?? (
          <>
            <PromptLibraryItemTitle>{prompt.title}</PromptLibraryItemTitle>
            <PromptLibraryItemDescription>
              {prompt.description}
            </PromptLibraryItemDescription>
          </>
        )}
      </div>
    </CommandItem>
  )

  if (disablePreview || !prompt.prompt) {
    return itemContent
  }

  return (
    <PromptLibraryHoverCard prompt={prompt}>
      {itemContent}
    </PromptLibraryHoverCard>
  )
}

// ============================================================================
// Item Title Component
// ============================================================================

export type PromptLibraryItemTitleProps = ComponentProps<"span">

/**
 * Title text for a prompt item.
 */
export function PromptLibraryItemTitle({
  className,
  ...props
}: PromptLibraryItemTitleProps) {
  return (
    <span
      className={cn("font-medium text-foreground text-xs", className)}
      data-slot="prompt-library-item-title"
      {...props}
    />
  )
}

// ============================================================================
// Item Description Component
// ============================================================================

export type PromptLibraryItemDescriptionProps = ComponentProps<"span">

/**
 * Description text for a prompt item.
 */
export function PromptLibraryItemDescription({
  className,
  ...props
}: PromptLibraryItemDescriptionProps) {
  return (
    <span
      className={cn("line-clamp-2 text-muted-foreground text-xs", className)}
      data-slot="prompt-library-item-description"
      {...props}
    />
  )
}

// ============================================================================
// Hover Card Component
// ============================================================================

export interface PromptLibraryHoverCardProps {
  /** The prompt to preview */
  prompt: Prompt
  /** The trigger element (prompt item) */
  children: ReactNode
}

/**
 * Hover card that shows the full prompt content on hover.
 */
export function PromptLibraryHoverCard({
  prompt,
  children,
}: PromptLibraryHoverCardProps) {
  return (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent
        align="start"
        className="w-80"
        data-slot="prompt-library-hover-card"
        side="right"
        sideOffset={8}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm">{prompt.title}</span>
            <span className="text-muted-foreground text-xs">
              {prompt.description}
            </span>
          </div>
          {prompt.prompt && (
            <div className="rounded-md bg-muted/50 p-2">
              <p className="line-clamp-6 whitespace-pre-wrap text-muted-foreground text-xs">
                {prompt.prompt}
              </p>
            </div>
          )}
          {prompt.category && (
            <span className="text-[0.625rem] text-muted-foreground">
              Category: {prompt.category}
            </span>
          )}
          {prompt.isCustom && (
            <span className="text-[0.625rem] text-muted-foreground">
              Custom prompt
            </span>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

// ============================================================================
// Footer Component
// ============================================================================

export type PromptLibraryFooterProps = ComponentProps<"div">

/**
 * Footer container that stays fixed at the bottom of the popover.
 * Use this to place the create trigger outside the scrollable list.
 */
export function PromptLibraryFooter({
  className,
  children,
  ...props
}: PromptLibraryFooterProps) {
  return (
    <div
      className={cn("border-t p-1", className)}
      data-slot="prompt-library-footer"
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// Create Trigger Component
// ============================================================================

export type PromptLibraryCreateTriggerProps = Omit<
  ComponentProps<typeof CommandItem>,
  "onSelect"
> & {
  /** Custom label for the create button */
  label?: ReactNode
}

/**
 * Button that opens the create prompt dialog.
 */
export function PromptLibraryCreateTrigger({
  label = "New Prompt",
  className,
  children,
  ...props
}: PromptLibraryCreateTriggerProps) {
  const { setCreateDialogOpen, setOpen } = usePromptLibrary()

  const handleSelect = () => {
    setOpen(false)
    setCreateDialogOpen(true)
  }

  return (
    <CommandItem
      className={cn(
        "flex cursor-pointer items-center gap-2 text-muted-foreground",
        className
      )}
      data-slot="prompt-library-create-trigger"
      onSelect={handleSelect}
      value="__new_prompt__"
      {...props}
    >
      {children ?? (
        <>
          <HugeiconsIcon
            className="size-3.5"
            icon={PlusSignIcon}
            strokeWidth={2}
          />
          {label}
        </>
      )}
    </CommandItem>
  )
}

// ============================================================================
// Create Dialog Component
// ============================================================================

export type PromptLibraryCreateDialogProps = Omit<
  ComponentProps<typeof Dialog>,
  "open" | "onOpenChange" | "children"
> & {
  /** Dialog title */
  title?: DialogTitleProps["children"]
  /** Dialog description */
  description?: DialogDescriptionProps["children"]
  /** Custom form content to replace the default form */
  children?: ReactNode
}

/**
 * Modal dialog for creating custom prompts.
 */
export function PromptLibraryCreateDialog({
  title = "Create Prompt",
  description = "Create a custom prompt template for quick access.",
  children,
  ...props
}: PromptLibraryCreateDialogProps) {
  const { createDialogOpen, setCreateDialogOpen, addCustom } =
    usePromptLibrary()
  const [formTitle, setFormTitle] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [formPrompt, setFormPrompt] = useState("")
  const [formCategory, setFormCategory] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!(formTitle.trim() && formDescription.trim() && formPrompt.trim())) {
      return
    }

    addCustom({
      title: formTitle.trim(),
      description: formDescription.trim(),
      prompt: formPrompt.trim(),
      category: formCategory.trim() || undefined,
    })

    // Reset form
    setFormTitle("")
    setFormDescription("")
    setFormPrompt("")
    setFormCategory("")
    setCreateDialogOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    setCreateDialogOpen(open)
    if (!open) {
      // Reset form when closing
      setFormTitle("")
      setFormDescription("")
      setFormPrompt("")
      setFormCategory("")
    }
  }

  return (
    <Dialog
      data-slot="prompt-library-create-dialog"
      onOpenChange={handleOpenChange}
      open={createDialogOpen}
      {...props}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children ?? (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-xs" htmlFor="prompt-title">
                Title
              </label>
              <Input
                id="prompt-title"
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g., Code Review"
                required
                value={formTitle}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="font-medium text-xs"
                htmlFor="prompt-description"
              >
                Description
              </label>
              <Input
                id="prompt-description"
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="e.g., Review code for best practices"
                required
                value={formDescription}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-xs" htmlFor="prompt-content">
                Prompt
              </label>
              <Textarea
                className="min-h-24 resize-none"
                id="prompt-content"
                onChange={(e) => setFormPrompt(e.target.value)}
                placeholder="Enter the prompt text..."
                required
                value={formPrompt}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-xs" htmlFor="prompt-category">
                Category (optional)
              </label>
              <Input
                id="prompt-category"
                onChange={(e) => setFormCategory(e.target.value)}
                placeholder="e.g., Development"
                value={formCategory}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ============================================================================
// Compound Export
// ============================================================================

export const PromptLibraryWidget = Object.assign(PromptLibrary, {
  Trigger: PromptLibraryTrigger,
  Content: PromptLibraryContent,
  Search: PromptLibrarySearch,
  List: PromptLibraryList,
  Empty: PromptLibraryEmpty,
  Group: PromptLibraryGroup,
  Separator: PromptLibrarySeparator,
  Item: PromptLibraryItem,
  ItemTitle: PromptLibraryItemTitle,
  ItemDescription: PromptLibraryItemDescription,
  HoverCard: PromptLibraryHoverCard,
  Footer: PromptLibraryFooter,
  CreateTrigger: PromptLibraryCreateTrigger,
  CreateDialog: PromptLibraryCreateDialog,
})
