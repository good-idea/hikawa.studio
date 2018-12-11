// @flow
import * as React from 'react'
import styled from 'styled-components'
import { adopt } from 'react-adopt'
import { Button } from 'Components/Buttons'
import Modal from 'Components/Modal'
import type { Checkout } from 'Types/CheckoutTypes'
import { Header1, Header3, Header4, Header5 } from 'Components/Type'
import type { CheckoutConsumerProps } from '../CheckoutProvider'
import { CheckoutConsumer } from '../CheckoutProvider'
import CartLineItem from './CartLineItem'
import CartSummary from './CartSummary'
import Tote from './Tote'

const SummaryWrapper = styled.div`
	${({ theme, loading }) => `
		opacity: ${loading ? '0.5' : '1'};
		pointer-events: ${loading ? 'none' : 'auto'};
	`};
`

const CartButton = styled(Button)`
	display: flex;
	justify-content: center;
	align-items: center;
`

const LineItems = styled.div`
	max-height: calc(100vh - 400px);
	overflow: scroll;
	border: 1px solid black;
	padding: 10px;
`

const CartCount = styled(Header4)`
	margin-left: 0.5em;
`

/**
 * Cart
 */

type Props = CheckoutConsumerProps

const getCount = (currentCart?: Checkout): number => {
	if (!currentCart || !currentCart.lineItems) return 0
	return currentCart.lineItems.reduce((acc, item) => acc + item.quantity || 0, 0)
}

/**
 * Cart
 */

const Cart = (props: Props) => {
	const { currentCart, isOpen, openCart, closeCart, updateQuantity, loading, applyDiscount, removeDiscount, userErrors } = props
	const count = getCount(currentCart)
	const { lineItems } = currentCart || {}

	return (
		<React.Fragment>
			<CartButton onClick={openCart}>
				<Header3 align="center">
					<Tote />
				</Header3>
				{parseInt(count, 10) > 0 && <CartCount>{count}</CartCount>}
			</CartButton>
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
				</SummaryWrapper>
			</Modal>
		</React.Fragment>
	)
}

const Composed = adopt({
	cart: <CheckoutConsumer />,
})

export default () => <Composed>{({ cart }) => <Cart {...cart} />}</Composed>
