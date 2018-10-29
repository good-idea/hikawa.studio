// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, injectGlobal } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import ApolloProvider from './services/Apollo'
import App from './Views/App'
import { GlobalStyles } from './theme/global'
import theme from './theme'

if (window.localStorage) {
	window.localStorage.debug = process.env.DEBUG
}

const renderApp = (Component) => {
	ReactDOM.render(
		<BrowserRouter>
			<ApolloProvider>
				<ThemeProvider theme={theme}>
					<React.Fragment>
						<GlobalStyles />
						<Component />
					</React.Fragment>
				</ThemeProvider>
			</ApolloProvider>
		</BrowserRouter>,
		document.getElementById('root'),
	)
}

renderApp(App)

if (module.hot) {
	module.hot.accept('./Views/App.js', () => {
		// eslint-disable-next-line
		const NewApp = require('./Views/App').default
		renderApp(NewApp)
	})
}
