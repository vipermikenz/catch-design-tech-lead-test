const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    entry: "./src/main.js",
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: 1000,
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
      })
    ]
  },
  devServer: {
    hot: false,
    client: {
      webSocketURL: {
        hostname: 'localhost',
        pathname: '/ws',
        port: '8080',
        protocol: 'ws'
      },
    },
    webSocketServer: false,
  },
  transpileDependencies: [], // Set to an empty array if no specific dependencies need to be transpiled
};
