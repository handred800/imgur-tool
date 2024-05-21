import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  routes: (_routes) => [
    {
      name: 'album',
      path: '/',
      component: () => import('~/pages/album/index.vue').then(r => r.default || r)
    }
  ],
}