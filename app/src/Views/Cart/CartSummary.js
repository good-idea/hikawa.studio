// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import type { Checkout } from 'Types/CheckoutTypes'
import { parsePrice } from 'Utils/parsing'
import { Header4 } from 'Components/Type'

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
		</>
	)
}

export default CartSummary
