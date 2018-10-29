// @flow
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Main } from 'Components/Layout'
import { SettingsProvider } from './SettingsProvider'
import Kame from './Kame'
import Collection from './Collection'
import Product from './Product'
import NotFound from './NotFound'

/**
 * App
 */

const App = () => (
	<SettingsProvider>
		<Main>
			<Switch>
				<Route path="/" exact component={Kame} />
				<Route path="/collections/:handle" exact component={Collection} />
				<Route path="/products/:handle" exact component={Product} />
				<Route component={NotFound} />
			</Switch>
		</Main>
	</SettingsProvider>
)

export default App
