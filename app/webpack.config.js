/* eslint-disable @typescript-eslint/no-var-requires */

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
require('dotenv').config()
const CopyPlugin = require('copy-webpack-plugin')

const PATHS = {
	root: path.resolve(__dirname),
	nodeModules: path.resolve(__dirname, 'node_modules'),
	src: path.resolve(__dirname, 'src'),
	dist: path.resolve(__dirname, 'build'),
	js: 'static/js',
}

const DEV_SERVER = {
	hot: true,
	hotOnly: true,
	historyApiFallback: true,
	overlay: true,
	contentBase: path.resolve(__dirname, 'public'),
	proxy: {
		'/.netlify': {
			target: 'http://[::1]:34567',
			pathRewrite: { '^/.netlify/functions': '' },
		},
	},
}

module.exports = (env) => {
	const isDev = env !== 'production'
	return {
		mode: isDev ? 'development' : 'production',
		cache: isDev,
		devtool: 'source-map',
		devServer: isDev ? DEV_SERVER : {},
		context: PATHS.root,
		entry: './src/index.js',
		output: {
			path: PATHS.dist,
			filename: isDev ? `${PATHS.js}/[name].js` : `${PATHS.js}/[name].[hash].js`,
			publicPath: '/',
		},
		resolve: {
			alias: {
				Components: path.resolve(__dirname, '..', 'src', 'app', 'Components'),
				Views: path.resolve(__dirname, '..', 'src', 'app', 'Views'),
				Styles: path.resolve(__dirname, '..', 'src', 'app', 'Styles'),
				Utils: path.resolve(__dirname, '..', 'src', 'app', 'Utils'),
				Types: path.resolve(__dirname, '..', 'src', 'app', 'Types'),
				GraphQL: path.resolve(__dirname, '..', 'src', 'app', 'GraphQL'),
				Services: path.resolve(__dirname, '..', 'src', 'app', 'Services'),
				Shared: path.resolve(__dirname, '..', '..', 'app', 'shared'),
			},
			extensions: ['.mjs', '.js', '.json'],
		},
		module: {
			rules: [
				{
					test: /\.mjs$/,
					include: /node_modules/,
					type: 'javascript/auto',
				},
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: ['babel-loader'],
				},
				{
					test: /\.graphql?$/,
					exclude: /node_modules/,
					loader: 'webpack-graphql-loader',
				},
			],
		},

		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
				SHOPIFY_STOREFRONT_TOKEN: JSON.stringify(process.env.SHOPIFY_STOREFRONT_TOKEN),
			}),
			new HtmlWebpackPlugin({
				template: './public/index.html',
			}),
			// isDev && new webpack.HotModuleReplacementPlugin(),
			isDev && new webpack.NamedModulesPlugin(),
			!isDev &&
				new webpack.LoaderOptionsPlugin({
					minimize: true,
					debug: false,
				}),
			!isDev && new CopyPlugin([{ from: './public/' }]),
		].filter(Boolean),
		optimization: {
			minimize: !isDev,
			splitChunks: {
				name: true,
				cacheGroups: {
					commons: {
						chunks: 'initial',
						minChunks: 2,
					},
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						chunks: 'all',
						filename: isDev ? `${PATHS.js}/vendor.[hash].js` : `${PATHS.js}/vendor.[contentHash].js`,
						priority: -10,
					},
				},
			},
			runtimeChunk: true,
		},
	}
}
