// @flow
import gql from 'graphql-tag'
import { colorPartial, shopifyImageFields, heroPartial } from '../../GraphQL/partials'

const query = /* GraphQL */ gql`
	query ShopQuery {
		shopPage {
			${heroPartial}
		}
		shop {
			collections(first: 50) {
				edges {
					node {
						id
						title
						description
						handle
						${heroPartial}
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

export default query
