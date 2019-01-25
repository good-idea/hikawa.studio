// @flow
import gql from 'graphql-tag'
import { seoPartial, contentPartial, heroPartial } from '../../GraphQL/partials'

export const query = /* GraphQL */ gql`
	query HomepageQuery {
		homepage {
			${heroPartial}
			${seoPartial}
			${contentPartial}
		}
	}
`

export default query
