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
import MailerPopup from './MailerPopup'
import Navigation from './Navigation'
import Page from './Page'
import Footer from './Footer'

/**
 * App
 */

const App = () => (
	<Route
		render={({ location }) => {
			const isHomepage = Boolean(location.pathname === '/')
			return (
				<SettingsProvider>
					<CheckoutProvider>
						<MailerPopup />
						<Navigation isHomepage={isHomepage} />
						<Main isHomepage={isHomepage}>
							<Switch>
								<Route path="/" exact component={Kame} />
								<Route path="/shop/:handle?" component={Shop} />
								<Route path="/products/:handle" exact component={Product} />
								<Route path="/:slug" exact component={Page} />
								<Route component={NotFound} />
							</Switch>
						</Main>
						<Footer />
					</CheckoutProvider>
				</SettingsProvider>
			)
		}}
	/>
)

export default App
