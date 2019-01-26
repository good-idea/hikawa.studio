// @flow
import React from 'react'
import { Switch } from 'react-router-dom'
import Route from 'Components/Route'
import { Main } from 'Components/Layout'
import Announcement from 'Components/Announcement'
import NavMenu from './Menu'
import { SettingsProvider } from './SettingsProvider'
import { CheckoutProvider } from './CheckoutProvider'
import MailerPopup from './MailerPopup'
import Footer from './Footer'
import BaseSEO from './BaseSEO'
import CartModal from './Cart/CartModal'
import { routes } from '../Routes'



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
					{routes.map((r) => (
						<Route key={r.path} {...r} />
					))}
				</Switch>
			</Main>
			<Footer />
		</CheckoutProvider>
	</SettingsProvider>
)
// <Route path="/products/:handle" exact component={Product} />
// <Route path="/:slug" exact component={Page} />
// <Route component={NotFound} />

export default App
