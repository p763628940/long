var webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')
// vue.config.js
function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
    configureWebpack: {
      plugins: [
        new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			// jquery: "jquery",
			// "window.jQuery": "jquery"
        }),
        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, './static'),
              to: config.dev.assetsSubDirectory,
              ignore: ['.*']
            }
          ])
      ],
      resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
		}
      }
    }
  }