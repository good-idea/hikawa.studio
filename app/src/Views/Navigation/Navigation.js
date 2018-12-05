// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import type { SiteSettings } from 'Types/ContentTypes'
import Logo from 'Components/Logo'
import { Header3 } from 'Components/Type'
import { adopt } from 'react-adopt'
import { getLinkUrl } from 'Utils/sanity'
import { SettingsConsumer } from '../SettingsProvider'
import Cart from '../Cart'

const Announcement = styled.div`
	${({ theme }) => `
		background-color: ${theme.color.pink};
		color: white;
		width: 100%;
		text-align: center;
		padding: 6px;
		font-size: ${theme.type.size.h5};
		font-weight: ${theme.type.weight.semi};
	`}
`

const Nav = styled.nav`
	${({ theme }) => `
		padding: 0;
		height: ${theme.layout.navHeight};
		z-index: ${theme.layout.z.navigation};
		position: absolute;
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
}

const Navigation = ({ siteSettings }: Props) => {
	if (!siteSettings) return null
	return (
		<Nav>
			<Announcement>this is it</Announcement>
			<Logo />
			<Menu>
				<Header3>
					<Link to="/shop">Shop</Link>
				</Header3>
				{siteSettings.navigation.header.links.map((link) => (
					<Header3 key={link.slug}>
						<Link to={getLinkUrl(link)}>{link.title}</Link>
					</Header3>
				))}
			</Menu>
			<CartWrapper>
				<Cart />
			</CartWrapper>
		</Nav>
	)
}

Navigation.defaultProps = {
	siteSettings: undefined,
}

const Composed = adopt({
	siteSettings: <SettingsConsumer />,
})

export default () => <Composed>{(composedProps) => <Navigation {...composedProps} />}</Composed>
