const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const NgrockWebpackPlugin = require('./ngrokWebpack.js')
const common = require('./common')

const hotUrl = process.env.SHARE_TUNNEL ? 'http://hikawa-dev.ngrok.io' : 'http://localhost:8080'

const config = {
	mode: 'development',

	target: 'web',

	entry: [
		'@babel/polyfill',
		'react-hot-loader/patch',
		`webpack-dev-server/client?${hotUrl}`,
		'webpack/hot/only-dev-server',
		'./app/index.js',
	],

	context: path.resolve(__dirname, '../src'),

	output: {
		// path: path.resolve(__dirname, 'public', '/js'),
		publicPath: '/',
		// filename: 'app.js',
		// sourceMapFilename: 'app.js.map',
	},

	devtool: 'cheap-module-eval-source-map',

	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new CircularDependencyPlugin({
			// exclude detection of files based on a RegExp
			exclude: /a\.js|node_modules/,
			// add errors to webpack instead of warnings
			failOnError: true,
			// allow import cycles that include an asyncronous import,
			// e.g. via import(/* webpackMode: "weak" */ './file.js')
			allowAsyncCycles: false,
			// set the current working directory for displaying module paths
			cwd: process.cwd(),
		}),

		new webpack.DefinePlugin({
			'process.env': {
				BROWSER: JSON.stringify(true),
				NODE_ENV: JSON.stringify('development'),
			},
		}),
		new HtmlWebpackPlugin({ template: path.resolve(__dirname, '..', 'src', 'app', 'index-dev.html.ejs') }),
		process.env.SHARE_TUNNEL ? new NgrockWebpackPlugin() : null,
	].filter(Boolean),

	devServer: {
		contentBase: path.resolve(__dirname, '..', 'public'),
		historyApiFallback: true,
		hot: true,
		host: '0.0.0.0',
		disableHostCheck: true,
	},
}

module.exports = merge(common, config)
