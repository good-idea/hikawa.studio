// @flow
import * as React from 'react'
import { path } from 'ramda'
import type { Checkout, CheckoutLineItem } from 'Types/CheckoutTypes'
import type { Mutation } from 'Types/GraphQLTypes'
import { adopt } from 'react-adopt'
import { CheckoutCreate, CheckoutLineItemsAdd, CheckoutLineItemsUpdate } from './mutations'
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
	checkoutLineItemsUpdate: Mutation,
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
	loading: boolean,
	addToCart: (AddToCartArgs) => Promise<void>,
	updateQuantity: (CheckoutLineItem) => (number) => Promise<void>,
}

type State = {
	loading: boolean,
}

class CheckoutProviderBase extends React.Component<Props, State> {
	static defaultProps = {
		currentCart: undefined,
	}

	state = {
		loading: false,
	}

	addToCart = async (variables: AddToCartArgs): Promise<void> => {
		const { currentCart, checkoutLineItemsAdd } = this.props
		if (!currentCart) return this.createCart(variables)
		const newItems = await checkoutLineItemsAdd({
			variables: { checkoutId: currentCart.id, ...variables },
		})

		return newItems
	}

	updateQuantity = (lineItem: CheckoutLineItem) => async (quantity: number) => {
		const { checkoutLineItemsUpdate, currentCart } = this.props
		if (!currentCart) return
		await this.setState({ loading: true })
		await checkoutLineItemsUpdate({
			variables: {
				checkoutId: currentCart.id,
				lineItems: [{ id: lineItem.id, variantId: lineItem.variant.id, quantity }],
			},
		})
		this.setState({ loading: false })
	}

	createCart = async (variables: AddToCartArgs): Promise<void> => {
		const { checkoutCreate, updateCheckoutId } = this.props
		const result = await checkoutCreate({ variables })
		const { id } = path(['data', 'checkoutCreate', 'checkout'], result)
		if (id) updateCheckoutId(id)
	}

	updateDebounceTimer: TimeoutID

	render() {
		const { children, currentCart } = this.props
		const { addToCart, updateQuantity } = this
		const value = {
			//
			addToCart,
			currentCart,
			loading: this.props.loading || this.state.loading || false,
			updateQuantity,
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
		checkoutLineItemsUpdate: <CheckoutLineItemsUpdate />,
	},
	mappers,
)

export const CheckoutProvider = (props: InitialProps) => (
	<Composed>{(composed) => <CheckoutProviderBase {...composed} {...props} />}</Composed>
)
