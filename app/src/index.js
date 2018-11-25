// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import ApolloProvider from './services/Apollo'
import App from './Views/App'
import { GlobalStyles } from './theme/global'
import theme from './theme'

if (window.localStorage && process.env.NODE_ENV === 'development') {
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
		// $FlowFixme
		document.getElementById('root'),
	)
}

renderApp(App)

// $FlowFixme
if (module.hot && process.env.NODE_ENV === 'development') {
	// $FlowIgnore
	module.hot.accept('./Views/App.js', () => {
		// eslint-disable-next-line
		const NewApp = require('./Views/App').default
		renderApp(NewApp)
	})
}
