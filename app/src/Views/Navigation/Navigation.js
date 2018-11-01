// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { SiteSettings } from 'Types/ContentTypes'
import Logo from 'Components/Logo'
import { adopt } from 'react-adopt'
import type { CheckoutConsumerProps } from '../CheckoutProvider'
import { SettingsConsumer } from '../SettingsProvider'
import { CheckoutConsumer } from '../CheckoutProvider'
import Cart from './Cart'

const Nav = styled.nav`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Menu = styled.div``
/**
 * Navigation
 */

type Props = {
	siteSettings?: SiteSettings,
	cart: CheckoutConsumerProps,
}

const Navigation = ({ cart }: Props) => {
	return (
		<Nav>
			<Logo />
			<Menu>
				<Cart {...cart} />
			</Menu>
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
