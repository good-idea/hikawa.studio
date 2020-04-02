// @flow
import gql from 'graphql-tag'
import { pageLinkFields, shopifyImageFields, heroPartial } from '../../GraphQL/partials'

const query = gql`
	query ProductQuery($handle: String!) {
		shop {
			productByHandle(handle: $handle) {
				id
				title
				handle
				description
        descriptionHtml
				availableForSale
				variants(first: 50) {
					edges {
						node {
							id
							availableForSale
							price
							sku
							title
							image {
                ${shopifyImageFields}
							}
						}
					}
				}
				images(first: 50) {
					edges {
						node {
              ${shopifyImageFields}
						}
					}
				}
				related {
					${pageLinkFields}
				}
				${heroPartial}
			}
		}
	}
`

export default query
