// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import type { ContentBlocks, Hero as HeroType } from 'Types/ContentTypes'
import Block from 'Components/ContentBlocks'
import Hero from 'Components/Hero'
import { Column } from 'Components/Layout'
import Instagram from 'Components/Instagram'
import { SettingsConsumer } from '../SettingsProvider'
import { HomepageWrapper } from './styled'

const Grid = styled.div`
	${({ theme }) => css`
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-row-gap: ${theme.layout.spacing.double};
		grid-column-gap: ${theme.layout.spacing.double};

		${theme.media.queries.phone`
			grid-row-gap: ${theme.layout.spacing.single};
			grid-column-gap: ${theme.layout.spacing.single};
		`}
	`}
`

const BlockWrapper = styled.div`
	${({ theme, fullWidth, type }) => `
		grid-column: span ${fullWidth ? '2' : '1'};
		text-align: center;
		border: ${type === 'richText' ? '2px solid' : 'none'};
		padding: ${type === 'richText' ? theme.layout.spacing.double : '0'};
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
			<Hero hero={homepage.hero} view="carousel" />
			<Column width="wide">
				<Grid>
					{/* $FlowFixMe - bug with union types: https://github.com/facebook/flow/issues/6342 */}
					{homepage.content &&
						homepage.content
							.filter((block) => {
								if (!block._type) return false
								if (block._type === 'richText' && block.blocks.length === 0) return false
								if (block._type === 'pageLink' && block.link === null) return false
								return true
							})
							.map((block, index) => (
								<BlockWrapper key={block._key} type={block._type} fullWidth={block.fullWidth}>
									<Block block={block} number={index} largeText />
								</BlockWrapper>
							))}
				</Grid>
				<Instagram />
			</Column>
		</HomepageWrapper>
	)
}

type BaseProps = {
	data: any,
}

export default ({ data }: BaseProps) => (
	<SettingsConsumer>{({ siteSettings }) => (data ? <Kame siteSettings={siteSettings} {...data} /> : null)}</SettingsConsumer>
)
