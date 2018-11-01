// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from 'GraphQL/Mutation'
import type { MutationWrapper } from 'GraphQL/Mutation'
import type { Checkout } from 'Types/CheckoutTypes'
import { query as checkoutQuery } from '../queries/CheckoutQuery'

const mutation = gql`
	mutation CheckoutAddItems($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
		checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
			userErrors {
				field
				message
			}
			checkout {
				id
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
							quantity
							title
							variant {
								id
								title
								price
							}
						}
					}
				}
			}
		}
	}
`

const config = {
	update: async (proxy, { data }) => {
		console.log(data)
		if (!data) return

		const {
			checkoutLineItemsAdd: { userErrors, checkout },
		} = data
		console.log(checkout)
		if (userErrors.length !== 0) {
			console.log(userErrors)
		}
		if (checkout) {
			const q = await proxy.readQuery({ query: checkoutQuery, variables: { id: checkout.id } })
			console.log(q)
			proxy.writeQuery({
				query: checkoutQuery,
				variables: { id: checkout.id },
				data: {
					node: checkout,
				},
			})
		}
	},
}

type MutationResponse = {
	checkout: Checkout,
}

const CheckoutAddItems: MutationWrapper<MutationResponse> = withDefaultMutation(mutation, config)

export default CheckoutAddItems
