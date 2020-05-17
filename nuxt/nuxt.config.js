const colors = require('vuetify/es5/util/colors').default
require('dotenv').config({
    path: '../.env',
})

module.exports = {
    mode: 'universal',
    env: {
        GQL_SERVER_URL: process.env.GQL_SERVER_URL,
        NUXT_SECRETKEY: process.env.NUXT_SECRETKEY,
        MA_SHORT_PERIOD: process.env.MA_SHORT_PERIOD,
        MA_LONG_PERIOD: process.env.MA_LONG_PERIOD,
        PATIENT_DEC_PERIOD: process.env.PATIENT_DEC_PERIOD
    },
    server: {
        port: 3000, // デフォルト: 3000
        host: '0.0.0.0', // デフォルト: localhost
    },
    /*
     ** Headers of the page
     */
    head: {
        titleTemplate: '%s | 新型コロナ分析アプリ',
        htmlAttrs: {
            lang: 'ja',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: '新型コロナウイルスの感染傾向を分析するアプリです。',
            },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
            },
            {
                rel: 'stylesheet',
                href:
                    'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
            },
        ],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },

    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/rapi',
        '~/plugins/element-ui',
        { src: '~/plugins/echarts', mode: 'client' },
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        // Doc: https://github.com/nuxt-community/dotenv-module
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /*
     ** vuetify module configuration
     ** https://github.com/nuxt-community/vuetify-module
     */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
            },
        },
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},
    },
}
