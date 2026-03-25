export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
  ],
  colorMode: {
    classSuffix: '',
  },
  css: ['~/assets/css/globals.css'],
  alias: {
    '@': '.',
  },
  typescript: {
    strict: true,
  },
  compatibilityDate: '2025-01-01',
})
