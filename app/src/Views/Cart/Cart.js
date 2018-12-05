// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { adopt } from 'react-adopt'
import { Button } from 'Components/Buttons'
import Modal from 'Components/Modal'
import type { Checkout } from 'Types/CheckoutTypes'
import { Header1, Header5 } from 'Components/Type'
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

const LineItems = styled.div`
	${() => `
	`};
`
// border-top: 1px solid black;
// border-bottom: 1px solid black;

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
		const { currentCart, updateQuantity, loading, applyDiscount, removeDiscount, userErrors } = this.props
		const { isOpen } = this.state
		const count = getCount(currentCart)
		const { lineItems } = currentCart || {}
		return (
			<React.Fragment>
				<Button onClick={this.openCart}>Cart: {count} items</Button>
				<Modal open={isOpen} onBackgroundClick={this.closeCart}>
					<SummaryWrapper loading={loading}>
						{currentCart && lineItems.length ? (
							<React.Fragment>
								<Header1>Cart</Header1>
								<LineItems>
									{lineItems && lineItems.map((l) => <CartLineItem key={l.id} item={l} updateQuantity={updateQuantity(l)} />)}
								</LineItems>
								<CartSummary cart={currentCart} applyDiscount={applyDiscount} removeDiscount={removeDiscount} />
								<Button as="a" href={currentCart.webUrl}>
									Continue to Checkout
								</Button>
								{userErrors &&
									userErrors.map((error) => (
										<Header5 key={error} align="center" color="red" weight="normal">
											{error}
										</Header5>
									))}
							</React.Fragment>
						) : (
							<p>your cart is empty</p>
						)}
					</SummaryWrapper>
				</Modal>
			</React.Fragment>
		)
	}
}

const Composed = adopt({
	cart: <CheckoutConsumer />,
})

export default () => <Composed>{({ cart }) => <Cart {...cart} />}</Composed>
