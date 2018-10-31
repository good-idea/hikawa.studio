// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { SiteSettings } from 'Types/ContentTypes'
import Logo from 'Components/Logo'
import { adopt } from 'react-adopt'

import { SettingsConsumer } from './SettingsProvider'
import { CheckoutConsumer } from './CheckoutProvider'

const Nav = styled.nav`
	position: relative;
`
/**
 * Navigation
 */

type Props = {
	siteSettings?: SiteSettings,
	cart: any,
}

const Navigation = ({ cart }: Props) => {
	// console.log(cart)
	return (
		<Nav>
			<Logo />
			{cart && cart.items.length ? <p>cart: {cart.items.length}</p> : null}
		</Nav>
	)
}

Navigation.defaultProps = {
	siteSettings: undefined,
}

const Composed = adopt({
	siteSettings: <SettingsConsumer />,
	cart: <CheckoutConsumer />,
})

export default () => <Composed>{(composedProps) => <Navigation {...composedProps} />}</Composed>
