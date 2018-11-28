// @flow
import React from 'react'
import type { ContentBlocks, SanityImage } from 'Types/ContentTypes'
import Block from 'Components/ContentBlocks'
import Hero from 'Components/Hero'
import { FlexContainer, Column } from 'Components/Layout'
import HomepageQuery from './homepageQuery'
import { SettingsConsumer } from '../SettingsProvider'

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
		<React.Fragment>
			{homepage.banner && <Hero images={homepage.banner} />}
			<Column width="xWide">
				<FlexContainer>
					{/* $FlowFixMe - bug with union types: https://github.com/facebook/flow/issues/6342 */}
					{homepage.content && homepage.content.map((block) => <Block key={block._key} block={block} />)}
				</FlexContainer>
			</Column>
		</React.Fragment>
	)
}

export default () => (
	<SettingsConsumer>
		{(siteSettings) => <HomepageQuery>{({ data }) => <Kame siteSettings={siteSettings} {...data} />}</HomepageQuery>}
	</SettingsConsumer>
)
