import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { ShopifyStorefrontCheckout } from '../../types'
import { parsePrice } from '../../utils'
import { CartSummaryWrapper } from './styled'
import { CouponCodes } from './CouponCodes'
import { Heading } from '../Text'

const Subtotal = styled.div`
  text-align: right;
  margin-top: 4;
`

/**
 * CartSummary
 */

interface Props {
  checkout: ShopifyStorefrontCheckout
}

export const CartSummary = ({ checkout }: Props) => {
  const total = checkout.paymentDue
    ? `Subtotal: ${parsePrice(checkout.paymentDue)}`
    : undefined
  if (!total) return null
  return (
    <CartSummaryWrapper>
      <CouponCodes />
      <Subtotal>
        <Heading level={3}>{total}</Heading>
      </Subtotal>
    </CartSummaryWrapper>
  )
}
