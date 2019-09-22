// @flow
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { SentryBoundary } from './Services/Sentry'
import LocationMonitor from './Views/LocationMonitor'
import Kame from './Views/Kame'
import { GlobalStyles } from './theme/global'
import theme from './theme'

const App = () => (
	<SentryBoundary>
		<ThemeProvider theme={theme}>
			<>
				<LocationMonitor />
				<GlobalStyles />
				<Kame />
			</>
		</ThemeProvider>
	</SentryBoundary>
)

App.defaultProps = {
	initialData: {},
}

export default App
