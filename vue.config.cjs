module.exports = {
  runtimeCompiler: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
      },
      postcss: {
        plugins: [],
      }
    },
    extract: false,
  },
  publicPath: process.env.PUBLIC_PATH || '/',
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: () => ({
    devtool: 'source-map',
    target: 'electron-renderer',
    node: {
      fs: 'empty'
    },
    externals: {
      './cptable': 'var cptable' 
    },
    optimization: {
      splitChunks: undefined
    }
  }),
  chainWebpack: config => {
    config.module
      .rule('vue')
  },
  configureWebpack: {
    externals: {
      './cptable': 'var cptable' 
    }
  }
}