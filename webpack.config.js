var webpack = require('webpack')

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: "/dist/",
    publicPath: "/dist/",
    filename: "build.js"
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/src|vue-router\//,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  babel: {
    presets: ["stage-3"]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  }
}
