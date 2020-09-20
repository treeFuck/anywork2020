// cnpm install uglifyjs-webpack-plugin@1.3.0 -D
// 高版本的的uglifyjs用不了，装个低版本的
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  publicPath: './',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              pure_funcs: ['console.log', 'console.debug']//移除console
            }
          }
        })
      ]
    },
  }
}

