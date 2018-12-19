// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { Column } from 'Components/Layout'
import { SettingsConsumer } from 'Views/SettingsProvider'
import { ImageBox } from 'Components/Media'
import type { SanityImage } from 'Types/MediaTypes'
import { Header3, Header4 } from 'Components/Type'
import InstagramLogo from './InstagramLogo'

/**
 * Instagram
 */

type Props = {
	settings?: {
		title?: string,
		images?: Array<SanityImage>,
	},
}

const Wrapper = styled.div`
	${({ theme }) => `
		margin: ${theme.layout.spacing.triple} 0;
	`}
`

const Images = styled.div`
	${({ theme }) => css`
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-column-gap: ${theme.layout.spacing.double};
		margin: ${theme.layout.spacing.double} 0;

		${theme.media.queries.phone`
			grid-column-gap: ${theme.layout.spacing.single};
			margin: ${theme.layout.spacing.single} 0;
		`}
	`}
`

const Instagram = ({ settings }: Props) => {
	if (!settings) return null
	const { title, images } = settings
	if (!images || !images.length) return null

	return (
		<Wrapper>
			{title && (
				<Header3 align="center">
					<InstagramLogo />
					{title}
				</Header3>
			)}
			<Images>
				{images.map((image) => (
					<a key={image.url} href="https://www.instagram.com/kamebyhikawa">
						<ImageBox sizes="300px" ratio={1} image={image} />
					</a>
				))}
			</Images>
			<Header4 align="center">
				<a href="https://www.instagram.com/kamebyhikawa">@kamebyhikawa</a>
			</Header4>
		</Wrapper>
	)
}

Instagram.defaultProps = {
	settings: {
		images: [],
	},
}

export default () => (
	<SettingsConsumer>{(siteSettings) => siteSettings && <Instagram settings={siteSettings.instagram} />}</SettingsConsumer>
)
