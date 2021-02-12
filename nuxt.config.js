export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'providus-onboarding',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
      },
    ],
  },
  // server: {
  //   host: '0',
  // },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/main.scss'],

  // Plugins to generate: { fallback: true },run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/vueToast.js', ssr: false },
    { src: '~/plugins/loadScript.js', ssr: false },
  ],

  // fallback for static routing
  publicRuntimeConfig: {
    // baseURL: process.env.BASE_URL,
  },

  // Static Build Configuration for Yarn Generate
  ssr: false,
  target: 'static',
  generate: { fallback: true },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],

  // Axios
  axios: {
    baseURL: process.env.BASE_URL,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
  },
}
