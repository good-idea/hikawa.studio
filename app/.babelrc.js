const path = require('path')

module.exports = {
	presets: [
		'@babel/preset-flow',
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				targets: {
					browsers: ['last 2 versions'],
				},
			},
		],
		'@babel/preset-react',
	],
	env: {
		development: {
			plugins: ['flow-react-proptypes', 'react-hot-loader/babel'],
		},
		production: {
			// plugins: ['graphql-tag'],
		},
	},
	plugins: [
		[
			'babel-plugin-module-resolver',
			{
				extensions: ['.js', '.web.js', '.native.js'],
				alias: {
					Components: './src/app/Components',
					Views: './src/app/Views',
					Types: './src/app/Types',
					Utils: './src/app/Utils',
					GraphQL: './src/app/GraphQL',
					Services: './src/app/Services',
				},
				cwd: 'babelrc',
			},
		],
		'import-graphql',

		['babel-plugin-styled-components', { ssr: true, minify: false }],
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-syntax-export-default-from',
		'ramda',
	],
}
