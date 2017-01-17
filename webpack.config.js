const webpack = require('webpack')

module.exports = {
  entry: './index.js',
  target: 'web',
  output: {
    path: __dirname,
    filename: 'generated/bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components']
  },
  node: {
    fs: false
  },
  browser: {
    fs: false
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    )
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      {
        test: /\.js$/,
        loaders: [
          'transform-loader/cacheable?bulkify',
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
