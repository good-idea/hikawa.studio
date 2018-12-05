// @flow
import gql from 'graphql-tag'
import { seoPartial, richTextPartial, bannerPartial } from '../../GraphQL/partials'

const query = gql`
	query PageQuery($slug: String!) {
		page(input: { slug: $slug }) {
			title
			slug
			${bannerPartial}
			${seoPartial}
			content {
				${richTextPartial}
			}
		}
	}
`

export default query
