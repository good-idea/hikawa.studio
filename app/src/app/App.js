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
			<React.Fragment>
				<LocationMonitor />
				<GlobalStyles />
				<Kame />
			</React.Fragment>
		</ThemeProvider>
	</SentryBoundary>
)

App.defaultProps = {
	initialData: {},
}

export default App
