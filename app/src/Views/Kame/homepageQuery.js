// @flow
import gql from 'graphql-tag'
import type { ImageType } from 'Types/ContentTypes'
import type { QueryWrapper } from 'GraphQL/Query'
import { withDefaultQuery } from 'GraphQL/Query'
import { seoPartial, contentPartial, heroPartial } from '../../GraphQL/partials'

const query = /* GraphQL */ gql`
	query HomepageQuery {
		homepage {
			${heroPartial}
			${seoPartial}
			${contentPartial}
		}
	}
`

type Response = {
	homepage: {
		banner?: {
			image: ImageType,
		},
	},
}

const HomepageQuery: QueryWrapper<Response> = withDefaultQuery(query)

export default HomepageQuery
