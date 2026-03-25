import { onClickOutside, type MaybeElementRef } from "@vueuse/core"

export { onClickOutside }

export function useClickOutside(
  target: MaybeElementRef,
  handler: (event: Event) => void
) {
  return onClickOutside(target, handler)
}
