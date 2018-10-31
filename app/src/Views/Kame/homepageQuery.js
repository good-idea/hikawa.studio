// @flow
import gql from 'graphql-tag'
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

export default query
