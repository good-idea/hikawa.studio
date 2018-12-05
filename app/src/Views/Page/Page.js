// @flow
import React from 'react'
import type { Match } from 'react-router-dom'
import Query from 'GraphQL/Query'
import Text from 'Components/ContentBlocks/Text'
import pageQuery from './pageQuery'

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
			const { content, title } = data.page
			return (
				<React.Fragment>
					<h1>{title}</h1>
					{content && <Text blocks={content} />}
				</React.Fragment>
			)
		}}
	</Query>
)

export default Page
