// @flow
import gql from 'graphql-tag'

const query = gql`
	query CollectionQuery($handle: String!) {
		shop {
			collectionByHandle(handle: $handle) {
				id
				title
				description
				products(first: 50) {
					pageInfo {
						hasNextPage
						hasPreviousPage
					}
					edges {
						cursor
						node {
							id
							title
							handle
							description
							availableForSale
							images(first: 1) {
								edges {
									node {
										id
										altText
										originalSrc
									}
								}
							}
						}
					}
				}
			}
		}
	}
`

export default query
