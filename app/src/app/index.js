// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import LogRocket from 'logrocket'
import { BrowserRouter } from 'react-router-dom'
import { getCookie, VIEWER_EMAIL } from 'Utils/storage'
import App from './App'

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

const { initialData } = (typeof window !== 'undefined' && window.__INITIAL_QUERY_DATA__) || {}

const renderApp = (AppComponent) => {
	ReactDOM.render(
		<BrowserRouter>
			<AppComponent initialData={initialData} />
		</BrowserRouter>,
		// $FlowFixMe
		document.getElementById('root'),
	)
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
