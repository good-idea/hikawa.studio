// @flow
import * as React from 'react'
import styled from 'styled-components'
import { adopt } from 'react-adopt'
import { Button } from 'Components/Buttons'
import type { Checkout } from 'Types/CheckoutTypes'
import { Header3, Header4 } from 'Components/Type'
import type { CheckoutConsumerProps } from '../CheckoutProvider'
import { CheckoutConsumer } from '../CheckoutProvider'
import Tote from './Tote'

const CartButton = styled(Button)`
	display: flex;
	justify-content: center;
	align-items: center;
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

const Composed = adopt({
	cart: <CheckoutConsumer />,
})

export default () => <Composed>{({ cart }) => <Cart {...cart} />}</Composed>
