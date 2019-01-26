const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const WriteFilePlugin = require('write-file-webpack-plugin') // here so you can see what chunks are built
const StatsPlugin = require('stats-webpack-plugin')
const common = require('./common')

const config = {
	name: 'client',
	target: 'web',
	devtool: 'source-map',
	mode: 'development',
	entry: ['@babel/polyfill', path.resolve(__dirname, '../src/app/index.js')],

	output: {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, '../build/app'),
		publicPath: '/public/',
	},
	stats: 'verbose',

	plugins: [
		new StatsPlugin('client-stats.json'),
		new WriteFilePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				IS_SSR: true,

				NODE_ENV: JSON.stringify('development'),
			},
		}),
		new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
	],
}

module.exports = merge(common, config)
