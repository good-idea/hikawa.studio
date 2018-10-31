// @flow
import React from 'react'
import Query from 'GraphQL/Query'
import type { ContentBlocks, SanityImage, SiteSettings } from 'Types/ContentTypes'
import Block from 'Components/ContentBlocks'
import { ImageBox } from 'Components/Media'
import { FlexContainer, Column } from 'Components/Layout'
import homepageQuery from './homepageQuery'
import { SettingsConsumer } from '../SettingsProvider'

/**
 * Kame
 */

type Props = {
	homepage: {
		content: ContentBlocks,
		banner: SanityImage,
	},
	siteSettings: SiteSettings,
}

const Kame = ({ siteSettings, homepage }: Props) => {
	return (
		<React.Fragment>
			<ImageBox image={homepage.banner} ratio={0.56} />
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
		{(siteSettings) => <Query query={homepageQuery}>{({ data }) => <Kame siteSettings={siteSettings} {...data} />}</Query>}
	</SettingsConsumer>
)
