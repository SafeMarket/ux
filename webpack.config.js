const path = require('path')

module.exports = {
  entry: {
    app: './app.js',
    style: './style.js'
  },
  target: 'web',
  output: {
    path: path.join(__dirname, 'generated'),
    filename: '[name].js'
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
  node: {
    fs: false
  },
  browser: {
    fs: false
  },
  plugins: [],
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      {
        test: /\.js$/,
        loaders: [
          'transform-loader/cacheable?brfs',
          'eslint-loader'
        ]
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader' },
      { test: /\.txt$/, loader: 'raw-loader' }
    ]
  }
}
