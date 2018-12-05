// @flow
import gql from 'graphql-tag'
import type { CollectionType } from 'Types/ProductTypes'
import type { QueryWrapper } from 'GraphQL/Query'
import { withDefaultQuery } from 'GraphQL/Query'
import { colorPartial, shopifyImageFields, sanityImageFields } from '../../GraphQL/partials'

const query = /* GraphQL */ gql`
	query ShopQuery {
		shop {
			collections(first: 50) {
				edges {
					node {
						id
						title
						description
						handle
						backgroundImage {
							${sanityImageFields}
						}
						backgroundColor {
							${colorPartial}
						}
						keyColor {
							${colorPartial}
						}
						products(first: 50) {
							edges {
								node {
									id
									title
									handle
									images(first: 1) {
										edges {
											node {
												${shopifyImageFields}
											}
										}
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

type Response = {
	shop: {
		collection: Array<CollectionType>,
	},
}

const ShopQuery: QueryWrapper<Response> = withDefaultQuery(query)

export default ShopQuery
