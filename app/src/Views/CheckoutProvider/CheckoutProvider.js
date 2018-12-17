// @flow
import * as React from 'react'
import { path } from 'ramda'
import type { Checkout, CheckoutLineItem } from 'Types/CheckoutTypes'
import type { Mutation } from 'Types/GraphQLTypes'
import { adopt } from 'react-adopt'
import {
	CheckoutCreate,
	CheckoutLineItemsAdd,
	CheckoutLineItemsUpdate,
	CheckoutDiscountCodeApply,
	CheckoutDiscountCodeRemove,
} from './mutations'
import CurrentCart from './CurrentCart'

const debug = require('debug')('web')

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
	checkoutDiscountCodeApply: Mutation,
	checkoutDiscountCodeRemove: Mutation,
	currentCart?: void | Checkout,
	refetchCart: () => Promise<void>,
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
	isOpen: boolean,
	openCart: () => void,
	closeCart: () => void,
	loading: boolean,
	addToCart: (AddToCartArgs) => Promise<void>,
	updateQuantity: (CheckoutLineItem) => (number) => Promise<void>,
	applyDiscount: (string) => Promise<void>,
	removeDiscount: () => Promise<void>,
	userErrors: Array<string>,
}

type State = {
	loading: boolean,
	isOpen: boolean,
	userErrors: Array<string>,
}

class CheckoutProviderBase extends React.Component<Props, State> {
	static defaultProps = {
		currentCart: undefined,
	}

	state = {
		loading: false,
		isOpen: false,
		userErrors: [],
	}

	refetch = async () => {
		const { refetchCart } = this.props
		await refetchCart()
		this.setState({ loading: false })
	}

	openCart = () => {
		this.setState({ isOpen: true })
	}

	closeCart = () => {
		this.setState({ isOpen: false })
	}

	createCart = async (variables: AddToCartArgs): Promise<void> => {
		const { checkoutCreate, updateCheckoutId } = this.props
		const result = await checkoutCreate({ variables })
		const { id } = path(['data', 'checkoutCreate', 'checkout'], result)
		if (id) updateCheckoutId(id)
	}

	addToCart = async (variables: AddToCartArgs): Promise<void> => {
		const { currentCart, checkoutLineItemsAdd } = this.props
		if (!currentCart) return this.createCart(variables)
		await this.setState({ loading: true })

		const result = await checkoutLineItemsAdd({
			variables: { checkoutId: currentCart.id, ...variables },
		}).catch((e) => {
			debug('Error adding to cart. Attempting refetch..')
			debug(e)
			this.refetch()
		})
		const userErrors = path(['data', 'checkoutLineItemsAdd', 'userErrors'], result)
		this.setState({ loading: false, userErrors: (userErrors && userErrors.map((e) => e.message)) || [] })
		return result
	}

	updateQuantity = (lineItem: CheckoutLineItem) => async (quantity: number) => {
		const { checkoutLineItemsUpdate, currentCart } = this.props
		if (!currentCart) return
		await this.setState({ loading: true })
		const result = await checkoutLineItemsUpdate({
			variables: {
				checkoutId: currentCart.id,
				lineItems: [{ id: lineItem.id, variantId: lineItem.variant.id, quantity }],
			},
		}).catch((e) => {
			debug('Error modifying cart. Attempting refetch..')
			debug(e)
			this.refetch()
		})
		const userErrors = path(['data', 'checkoutLineItemsUpdate', 'userErrors'], result)
		this.setState({ loading: false, userErrors: (userErrors && userErrors.map((e) => e.message)) || [] })
	}

	applyDiscount = async (discountCode: string) => {
		const { checkoutDiscountCodeApply, currentCart } = this.props
		if (!currentCart) return
		await this.setState({ loading: true })
		const result = await checkoutDiscountCodeApply({
			variables: {
				checkoutId: currentCart.id,
				discountCode,
			},
		}).catch((e) => {
			debug('Error modifying cart. Attempting refetch..')
			debug(e)
			this.refetch()
		})

		const userErrors = path(['data', 'checkoutDiscountCodeApplyV2', 'userErrors'], result)
		this.setState({ loading: false, userErrors: (userErrors && userErrors.map((e) => e.message)) || [] })
	}

	removeDiscount = async () => {
		const { checkoutDiscountCodeRemove, currentCart } = this.props
		if (!currentCart) return
		await this.setState({ loading: true })
		const result = await checkoutDiscountCodeRemove({
			variables: {
				checkoutId: currentCart.id,
			},
		}).catch((e) => {
			debug('Error modifying cart. Attempting refetch..')
			debug(e)
			this.refetch()
		})
		const userErrors = path(['data', 'ccheckoutDiscountCodeRemove', 'userErrors'], result)
		this.setState({ loading: false, userErrors: (userErrors && userErrors.map((e) => e.message)) || [] })
	}

	updateDebounceTimer: TimeoutID

	render() {
		const { children, currentCart } = this.props
		const { userErrors, isOpen } = this.state
		const { openCart, closeCart, addToCart, updateQuantity, applyDiscount, removeDiscount } = this
		console.log(currentCart)
		const value = {
			addToCart,
			currentCart,
			loading: this.props.loading || this.state.loading || false,
			updateQuantity,
			applyDiscount,
			removeDiscount,
			userErrors,
			openCart,
			closeCart,
			isOpen,
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
		checkoutDiscountCodeApply: <CheckoutDiscountCodeApply />,
		checkoutDiscountCodeRemove: <CheckoutDiscountCodeRemove />,
	},
	mappers,
)

export const CheckoutProvider = (props: InitialProps) => (
	<Composed>{(composed) => <CheckoutProviderBase {...composed} {...props} />}</Composed>
)
