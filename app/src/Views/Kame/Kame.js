// @flow
import React from 'react'
import styled from 'styled-components'
import type { ContentBlocks, SanityImage } from 'Types/ContentTypes'
import Block from 'Components/ContentBlocks'
import { ImageBox } from 'Components/Media'
import { FlexContainer, Column } from 'Components/Layout'
import HomepageQuery from './homepageQuery'
import { SettingsConsumer } from '../SettingsProvider'

const Hero = styled.div`
	width: 100%;
	max-height: 70vh;
	height: 100%;
`

/**
 * Kame
 */

type Props = {
	homepage: {
		content: ContentBlocks,
		banner?: SanityImage,
	},
	// siteSettings: SiteSettings,
}

const Kame = ({ homepage }: Props) => {
	return (
		<React.Fragment>
			{homepage.banner && (
				<Hero>
					<ImageBox image={homepage.banner} ratio={0.56} />
				</Hero>
			)}
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
