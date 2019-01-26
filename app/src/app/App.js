// @flow
import React from 'react'
import { ThemeProvider } from 'styled-components'
import ApolloProvider from './Services/Apollo'
import LocationMonitor from './Views/LocationMonitor'
import Kame from './Views/Kame'
import { GlobalStyles } from './theme/global'
import theme from './theme'

type Props = {
	initialData?: Array<QueryResult>,
}

const App = ({ initialData }: Props) => (
	<ApolloProvider>
		<ThemeProvider theme={theme}>
			<React.Fragment>
				<LocationMonitor />
				<GlobalStyles />
				<Kame />
			</React.Fragment>
		</ThemeProvider>
	</ApolloProvider>
)

App.defaultProps = {
	initialData: {},
}

export default App
