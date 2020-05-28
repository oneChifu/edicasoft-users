module.exports = {
  lintOnSave: false,

  publicPath: process.env.NODE_ENV === 'production' ? 'https://onechifu.github.io/edicasoft-users/dist/' : '/',

  transpileDependencies: [
    "vuetify"
  ],

  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/scss/custom-variables.scss"`,
      },
      scss: {
        prependData: `@import "~@/assets/scss/custom-variables.scss";`,
      }
    }
  },

  runtimeCompiler: true
}