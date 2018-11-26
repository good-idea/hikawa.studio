// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { CheckoutLineItem } from 'Types/CheckoutTypes'
import { Image } from 'Components/Media'

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 50px 1fr 35px 35px;
`

/**
 * CartLineItem
 */

type Props = {
	item: CheckoutLineItem,
}

const CartLineItem = ({ item }: Props) => {
	return (
		<Wrapper>
			{item.variant.image && <Image image={item.variant.image} />}
			<p>{item.variant.product.title}</p>
			<p>quantity: {item.quantity}</p>
			<p>${item.quantity * parseInt(item.variant.price, 10)}</p>
		</Wrapper>
	)
}

export default CartLineItem
