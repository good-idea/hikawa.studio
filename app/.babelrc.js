const path = require('path')

const forBrowser = process.env.WEBPACK

module.exports = (api) => {
	api.cache(() => process.env.NODE_ENV === 'production')
	return {
		presets: [
			[
				'@babel/preset-env',
				{
					targets:
						forBrowser === 'webpack'
							? {
									browsers: ['last 2 versions'],
							  }
							: {
									node: 'current',
							  },
				},
			],
			'@babel/preset-react',
			'@babel/preset-flow',
		],
		env: {
			development: {
				plugins: ['flow-react-proptypes', 'react-hot-loader/babel'],
			},
			// production: {
			// 	plugins: forBrowser ? ['graphql-tag'] : [],
			// },
		},
		plugins: [
			'import-graphql',
			'@loadable/babel-plugin',
			forBrowser ? false : 'dynamic-import-node',
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
			['babel-plugin-styled-components', { ssr: true, minify: false }],
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-proposal-object-rest-spread',
			'@babel/plugin-syntax-dynamic-import',
			'@babel/plugin-syntax-export-default-from',
			'ramda',
		].filter(Boolean),
	}
}
