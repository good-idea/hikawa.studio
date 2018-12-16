// @flow
import React from 'react'
import styled from 'styled-components'
import type { ContentBlocks, Hero as HeroType } from 'Types/ContentTypes'
import Block from 'Components/ContentBlocks'
import Hero from 'Components/Hero'
import { FlexContainer, Column } from 'Components/Layout'
import { FadeIn } from 'Components/Effects'
import HomepageQuery from './homepageQuery'
import { SettingsConsumer } from '../SettingsProvider'
import { HomepageWrapper } from './styled'

const BlockWrapper = styled.div`
	${({ fullWidth }) => `
		flex-basis: ${fullWidth ? '100%' : '50%'};
		text-align: center;
	`}
`

/**
 * Kame
 */

type Props = {
	homepage: {
		content: ContentBlocks,
		hero?: HeroType,
	},
	// siteSettings: SiteSettings,
}

const Kame = ({ homepage }: Props) => {
	return (
		<HomepageWrapper>
			{homepage.hero ? <Hero images={homepage.hero.images} view="carousel" /> : null}
			<Column width="wide">
				<FadeIn delay={500}>
					<FlexContainer>
						{/* $FlowFixMe - bug with union types: https://github.com/facebook/flow/issues/6342 */}
						{homepage.content &&
							homepage.content.map((block, index) => (
								<BlockWrapper key={block._key} fullWidth={block.fullWidth}>
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
