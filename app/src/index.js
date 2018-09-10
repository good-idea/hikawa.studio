// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, injectGlobal } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { globalStyles } from './theme/global'
import ApolloProvider from './services/Apollo'
import App from './Views/App'
import theme from './theme'

/* TODO: Placeholder */
injectGlobal`
	${globalStyles}

	html {
		font-size: 100%;
	}

	a {
		color: blue;
		display: block;
	}
`

if (window.localStorage) {
	window.localStorage.debug = process.env.DEBUG
}

ReactDOM.render(
	<BrowserRouter>
		<ApolloProvider>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</ApolloProvider>
	</BrowserRouter>,
	document.getElementById('root'),
)
