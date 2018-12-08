// @flow
import React from 'react'
import styled from 'styled-components'
import type { ContentBlocks } from 'Types/ContentTypes'
import type { SanityImage } from 'Types/MediaTypes'
import Block from 'Components/ContentBlocks'
import Hero from 'Components/Hero'
import { FlexContainer, FlexChild, Column } from 'Components/Layout'
import HomepageQuery from './homepageQuery'
import { SettingsConsumer } from '../SettingsProvider'

const Wrapper = styled.div`
	background-image: url('/images/clouds_KAME.jpg');
	background-attachment: fixed;
	background-size: cover;
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
		<Wrapper>
			{homepage.banner && homepage.banner.length && <Hero images={homepage.banner} />}
			<Column width="wide">
				<FlexContainer>
					{/* $FlowFixMe - bug with union types: https://github.com/facebook/flow/issues/6342 */}
					{homepage.content &&
						homepage.content.map((block) => (
							<FlexChild basis="50%">
								<Block key={block._key} block={block} />
							</FlexChild>
						))}
				</FlexContainer>
			</Column>
		</Wrapper>
	)
}

export default () => (
	<SettingsConsumer>
		{(siteSettings) => <HomepageQuery>{({ data }) => <Kame siteSettings={siteSettings} {...data} />}</HomepageQuery>}
	</SettingsConsumer>
)
