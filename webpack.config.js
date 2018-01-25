const webpack = require('webpack');
const isDev = process.env.DEV !== 'production';

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: "/dist/",
    publicPath: "/dist/",
    filename: "build.js"
  },
  watch: isDev,
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
    presets: ["es2015"],
    plugins: ["async-to-promises", "transform-object-rest-spread"]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devtool: '#eval-source-map'
}

if(!isDev) {
  module.exports.devtool = null;
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ])
}
