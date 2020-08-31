import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { ShopifyStorefrontCheckoutLineItem } from '../../types'
import { Image } from '../Image'
import { Heading } from '../Text'
import { parsePrice } from '../../utils'
import { CartLineItemWrapper, CartGridSegment, MainSegment } from './styled'
import { Quantity } from './Quantity'
import { CouponTag } from './CouponTag'

const CouponNameSpan = styled.span`
  margin-left: 2;
  opacity: 0.5;
`

const ImageWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    ${theme.mediaQueries.mobile} {
      display: none;
    }
  `};
`

const ImageBorder = styled.div`
  width: 100%;
  border: 1px solid;
  border-color: middleGray;
`

/**
 * CartLineItem
 */

interface CartLineItemProps {
  item: ShopifyStorefrontCheckoutLineItem
  updateQuantity: (quantity: number) => Promise<void>
}

export const CartLineItem = ({ item, updateQuantity }: CartLineItemProps) => {
  const { discountAllocations } = item
  const basePrice = parseFloat(item?.variant?.priceV2.amount)
  const discountAmount =
    discountAllocations && discountAllocations.length
      ? parseFloat(discountAllocations[0].allocatedAmount.amount)
      : 0
  const discountedPrice = basePrice * item.quantity - discountAmount
  return (
    <CartLineItemWrapper>
      <ImageWrapper>
        {item?.variant?.image && (
          <ImageBorder>
            <Image ratio={1} image={item.variant.image} sizes="100px" />
          </ImageBorder>
        )}
      </ImageWrapper>
      <MainSegment>
        <Heading level={4} mb={2}>
          {item?.variant?.product && item?.variant?.product.title}
        </Heading>
        <Heading level={5} fontWeight="normal">
          {item?.variant?.title}
        </Heading>
        <Heading level={5} fontWeight="normal">
          {parsePrice(basePrice)}
        </Heading>
        {discountAllocations &&
          discountAllocations.map((a, i) => (
            <Heading
              level={5}
              color="pink"
              key={i || 'some-key'}
              fontWeight={5}
            >
              <CouponTag /> -{parsePrice(a.allocatedAmount.amount)}
              {/* @ts-ignore */}
              <CouponNameSpan>{a.discountApplication?.title}</CouponNameSpan>
            </Heading>
          ))}
      </MainSegment>
      <Quantity item={item} updateQuantity={updateQuantity} />
      <CartGridSegment align="center">
        <Heading level={4}>{parsePrice(discountedPrice)}</Heading>
      </CartGridSegment>
    </CartLineItemWrapper>
  )
}
