// @flow
import * as React from 'react'
import { path } from 'ramda'
import type { Checkout } from 'Types/CheckoutTypes'
import type { Mutation } from 'Types/GraphQLTypes'
import { adopt } from 'react-adopt'
import { CheckoutCreate, CheckoutLineItemsAdd } from './mutations'
import CurrentCart from './CurrentCart'

const { Consumer, Provider } = React.createContext()
export const CheckoutConsumer = Consumer

/**
 * CheckoutProvider
 */

type InitialProps = {
	children: React.Node,
}

type Props = {
	children: React.Node,
	checkoutCreate: Mutation,
	checkoutLineItemsAdd: Mutation,
	currentCart?: void | Checkout,
	loading: boolean,
	updateCheckoutId: (string) => void,
}

type AddLineItem = {
	variantId: string,
	quantity: number,
}

type AddToCartArgs = {
	lineItems: Array<AddLineItem>,
	email?: string,
	note?: string,
}

export type CheckoutConsumerProps = {
	currentCart: void | Checkout,
	addToCart: (AddToCartArgs) => Promise<void>,
}

class CheckoutProviderBase extends React.Component<Props> {
	static defaultProps = {
		currentCart: undefined,
	}

	addToCart = async (variables: AddToCartArgs): Promise<void> => {
		const { currentCart, checkoutLineItemsAdd } = this.props
		if (!currentCart) return this.createCart(variables)
		const newItems = await checkoutLineItemsAdd({
			variables: { checkoutId: currentCart.id, ...variables },
		})

		console.log(newItems)
		return newItems
	}

	createCart = async (variables: AddToCartArgs): Promise<void> => {
		const { checkoutCreate, updateCheckoutId } = this.props
		const result = await checkoutCreate({ variables })
		const { id } = path(['data', 'checkoutCreate', 'checkout'], result)
		if (id) updateCheckoutId(id)
	}

	render() {
		const { children, currentCart, loading } = this.props
		const { addToCart } = this
		const value = {
			//
			addToCart,
			currentCart,
			loading,
		}

		return <Provider value={value}>{children}</Provider>
	}
}

const mappers = ({ currentCart, ...rest }) => ({
	...currentCart,
	...rest,
})

const Composed = adopt(
	{
		currentCart: <CurrentCart />,
		checkoutCreate: <CheckoutCreate />,
		checkoutLineItemsAdd: <CheckoutLineItemsAdd />,
	},
	mappers,
)

export const CheckoutProvider = (props: InitialProps) => (
	<Composed>{(composed) => <CheckoutProviderBase {...composed} {...props} />}</Composed>
)
