// @flow
import gql from 'graphql-tag'

const query = /* GraphQL */ gql`
	{
		shop {
			collections(first: 2) {
				edges {
					node {
						id
						title
						handle
						description
						image {
							altText
							id
							originalSrc
						}
					}
				}
			}
		}
	}
`

export default query
