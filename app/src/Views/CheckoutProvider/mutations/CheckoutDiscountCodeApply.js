// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from 'GraphQL/Mutation'
import type { MutationWrapper } from 'GraphQL/Mutation'
import type { Checkout } from 'Types/CheckoutTypes'
import { getCookie, VIEWER_CART_TOKEN } from 'Utils/storage'
import { query as checkoutQuery, checkoutFields } from '../queries/CheckoutQuery'

const mutation = gql`
	mutation CheckoutDiscountCodeApply($discountCode: String!, $checkoutId: ID!) {
		checkoutDiscountCodeApplyV2(discountCode: $discountCode, checkoutId: $checkoutId) {
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
	update: (proxy, { data }) => {
		if (!data) return
		const {
			checkoutDiscountCodeApplyV2: { checkout },
		} = data
		const id = getCookie(VIEWER_CART_TOKEN) || ''
		// const prev = proxy.readQuery()
		if (id && checkout) {
			proxy.writeQuery({
				query: checkoutQuery,
				variables: { id },
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

const CheckoutDiscountCodeApplyMutation: MutationWrapper<MutationResponse> = withDefaultMutation(mutation, config)

export default CheckoutDiscountCodeApplyMutation
