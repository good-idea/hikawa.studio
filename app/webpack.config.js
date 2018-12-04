const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const common = {
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
	devtool: 'source-map',
	resolve: {
		alias: {
			Components: path.resolve(__dirname, 'src', 'Components'),
			Views: path.resolve(__dirname, 'src', 'Views'),
			Styles: path.resolve(__dirname, 'src', 'Styles'),
			Utils: path.resolve(__dirname, 'src', 'Utils'),
			Types: path.resolve(__dirname, 'src', 'Types'),
			GraphQL: path.resolve(__dirname, 'src', 'GraphQL'),
			Mocked: path.resolve(__dirname, 'src', 'Mocked'),
			Shared: path.resolve(__dirname, '..', 'shared'),
		},
		extensions: ['.mjs', '.js', '.json'],
	},
}

const development = {
	mode: 'development',
	entry: [
		'babel-polyfill',
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:8080',
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
			},
		}),
	],
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
