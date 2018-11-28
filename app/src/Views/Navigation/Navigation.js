// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { SiteSettings } from 'Types/ContentTypes'
import Logo from 'Components/Logo'
import { Header3 } from 'Components/Type'
import { adopt } from 'react-adopt'
import type { CheckoutConsumerProps } from '../CheckoutProvider'
import { SettingsConsumer } from '../SettingsProvider'
import { CheckoutConsumer } from '../CheckoutProvider'
import Cart from './Cart'

const Nav = styled.nav`
	${({ theme }) => `
		padding: 0 ${theme.layout.spacing.single};
		height: ${theme.layout.navHeight};
		z-index: ${theme.layout.z.navigation};
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	`};
`

const Menu = styled.div`
	display: flex;
	justify-content: center;
	text-transform: uppercase;

	& h3 {
		margin: 0 10px;
	}
`

const CartWrapper = styled.div`
	position: absolute;
	top: 20px;
	right: 20px;
`

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
				<Header3>SHOP</Header3>
				<Header3>About</Header3>
			</Menu>
			<CartWrapper>
				<Cart {...cart} />
			</CartWrapper>
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
