// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import type { SiteSettings } from 'Types/ContentTypes'
import { Header3 } from 'Components/Type'
import { getLinkUrl } from 'Utils/sanity'
import { InstagramLogo } from 'Components/Instagram'
import Cart from 'Views/Cart'
import Logo from 'Components/Logo'
import { SettingsConsumer } from '../SettingsProvider'

const MenuWrapper = styled.div`
	${({ theme }) => css`
		position: sticky;
		width: 100%;
		padding: 0 ${theme.layout.spacing.double};
		top: 0;
		left: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		height: ${theme.layout.navHeight};
		text-transform: uppercase;
		background-color: white;
		border-bottom: 1px solid rgb(100, 100, 100);

		& h3 {
			margin: 0 10px;
		}

		${theme.media.queries.phone`
			padding: 0 ${theme.layout.spacing.single};
			& h3 {
				margin: 5px 0;
				font-size: 2em;
			}
		`}
	`}
`

const MenuButton = styled.button`
	${({ theme }) => css`
		position: relative;
		flex-direction: column;
		justify-content: space-between;
		width: 22px;
		height: 18px;
		display: none;
		flex-basis: 60px;

		& > div {
			width: 22px;
			height: 2px;
			background-color: rgb(100, 100, 100);
		}

		${theme.media.queries.phone`
			display: flex;
		`}
	`}
`

const NavLogoWrapper = styled.div`
	${({ theme }) => `
		width: 120px;
		display: flex;
		align-items: center;
		justify-content: flex-start;

		${theme.media.queries.phone`
			justify-content: center;
		`}
	`}
`

const CartWrapper = styled.div`
	${({ theme }) => css`
		width: 120px;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		${theme.media.queries.phone`
			flex-basis: 60px;
		`}
	`}
`

const NavLinks = styled.div`
	${({ theme, open }) => css`
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;

		${theme.media.queries.phone`
			position: absolute;
			order: 4;
			width: 100%;
			top: 100%;
			z-index: -1;
			padding: ${theme.layout.spacing.single};
			left: 0;
			flex-direction: column;
			align-items: flex-start;
			transition: 0.2s;
			opacity: ${open ? '1' : '0'};
			transform: translateY(${open ? '0' : '-5%'});
			overflow: hidden;
			background-color: white;
			border-bottom: 1px solid black;
		`}
	`}
`

const NavLink = styled(Header3)`
	${({ theme }) => `
		& svg {
			fill: currentColor;
		}
		&:hover {
			color: ${theme.color.pink};
		}
	`}
`

/**
 * Navigation
 */

type Props = {
	siteSettings: SiteSettings,
}

const StickyWrapper = styled.div`
	${({ theme, plusZ }) => `
		position: absolute;
		z-index: calc(${theme.layout.z.cart} + ${plusZ || 0});
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;

		& > * {
			pointer-events: auto;
		}
	`}
`

const Background = styled.button`
	${({ theme, open }) => css`
		display: none;
		background-color: rgba(0, 0, 0, 0.4);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;

		${theme.media.queries.phone`
			display: initial;
			opacity: ${open ? '1' : '0'};
			pointer-events: ${open ? 'initial' : 'none'};
		`}
	`}
`

type State = {
	open: boolean,
}

class Navigation extends React.Component<Props, State> {
	static defaultProps = {
		// ...
	}

	state = {
		open: false,
	}

	openMenu = () => {
		this.setState({ open: true })
	}

	closeMenu = () => {
		this.setState({ open: false })
	}

	toggleMenu = () => {
		this.setState(({ open }) => ({ open: !open }))
	}

	render() {
		const { siteSettings } = this.props
		const { open } = this.state
		return (
			<nav>
				<StickyWrapper>
					<MenuWrapper>
						<MenuButton onClick={this.toggleMenu}>
							<div />
							<div />
							<div />
						</MenuButton>
						<NavLogoWrapper>
							<Logo />
						</NavLogoWrapper>
						<NavLinks open={open}>
							<NavLink>
								<Link onClick={this.closeMenu} to="/shop">
									Shop
								</Link>
							</NavLink>
							{siteSettings &&
								siteSettings.navigation.header.links.map((link) =>
									link.__typename === 'Page' ? (
										<NavLink key={link.slug}>
											<Link onClick={this.closeMenu} to={getLinkUrl(link)}>
												{link.title}
											</Link>
										</NavLink>
									) : (
										<NavLink key={link.url}>
											<a onClick={this.closeMenu} href={link.url} target="_blank" rel="noreferrer noopener">
												{link.label.toLowerCase() === 'instagram' ? <InstagramLogo /> : 'link.label'}
											</a>
										</NavLink>
									),
								)}
						</NavLinks>
						<CartWrapper>
							<Cart />
						</CartWrapper>
					</MenuWrapper>
					<Background open={open} onClick={this.closeMenu} />
				</StickyWrapper>
			</nav>
		)
	}
}

export default () => (
	<SettingsConsumer>{(siteSettings) => (siteSettings ? <Navigation siteSettings={siteSettings} /> : null)}</SettingsConsumer>
)
