// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { CheckoutLineItem } from 'Types/CheckoutTypes'
import { ImageBox } from 'Components/Media'
import { Header4, Header5 } from 'Components/Type'
import { parsePrice } from 'Utils/parsing'
import { CartLineItemWrapper, CartGridSegment, MainSegment } from './styled'
import Quantity from './Quantity'

const ImageWrapper = styled.div`
	${({ theme }) => `
		display: flex;
		justify-content: center;
		align-items: center;
	`};
`

const ImageBorder = styled.div`
	${({ theme }) => `
		width: 100%;
		border: 1px solid ${theme.color.middleGray};
	`};
`

const PromoCode = styled.span`
	font-size: 0.85em;
	font-weight: 600;
	margin-right: 0.2em;
	background-color: black;
	color: white;
	padding: 3px;
`

/**
 * CartLineItem
 */

type Props = {
	item: CheckoutLineItem,
	updateQuantity: (number) => Promise<void>,
}

const CartLineItem = ({ item, updateQuantity }: Props) => {
	const { discountAllocations } = item
	const basePrice = parseFloat(item.variant.price)
	const discountAmount =
		discountAllocations && discountAllocations.length ? parseFloat(discountAllocations[0].allocatedAmount.amount) : 0
	const discountedPrice = basePrice * item.quantity - discountAmount
	return (
		<CartLineItemWrapper>
			<ImageWrapper>
				{item.variant.image && (
					<ImageBorder>
						<ImageBox ratio={1} image={item.variant.image} sizes="100px" />
					</ImageBorder>
				)}
			</ImageWrapper>
			<MainSegment>
				<Header4>{item.variant.product && item.variant.product.title}</Header4>
				<Header5 weight="normal">{item.variant.title}</Header5>
				<Header5 weight="normal">{parsePrice(basePrice)}</Header5>
				{discountAllocations &&
					discountAllocations.map((a) => (
						<Header5 key={a.discountApplication.code} weight="normal">
							<PromoCode>{a.discountApplication.code}</PromoCode>-{parsePrice(a.allocatedAmount.amount)}
						</Header5>
					))}
			</MainSegment>
			<Quantity item={item} updateQuantity={updateQuantity} />
			<CartGridSegment align="center">
				<Header4>{parsePrice(discountedPrice)}</Header4>
			</CartGridSegment>
		</CartLineItemWrapper>
	)
}

export default CartLineItem
