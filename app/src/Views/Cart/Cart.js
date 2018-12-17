// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Button } from 'Components/Buttons'
import type { Checkout } from 'Types/CheckoutTypes'
import { Header3 } from 'Components/Type'
import type { CheckoutConsumerProps } from '../CheckoutProvider'
import { CheckoutConsumer } from '../CheckoutProvider'
import Tote from './Tote'

const CartButton = styled(Button)`
	${({ theme }) => `
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: initial;
		margin-left: auto;
		position: sticky;
		top: ${theme.layout.spacing.double};
		box-shadow: 3px 3px rgba(0, 0, 0, 0.2);

		&:hover {
			box-shadow: 3px 3px rgba(0, 0, 0, 0.8);
		}
	`}
`

const CartCount = styled(Header3)`
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
	const { currentCart, openCart } = props
	const count = getCount(currentCart)

	return (
		<CartButton onClick={openCart}>
			<Header3 align="center">
				<Tote />
			</Header3>
			{parseInt(count, 10) > 0 && <CartCount>{count}</CartCount>}
		</CartButton>
	)
}

export default () => <CheckoutConsumer>{(cart) => <Cart {...cart} />}</CheckoutConsumer>
