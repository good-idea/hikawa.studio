// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { getCookie, VIEWER_EMAIL } from 'Utils/storage'
import { loadableReady } from '@loadable/component'
import App from './App'
import ApolloProvider from './Services/Apollo'

const loadLogRocket = async () => {
	const LogRocket = await import(/* webpackChunkName: "logrocket" */ 'logrocket')
	LogRocket.init('ulpljc/kame')
	const email = getCookie(VIEWER_EMAIL)
	if (email) {
		LogRocket.identify(email, {
			email,
		})
	}
}

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
	setTimeout(loadLogRocket, 500)
}

if (window.localStorage && process.env.DEBUG) {
	window.localStorage.debug = process.env.DEBUG
}

const { initialData } = (typeof window !== 'undefined' && window.__INITIAL_QUERY_DATA__) || {}

const renderApp = (AppComponent) => {
	loadableReady(() => {
		const root = document.getElementById('root')
		if (!root) return null
		ReactDOM.hydrate(
			<BrowserRouter>
				<ApolloProvider>
					<AppComponent initialData={initialData} />
				</ApolloProvider>
			</BrowserRouter>,
			root,
		)
	})
}

renderApp(App)

// $FlowFixMe
if (module.hot && process.env.NODE_ENV === 'development') {
	// $FlowFixMe
	module.hot.accept('./App.js', () => {
		// eslint-disable-next-line
		const NewApp = require('./App').default
		renderApp(NewApp)
	})
}
