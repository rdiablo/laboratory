module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
      },
      postcss: {
        plugins: [],
      },
    },
    extract: false,
  },
  publicPath: process.env.PUBLIC_PATH || '/',
  "transpileDependencies": [
    "vuetify"
  ]
}