const path = require('path')

module.exports = {
	parser: 'babel-eslint',
	extends: ['airbnb', 'prettier', 'plugin:flowtype/recommended'],
	rules: {
		'no-underscore-dangle': 0,
		'no-nested-ternary': 0,
		'jsx-a11y/anchor-is-valid': 0,
		'react/destructuring-assignment': 0,
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-one-expression-per-line': 0,
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.js', '.jsx'],
			},
		],
		'import/prefer-default-export': 0,
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true,
			},
		],
	},
	plugins: ['react', 'jsx-a11y', 'import', 'flowtype'],
	env: {
		browser: true,
	},
	settings: {
		'import/resolver': {
			alias: [
				['Components', path.resolve(__dirname, 'src', 'app', 'Components')],
				['Dialogs', path.resolve(__dirname, 'src', 'app', 'Dialogs')],
				['Forms', path.resolve(__dirname, 'src', 'app', 'Forms')],
				['Views', path.resolve(__dirname, 'src', 'app', 'Views')],
				['Utils', path.resolve(__dirname, 'src', 'app', 'Utils')],
				['Types', path.resolve(__dirname, 'src', 'app', 'Types')],
				['GraphQL', path.resolve(__dirname, 'src', 'app', 'GraphQL')],
				['Services', path.resolve(__dirname, 'src', 'app', 'Services')],
				['Shared', path.resolve(__dirname, '..', 'shared')],
			],
		},
	},
}
