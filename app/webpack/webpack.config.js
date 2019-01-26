const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const NgrockWebpackPlugin = require('./ngrokWebpack')
const common = require('./common')

const hotUrl = process.env.SHARE_TUNNEL ? 'http://kame-dev.ngrok.io' : 'http://localhost:8080'

const development = {
	mode: 'development',
	entry: [
		'babel-polyfill',
		'react-hot-loader/patch',
		`webpack-dev-server/client?${hotUrl}`,
		'webpack/hot/only-dev-server',
		'./src/index.js',
	],
	output: {
		path: path.resolve(__dirname, 'public', 'js'),
		publicPath: '/js',
		filename: 'app.js',
		sourceMapFilename: 'app.js.map',
	},
	devtool: 'cheap-module-eval-source-map',
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				DEBUG: JSON.stringify('web'),
				NODE_ENV: JSON.stringify('development'),
				SHARE_TUNNEL: process.env.SHARE_TUNNEL || null,
			},
		}),
		process.env.SHARE_TUNNEL ? new NgrockWebpackPlugin() : null,
	].filter(Boolean),
	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
		historyApiFallback: true,
		hot: true,
	},
}

const staging = {
	mode: 'production',
	entry: ['babel-polyfill', './src/index.dev.js'],
	output: {
		path: path.resolve(__dirname, 'public', 'js'),
		filename: 'app.js',
		sourceMapFilename: 'app.js.map',
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({
			'process.env.DEBUG': JSON.stringify('web'),
			'process.env.NODE_ENV': JSON.stringify('staging'),
		}),
	],
}

const production = {
	mode: 'production',
	entry: ['./src/index.js'],
	output: {
		path: path.resolve(__dirname, 'public', 'js'),
		filename: 'app.js',
		sourceMapFilename: 'app.js.map',
	},
	optimization: {
		minimize: true,
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendors: {
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
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
}

module.exports = (env) => {
	switch (env) {
		case 'production':
			return merge(common, production)
		case 'staging':
			return merge(common, staging)
		default:
			return merge(common, development)
	}
}
