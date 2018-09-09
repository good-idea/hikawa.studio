// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, injectGlobal } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { globalStyles } from 'Styles/global'
import ApolloProvider from './services/Apollo'
import Kame from './Views/Kame'
import registerServiceWorker from './registerServiceWorker'
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
registerServiceWorker()
