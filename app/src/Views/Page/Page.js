// @flow
import React from 'react'
import styled from 'styled-components'
import type { Match } from 'react-router-dom'
import Query from 'GraphQL/Query'
import Text from 'Components/ContentBlocks/Text'
import { Column } from 'Components/Layout'
import pageQuery from './pageQuery'

const Wrapper = styled.div`
	${({ theme }) => `
		margin: ${theme.layout.spacing.triple};
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
		{({ data }) => {
			if (!data.page) return null
			const { content } = data.page
			return (
				<Wrapper>
					<Column>{content && <Text blocks={content} />}</Column>
				</Wrapper>
			)
		}}
	</Query>
)

export default Page
