// @flow
import gql from 'graphql-tag'
import { seoPartial, richTextPartial, bannerPartial, sanityImageFields } from '../../GraphQL/partials'

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
			gallery {
				${sanityImageFields}
			}
		}
	}
`

export default query
