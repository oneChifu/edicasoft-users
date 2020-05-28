module.exports = {
  lintOnSave: false,

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