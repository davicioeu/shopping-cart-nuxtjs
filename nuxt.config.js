import webpack from 'webpack'
require('dotenv').config()

module.exports = {
  mode: 'universal', // Comment this for SSR

  srcDir: __dirname,

  env: {
    appUrl: process.env.APP_URL,
    apiUrl: process.env.API_URL || process.env.APP_URL + '/api',
    appName: process.env.APP_NAME || 'Laravel Nuxt',
    appLocale: process.env.APP_LOCALE || 'ru',
    imgUrl: process.env.IMG_URL
  },

  head: {
    title: process.env.APP_NAME,
    titleTemplate: process.env.APP_NAME + ' | %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i|Raleway:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&subset=cyrillic' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css' }
    ],
    script: [
      { src: '/js/jquery-3.4.1.min.js' },
      { src: '/js/jquery.fancybox.js' },
      { src: '/js/jqui.js' },
      { src: '/js/owl.carousel.js' }
    ]
  },

  loading: { color: '#BD4F50' },

  router: {
    middleware: ['locale', 'check-auth']
  },

  css: [
    '~/assets/css/animate.css',
    '~/assets/css/owl.carousel.css',
    '~/assets/css/owl.theme.default.css',
    '~/assets/css/jquery.fancybox.css',
    '~/assets/css/styles.css'
  ],

  plugins: [
    '~components/global',
    '~plugins/i18n',
    '~plugins/axios',
    // '~plugins/nuxt-client-init', // Comment this for SSR
    '~plugins/v-click-outside',
    '~plugins/vue-fragment',
    '~plugins/vue-scroll-to',
    '~plugins/route-before-each',
    { src: '~plugins/vue-notification', ssr: false },
    { src: '~plugins/vee-validate', ssr: false },
    { src: '~/plugins/vue-gallery.js', ssr: false },
    { src: '~/plugins/vue-clipboard.js', ssr: false },
    { src: '~/plugins/vue-star-rating.js', ssr: false }
  ],

  modules: [
    '@nuxtjs/router',
    ['nuxt-validate', {
      fieldsBagName: 'veeFields',
      errorBagName: 'veeErrors',
      lang: 'ru'
    }],
    ['nuxt-log', {
      isEnabled: true,
      logLevel: 'debug',
      stringifyArguments: false,
      showLogLevel: false,
      showMethodName: false,
      separator: '|',
      showConsoleColors: true
    }]
  ],

  build: {
    extractCSS: true,
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
