// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
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
		handle: string,
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
		grid-row-gap: ${theme.layout.spacing.double};
		margin: ${theme.layout.spacing.double} 0;

		${theme.media.queries.phone`
			grid-column-gap: ${theme.layout.spacing.single};
			margin: ${theme.layout.spacing.single} 0;
		`}
	`}
`

const Instagram = ({ settings }: Props) => {
	if (!settings) return null
	const { title, images, handle } = settings
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
					<a key={image._key} target="_blank" rel="noreferrer noopener" href={`https://www.instagram.com/${handle}`}>
						<ImageBox sizes="300px" ratio={1} image={image} />
					</a>
				))}
			</Images>
			<Header4 align="center">
				<a target="_blank" rel="noreferrer noopener" href={`https://www.instagram.com/${handle}`}>{`@${handle}`}</a>
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
	<SettingsConsumer>{({ siteSettings }) => siteSettings && <Instagram settings={siteSettings.instagram} />}</SettingsConsumer>
)
