<script setup lang="ts">
const colorMode = useColorMode()

const toggleMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const setMode = (mode: 'light' | 'dark' | 'system') => {
  colorMode.preference = mode
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-9 px-0">
        <Sun class="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon class="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="setMode('light')">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="setMode('dark')">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="setMode('system')">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
