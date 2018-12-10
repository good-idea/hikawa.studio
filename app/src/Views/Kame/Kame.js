// @flow
import React from 'react'
import type { ContentBlocks } from 'Types/ContentTypes'
import type { SanityImage } from 'Types/MediaTypes'
import Block from 'Components/ContentBlocks'
import Hero from 'Components/Hero'
import { FlexContainer, FlexChild, Column } from 'Components/Layout'
import HomepageQuery from './homepageQuery'
import { SettingsConsumer } from '../SettingsProvider'
import { HomepageWrapper } from './styled'

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
				<FlexContainer>
					{/* $FlowFixMe - bug with union types: https://github.com/facebook/flow/issues/6342 */}
					{homepage.content &&
						homepage.content.map((block, index) => (
							<FlexChild key={block._key} basis="50%">
								<Block block={block} number={index} />
							</FlexChild>
						))}
				</FlexContainer>
			</Column>
		</HomepageWrapper>
	)
}

export default () => (
	<SettingsConsumer>
		{(siteSettings) => <HomepageQuery>{({ data }) => <Kame siteSettings={siteSettings} {...data} />}</HomepageQuery>}
	</SettingsConsumer>
)
