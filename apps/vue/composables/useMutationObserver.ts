import {
  useMutationObserver as _useMutationObserver,
  type MaybeElementRef,
} from "@vueuse/core"

export { _useMutationObserver as useMutationObserver }

export function useMutationObserverWithDefaults(
  target: MaybeElementRef,
  callback: MutationCallback,
  options: MutationObserverInit = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  }
) {
  return _useMutationObserver(target, callback, options)
}
