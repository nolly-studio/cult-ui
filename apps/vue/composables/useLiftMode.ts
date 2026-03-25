import { computed } from "vue"
import { useLocalStorage } from "@vueuse/core"

export function useLiftMode(name: string) {
  const chunks = useLocalStorage<string[]>("lift-mode", [])

  function toggleLiftMode(chunkName: string) {
    if (chunks.value.includes(chunkName)) {
      chunks.value = chunks.value.filter((n) => n !== chunkName)
    } else {
      chunks.value = [...chunks.value, chunkName]
    }
  }

  const isLiftMode = computed(() => chunks.value.includes(name))

  return {
    isLiftMode,
    toggleLiftMode,
  }
}
