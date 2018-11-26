// @flow
import * as React from 'react'
import { Button } from 'Components/Buttons'
import Modal from 'Components/Modal'
import type { Checkout } from 'Types/CheckoutTypes'
import type { CheckoutConsumerProps } from '../CheckoutProvider'
import CartLineItem from './CartLineItem'
/**
 * Cart
 */

type Props = CheckoutConsumerProps

type State = {
	isOpen: boolean,
}

const getCount = (currentCart?: Checkout): number => {
	if (!currentCart || !currentCart.lineItems) return 0
	return currentCart.lineItems.reduce((acc, item) => acc + item.quantity || 0, 0)
}

class Cart extends React.Component<Props, State> {
	state = {
		isOpen: false,
	}

	openCart = () => {
		this.setState({ isOpen: true })
	}

	closeCart = () => {
		this.setState({ isOpen: false })
	}

	render() {
		const { currentCart } = this.props
		const { isOpen } = this.state
		const count = getCount(currentCart)
		const { lineItems } = currentCart || {}
		return (
			<React.Fragment>
				<Button onClick={this.openCart}>Cart: {count} items</Button>
				<Modal open={isOpen && lineItems && lineItems.length > 0} onBackgroundClick={this.closeCart}>
					{lineItems && lineItems.map((l) => <CartLineItem key={l.id} item={l} />)}
				</Modal>
			</React.Fragment>
		)
	}
}

export default Cart
