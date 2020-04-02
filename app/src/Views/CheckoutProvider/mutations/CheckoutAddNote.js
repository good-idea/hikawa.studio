// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from 'GraphQL/Mutation'
import type { MutationWrapper } from 'GraphQL/Mutation'
import type { Checkout } from 'Types/CheckoutTypes'
import { getCookie, VIEWER_CART_TOKEN } from 'Utils/storage'
import { query as checkoutQuery, checkoutFields } from '../queries/CheckoutQuery'

const mutation = gql`
	mutation AddNote(
		$note: String
) {
		checkoutAttributesUpdateV2(
			input: {
  			note: $note
			}
		) {
			checkoutUserErrors {
				code
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
			checkoutCreate: { checkout },
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

const AddNoteMutation: MutationWrapper<MutationResponse> = withDefaultMutation(mutation, config)

export default AddNoteMutation
