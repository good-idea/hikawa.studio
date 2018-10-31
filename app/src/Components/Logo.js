// @flow
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { SettingsConsumer } from 'Views/SettingsProvider'

const Image = styled.img`
	width: 200px;
`

/**
 * MyComponent
 */

const MyComponent = () => (
	<SettingsConsumer>
		{(siteSettings) =>
			siteSettings && (
				<Link to="/">
					<Image src={siteSettings.logo.url} alt={siteSettings.seo.name} />
				</Link>
			)
		}
	</SettingsConsumer>
)

export default MyComponent
