// @flow
import gql from 'graphql-tag'
import type { CollectionType } from 'Types/CollectionTypes'
import type { QueryWrapper } from 'GraphQL/Query'
import { withDefaultQuery } from 'GraphQL/Query'
import { seoPartial, contentPartial, bannerPartial, shopifyImageFields } from '../../GraphQL/partials'

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
						backgroundColor {
							rgb {
								r
								g
								b
								a
							}
						}
						keyColor {
							rgb {
								r
								g
								b
								a
							}
						}
						products(first: 50) {
							edges {
								node {
									id
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
