// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { Checkout } from 'Types/CheckoutTypes'
import { parsePrice } from 'Utils/parsing'
import { Header4 } from 'Components/Type'
import CouponCode from './CouponCode'

const Wrapper = styled.div`
	${({ theme }) => `
		margin: ${theme.layout.spacing.double} 0;
		display: flex;
		justify-content: space-between;
	`};
`

/**
 * CartSummary
 */

type Props = {
	cart: Checkout,
	applyDiscount: (string) => Promise<void>,
	removeDiscount: () => Promise<void>,
}

const CartSummary = ({ cart, applyDiscount, removeDiscount }: Props) => {
	return (
		<Wrapper>
			<CouponCode applyDiscount={applyDiscount} removeDiscount={removeDiscount} cart={cart} />
			<Header4>{cart.paymentDue && `Subtotal: ${parsePrice(cart.paymentDue)}`}</Header4>
		</Wrapper>
	)
}

export default CartSummary
