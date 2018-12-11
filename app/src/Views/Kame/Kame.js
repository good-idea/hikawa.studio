// @flow
import React from 'react'
import styled from 'styled-components'
import type { ContentBlocks } from 'Types/ContentTypes'
import type { SanityImage } from 'Types/MediaTypes'
import Block from 'Components/ContentBlocks'
import Hero from 'Components/Hero'
import { FlexContainer, Column } from 'Components/Layout'
import { FadeIn } from 'Components/Effects'
import HomepageQuery from './homepageQuery'
import { SettingsConsumer } from '../SettingsProvider'
import { HomepageWrapper } from './styled'

const BlockWrapper = styled.div`
	flex-basis: 50%;
`

/**
 * Kame
 */

type Props = {
	homepage: {
		content: ContentBlocks,
		banner?: Array<SanityImage>,
	},
	// siteSettings: SiteSettings,
}

const Kame = ({ homepage }: Props) => {
	return (
		<HomepageWrapper>
			{homepage.banner && homepage.banner.length ? <Hero images={homepage.banner} /> : null}
			<Column width="wide">
				<FadeIn delay={500}>
					<FlexContainer>
						{/* $FlowFixMe - bug with union types: https://github.com/facebook/flow/issues/6342 */}
						{homepage.content &&
							homepage.content.map((block, index) => (
								<BlockWrapper key={block._key}>
									<Block block={block} number={index} />
								</BlockWrapper>
							))}
					</FlexContainer>
				</FadeIn>
			</Column>
		</HomepageWrapper>
	)
}

export default () => (
	<SettingsConsumer>
		{(siteSettings) => (
			<HomepageQuery>{({ data }) => (data ? <Kame siteSettings={siteSettings} {...data} /> : null)}</HomepageQuery>
		)}
	</SettingsConsumer>
)
