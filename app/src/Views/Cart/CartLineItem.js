// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import type { CheckoutLineItem } from 'Types/CheckoutTypes'
import { ImageBox } from 'Components/Media'
import { Header4, Header5 } from 'Components/Type'
import { parsePrice } from 'Utils/parsing'
import { CartLineItemWrapper, CartGridSegment, MainSegment } from './styled'
import Quantity from './Quantity'
import CouponTag from './CouponTag'

const ImageWrapper = styled.div`
	${({ theme }) => css`
		display: flex;
		justify-content: center;
		align-items: center;

		${theme.media.queries.phone`
			display: none;
		`}
	`};
`

const ImageBorder = styled.div`
	${({ theme }) => css`
		width: 100%;
		border: 1px solid ${theme.color.middleGray};
	`};
`

const Discount = styled(Header5)`
	${({ theme }) => css`
		color: ${theme.color.pink};
	`}
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
						<Discount key={a.discountApplication.code} weight="normal">
							<CouponTag />-{parsePrice(a.allocatedAmount.amount)}
							{a.discountApplication.title ? ` — ${a.discountApplication.title}` : null}
						</Discount>
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
