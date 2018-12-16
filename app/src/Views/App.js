// @flow
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Main } from 'Components/Layout'
import Announcement from 'Components/Announcement'

import { SettingsProvider } from './SettingsProvider'
import { CheckoutProvider } from './CheckoutProvider'
import Kame from './Kame'
import Product from './Product'
import NotFound from './NotFound'
import MailerPopup from './MailerPopup'
import Nav from './Nav'
import Page from './Page'
import Footer from './Footer'
import BaseSEO from './BaseSEO'

/**
 * App
 */

const App = () => (
	<SettingsProvider>
		<CheckoutProvider>
			<BaseSEO />
			<MailerPopup />
			<Announcement />
			<Main>
				<Nav />
				<Switch>
					<Route path="/" exact component={Kame} />
					<Route path="/products/:handle" exact component={Product} />
					<Route path="/:slug" exact component={Page} />
					<Route component={NotFound} />
				</Switch>
			</Main>
			<Footer />
		</CheckoutProvider>
	</SettingsProvider>
)

export default App
