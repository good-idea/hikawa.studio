// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import type { Match } from 'react-router-dom'
import Query from 'GraphQL/Query'
import Text from 'Components/ContentBlocks/Text'
import { Column } from 'Components/Layout'
import Helmet from 'Components/Helmet'
import pageQuery from './pageQuery'
import Gallery from './Gallery'

const Wrapper = styled.div`
	${({ theme }) => css`
		margin: ${theme.layout.spacing.triple} auto;
	`}
`
/**
 * Page
 */

type Props = {
	match: Match,
}

const Page = (props: Props) => (
	<Query query={pageQuery} variables={{ slug: props.match.params.slug }}>
		{({ data, loading }) => {
			if (loading || !data || !data.page) return null
			const { content, gallery, seo } = data.page

			return (
				<Wrapper>
					<Helmet seo={seo} />
					<Column>{content && <Text blocks={content} />}</Column>
					{gallery && gallery.length ? (
						<Column width="xWide">
							<Gallery images={gallery} />
						</Column>
					) : null}
				</Wrapper>
			)
		}}
	</Query>
)

export default Page
