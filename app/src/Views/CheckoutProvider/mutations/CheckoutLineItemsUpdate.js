// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from 'GraphQL/Mutation'
import type { MutationWrapper } from 'GraphQL/Mutation'
import type { Checkout } from 'Types/CheckoutTypes'
import { query as checkoutQuery, checkoutFields } from '../queries/CheckoutQuery'

const mutation = gql`
	mutation CheckoutLineItemsUpdate($lineItems: [CheckoutLineItemUpdateInput!]!, $checkoutId: ID!) {
		checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
			userErrors {
				field
				message
			}
			checkout {
				${checkoutFields}
			}
		}
	}
`

const config = {
	update: async (proxy, { data }) => {
		if (!data) return

		const {
			checkoutLineItemsUpdate: { userErrors, checkout },
		} = data
		if (userErrors.length !== 0) {
			console.log(userErrors)
		}
		if (checkout) {
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

const CheckoutLineItemsUpdate: MutationWrapper<MutationResponse> = withDefaultMutation(mutation, config)

export default CheckoutLineItemsUpdate
