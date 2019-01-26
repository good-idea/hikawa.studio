// @flow
import React from 'react'
import { Switch } from 'react-router-dom'
import Route from 'Components/Route'
import { Main } from 'Components/Layout'
import Announcement from 'Components/Announcement'
import NavMenu from './Menu'
import { SettingsProvider } from './SettingsProvider'
import { CheckoutProvider } from './CheckoutProvider'
import Homepage from './Homepage'
import Product from './Product'
import Shop from './Shop'
import NotFound from './NotFound'
import MailerPopup from './MailerPopup'
import Page from './Page'
import Footer from './Footer'
import BaseSEO from './BaseSEO'
import CartModal from './Cart/CartModal'

/**
 * App
 */

const App = () => (
	<SettingsProvider>
		<CheckoutProvider>
			<BaseSEO />
			<MailerPopup />
			<Announcement />
			<CartModal />
			<Main>
				<NavMenu />
				<Switch>
					<Route path="/" exact component={Homepage} />
					<Route path="/shop/:collection?" component={Shop} />
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
