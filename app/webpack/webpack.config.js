const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const LoadablePlugin = require('@loadable/webpack-plugin')
const common = require('./common')

const production = {
	mode: 'production',
	entry: ['@babel/polyfill', './src/app/index.js'],
	output: {
		path: path.resolve(__dirname, '..', 'public', 'js'),
		publicPath: '/js/',
		filename: '[name].js',
		sourceMapFilename: 'app.js.map',
	},
	plugins: [
		new LoadablePlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
}

module.exports = merge(common, production)
