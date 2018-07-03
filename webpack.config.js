const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use: ['file-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'split'
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(argv.mode)
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