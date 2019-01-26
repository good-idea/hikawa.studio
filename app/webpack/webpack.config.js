const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const LoadablePlugin = require('@loadable/webpack-plugin')
const common = require('./common')

const production = {
	mode: 'production',
	entry: ['./src/app/index.js'],
	output: {
		path: path.resolve(__dirname, '..', 'public', 'js'),
		publicPath: '/js/',
		filename: '[name].[chunkhash].js',
		sourceMapFilename: 'app.js.map',
	},
	plugins: [
		new LoadablePlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
	optimization: {
		concatenateModules: !Boolean(process.env.WEBPACK_STATS),
		splitChunks: {
			chunks: 'all',
			minSize: 20,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},
}

module.exports = merge(common, production)
