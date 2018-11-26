// @flow
import gql from 'graphql-tag'
import type { ImageType } from 'Types/ContentTypes'
import type { QueryWrapper } from 'GraphQL/Query'
import { withDefaultQuery } from 'GraphQL/Query'
import { seoPartial, contentPartial, bannerPartial } from '../../GraphQL/partials'

const query = /* GraphQL */ gql`
	{
		homepage {
			${bannerPartial}
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
