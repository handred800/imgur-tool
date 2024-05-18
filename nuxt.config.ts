// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'nuxt-headlessui',
    '@nuxtjs/tailwindcss',
    'nuxt-lucide-icons'
  ],
  headlessui: {
    prefix: 'Headless'
  }
})