// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { CheckoutLineItem } from 'Types/CheckoutTypes'
import { ImageBox } from 'Components/Media'
import { Header4, Header5, Header6 } from 'Components/Type'
import { parsePrice } from 'Utils/parsing'
import { cartGridStyles } from './Cart'
import Quantity from './Quantity'

export const Wrapper = styled.div`
	${({ theme }) => `
		${cartGridStyles}
		padding: ${theme.layout.spacing.singleHalf} 0;
		border-bottom: 1px solid black;

		&:first-child {
			border-top: 1px solid black;
		}

		&:hover button {
			opacity: 1;
		}
	`};
`

const ImageWrapper = styled.div`
	${({ theme }) => `
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

export const Segment = styled.div`
	${({ align, span }) => `
		display: flex;
		flex-direction: column;
		align-items: ${align || 'flex-start'};
		justify-content: center;
		grid-column: ${span ? `span ${span}` : ''};
	`};
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
	const discountedPrice = basePrice - discountAmount
	return (
		<Wrapper>
			{item.variant.image && (
				<ImageWrapper>
					<ImageBox ratio={1} image={item.variant.image} />
				</ImageWrapper>
			)}
			<Segment span={3}>
				<Header4>{item.variant.product && item.variant.product.title}</Header4>
				<Header5 weight="normal">{item.variant.title}</Header5>
				<Header5 weight="normal">{parsePrice(basePrice)}</Header5>
				{discountAllocations &&
					discountAllocations.map((a) => (
						<Header5 key={a.discountApplication.code} weight="normal">
							<PromoCode>{a.discountApplication.code}</PromoCode>-{parsePrice(a.allocatedAmount.amount)}
						</Header5>
					))}
			</Segment>
			<Quantity item={item} updateQuantity={updateQuantity} />
			<Segment align="center">
				<Header4>{parsePrice(discountedPrice * item.quantity)}</Header4>
			</Segment>
		</Wrapper>
	)
}

export default CartLineItem
