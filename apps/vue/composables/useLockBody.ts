import { useScrollLock } from "@vueuse/core"

export { useScrollLock }

export function useLockBody() {
  const isLocked = useScrollLock(
    typeof document !== "undefined" ? document.body : null,
    true
  )
  return isLocked
}
