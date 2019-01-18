const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],

    script: [
      { src: 'https://js.stripe.com/v3/' },
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/sass/app.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: './plugins/mixins/flash.js', ssr: false },
    './plugins/mixins/validation.js',
    './plugins/axios.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv'
  ],

  router: {
    middleware: [
      'clearValidationErrors',
      'clearFlashMessage'
    ]
  },

  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: process.env.BASE_URL
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'meta.token' },
          user: { url: '/auth/me', method: 'get', propertyName: 'data' },
          logout: { url: '/auth/logout', method: 'delete' },
        }
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,

    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    }
  }
}
