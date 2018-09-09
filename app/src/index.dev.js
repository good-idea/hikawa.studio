// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, injectGlobal } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import ApolloProvider from './services/Apollo'
import Kame from './Views/Kame'
import { globalStyles } from './theme/global'
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

const renderApp = (Component) => {
	ReactDOM.render(
		<BrowserRouter>
			<ApolloProvider>
				<ThemeProvider theme={theme}>
					<Component />
				</ThemeProvider>
			</ApolloProvider>
		</BrowserRouter>,
		document.getElementById('root'),
	)
}

renderApp(Kame)

if (module.hot) {
	module.hot.accept('./Views/Kame/Kame.js', () => {
		// eslint-disable-next-line
		const NewApp = require('./Views/Kame/Kame').default
		renderApp(NewApp)
	})
}
