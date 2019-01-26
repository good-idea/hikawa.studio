// @flow
import React from 'react'
import { ThemeProvider } from 'styled-components'
import LocationMonitor from './Views/LocationMonitor'
import Kame from './Views/Kame'
import { GlobalStyles } from './theme/global'
import theme from './theme'

const App = () => (
	<ThemeProvider theme={theme}>
		<React.Fragment>
			<LocationMonitor />
			<GlobalStyles />
			<Kame />
		</React.Fragment>
	</ThemeProvider>
)

App.defaultProps = {
	initialData: {},
}

export default App
