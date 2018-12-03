// @flow
import * as React from 'react'
import styled from 'styled-components'
import { adopt } from 'react-adopt'
import { Button } from 'Components/Buttons'
import Modal from 'Components/Modal'
import type { Checkout } from 'Types/CheckoutTypes'
import type { CheckoutConsumerProps } from '../CheckoutProvider'
import { CheckoutConsumer } from '../CheckoutProvider'
import CartLineItem from './CartLineItem'
import CartSummary from './CartSummary'

const SummaryWrapper = styled.div`
	${({ theme, loading }) => `
		width: calc(100% - (${theme.layout.spacing.quadruple} * 2));
		min-width: 600px;
		opacity: ${loading ? '0.5' : '1'};
		pointer-events: ${loading ? 'none' : 'auto'};

	`};
`
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
		const { currentCart, updateQuantity, loading } = this.props
		const { isOpen } = this.state
		const count = getCount(currentCart)
		const { lineItems } = currentCart || {}
		return (
			<React.Fragment>
				<Button onClick={this.openCart}>Cart: {count} items</Button>
				<Modal open={isOpen} onBackgroundClick={this.closeCart}>
					<SummaryWrapper loading={loading}>
						{lineItems && lineItems.map((l) => <CartLineItem key={l.id} item={l} updateQuantity={updateQuantity(l)} />)}
						<CartSummary cart={currentCart} />
					</SummaryWrapper>
				</Modal>
			</React.Fragment>
		)
	}
}
// <CartSummary cart={currentCart} />

const Composed = adopt({
	cart: <CheckoutConsumer />,
})

export default () => <Composed>{({ cart }) => <Cart {...cart} />}</Composed>
