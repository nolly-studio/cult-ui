import { computed } from 'vue'
import { useConfig } from '@/composables/useConfig'
import { themes } from '@/registry/themes'

export function useThemePrimaryColor() {
  const config = useConfig()
  const colorMode = useColorMode()

  const theme = computed(() => themes.find(t => t.name === config.value.theme))

  const primaryColor = computed(() => {
    const mode = colorMode.value === 'dark' ? 'dark' : 'light'
    return theme.value ? `hsl(${theme.value.cssVars[mode].primary})` : undefined
  })

  return { theme, primaryColor }
}
