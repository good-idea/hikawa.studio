// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import type { SiteSettings } from 'Types/ContentTypes'
import Logo from 'Components/Logo'
import { Header3 } from 'Components/Type'
import { getLinkUrl } from 'Utils/sanity'
import { SettingsConsumer } from '../SettingsProvider'
import Instagram from './Instagram'

const MenuWrapper = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	top: 0;
	left: 0;

	& > * {
		pointer-events: initial;
	}
`

const NavLink = styled(Header3)`
	${({ theme }) => `
		& svg {
			fill: white;
		}
		&:hover {
			color: ${theme.color.pink};
		}
	`}
`

const Menu = styled.div`
	${({ theme }) => css`
		display: flex;
		justify-content: center;
		text-transform: uppercase;
		position: sticky;
		top: ${theme.layout.spacing.single};
		color: white;

		& h3 {
			margin: 0 10px;
		}

		${theme.media.queries.phone`
			& h3 {
				margin: 0 5px;
			}
		`}
	`}
`

/**
 * Navigation
 */

type Props = {
	siteSettings: SiteSettings,
}

const Navigation = ({ siteSettings }: Props) => {
	return (
		<MenuWrapper>
			<Logo />
			<Menu>
				<NavLink>
					<Link to="/">Shop</Link>
				</NavLink>
				{siteSettings &&
					siteSettings.navigation.header.links.map((link) =>
						link.__typename === 'Page' ? (
							<NavLink key={link.slug}>
								<Link to={getLinkUrl(link)}>{link.title}</Link>
							</NavLink>
						) : (
							<NavLink key={link.url}>
								<a href={link.url} target="_blank" rel="noreferrer noopener">
									{link.label.toLowerCase() === 'instagram' ? <Instagram /> : 'link.label'}
								</a>
							</NavLink>
						),
					)}
			</Menu>
		</MenuWrapper>
	)
}

export default () => (
	<SettingsConsumer>{(siteSettings) => (siteSettings ? <Navigation siteSettings={siteSettings} /> : null)}</SettingsConsumer>
)
