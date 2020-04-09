// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import type { Checkout } from 'Types/CheckoutTypes'
import { parsePrice } from 'Utils/parsing'
import { Header4 } from 'Components/Type'
import { CouponCode, NoteInput } from './Inputs'

const InputWrapper = styled.div`
	${({ theme }) => css`
		margin: ${theme.layout.spacing.double} 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 0 auto;
		max-width: 300px;
	`};
`

const Subtotal = styled.div`
	${({ theme }) => css`
		margin-top: ${theme.layout.spacing.double};
		text-align: right;
	`}
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
		<>
			<Subtotal>
				<Header4>{cart.paymentDue && `Subtotal: ${parsePrice(cart.paymentDue)}`}</Header4>
			</Subtotal>
			<InputWrapper>
				<NoteInput />
				<CouponCode applyDiscount={applyDiscount} removeDiscount={removeDiscount} cart={cart} />
			</InputWrapper>
		</>
	)
}

export default CartSummary
