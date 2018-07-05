const common = require('./webpack.common');
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }]
      },
    ]
  },
  entry: [
    'react-hot-loader/patch'
  ],
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify('development')
      }
    })
  ],
  devServer: {
    stats: 'errors-only', //display only errors to reduce output amount
    open: false, // open the page in browser
    contentBase: path.join(__dirname, 'dist'),
    hotOnly: true, // don't refresh if hot loading fails
    // use hot: true if you want to refresh on errors too
    host: process.env.HOST, // default is localhost
    // 0.0.0.0 is available to all network devices unlike default localhost
    port: 8888, // process.env.POST default is 8080
    historyApiFallback: true, //enable if using HTML5 History API based routing(eg react-router-dom)
    proxy: {
      "/api": {
        target: "https://easy-mock.com/mock/5b3b6830dae7213852e966eb/test",
        changeOrigin: true,
        // http://localhost:8888/api/getlist => target/api/getlist
        pathRewrite: { '^/api': '' },
        // http://localhost:8888/api/getlist => target/getlist
        secure: false //if target is https protocol
      }
    }
  }
})

