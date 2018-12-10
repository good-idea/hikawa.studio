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

const NavLink = styled(Header3)`
	${({ theme, isHomepage }) => `
		&:hover {
			color: ${isHomepage ? 'white' : theme.color.pink};
		}
	`}
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
	isHomepage: boolean,
}

const Navigation = ({ siteSettings, isHomepage }: Props) => {
	if (!siteSettings) return null
	return (
		<Nav>
			<Announcement>this is it</Announcement>
			<Logo />
			<Menu>
				<NavLink isHomepage={isHomepage}>
					<Link to="/shop">Shop</Link>
				</NavLink>
				{siteSettings.navigation.header.links.map((link) => (
					<NavLink isHomepage={isHomepage} key={link.slug}>
						<Link to={getLinkUrl(link)}>{link.title}</Link>
					</NavLink>
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

type BaseProps = {
	isHomepage: boolean,
}

export default (props: BaseProps) => <Composed>{(composedProps) => <Navigation {...props} {...composedProps} />}</Composed>
