// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import { Button } from 'Components/Buttons'
import type { Checkout } from 'Types/CheckoutTypes'
import type { CheckoutConsumerProps } from '../CheckoutProvider'
import { CheckoutConsumer } from '../CheckoutProvider'
import Tote from './Tote'

const CartButton = styled(Button)`
	${({ theme }) => css`
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: initial;
		position: sticky;
		top: ${theme.layout.spacing.single};
		box-shadow: 3px 3px rgba(0, 0, 0, 0.2);
		font-size: 34px;
		height: 42px;
		width: 42px;

		&:hover {
			box-shadow: 3px 3px rgba(0, 0, 0, 0.8);
		}

		& > svg {
			width: 0.9em;
		}
	`}
`

const CartCount = styled.span`
	${() => css`
		margin-left: 0.5em;
		position: absolute;
		color: white;
		margin-left: 0;
		bottom: 13%;
		font-size: 0.45em;
	`}
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
	const { currentCart, openCart } = props
	const count = getCount(currentCart)

	return (
		<CartButton onClick={openCart}>
			<Tote />
			{parseInt(count, 10) > 0 && <CartCount>{count}</CartCount>}
		</CartButton>
	)
}

export default () => <CheckoutConsumer>{(cart) => <Cart {...cart} />}</CheckoutConsumer>
