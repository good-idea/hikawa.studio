// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import LogRocket from 'logrocket'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { getCookie, VIEWER_EMAIL } from 'Utils/storage'
import ApolloProvider from './Services/Apollo'
import LocationMonitor from './Views/LocationMonitor'
import App from './Views/App'
import { GlobalStyles } from './theme/global'
import theme from './theme'

if (process.env.NODE_ENV === 'production') {
	LogRocket.init('ulpljc/kame')
	const email = getCookie(VIEWER_EMAIL)
	if (email) {
		LogRocket.identify(email, {
			email,
		})
	}
}

if (window.localStorage && process.env.DEBUG) {
	window.localStorage.debug = process.env.DEBUG
}

const renderApp = (Component) => {
	ReactDOM.render(
		<BrowserRouter>
			<ApolloProvider>
				<ThemeProvider theme={theme}>
					<React.Fragment>
						<LocationMonitor />
						<GlobalStyles />
						<Component />
					</React.Fragment>
				</ThemeProvider>
			</ApolloProvider>
		</BrowserRouter>,
		// $FlowFixMe
		document.getElementById('root'),
	)
}

renderApp(App)

// $FlowFixMe
if (module.hot && process.env.NODE_ENV === 'development') {
	// $FlowFixMe
	module.hot.accept('./Views/App.js', () => {
		// eslint-disable-next-line
		const NewApp = require('./Views/App').default
		renderApp(NewApp)
	})
}
