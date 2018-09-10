// @flow
import gql from 'graphql-tag'

const query = gql`
	query ProductQuery($handle: String!) {
		shop {
			productByHandle(handle: $handle) {
				id
				title
				handle
				description
				availableForSale
				variants(first: 50) {
					edges {
						node {
							id
							availableForSale
							price
							sku
							title
						}
					}
				}
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
`

export default query
