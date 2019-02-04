// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from 'GraphQL/Mutation'
import type { MutationWrapper } from 'GraphQL/Mutation'
import type { Checkout } from 'Types/CheckoutTypes'
import { query as checkoutQuery, checkoutFields } from '../queries/CheckoutQuery'

const mutation = gql`
	mutation CheckoutAddItems($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
		checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
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
			checkoutLineItemsAdd: { userErrors, checkout },
		} = data
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

const CheckoutAddItems: MutationWrapper<MutationResponse> = withDefaultMutation(mutation, config)

export default CheckoutAddItems
