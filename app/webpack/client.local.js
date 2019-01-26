const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const WriteFilePlugin = require('write-file-webpack-plugin') // here so you can see what chunks are built
const common = require('./common')

const config = {
	name: 'client',
	target: 'web',
	devtool: 'inline-source-map',
	entry: [
		'@babel/polyfill',
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
		'react-hot-loader/patch',
		path.resolve(__dirname, '../src/app/index.js'),
	],
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, '../build/app'),
		publicPath: '/public/',
	},
	mode: 'development',
	plugins: [
		new WriteFilePlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				IS_SSR: true,
				NODE_ENV: JSON.stringify('development'),
			},
		}),
	],
}

module.exports = merge(common, config)
