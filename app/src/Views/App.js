// @flow
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Main } from 'Components/Layout'
import { SettingsProvider } from './SettingsProvider'
import { CheckoutProvider } from './CheckoutProvider'
import Kame from './Kame'
import Shop from './Shop'
import Product from './Product'
import NotFound from './NotFound'
import Navigation from './Navigation'
import Page from './Page'
import Footer from './Footer'

/**
 * App
 */

const App = () => (
	<SettingsProvider>
		<CheckoutProvider>
			<Main>
				<Navigation />
				<Switch>
					<Route path="/" exact component={Kame} />
					<Route path="/shop" component={Shop} />
					<Route path="/products/:handle" exact component={Product} />
					<Route path="/:slug" exact component={Page} />
					<Route component={NotFound} />
				</Switch>
				<Footer />
			</Main>
		</CheckoutProvider>
	</SettingsProvider>
)

export default App
