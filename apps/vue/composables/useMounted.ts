import { onMounted, ref } from "vue"

export function useMounted() {
  const mounted = ref(false)

  onMounted(() => {
    mounted.value = true
  })

  return mounted
}
