// @flow
import * as React from 'react'
import { setCookie, getCookie, removeCookie, VIEWER_CART_TOKEN } from 'Utils/storage'
import type { Checkout, CheckoutLineItem } from 'Types/CheckoutTypes'
import { CheckoutQuery } from './queries'

/**
 * CurrentCart
 */

type Props = {
	children?: ({}) => React.Node,
}

type State = {
	checkoutId: string | null,
}

const stripNoVariants = (lineItem: CheckoutLineItem) => Boolean(lineItem.variant)

const sanitizeCart = (originalCart: Checkout) => ({
	...originalCart,
	lineItems: originalCart.lineItems.filter(stripNoVariants),
})

class CurrentCart extends React.Component<Props, State> {
	static defaultProps = {
		children: () => null,
	}

	state = {
		checkoutId: getCookie(VIEWER_CART_TOKEN),
	}

	updateCheckoutId = (checkoutId: string) => {
		setCookie(VIEWER_CART_TOKEN, checkoutId)
		this.setState({ checkoutId })
	}

	render() {
		const { children } = this.props
		const { checkoutId } = this.state
		const { updateCheckoutId } = this
		if (!children) return null
		return (
			<CheckoutQuery LoadingComponent={false} variables={{ id: checkoutId }} delayQuery={!checkoutId}>
				{(result) => {
					const { data, loading, refetch } = result
					const cart = data && data.node ? sanitizeCart(data.node) : undefined
					// const isCompleted)
					const currentCart = cart && cart.completedAt ? null : cart
					if (cart && cart.completedAt) removeCookie(VIEWER_CART_TOKEN)
					return children({ loading, currentCart, updateCheckoutId, refetchCart: refetch })
				}}
			</CheckoutQuery>
		)
	}
}

export default CurrentCart
