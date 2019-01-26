const path = require('path')
const CircularDependencyPlugin = require('circular-dependency-plugin')

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
			Components: path.resolve(__dirname, 'src', 'Components'),
			Views: path.resolve(__dirname, 'src', 'Views'),
			Styles: path.resolve(__dirname, 'src', 'Styles'),
			Utils: path.resolve(__dirname, 'src', 'Utils'),
			Types: path.resolve(__dirname, 'src', 'Types'),
			GraphQL: path.resolve(__dirname, 'src', 'GraphQL'),
			Services: path.resolve(__dirname, 'src', 'Services'),
			Shared: path.resolve(__dirname, '..', 'shared'),
		},
		extensions: ['.mjs', '.js', '.json'],
	},
	plugins: [new CircularDependencyPlugin()],
}
