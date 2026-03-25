import { ref, type Component, type VNode } from "vue"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

export interface ToasterToast {
  id: string
  title?: string
  description?: string
  action?: Component | VNode
  variant?: "default" | "destructive"
  open?: boolean
  duration?: number
  onOpenChange?: (open: boolean) => void
}

type Toast = Omit<ToasterToast, "id">

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toasts = ref<ToasterToast[]>([])
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

function addToRemoveQueue(toastId: string) {
  if (toastTimeouts.has(toastId)) return

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    toasts.value = toasts.value.filter((t) => t.id !== toastId)
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

function dismiss(toastId?: string) {
  if (toastId) {
    addToRemoveQueue(toastId)
  } else {
    toasts.value.forEach((t) => addToRemoveQueue(t.id))
  }

  toasts.value = toasts.value.map((t) =>
    t.id === toastId || toastId === undefined ? { ...t, open: false } : t
  )
}

function toast(props: Toast) {
  const id = genId()

  const update = (updatedProps: Partial<ToasterToast>) => {
    toasts.value = toasts.value.map((t) =>
      t.id === id ? { ...t, ...updatedProps } : t
    )
  }

  const dismissToast = () => dismiss(id)

  toasts.value = [
    {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismissToast()
      },
    },
    ...toasts.value,
  ].slice(0, TOAST_LIMIT)

  return { id, dismiss: dismissToast, update }
}

export function useToast() {
  return {
    toasts,
    toast,
    dismiss,
  }
}

export { toast }
