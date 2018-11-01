// @flow
import gql from 'graphql-tag'
import { withDefaultMutation } from 'GraphQL/Mutation'
import type { MutationWrapper } from 'GraphQL/Mutation'
import type { Checkout } from 'Types/CheckoutTypes'
import { query as checkoutQuery } from '../queries/CheckoutQuery'

const mutation = gql`
	mutation CheckoutCreate(
		$email: String
		$lineItems: [CheckoutLineItemInput!]
		$shippingAddress: MailingAddressInput
		$note: String
		$customAttributes: [AttributeInput!]
		$allowPartialAddresses: Boolean
	) {
		checkoutCreate(
			input: {
				email: $email
				lineItems: $lineItems
				shippingAddress: $shippingAddress
				note: $note
				customAttributes: $customAttributes
				allowPartialAddresses: $allowPartialAddresses
			}
		) {
			checkoutUserErrors {
				code
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
							}
						}
					}
				}
			}
		}
	}
`

const config = {
	update: (proxy, { data }) => {
		if (!data) return
		const {
			checkoutCreate: { checkoutUserErrors, checkout },
		} = data
		if (checkoutUserErrors.length !== 0) {
			console.log(checkoutUserErrors)
		}
		if (checkout) {
			proxy.writeQuery({
				query: checkoutQuery,
				data: {
					checkout,
				},
			})
		}
	},
}

type MutationResponse = {
	checkout: Checkout,
}

const CheckoutMutation: MutationWrapper<MutationResponse> = withDefaultMutation(mutation, config)

export default CheckoutMutation
