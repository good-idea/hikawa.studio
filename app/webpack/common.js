const path = require('path')
const CircularDependencyPlugin = require('circular-dependency-plugin')

process.env.WEBPACK = true

module.exports = {
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
	plugins: [new CircularDependencyPlugin()],
}
