module.exports = {
  presets: [
    '@vue/babel-preset-app'
  ],
  plugins: ['syntax-async-generators', 'transform-async-generator-functions', 'transform-regenerator', 'transform-class-properties'],
  'env': {
    'test': {
      'plugins': ['transform-class-properties']
    }
  }
}
