// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { SiteSettings } from 'Types/ContentTypes'
import Logo from 'Components/Logo'
import { SettingsConsumer } from './SettingsProvider'

const Nav = styled.nav`
	position: relative;
`
/**
 * Navigation
 */

type Props = {
	siteSettings: SiteSettings,
}

const Navigation = ({ siteSettings }: Props) => {
	return (
		<Nav>
			<Logo />
		</Nav>
	)
}

export default () => (
	<SettingsConsumer>{(siteSettings) => (siteSettings ? <Navigation siteSettings={siteSettings} /> : null)}</SettingsConsumer>
)
