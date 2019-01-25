// @flow
import gql from 'graphql-tag'
import { withDefaultQuery } from 'GraphQL/Query'
import type { QueryWrapper } from 'GraphQL/Query'
import type { Checkout } from 'Types/CheckoutTypes'

const discountApplicationFields = `
	allocationMethod
	targetSelection
	targetType
	...on DiscountCodeApplication {
		code
		applicable
	}
	value {
		...on PricingPercentageValue {
			percentage
		}
		...on MoneyV2 {
			amount
			currencyCode
		}
	}
`

export const checkoutFields = `
	id
	email
	paymentDue
	webUrl
	completedAt
	shippingLine {
		handle
		price
		title
	}
	discountApplications(first: 100) {
		pageInfo {
			hasNextPage
			hasPreviousPage
		}
		edges {
			cursor
			node {
				${discountApplicationFields}
			}
		}
	}
	lineItems(first: 100) {
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
				discountAllocations {
					allocatedAmount {
						amount
						currencyCode
					}
					discountApplication {
						${discountApplicationFields}
					}
				}
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
`

export const query = gql`
	query CheckoutQuery($id: ID!) {
		node(id: $id) {
			id
			... on Checkout {
				${checkoutFields}
			}
		}
	}
`

type Response = {
	node: Checkout,
}

const CheckoutQuery: QueryWrapper<Response> = withDefaultQuery(query)

export default CheckoutQuery
