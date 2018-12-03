// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { CheckoutLineItem } from 'Types/CheckoutTypes'
import { ImageBox } from 'Components/Media'
import { Header4 } from 'Components/Type'
import QuantityButton from './QuantityButton'

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 100px 1fr 150px 150px 150px;
`

/**
 * CartLineItem
 */

type Props = {
	item: CheckoutLineItem,
	updateQuantity: (number) => Promise<void>,
}

const CartLineItem = ({ item, updateQuantity }: Props) => {
	return (
		<Wrapper>
			{item.variant.image && <ImageBox ratio={1} image={item.variant.image} />}
			<Header4>{item.variant.product && item.variant.product.title}</Header4>
			<Header4>quantity: {item.quantity}</Header4>
			<QuantityButton item={item} updateQuantity={updateQuantity} />
			<Header4>${item.quantity * parseFloat(item.variant.price)}</Header4>
		</Wrapper>
	)
	// <QuantityButton
}

export default CartLineItem
