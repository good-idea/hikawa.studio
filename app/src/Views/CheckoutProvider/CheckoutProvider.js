// @flow
import * as React from 'react'
import { path } from 'ramda'
import type { Checkout } from 'Types/CheckoutTypes'
import type { Mutation } from 'Types/GraphQLTypes'
import { adopt } from 'react-adopt'
import { setCookie, getCookie, VIEWER_CART_TOKEN } from 'Utils/storage'
import { CheckoutCreate, CheckoutLineItemsAdd } from './mutations'
import { CheckoutQuery } from './queries'

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
		// ...
		currentCart: undefined,
	}

	componentDidMount = async () => {
		// const { queryCheckout } = this.props
		// const id = getCookie(VIEWER_CART_TOKEN)
		// const r = await queryCheckout({ id })
	}

	addToCart = async (variables: AddToCartArgs): Promise<void> => {
		const { currentCart, checkoutLineItemsAdd } = this.props
		if (!currentCart) return this.createCart(variables)
		console.log(variables)
		return checkoutLineItemsAdd({
			variables: { checkoutId: currentCart.id, ...variables },
		})
	}

	createCart = async (variables: AddToCartArgs): Promise<void> => {
		const { checkoutCreate } = this.props
		const result = await checkoutCreate({ variables })
		if (result && result.data) {
			setCookie(VIEWER_CART_TOKEN, result.data.checkoutCreate.checkout.id)
		}
	}

	render() {
		const { children, currentCart } = this.props
		const { addToCart } = this
		const value = {
			addToCart,
			currentCart,
			// items,
		}

		return <Provider value={value}>{children}</Provider>
	}
}

const mappers = ({ checkoutQueryData, ...rest }) => ({
	currentCart: path(['data', 'node'], checkoutQueryData),
	...rest,
})

const Composed = adopt(
	{
		checkoutCreate: <CheckoutCreate />,
		checkoutLineItemsAdd: <CheckoutLineItemsAdd />,
		checkoutQueryData: <CheckoutQuery variables={{ id: getCookie(VIEWER_CART_TOKEN) }} />,
	},
	mappers,
)

export const CheckoutProvider = (props: InitialProps) => (
	<Composed>{(composed) => <CheckoutProviderBase {...composed} {...props} />}</Composed>
)
