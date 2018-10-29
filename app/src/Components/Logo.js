// @flow
import React from 'react'
import styled from 'styled-components'
import { SettingsConsumer } from 'Views/SettingsProvider'

const Image = styled.img`
	width: 200px;
`

/**
 * MyComponent
 */

const MyComponent = () => (
	<SettingsConsumer>
		{(siteSettings) => siteSettings && <Image src={siteSettings.logo.url} alt={siteSettings.seo.name} />}
	</SettingsConsumer>
)

export default MyComponent
