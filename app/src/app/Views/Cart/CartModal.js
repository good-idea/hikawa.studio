// @flow
import * as React from 'react'
import styled from 'styled-components'
import { adopt } from 'react-adopt'
import { Button, SecondaryButton } from 'Components/Buttons'
import Modal from 'Components/Modal'
import { Header1, Header3, Header5 } from 'Components/Type'
import type { CheckoutConsumerProps } from '../CheckoutProvider'
import { CheckoutConsumer } from '../CheckoutProvider'
import CartLineItem from './CartLineItem'
import CartSummary from './CartSummary'

const SummaryWrapper = styled.div`
	${({ loading }) => `
		opacity: ${loading ? '0.5' : '1'};
		pointer-events: ${loading ? 'none' : 'auto'};
	`};
`

const LineItems = styled.div`
	max-height: calc(100vh - 400px);
	overflow: scroll;
	border: 1px solid black;
	padding: 10px;
`

/**
 * Cart
 */

type Props = CheckoutConsumerProps

/**
 * Cart
 */

const Cart = (props: Props) => {
	const { currentCart, isOpen, closeCart, updateQuantity, loading, applyDiscount, removeDiscount, userErrors } = props
	const { lineItems } = currentCart || {}

	return (
		<Modal open={isOpen} onBackgroundClick={closeCart}>
			<SummaryWrapper loading={loading}>
				{currentCart && lineItems.length ? (
					<React.Fragment>
						<Header1>Your Tote</Header1>
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
					<Header3 align="center">
						Your Tote is empty{' '}
						<span role="img" aria-label="sad">
							😢
						</span>
					</Header3>
				)}
				<div>
					<SecondaryButton onClick={closeCart}>Close</SecondaryButton>
				</div>
			</SummaryWrapper>
		</Modal>
	)
}

const Composed = adopt({
	cart: <CheckoutConsumer />,
})

export default () => <Composed>{({ cart }) => <Cart {...cart} />}</Composed>