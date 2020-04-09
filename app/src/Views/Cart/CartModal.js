// @flow
import * as React from 'react'
import styled from 'styled-components'
import { adopt } from 'react-adopt'
import ReactPixel from 'react-facebook-pixel'
import { Button, SecondaryButton } from 'Components/Buttons'
import Modal from 'Components/Modal'
import { Header1, Header3, Header5 } from 'Components/Type'
import type { CheckoutConsumerProps } from '../CheckoutProvider'
import { CheckoutConsumer } from '../CheckoutProvider'
import CartLineItem from './CartLineItem'
import CartSummary from './CartSummary'
import { isReactProduction } from '../../Utils/env'

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

const Centered = styled.div`
	text-align: center;
`

const Cart = (props: Props) => {
	const { currentCart, isOpen, closeCart, updateQuantity, loading, applyDiscount, removeDiscount, userErrors } = props
	const { lineItems } = currentCart || {}

	const handleCheckoutClick = () => {
		if (!lineItems.length) return
		const lineItemIds = lineItems.map((item) => item.id)
		const contents = lineItems.map((item) => ({
			id: item.id,
			quantity: item.quantity,
		}))
		const totalQuantity = lineItems.reduce((acc, item) => acc + item.quantity, 0)
		if (isReactProduction()) {
			ReactPixel.track('InitiateCheckout', {
				content_category: '',
				content_ids: lineItemIds,
				contents,
				currency: 'USD',
				num_items: totalQuantity,
			})
		}
		window.location = currentCart.webUrl
	}

	return (
		<Modal open={isOpen} onBackgroundClick={closeCart}>
			<SummaryWrapper loading={loading}>
				{currentCart && lineItems.length ? (
					<>
						<Header1>Your Tote</Header1>
						<LineItems>
							{lineItems && lineItems.map((l) => <CartLineItem key={l.id} item={l} updateQuantity={updateQuantity(l)} />)}
						</LineItems>
						<CartSummary cart={currentCart} applyDiscount={applyDiscount} removeDiscount={removeDiscount} />
						<Centered>
							<Button onClick={handleCheckoutClick}>Continue to Checkout</Button>
							{userErrors &&
								userErrors.map((error) => (
									<Header5 key={error} align="center" color="red" weight="normal">
										{error}
									</Header5>
								))}
						</Centered>
					</>
				) : (
					<Header3 align="center">
						Your Tote is empty{' '}
						<span role="img" aria-label="sad">
							😢
						</span>
					</Header3>
				)}
				<Centered>
					<SecondaryButton onClick={closeCart}>Close</SecondaryButton>
				</Centered>
			</SummaryWrapper>
		</Modal>
	)
}

const Composed = adopt({
	cart: <CheckoutConsumer />,
})

export default () => <Composed>{({ cart }) => <Cart {...cart} />}</Composed>
