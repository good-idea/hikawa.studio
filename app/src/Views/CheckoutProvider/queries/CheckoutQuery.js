// @flow
import gql from 'graphql-tag'
import { withDefaultQuery } from 'GraphQL/Query'
import type { QueryWrapper } from 'GraphQL/Query'
import type { Checkout } from 'Types/CheckoutTypes'

export const query = gql`
	query CheckoutQuery($id: ID!) {
		node(id: $id) {
			id
			... on Checkout {
				email
				paymentDue
				lineItems(first: 50) {
					pageInfo {
						hasNextPage
						hasPreviousPage
					}
					edges {
						cursor
						node {
							id
							title
							quantity
							variant {
								id
								title
								price
								product {
									id
									title
								}
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
		}
	}
`

type Response = {
	node: Checkout,
}

const CheckoutQuery: QueryWrapper<Response> = withDefaultQuery(query)

export default CheckoutQuery
