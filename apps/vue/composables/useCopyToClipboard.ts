import { ref } from "vue"

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
}: {
  timeout?: number
  onCopy?: () => void
} = {}) {
  const isCopied = ref(false)
  let resetTimer: ReturnType<typeof setTimeout> | null = null

  function copyToClipboard(value: string) {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      return
    }

    if (!value) return

    navigator.clipboard.writeText(value).then(() => {
      isCopied.value = true

      if (onCopy) {
        onCopy()
      }

      if (timeout !== 0) {
        if (resetTimer) clearTimeout(resetTimer)
        resetTimer = setTimeout(() => {
          isCopied.value = false
        }, timeout)
      }
    }, console.error)
  }

  return { isCopied, copyToClipboard }
}
