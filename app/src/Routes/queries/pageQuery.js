// @flow
import gql from 'graphql-tag'
import { seoPartial, richTextPartial, heroPartial, sanityImageFields } from '../../GraphQL/partials'

const query = gql`
	query PageQuery($slug: String!) {
		page(input: { slug: $slug }) {
			title
			slug
			${heroPartial}
			${seoPartial}
			includeInstagram
			content {
				${richTextPartial}
			}
			gallery {
				${sanityImageFields}
			}
		}
	}
`

export default query