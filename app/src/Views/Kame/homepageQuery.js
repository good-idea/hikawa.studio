// @flow
import gql from 'graphql-tag'

const query = /* GraphQL */ gql`
	{
		shop {
			products(first: 50) {
				pageInfo {
					hasNextPage
					hasPreviousPage
				}
				edges {
					cursor
					node {
						id
						tags
						title
					}
				}
			}
		}
	}
`

export default query
