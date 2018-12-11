// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import type { SiteSettings } from 'Types/ContentTypes'
import Logo from 'Components/Logo'
import { Header3 } from 'Components/Type'
import { adopt } from 'react-adopt'
import { getLinkUrl } from 'Utils/sanity'
import Announcement from 'Components/Announcement'
import { SettingsConsumer } from '../SettingsProvider'
import Cart from '../Cart'
import Instagram from './Instagram'

// height: ${theme.layout.navHeight};
const Nav = styled.nav`
	${({ theme }) => `
		padding: 0;
		z-index: ${theme.layout.z.navigation};
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	`};
`

const MenuWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
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
	${({ theme, announcementOpen }) => css`
		position: fixed;
		top: ${announcementOpen ? '60px' : '30px'};
		right: 30px;
		transition: 0.3s ease-out;

		${theme.media.queries.phone`
			top: ${announcementOpen ? '60px' : '20px'};
			right: 10px;
		`}
	`}
`

/**
 * Navigation
 */

type Props = {
	siteSettings?: SiteSettings,
	isHomepage: boolean,
}

type State = {
	announcementOpen: boolean,
}

class Navigation extends React.Component<Props, State> {
	static defaultProps = {
		siteSettings: undefined,
	}

	state = {
		announcementOpen: true,
	}

	closeAnnouncement = () => {
		this.setState({ announcementOpen: false })
	}

	render() {
		const { siteSettings, isHomepage } = this.props
		const { announcementOpen } = this.state
		if (!siteSettings) return null
		return (
			<Nav>
				{siteSettings && siteSettings.announcement && (
					<Announcement
						open={announcementOpen}
						closeAnnouncement={this.closeAnnouncement}
						announcement={siteSettings.announcement}
					/>
				)}
				<MenuWrapper>
					<Logo />
					<Menu>
						<NavLink isHomepage={isHomepage}>
							<Link to="/">Shop</Link>
						</NavLink>
						{siteSettings &&
							siteSettings.navigation.header.links.map((link) =>
								link.__typename === 'Page' ? (
									<NavLink isHomepage={isHomepage} key={link.slug}>
										<Link to={getLinkUrl(link)}>{link.title}</Link>
									</NavLink>
								) : (
									<NavLink isHomepage={isHomepage} key={link.url}>
										<a href={link.url} target="_blank" rel="noreferrer noopener">
											{link.label.toLowerCase() === 'instagram' ? <Instagram /> : 'link.label'}
										</a>
									</NavLink>
								),
							)}
					</Menu>
					<CartWrapper announcementOpen={announcementOpen}>
						<Cart />
					</CartWrapper>
				</MenuWrapper>
			</Nav>
		)
	}
}

const Composed = adopt({
	siteSettings: <SettingsConsumer />,
})

type BaseProps = {
	isHomepage: boolean,
}

export default (props: BaseProps) => <Composed>{(composedProps) => <Navigation {...props} {...composedProps} />}</Composed>
