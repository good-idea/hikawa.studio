const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const WriteFilePlugin = require('write-file-webpack-plugin')
const common = require('./common')

const res = (p) => path.resolve(__dirname, p)

const nodeModules = res('../node_modules')
const entry = res('../src/server/render.js')
const output = res('../build/server')

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
	.readdirSync(nodeModules)
	.filter((x) => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
	.reduce((acc, mod) => {
		acc[mod] = `commonjs ${mod}`
		return acc
	}, {})

externals['react-dom/server'] = 'commonjs react-dom/server'

const config = {
	name: 'server',
	devtool: 'source-map',
	target: 'node',
	mode: 'development',
	entry: ['regenerator-runtime/runtime.js', entry],
	externals,
	output: {
		path: output,
		filename: '[name].js',
		libraryTarget: 'commonjs2',
	},

	plugins: [
		new WriteFilePlugin(),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
			},
		}),
	],
}

module.exports = merge(common, config)
